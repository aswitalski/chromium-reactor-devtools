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

    static getApp(appId) {
      return execute('getApp', appId);
    }

    static getBoundingRect(appId, nodeId) {
      return execute('getBoundingRect', appId, nodeId);
    }

    static getElement(appId, nodeId) {
      return execute('getElement', appId, nodeId);
    }

    static getComponentName(appId, componentId) {
      return execute('getComponentName', appId, componentId);
    }

    static reloadApps() {
      execute('reloadApps');
    }

    static debug(appId, componentId) {
      const command = getCommand('getRenderFunction', appId, componentId);
      return eval(`debug(${command})`);
    }

    static undebug(appId, componentId) {
      const command = getCommand('getRenderFunction', appId, componentId);
      return eval(`undebug(${command})`);
    }

    static inspect(appId, nodeId) {
      const command = getCommand('getElement', appId, nodeId);
      return eval(`inspect(${command})`);
    }
  };

  module.exports = ReactorHookClient;
}