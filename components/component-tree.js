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

  const TreeNode = loader.symbol('components/tree-node');

  module.exports = ComponentTree;
}