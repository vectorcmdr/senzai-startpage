class ConfigEditor extends Component {
  refs = {
    config: '#config',
    textarea: '#config textarea[type="text"]',
    save: '.save',
    close: '.close'
  };

  constructor() {
    super();
    this.config = JSON.parse(localStorage.getItem("config")).config;
  }

  style() {
    return `
      #config {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: calc(100% - 2px);
          height: 100%;
          background: var(--editor-bg);
          z-index: 99;
          visibility: hidden;
          top: -100%;
          transition: all .3s ease-in-out;
      }

      #config.active {
          top: 0;
          visibility: visible;
      }

      #config div {
          position: relative;
          width: 95%;
      }

      #config textarea {
          border: 0;
          outline: 0;
          width: 100%;
          box-shadow: inset 0 -1px var(--editor-unfocus);
          padding: .5em 0;
          background: none;
          font: 350 12px 'Roboto', sans-serif;
          letter-spacing: 1px;
          color: var(--editor-text);
          resize: none;
          height: 28vh;
          -ms-overflow-style: none;
          scrollbar-width: none;
      }

      #config textarea:focus {
          box-shadow: inset 0 -1px var(--editor-focus);
      }

      #config textarea::selection {
          background: var(--editor-select-bg);
          color: var(--editor-select);
      }

      #config textarea::-webkit-scrollbar {
        display: none;
      }

      #config .save {
          background: 0;
          border: 0;
          outline: 0;
          color: var(--editor-save);
          position: absolute;
          right: 28px;
          cursor: pointer;
          top: 6px;
      }

      #config .save:hover {
          filter: opacity(.8);
      }

      #config .close {
          background: 0;
          border: 0;
          outline: 0;
          color: var(--editor-close);
          position: absolute;
          right: 0;
          cursor: pointer;
          top: 4px;
      }

      #config .close:hover {
          filter: opacity(.8);
      }

      .material-icons.md-20 {
        font-size: 20px;
      }

      .material-icons.md-24 {
        font-size: 24px;
      }

    `;
  }

  imports() {
    return [
      this.resources.fonts.roboto,
      this.resources.icons.material
    ];
  }

  template() {
    return `
        <div id="config">
          <div>
            <textarea type="text" spellcheck="false"></textarea>
            <button class="save"><i class="material-icons md-20">&#xe161;</i></button>
            <button class="close"><i class="material-icons md-24">&#xE5CD;</i></button>
          </div>
        </div>
    `;
  }

  activate() {
    this.refs.config.classList.add('active');
    this.refs.textarea.scrollIntoView();
    setTimeout(() => this.refs.textarea.focus(), 100);
  }

  deactivate() {
    this.refs.config.classList.remove('active');
  }

  saveConfig() {
    localStorage.setItem("CONFIG", this.refs.textarea.value);
    this.deactivate();
    location.reload();
  }

  handleSearch(event) {
    const { key } = event;

    if (key === 'Escape')
      this.deactivate();
  }

  setEvents() {
    this.refs.config.onkeyup = (e) => this.handleSearch(e);
    this.refs.close.onclick = () => this.deactivate();
    this.refs.save.onclick = () => this.saveConfig();
  }

  setConfig() {
    this.refs.textarea.value =  JSON.stringify(this.config, null, 4);
  }

  connectedCallback() {
    this.render().then(() => {
      this.setEvents();
      this.setConfig();
    });
  }
}
