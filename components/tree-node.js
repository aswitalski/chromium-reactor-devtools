{
  const TreeNode = class extends Reactor.Root {

    render() {
      let childNodes = [];
      if (this.props.children) {
        childNodes = this.props.children.map(child => {
          const nodeProps = Object.assign({
            appId: this.props.appId,
            debugged: this.props.debugged,
            debug: this.props.debug,
            undebug: this.props.undebug,
            highlight: this.props.highlight,
            stopHighlighting: this.props.stopHighlighting,
          }, child);
          return [
            Node, nodeProps,
          ]
        });
      }
      const isDebugged = this.props.type === 'component' &&
        this.props.debugged.includes(this.props.name);
      const onDoubleClick = event => {
        if (event.metaKey) {
          console.log('Opening resource:', this.props.path);
          return chrome.devtools.panels.openResource(this.props.path);
        }
        if (isDebugged) {
          this.props.undebug(this.props.appId, this.props.id);
        } else {
          this.props.debug(this.props.appId, this.props.id);
        }
      };
      const tagNameEventListeners = {
        onMouseEnter: () => {
          this.props.highlight(this.props.appId, this.props.id);
        },
        onMouseLeave: () => {
          this.props.stopHighlighting();
        },
        onMouseDown: event => event.preventDefault(),
        onDoubleClick,
      };
      return [
        'div', {
          class: ['tree-node', `${this.props.type}-node`],
        },
        ...[
          [
            'span', Object.assign({
              class: ['node-name', 'start-tag', {
                debugged: isDebugged,
              }],
            }, tagNameEventListeners),
            this.props.name,
          ],
          ...childNodes, [
            'span', this.props.text ? this.props.text : '',
          ],
          [
            'span', Object.assign({
              class: ['node-name', 'end-tag', {
                debugged: isDebugged,
              }],
            }, tagNameEventListeners),
            this.props.name,
          ],
        ],

      ];
    }
  };

  const Node = loader.symbol('components/tree-node');

  module.exports = TreeNode;
}