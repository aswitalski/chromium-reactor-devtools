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
      const toggleDebug = event => {
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
      return [
        'div', {
          class: ['tree-node', `${this.props.type}-node`],
        },
        ...[
          [
            'span', {
              class: ['node-name', 'start-tag', {
                debugged: isDebugged,
              }],
              onMouseEnter: () => {
                this.props.highlight(this.props.appId, this.props.id);
              },
              onMouseLeave: () => {
                this.props.stopHighlighting();
              },
              onMouseDown: event => event.preventDefault(),
              onDoubleClick: toggleDebug,
            },
            this.props.name,
          ],
          ...childNodes, [
            'span', this.props.text ? this.props.text : '',
          ],
          [
            'span', {
              class: ['node-name', 'end-tag', {
                debugged: isDebugged,
              }],
              onMouseDown: event => event.preventDefault(),
              onDoubleClick: toggleDebug,
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