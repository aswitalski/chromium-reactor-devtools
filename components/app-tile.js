{
  let ReactorHook;

  const AppTile = class extends Reactor.Component {

    render() {
      return [
        'div', {
          class: 'app',
          onMouseEnter: () => this.props.highlight(this.props.id),
          onMouseLeave: () => this.props.stopHighlighting(),
          onClick: () => {
            this.props.onClick();
            // ReactorHook.inspect(this.props.id);
          }
        },
        this.props.name,
      ]
    }
  };

  module.exports = AppTile;
}