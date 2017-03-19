{
  const execute = (method, ...params) => {
    return new Promise((resolve, reject) => {
      const paramsString = params.map(JSON.stringify).join(', ');
      chrome.devtools.inspectedWindow.eval(
        `window.__devtools_extension__.${method}(${paramsString})`, {
          useContentScriptContext: true
        }, (result, isException) => {
          if (isException) {
            return reject(isException);
          }
          resolve(result);
        });
    });
  };

  const ContentScriptClient = class {

    static highlight(rect) {
      execute('highlight', rect);
    }

    static removeHighlight() {
      execute('removeHighlight');
    }
  };

  module.exports = ContentScriptClient;
}