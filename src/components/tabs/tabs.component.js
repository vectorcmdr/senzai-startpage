class Links extends Component {
  constructor() {
    super();
  }

  static getIcon(link) {
    const defaultColor = '--icon-tab-default';

    return link.icon
      ? `<i class="ti ti-${link.icon} link-icon"
            style="color: ${link.icon_color ?? defaultColor}"></i>` : '';
  }

  static getAll(tabName, tabs) {
    const { categories } = tabs.find(f => f.name === tabName);

    return `
      ${ categories.map(({ name, links }) => {
        return `
          <li>
            <h1>${ name }</h1>
              <div class="links-wrapper">
              ${links.map(link =>
                `
                  <div class="link-info">
                    <a href="${ link.url }" target="_blank">
                      ${Links.getIcon(link)}
                      ${link.name ? `<p class="link-name">${link.name}</p>` : ''}
                    </a>
                </div>`).join('')
              }
            </div>
          </li>`;
      }).join('')}
    `;
  }
}

class Category extends Component {
  constructor() {
    super();
  }

  static getBannerStyle(url, move, scale) {
    if(move !== null && move !== undefined && move !== '0' && scale !== null && scale !== undefined && scale !== '0'){
      return `
        style="background: var(--midground) url(${url}) repeat left; background-size: ${scale}%; background-position: ${move}"
      `;
    }
    else if(move !== null && move !== undefined && move !== '0'){
      return `
        style="background: var(--midground) url(${url}) repeat left; background-size: cover; background-position: ${move}"
      `;
    }
    else if(scale !== null && scale !== undefined && scale !== '0'){
      return `
        style="background: var(--midground) url(${url}) repeat left; background-size: ${scale}%;"
      `;
    }
    else{
      return `
        style="background: var(--midground) url(${url}) repeat left; background-size: cover;"
      `;      
    }
  }

  static getAll(tabs) {
    return `
      ${ tabs.map(({ name, background_url, move, scale }, index) => {
          return `
            <ul class="${ name }" ${index == 0 ? 'active' : ''}>
              <div class="banner" ${Category.getBannerStyle(background_url, move, scale)}></div>
              <div class="links">
                ${Links.getAll(name, tabs)}
              </div>
            </ul>
          `;
      }).join('')}
    `;
  }
}

class Tabs extends Component {
  refs = {};

  constructor() {
    super();
    this.tabs = CONFIG.tabs;
  }

  imports() {
    return [
      this.resources.icons.material,
      this.resources.icons.tabler,
      this.resources.fonts.roboto,
      this.resources.fonts.raleway,
      this.resources.libs.css
    ];
  }

  style() {
    return `
      .banner {
          left: 0;
          width: 20%;
          height: 100%;
          padding: 2%;
          flex-wrap: wrap;
          border-radius: 8px 0px 0px 8px;
      }

      status-bar {
          width: 90%;
          height: 2em;
          top: 8px;
          z-index: 990;
          background: var(--midground);
          border-radius: 4px;
          box-shadow: 0 3px 6px var(--box-shadow);
      }

      #panels, #panels ul,
      #panels .links {
          position: absolute;
      }

      .nav {
          color: var(--tabs-nav);
      }

      #panels {
          border-radius: 10px 10px 10px 10px;
          width: 90%;
          height: 100%;
          right: 0;
          left: 0;
          top: 90px;
          bottom: 0;
          margin: auto;
          box-shadow: 0 5px 10px var(--box-shadow);
          background: none;
      }

      .categories {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;

      }

      .categories ul {
          --panelbg: transparent;
          --flavour: var(--accent);
          width: 100%;
          height: 100%;
          right: 100%;
          background: var(--midground);
          transition: all .6s;
          animation: scroll 25s ease-in-out infinite;
          border-radius: 8px;
          border-style: solid;
          border-color: var(--flavour);
          border-width: 2px;
      }

      .categories ul:nth-child(2) {
          --flavour: var(--tabs-flav-two);
      }

      .categories ul:nth-child(3) {
          --flavour: var(--tabs-flav-three);
      }

      .categories ul:nth-child(4) {
          --flavour: var(--tabs-flav-four);
      }

      .categories ul:nth-child(5) {
          --flavour: var(--tabs-flav-five);
      }

      .categories ul:nth-child(6) {
          --flavour: var(--tabs-flav-six);
      }

      .categories ul .links {
          border-radius: 0px 8px 8px 0px;
      }

      .categories ul[active] {
          right: 0;
          z-index: 1;
      }

      .categories .links {
          right: 0;
          top: 0;
          width: 80%;
          height: 100%;
          background: var(--background);
          padding: 2%;
          flex-wrap: wrap;
      }

      .categories .links li {
          list-style: none;
      }

      .categories ul .links a {
          color: var(--tabs-link);
          text-decoration: none;
          font: 700 1vw 'Roboto', sans-serif;
          transition: all .2s;
          display: inline-flex;
          align-items: center;
          padding: .4em .7em;
          background: var(--midground);
          box-shadow: 0 4px var(--box-shadow-tr), 0 5px 10px var(--box-shadow-tr);
          border-radius: 2px;
          margin-bottom: .2em;
      }

      .categories .link-info {
          display: inline-flex;
      }

      .categories .link-info a {
          border-style: solid;
          border-width: 3px;
          border-color: var(--hover);
      }

      .categories .link-info:not(:last-child) { margin-right: 0.5em; }

      .categories ul .links a:hover {
          transform: scale(1.05);
          box-shadow: 0 4px var(--box-shadow-tr), 0 5px 10px var(--hover);
          color: var(--tabs-link-hover);
      }

      .categories ul::after {
          content: attr(class);
          position: absolute;
          display: flex;
          text-transform: uppercase;
          justify-content: center;
          width: 2vw;
          height: 20vh;
          padding: 1em;
          margin: auto;
          border-radius: 5px;
          box-shadow: inset 0 0 0 3px var(--flavour);
          left: calc((100vw * 0.8 * 0.8) / 9);
          bottom: 0;
          top: 0;
          background: linear-gradient(to top, --gradient-bot / 70%, --gradient-top / 40%);
          color: var(--flavour);
          letter-spacing: 8px;
          font: 500 2vh 'Roboto', sans-serif;
          text-align: center;
          align-items: center;
          writing-mode: vertical-rl;
          text-orientation: upright;
          backdrop-filter: blur(6px);
      }

      .categories .links li:not(:last-child) {
          box-shadow: 0 1px 0 var(--hover);
          padding: 0 0 .5em 0;
          margin-bottom: 0.75em;
      }

      .categories .links li h1 {
          color: var(--text-major);
          font-size: 1.2vw;
          margin-bottom: 0.5em;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Raleway', sans-serif;
      }

      .categories .link-icon {
          font-size: 1.5vw;
          color: var(--icon-tab-default);
      }

      .categories .link-icon + .link-name {
          margin-left: 6px;
      }

      .categories .links-wrapper {
          display: flex;
          flex-wrap: wrap;
      }
    `;
  }

  template() {
    return `
      <div id="links" class="-">
      <status-bar class="!-"></status-bar>
        <div id="panels">
          <div class="categories">
            ${Category.getAll(this.tabs)}
            <search-bar></search-bar>
          </div>
          
        </div>
      </div>
    `;
  }

  async connectedCallback() {
    await this.render();
  }
}

function darkMode(e) {
  var root = document.getElementsByTagName('html')[0];
  if(e.checked){
    localStorage.setItem("senzaiStartPageLight", "true");
    root.classList.toggle('light');
    console.log(localStorage.getItem("senzaiStartPageLight"));
  }
  else{
    localStorage.setItem("senzaiStartPageLight", "false");
    root.classList.toggle('light');
    console.log(localStorage.getItem("senzaiStartPageLight"));
  }
}

function darkModeReload() {
  var root = document.getElementsByTagName('html')[0];
  var toggle = document.getElementById('chk');

  if (localStorage.getItem("senzaiStartPageLight") === null) {
    localStorage.setItem("senzaiStartPageLight", "false");
  }
  else if (localStorage.getItem("senzaiStartPageLight") === "true") {
    root.classList.toggle('light');
    toggle.checked = true;
    console.log(toggle);
  }
}

function getCopyright(){
  document.getElementById("copyright").innerHTML = `Senzai StartPage <br>by <a href="https://github.com/lottehime">@vector_cmdr</a>`;
}

window.onload = function() {
  darkModeReload();
  getCopyright();
};