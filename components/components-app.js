{
  let ReactorHook;
  let reducer;
  let apps;

  const ComponentsApp = class extends Reactor.Root {

    static async init() {
      ReactorHook = await require('services/reactor-hook-client');
      reducer = await require('reducers/components-reducer');
      apps = await ReactorHook.getApps();
    }

    getInitialState() {
      return {
        apps
      };
    }

    getReducers() {
      return [reducer];
    }

    render() {
      if (this.props.appId) {
        return [
          ComponentTree, {
            data: this.props.componentTree,
          },
        ];
      } else {
        return [
          AppSelection, {
            apps: this.props.apps,
            onAppSelected: async appId => {
              const data = await ReactorHook.getApp(appId);
              this.dispatch(reducer.commands.loadComponentTree(appId, data));
            }
          },
        ];
      }
    }
  };

  const AppSelection = require.def('components/app-selection');
  const ComponentTree = require.def('components/component-tree');

  module.exports = ComponentsApp;
}