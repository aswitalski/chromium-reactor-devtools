chrome.extension.connect({
  name: 'Components Panel'
});

chrome.extension.sendMessage({
  action: 'inspect',
  tabId: chrome.devtools.inspectedWindow.tabId
});

const renderComponentsApp = async container => {
  const ComponentsApp = loader.symbol('components/components-app');
  const app = Reactor.create(ComponentsApp);
  await app.preload();
  await app.render(document.body);
};

renderComponentsApp();
