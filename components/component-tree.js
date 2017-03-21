{
  const ComponentTree = class extends Reactor.Component {

    render() {
      return [
        'div', {
          class: 'panel component-tree'
        },
        [
          TreeNode, this.props.data,
        ],
      ];
    }
  };

  const TreeNode = require.def('components/tree-node');

  module.exports = ComponentTree;
}