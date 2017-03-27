{
  let ReactorHook;
  let InspectedPage;

  let reducer;
  let apps;

  const debug = async (appId, nodeId) => {
    ReactorHook.debug(appId, nodeId);
    return await ReactorHook.getComponentName(appId, nodeId);
  };

  const undebug = async (appId, nodeId) => {
    ReactorHook.undebug(appId, nodeId);
    return await ReactorHook.getComponentName(appId, nodeId);
  };

  const highlight = async (appId, nodeId) => {
    InspectedPage.removeHighlight();
    const rect = await ReactorHook.getBoundingRect(appId, nodeId);
    InspectedPage.highlight(rect);
  };

  const stopHighlighting = () => {
    InspectedPage.removeHighlight();
  };

  const loadComponentTree = async (appId, dispatch) => {
    const data = await ReactorHook.getApp(appId);
    dispatch(reducer.commands.loadComponentTree(appId, data));
  };

  const ComponentsApp = class extends Reactor.Root {

    static async init() {
      ReactorHook = await loader.require('services/reactor-hook-client');
      InspectedPage = await loader.require('services/inspected-page-client');
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

    updateComponentTree(appId) {
      loadComponentTree(appId, this.dispatch);
    }

    reload() {
      ReactorHook.reloadApps();
    }

    render() {
      if (this.props.appId) {
        const unselectApp = name => {
          this.dispatch(reducer.commands.unselectApp());
        };
        const debugComponent = name => {
          this.dispatch(reducer.commands.debugComponent(name));
        };
        const undebugComponent = name => {
          this.dispatch(reducer.commands.undebugComponent(name));
        };
        return [
          ComponentTree, {
            data: this.props.componentTree,
            appId: this.props.appId,
            debugged: this.props.debugged || [],
            debug: async (appId, componentId) => {
              const name = await debug(appId, componentId);
              debugComponent(name);
            },
            undebug: async (appId, componentId) => {
              const name = await undebug(appId, componentId);
              undebugComponent(name);
            },
            highlight,
            stopHighlighting,
            unselectApp,
          },
        ];
      } else {
        return [
          AppSelection, {
            apps: this.props.apps,
            highlight,
            stopHighlighting,
            onAppSelected: async appId => {
              loadComponentTree(appId, this.dispatch);
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