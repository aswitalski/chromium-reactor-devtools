{
  const eval = command => {
    return new Promise((resolve, reject) => {
      chrome.devtools.inspectedWindow.eval(
        command, (result, isException) => {
          if (isException) {
            return reject(isException);
          }
          resolve(result);
        });
    });
  };

  const execute = (method, ...params) => {
    const command = getCommand(method, ...params);
    return eval(command);
  };

  const getCommand = (method, ...params) => {
    const paramsString = params.map(JSON.stringify).join(', ');
    return `Reactor.__devtools_hook__.${method}(${paramsString})`;
  };

  const ReactorHookClient = class {

    static isReactorPresent() {
      return eval('!!window.Reactor');
    }

    static getApps() {
      return execute('getApps');
    }

    static getApp(uuid) {
      return execute('getApp', uuid);
    }

    static getBoundingRect(uuid) {
      return execute('getBoundingRect', uuid);
    }

    static getElement(uuid) {
      return execute('getElement', uuid);
    }

    static inspect(uuid) {
      const command = getCommand('getElement', uuid);
      return eval(`inspect(${command})`);
    }
  };

  module.exports = ReactorHookClient;
}