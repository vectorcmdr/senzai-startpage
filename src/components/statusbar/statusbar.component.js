class Statusbar extends Component {
  externalRefs = {};

  refs = {
    categories: '.categories ul',
    tabs: '#tabs ul li',
    indicator: '.indicator',
    addTab: '.disp-help',
    lang: 'upper-roman'
  };

  modal;
  currentTabIndex = 0;

  constructor() {
    super();
    this.setDependencies();
  }

  setDependencies() {
    this.externalRefs = {
      categories: this.parentNode.querySelectorAll(this.refs.categories)
    };
    this.refs.lang = CONFIG.statusbar.tabslang;
  }

  setAttributes() {
    this.modal = RenderedComponents['modal-popup'];
  }

  imports() {
    return [
      this.resources.fonts.roboto,
      this.resources.icons.material,
      this.resources.icons.tabler,
      this.resources.libs.css,
    ];
  }

  style() {
    return `
      *:not(:defined) { display: none; }

      #tabs,
      #tabs .widgets,
      #tabs ul li:last-child {
          position: absolute;
      }

      #tabs {
          width: 100%;
          height: 100%;
          border-radius: 8px;
      }

      #tabs ul {
          counter-reset: tabs;
          height: 100%;
          position: relative;
          list-style: none;
          margin-left: 1em;
      }

      #tabs ul li:not(:last-child)::after {
          content: counter(tabs, ${this.refs.lang});
          font-family: 'Roboto', sans-serif;
          counter-increment: tabs;
          display: flex;
          width: 100%;
          height: 100%;
          position: relative;
          align-items: center;
          text-align: center;
          justify-content: center;
      }

      #tabs ul li:not(:last-child) {
          width: 35px;
          text-align: center;
          font: 400 16px 'Roboto', serif;
          color: var(--tabs-main);
          padding: 6px 0;
          transition: all .1s;
          cursor: pointer;
          line-height: 0;
          height: 100%;
      }

      #tabs ul li:not(:last-child):hover {
          background: var(--midground);
      }

      #tabs ul li:last-child {
          --flavour: var(--accent);
          width: 35px;
          height: 2px;
          background: var(--flavour);
          top: 0;
          transition: all .3s;
      }

      #tabs ul li[active]:not(:last-child) {
          font-weight: 700;
          color: var(--tabs-highlight);
          font-size: 18px;
          padding: 6px 0;
      }

      #tabs ul li[active]:nth-child(2) ~ li:last-child { margin: 0 0 0 35px; }
      #tabs ul li[active]:nth-child(3) ~ li:last-child { margin: 0 0 0 70px; }
      #tabs ul li[active]:nth-child(4) ~ li:last-child { margin: 0 0 0 105px; }
      #tabs ul li[active]:nth-child(5) ~ li:last-child { margin: 0 0 0 140px; }
      #tabs ul li[active]:nth-child(6) ~ li:last-child { margin: 0 0 0 175px; }

      #tabs ul li[active]:nth-child(2) ~ li:last-child {
          --flavour: var(--tabs-flav-two);
      }
      #tabs ul li[active]:nth-child(3) ~ li:last-child {
          --flavour: var(--tabs-flav-three);
      }
      #tabs ul li[active]:nth-child(4) ~ li:last-child {
          --flavour: var(--tabs-flav-four);
      }
      #tabs ul li[active]:nth-child(5) ~ li:last-child {
          --flavour: var(--tabs-flav-five);
      }
      #tabs ul li[active]:nth-child(6) ~ li:last-child {
          --flavour: var(--tabs-flav-six);
      }

      .widgets {
          right: 0;
          margin: auto;
          height: 32px;
          color: var(--tabs-highlight);
          font-size: 12px;
          background: var(--midground);
          border-radius: 8px;
      }

      .widgets:hover .edit {
          margin: 0;
      }

      .widget {
          position: relative;
          height: 100%;
          padding: 0 1em;
      }

      .widget:first-child {
          padding-left: 1em;
      }

      .widget:last-child {
          padding-right: 1em;
      }

      .widget:hover {
          cursor: pointer;
          background: var(--hover);
      }

      #tabs > cols {
          position: relative;
          grid-template-columns: [disp-help] 35px [tabs] auto [widgets] auto;
      }

      #tabs .time span {
          font-weight: 400;
      }

      #tabs i {
          font-size: 14pt !important;
      }

      .widget:not(:first-child)::before {
          content: '';
          position: absolute;
          display: block;
          left: 0;
          height: calc(100% - 15px);
          width: 1px;
          background: var(--hover);
      }

      .disp-help {
          border: 0;
          background: var(--midground);
          color: var(--icon-help);
          cursor: pointer;
          border-radius: 5px 15px 15px 5px;
      }

      .disp-help:hover {
          filter: brightness(1.2);
      }

      .disp-help-icon {
          font-size: 16pt;
      }
    `;
  }

  template() {
    return `
        <div id="tabs">
            <cols>
                <button class="disp-help">
                  <span class="ti ti-info-square-rounded disp-help-icon"></span>
                </button>
                <ul class="- indicator"></ul>
                <div class="+ widgets col-end">
                    <currency-compare class="+ widget"></currency-compare>
                    <weather-forecast class="+ widget weather"></weather-forecast>
                    <current-time class="+ widget"></current-time>
                </div>
            </cols>
        </div>`;
  }

  setEvents() {
    this.refs.addTab.onclick = () => this.addNewTab();

    this.refs.tabs.forEach(tab =>
      tab.onclick = ({ target }) => this.handleTabChange(target));

    document.onkeydown = (e) => this.handleKeyPress(e);

    if (CONFIG.openLastVisitedTab)
      window.onbeforeunload = () => this.saveCurrentTab();
  }

  saveCurrentTab() {
    localStorage.lastVisitedTab = this.currentTabIndex;
  }

  openLastVisitedTab() {
    if (!CONFIG.openLastVisitedTab) return;
    this.activateByKey(localStorage.lastVisitedTab);
  }

  handleTabChange(tab) {
    this.activateByKey(Number(tab.getAttribute('tab-index')));
  }

  handleKeyPress(e) {
    if (!e) return;

    const { target, key } = e;
    var evtobj = window.event ? window.event : e;

    if (evtobj.altKey && Number.isInteger(parseInt(key)) && key <= this.externalRefs.categories.length)
    {
      this.activateByKey(key - 1);
    }
  }

  activateByKey(key) {
    this.currentTabIndex = key;

    this.activate(this.refs.tabs, this.refs.tabs[key]);
    this.activate(this.externalRefs.categories, this.externalRefs.categories[key]);
  }

  setupModal() {
    this.modal
      .setTitle('Usage Tips ~')
      .setContent(`
        <p style="font-size: 14pt; font-style: italic;">Keybindings:</p>
        <li><kbd>alt</kbd> + <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd>, <kbd>4</kbd>, <kbd>5</kbd>, <kbd>6</kbd> - switch tabs</li>
        <br>
        <cols>
        <li><kbd>t</kbd> - open the note / todo panel
        <ul>
          <li><kbd>Enter</kbd> - save note / todo</li>
          <li><kbd>Tab</kbd> - go to next input field</li>
          <li><kbd>Esc</kbd> - close the note / todo panel</li>
        </ul>
        </li>
        <li style="padding-left: 20px;"><kbd>s</kbd> - open search box (Google by default)
        <ul>
          <li>Type <kbd>!g</kbd> before your query for Google</li>
          <li>Type <kbd>!d</kbd> before your query for DuckDuckGo</li>
          <li>Type <kbd>!y</kbd> before your query for YouTube</li>
          <li>Type <kbd>!w</kbd> before your query for Wikipedia</li>
        </ul>
        </li>
        </cols>
        <br>
        <p style="font-size: 14pt; font-style: italic;">Interface:</p>
        <ul>
          <li>Click the tab indicators to switch tabs.</li>
          <li>Click the clock widget to open the calendar page.</li>
          <li>Click the currency conversion widget to open finance page.</li>
          <li>Add new note / todo by clicking the plus sign on the left top of the panel.</li>
          <li>Click the priority dot on the new note / todo panel to set a priority indicator.</li>
          <li>Filter the notes / todos list by clicking the counter in the middle top of the panel.</li>
          <li>Mark notes / todos as completed by clicking the circle on their left.</li>
          <li>Change note / todo order by hovering over the circle and clicking the arrows.</li>
          <li>Clear all notes / todos by clicking the bars on the right top of the panel.</li>
        </ul>
        <br>
        <p style="font-size: 14pt; font-style: italic; padding-bottom: 8px;">Config:</p>
        <p>Further personal configuration is required by editing the <i><kbd>./userconfig.js</kbd></i> file.</p>
        <p>You can change values such as currencies, location, time format, search engines, etc.</p>
        <br>
        <p><i>See the <a href="">readme</a> for further details.</i></p>
    `);
  }

  addNewTab() {
    this.setupModal();
    this.modal.activate();
  }

  createTabs() {
    const categoriesCount = this.externalRefs.categories.length;

    for (let i = 0; i <= categoriesCount; i++)
      this.refs.indicator.innerHTML += `<li tab-index=${i} ${i == 0 ? 'active' : ''}></li>`;
  }

  activate(target, item) {
    target.forEach((i) => i.removeAttribute('active'));
    item.setAttribute('active', '');
  }

  connectedCallback() {
    this.render().then(() => {
      this.createTabs();
      this.setEvents();
      this.setAttributes();
      this.openLastVisitedTab();
    });
  }
}