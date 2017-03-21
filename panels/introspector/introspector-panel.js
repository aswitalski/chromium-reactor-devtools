chrome.extension.connect({
  name: 'Reactor DevTools Introspector Panel'
});

chrome.extension.sendMessage({
  action: 'inspect',
  tabId: chrome.devtools.inspectedWindow.tabId
});

const renderIntrospectorApp = async container => {
  const IntrospectorApp = require.def('components/introspector-app');
  const app = Reactor.create(IntrospectorApp);
  await app.preload();
  await app.render(document.body);
};

renderIntrospectorApp();
