{
  const onMouseEnter = uuid => (event => {
    chrome.devtools.inspectedWindow.eval(
      `Reactor.__devtools_hook__.getBoundingRect('${uuid}')`,
      (rect, isException) => {
        // console.log('isException', isException);
        // console.log('Rect:', rect);
        // console.log('Highlight:', uuid);

        chrome.devtools.inspectedWindow.eval(
          `window.__devtools_extension__.highlight(${JSON.stringify(rect)});`, {
            useContentScriptContext: true
          },
          (result, isException) => {
            // console.log('isException', isException);
            // console.log('Result:', result);
          });
      });
  });

  const onMouseLeave = uuid => (event => {
    // console.log('Stop highlighting:', uuid);
    chrome.devtools.inspectedWindow.eval(
      `window.__devtools_extension__.removeHighlight();`, {
        useContentScriptContext: true
      },
      (result, isException) => {
        // console.log('isException', isException);
        // console.log('Result:', result);
      });
  });

  const AppTile = class extends Reactor.Component {

    render() {
      return [
        'div', {
          class: 'app',
          onMouseEnter: onMouseEnter(this.props.id),
          onMouseLeave: onMouseLeave(this.props.id),
        },
        this.props.name,
      ]
    }
  };

  module.exports = AppTile;
}