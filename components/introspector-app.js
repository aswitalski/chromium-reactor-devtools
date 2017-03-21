{
  let ReactorHook;
  let apps;

  const IntrospectorApp = class extends Reactor.Root {

    static async init() {
      ReactorHook = await require('services/reactor-hook-client');
      apps = await ReactorHook.getApps();
    }

    getInitialState() {
      return {
        apps: apps.length,
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
          'div', {
            class: 'header'
          },
          'Module loader:'
        ],
        [
          'div', {
            class: 'item',
          },
          '- Apps: ' + this.props.apps
        ]
      ];
    }
  };

  module.exports = IntrospectorApp;
}
