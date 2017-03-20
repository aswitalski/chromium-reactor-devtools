const init = async () => {

  const ReactorHook = await require('services/reactor-hook-client');

  if (await ReactorHook.isReactorPresent()) {
    chrome.devtools.panels.create(
      'Components', 'toast.png', 'panel.html', panel => {});
  }
}

init();