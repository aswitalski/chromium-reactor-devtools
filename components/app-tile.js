{
  let ReactorHook;
  let InspectedPage;

  const AppTile = class extends Reactor.Component {

    static async init() {
      ReactorHook = await loader.require('services/reactor-hook-client');
      InspectedPage = await loader.require('services/inspected-page-client');
    }

    render() {
      return [
        'div', {
          class: 'app',
          onMouseEnter: async event => {
            const rect = await ReactorHook.getBoundingRect(this.props.id);
            InspectedPage.highlight(rect);
          },
          onMouseLeave: () => {
            InspectedPage.removeHighlight();
          },
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