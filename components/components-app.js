{
  let ReactorHook;
  let apps;

  const ComponentsApp = class extends Reactor.Root {

    static async init() {
      ReactorHook = await require('services/reactor-hook-client');
      apps = await ReactorHook.getApps();
    }

    getInitialState() {
      return {
        apps
      };
    }

    getReducers() {
      return [];
    }

    render() {
      return [
        'div', {
          class: 'panel'
        },
        [
          'span', {
            class: 'header'
          }, 'Select app:'
        ],
        [
          'div', {
            class: 'components-app',
          }, ...apps.map(app => [
            AppTile, {
              id: app.id,
              name: app.name,
            }
          ])
        ]
      ];
    }
  };

  const AppTile = require.def('components/app-tile');

  module.exports = ComponentsApp;
}
