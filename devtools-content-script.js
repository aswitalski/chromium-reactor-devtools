{
  const DevToolsExtension = class {

    static getHighlightElement() {
      return document.querySelector('#__devtools_highlight__');
    }

    static init() {
      console.log('DevTools content script initialized');
      let highlight = this.getHighlightElement();
      if (highlight) {
        highlight.remove();
      }
      highlight = document.createElement('div');
      highlight.style.display = 'none';
      highlight.style.position = 'fixed';
      highlight.style.zIndex = 1000;
      highlight.style.backgroundColor = 'rgba(77, 137, 205, 0.5)';
      highlight.id = '__devtools_highlight__';
      document.body.appendChild(highlight);
    }

    static highlight(rect) {
      const highlight = this.getHighlightElement();
      highlight.style.display = '';
      highlight.style.left = `${rect.left}px`;
      highlight.style.top = `${rect.top}px`;
      highlight.style.width = `${rect.width}px`;
      highlight.style.height = `${rect.height}px`;
    }

    static removeHighlight() {
      const highlight = this.getHighlightElement();
      highlight.style.display = 'none';
      highlight.style.left = '';
      highlight.style.top = '';
      highlight.style.width = '';
      highlight.style.height = '';
    }
  };

  DevToolsExtension.init();
  window.__devtools_extension__ = DevToolsExtension;
}