const connection = chrome.extension.connect({
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

  connection.onMessage.addListener(message => {
    if (message.type === 'update-app') {
      if (app.root.props.appId === message.appId) {
        app.root.updateComponentTree(message.appId);
      }
    }
  });
};

renderComponentsApp();
