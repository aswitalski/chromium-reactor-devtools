{
  const LOAD_COMPONENT_TREE = Symbol('load-component-tree');
  const DEBUG_COMPONENT = Symbol('debug-component');
  const UNDEBUG_COMPONENT = Symbol('undebug-component');

  const reducer = (state, command) => {
    switch (command.type) {
      case LOAD_COMPONENT_TREE:
        {
          console.log('Load component tree for:', command.uuid);
          const nextState = Object.assign({}, state, {
            appId: command.uuid,
            componentTree: command.data,
          });
          return nextState;
        }
      case DEBUG_COMPONENT:
        {
          console.log('Debug component:', command.name);
          const debugged = state.debugged ? Array.from(state.debugged) : [];
          debugged.push(command.name);
          const nextState = Object.assign({}, state, {
            debugged: [...new Set(debugged)],
          });
          return nextState;
        }
      case UNDEBUG_COMPONENT:
        {
          console.log('Undebug component:', command.name);
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