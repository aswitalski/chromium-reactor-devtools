{
  const AppSelection = class extends Reactor.Component {

    onDestroyed() {
      this.props.stopHighlighting();
    }

    render() {
      return [
        'div', {
          class: 'panel app-selection'
        },
        [
          'span', {
            class: 'header'
          }, 'Select app:'
        ],
        [
          'div', {
            class: 'components-app',
          }, ...this.props.apps.map(app => [
            AppTile, {
              id: app.id,
              name: app.name,
              highlight: this.props.highlight,
              stopHighlighting: this.props.stopHighlighting,
              onClick: () => this.props.onAppSelected(app.id),
            }
          ])
        ]
      ];
    }
  };

  const AppTile = loader.symbol('components/app-tile');

  module.exports = AppSelection;
}