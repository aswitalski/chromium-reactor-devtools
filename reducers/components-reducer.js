{
  const UNSELECT_APP = Symbol('unselect-app');
  const LOAD_COMPONENT_TREE = Symbol('load-component-tree');
  const DEBUG_COMPONENT = Symbol('debug-component');
  const UNDEBUG_COMPONENT = Symbol('undebug-component');

  const reducer = (state, command) => {
    switch (command.type) {
      case UNSELECT_APP:
        {
          const nextState = Object.assign({}, state, {
            appId: null,
            componentTree: null,
          });
          return nextState;
        }
      case LOAD_COMPONENT_TREE:
        {
          const nextState = Object.assign({}, state, {
            appId: command.uuid,
            componentTree: command.data,
          });
          return nextState;
        }
      case DEBUG_COMPONENT:
        {
          const debugged = state.debugged ? Array.from(state.debugged) : [];
          debugged.push(command.name);
          const nextState = Object.assign({}, state, {
            debugged: [...new Set(debugged)],
          });
          return nextState;
        }
      case UNDEBUG_COMPONENT:
        {
          const debugged = state.debugged ? Array.from(state.debugged) : [];
          const set = new Set(debugged);
          set.delete(command.name);
          const nextState = Object.assign({}, state, {
            debugged: [...set],
          });
          return nextState;
        }
      default:
        return state;
    }
  };

  reducer.commands = {
    unselectApp: () => ({
      type: UNSELECT_APP,
    }),
    loadComponentTree: (uuid, data) => ({
      type: LOAD_COMPONENT_TREE,
      uuid,
      data,
    }),
    debugComponent: name => ({
      type: DEBUG_COMPONENT,
      name,
    }),
    undebugComponent: name => ({
      type: UNDEBUG_COMPONENT,
      name,
    }),
  };

  module.exports = reducer;
}