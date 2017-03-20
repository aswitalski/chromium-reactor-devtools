const injectContentScript = path => {
  chrome.extension.sendMessage({
    action: 'script',
    content: path,
    tabId: chrome.devtools.inspectedWindow.tabId
  });
};

injectContentScript('devtools-content-script.js');

const renderIntrospector = async container => {
  const ComponentsPanel = require.def('components/components-panel');
  const panel = Reactor.create(ComponentsPanel);
  await panel.preload();
  await panel.render(container);
};
renderIntrospector(document.querySelector('.main'));
