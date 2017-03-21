{
  let ReactorHook;
  let reducer;
  let apps;

  const ComponentsApp = class extends Reactor.Root {

    static async init() {
      ReactorHook = await loader.require('services/reactor-hook-client');
      reducer = await loader.require('reducers/components-reducer');
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

  const AppSelection = loader.symbol('components/app-selection');
  const ComponentTree = loader.symbol('components/component-tree');

  module.exports = ComponentsApp;
}