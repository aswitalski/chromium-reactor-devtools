{
  const getApps = () => {
    return new Promise((resolve, reject) => {
      chrome.devtools.inspectedWindow.eval('Reactor.__devtools_hook__.getApps()', (apps, isException) => {
        console.log('isException', isException);
        console.log('Reactor apps:', apps);
        if (isException) {
          reject(isException);
        }
        resolve(apps);
      });
    });
  };

  let apps;

  const IntrospectorApp = class extends Reactor.Root {

    static async init() {
      apps = await getApps();
    }

    getInitialState() {
      return { apps };
    }

    getReducers() {
      return [];
    }
    render() {
      return [
        'div', {
          class: 'components-app',
        }, ...apps.map(app => [
          AppTile, {
            id: app.id,
            name: app.name,
          }
        ])
      ];
    }
  };

  const AppTile = require.def('components/app-tile');

  module.exports = IntrospectorApp;
}