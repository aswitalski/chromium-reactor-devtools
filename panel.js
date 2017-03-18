const injectContentScript = path => {
  chrome.extension.sendMessage({
    action: 'script',
    content: path,
    tabId: chrome.devtools.inspectedWindow.tabId
  });
};

injectContentScript('devtools-content-script.js');

const renderIntrospector = async container => {
  const IntrospectorApp = require.def('components/introspector-app');
  const introspector = Reactor.create(IntrospectorApp);
  await introspector.preload();
  await introspector.render(container)
};
renderIntrospector(document.querySelector('.main'));