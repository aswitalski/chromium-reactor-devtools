{
  const TreeNode = class extends Reactor.Root {

    render() {
      let childNodes = [];
      if (this.props.children) {
        childNodes = this.props.children.map(child => [
          Node, child
        ]);
      }
      return [
        'div', {
          class: ['tree-node', `${this.props.type}-node`],
        },
        ...[
          [
            'span', {
              class: 'node-name start-tag',
            },
            this.props.name,
          ],
          ...childNodes,
          [
            'span', this.props.text ? this.props.text : '',
          ],
          [
            'span', {
              class: 'node-name end-tag',
            },
            this.props.name,
          ],
        ],

      ];
    }
  };

  const Node = loader.symbol('components/tree-node');

  module.exports = TreeNode;
}