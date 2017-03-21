{
  const LOAD_COMPONENT_TREE = Symbol('load-component-tree');

  const reducer = (state, command) => {
    switch (command.type) {
      case LOAD_COMPONENT_TREE:
        console.log('Load component tree for:', command.uuid);
        const nextState = Object.assign({}, state, {
          appId: command.uuid,
          componentTree: command.data,
        });
        return nextState;
      default:
        return state;
    }
  };

  reducer.commands = {
    loadComponentTree: (uuid, data) => {
      return {
        type: LOAD_COMPONENT_TREE,
        uuid,
        data,
      }
    }
  };

  module.exports = reducer;
}