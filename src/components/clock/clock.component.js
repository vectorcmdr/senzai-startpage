class Clock extends Component {
  refs = {
    clock: '.clock-time',
    icon: '.clock-icon'
  };

  constructor() {
    super();
  }

  imports() {
    return [
      this.resources.icons.material,
      this.resources.fonts.roboto
    ];
  }

  style() {
    return `
        .clock-time {
            white-space: nowrap;
            font: 300 12pt 'Roboto', sans-serif;
            font-weight: bold;
            color: var(--bar-txt-major);
            letter-spacing: .5px;
        }

        .clock-icon {
            color: var(--icon-clock);
            font-size: 12pt;
            margin-right: 10px;
        }

        .date-widget {
            white-space: nowrap;
            font: 200 12pt 'Roboto', sans-serif;
            font-weight: bold;
            color: var(--bar-txt-minor);
            letter-spacing: .5px;
            padding-left: .5em;
      }
    `;
  }

  template() {
    var calurl;
    this.calurl = CONFIG.calendar.url;
    var locale = window.navigator.userLanguage;
    var datestr = new Date().toLocaleDateString(locale, {hourCycle: "h23"});
    datestr = datestr.substring(0, datestr.length - 5);
    return `
          <span class="material-icons clock-icon">schedule</span>
          <span class="clock-time" onclick="window.open('${this.calurl}')"></span>
          <span class="date-widget" onclick="window.open('${this.calurl}')">${datestr}</span>
    `;
  }

  setIconColor() {
    this.refs.icon.style.color = CONFIG.clock.iconColor;
  }

  setTime() {
    const date = new Date();
    this.refs.clock = date.strftime(CONFIG.clock.format);
  }

  connectedCallback() {
    this.render().then(() => {
      this.setTime();
      this.setIconColor();

      setInterval(() => this.setTime(), 1000);
    });
  }
}
