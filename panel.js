// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*

// document.querySelector('#executescript').addEventListener('click', function() {
//   sendObjectToInspectedPage({
//     action: "code",
//     content: "console.log('Inline script executed')"
//   });
// }, false);

// document.querySelector('#insertscript').addEventListener('click', function() {

console.trace();

sendObjectToInspectedPage({
  action: "script",
  content: "devtools-content-script.js"
});



// }, false);

// document.querySelector('#insertmessagebutton').addEventListener('click', function() {
//   sendObjectToInspectedPage({
//     action: "code",
//     content: "document.body.innerHTML='<button>Send message to DevTools</button>'"
//   });
//   sendObjectToInspectedPage({
//     action: "script",
//     content: "messageback-script.js"
//   });
// }, false);

console.log('Evaluating code');
chrome.devtools.inspectedWindow.eval('Reactor.__devtools_hook__.getApps()', (apps, isException) => {
  console.log('isException', isException);
  console.log('Reactor apps:', apps);

  for (const app of apps) {
    const element = document.createElement('div');
    element.textContent = JSON.stringify(app);
    document.body.appendChild(element);

    element.addEventListener('mouseenter', event => {

      chrome.devtools.inspectedWindow.eval(
        `Reactor.__devtools_hook__.getBoundingRect('${app.id}')`,
        (rect, isException) => {
          console.log('isException', isException);
          console.log('Rect:', rect);

          console.log('Highlight:', app.id);

          chrome.devtools.inspectedWindow.eval(
            `window.__devtools_extension__.highlight(${JSON.stringify(rect)});`, {
              useContentScriptContext: true
            },
            (result, isException) => {
              console.log('isException', isException);
              console.log('Result:', result);
            });

        });
    });

    element.addEventListener('mouseleave', event => {
      console.log('Stop highlighting:', app.id);
      chrome.devtools.inspectedWindow.eval(
        `window.__devtools_extension__.removeHighlight();`, {
          useContentScriptContext: true
        },
        (result, isException) => {
          console.log('isException', isException);
          console.log('Result:', result);
        });
    });
  }
});