{
  const ComponentTree = class extends Reactor.Component {

    render() {
      const nodeProps = Object.assign({
        appId: this.props.appId,
        debugged: this.props.debugged,
        debug: this.props.debug,
        undebug: this.props.undebug,
        highlight: this.props.highlight,
        stopHighlighting: this.props.stopHighlighting,
      }, this.props.data);
      return [
        'div', {
          class: 'panel component-tree'
        },
        [
          TreeNode, nodeProps,
        ],
      ];
    }
  };

  const TreeNode = loader.symbol('components/tree-node');

  module.exports = ComponentTree;
}