class Modal extends Component {
  name;
  height;
  width;

  refs = {
    modal: '.modal',
    close: '.modal-close',
    content: '.modal-content',
    title: '.modal-header-title'
  };

  constructor(name, width = 650, height = 710) {
    super();

    this.name = name ?? '';
    this.width = width;
    this.height = height;
  }

  imports() {
    return [
      this.resources.fonts.roboto,
      this.resources.icons.material,
      this.resources.libs.css
    ];
  }

  setEvents() {
    this.refs.close.onclick = () => this.close();
  }

  activate() {
    this.refs.modal.classList.add('active');
  }

  close() {
    this.refs.modal.classList.remove('active');
  }

  setContent(content) {
    this.refs.content.innerHTML = content ?? '';
    return this;
  }

  setTitle(title) {
    this.refs.title.innerText = title;
    return this;
  }

  style() {
    return `
      .modal {
          position: absolute;
          height: ${this.height}px;
          width: ${this.width}px;
          z-index: 9999;
          margin: auto;
          top: calc(-100% - ${this.height}px);
          bottom: 0;
          right: 0; left: 0;
          background: var(--background);
          opacity: 0.95;
          padding: 1em 1.5em;
          box-sizing: border-box;
          transition: top .5s cubic-bezier(0.06, -0.05, 0, 1);
          box-shadow: 0 0 10px var(--modal-bg);
          border-radius: 8px;
      }

      .modal-content {
          margin-top: 1em;
          color: var(--text-major);
          font: 400 11pt 'Roboto', sans-serif;
          line-height: 1;
      }

      .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 30px;
          border-bottom: 1px solid var(--background);
          padding-bottom: 0.5em;
      }

      .modal-close,
      .modal-header-title {
          color: var(--title-text);
      }

      .modal-close i {
          font-size: 22pt;
          color: var(--button-close);
      }

      .modal-close i:hover {
          scale: 1.1;
          color: var(--button-close-hov);
      }

      .modal-close {
          background: none;
          outline: 0;
          border: 0;
          height: 24px;
          width: 24px;
      }

      .modal-header-title {
          font: 600 16pt 'Roboto', sans-serif;
          text-transform: uppercase;
      }

      .modal.active {
          top: 0;
      }

      ul {
        padding-left: 27px;
      }

      li {
        padding-top: 10px;
      }

      kbd {
        padding: 0.1em 0.7em;
        border: 1px solid var(--icon-keys-glyph);
        font-size: 12px;
        font-family: 'Roboto', sans-serif;
        background-color: var(--icon-keys);
        color: var(--icon-keys-glyph);
        -moz-box-shadow: 0 1px 0px var(--box-shadow-tr),0 0 0 2px var(--box-shadow) inset;
        -webkit-box-shadow: 0 1px 0px var(--box-shadow-tr),0 0 0 2px var(--box-shadow) inset;
        box-shadow: 0 1px 0px var(--box-shadow-tr),0 0 0 2px var(--box-shadow) inset;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        display: inline-block;
        margin: 0 0.1em;
        text-shadow: 0 1px 0 var(--icon-keys-glyph);
        line-height: 1.4;
        white-space: nowrap;
        padding-right: 8px;
      }
    `;
  }

  template() {
    return `
      <div class="modal">
        <div class="modal-header">
          <h1 class="modal-header-title">${this.name ?? ''}</h1>
          <button class="+ modal-close">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-content">${this.content ?? ''}</div>
      </div>
    `;
  }

  connectedCallback() {
    this.render().then(() => {
      this.setEvents();
    });
  }
}
