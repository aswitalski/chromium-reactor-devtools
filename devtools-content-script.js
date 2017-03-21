{
  const DevToolsExtension = class {

    static getHighlightElement() {
      return document.querySelector('#__devtools_highlight__');
    }

    static sendMessageToDevTools(type, data) {
      chrome.runtime.sendMessage(Object.assign({
        type
      }, data));
    }

    static init() {
      window.addEventListener('message', msg => {
        if (msg.data.source === 'Reactor') {
          const type = msg.data.type;
          const data = msg.data.data;
          this.sendMessageToDevTools(type, data);
        };
      });
      console.log('Reactor DevTools extension connected.');
    }

    static highlight(rect) {
      const highlight = document.createElement('div');
      highlight.id = '__devtools_highlight__';
      highlight.style.position = 'fixed';
      highlight.style.zIndex = 1000;
      highlight.style.cursor = 'pointer';
      highlight.style.backgroundColor = 'rgba(77, 137, 205, 0.5)';
      highlight.style.left = `${rect.left}px`;
      highlight.style.top = `${rect.top}px`;
      highlight.style.width = `${rect.width}px`;
      highlight.style.height = `${rect.height}px`;
      document.body.appendChild(highlight);
    }

    static removeHighlight() {
      const highlight = this.getHighlightElement();
      if (highlight) {
        highlight.remove();
      }
    }
  };

  if (!window.__devtools_extension__) {
    DevToolsExtension.init();
    window.__devtools_extension__ = DevToolsExtension;
  }
}
