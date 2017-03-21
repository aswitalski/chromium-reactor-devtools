{
  let InspectedPage;

  const AppSelection = class extends Reactor.Component {

    static async init() {
      InspectedPage = await require('services/inspected-page-client');
    }

    onDestroyed() {
      InspectedPage.removeHighlight();
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
              onClick: () => this.props.onAppSelected(app.id),
            }
          ])
        ]
      ];
    }
  };

  const AppTile = require.def('components/app-tile');

  module.exports = AppSelection;
}