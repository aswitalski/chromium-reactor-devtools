const init = async() => {

  const ReactorHook = await require('services/reactor-hook-client');
  const isReactorPresent = await ReactorHook.isReactorPresent();

  if (isReactorPresent) {

    chrome.devtools.panels.create(
      'Components', 'toast.png', 'panels/components/components-panel.html',
      panel => {
        console.log('Components panel:', panel);
      });
    chrome.devtools.panels.create(
      'Introspector', 'toast.png', 'panels/introspector/introspector-panel.html',
      panel => {
        console.log('Introspector panel:', panel);
      });
  }
}

init();
