class Config {
  defaults = {
    overrideStorage: false,
    statusbar:{
      tabslang: 'cjk-decimal'
    },
    currencyconv: {
      base: 'AUD',
      baseamount: '1',
      curone: 'USD',
      curoneglyph: '$',
      curtwo: 'JPY',
      curtwoglyph: '¥',
      url: 'https://www.google.com/finance/markets/currencies'
    },
    calendar: {
      url: 'https://calendar.google.com'
    },
    temperature: {
      location: 'Belconnen, ACT',
      scale: 'C'
    },
    clock: {
      format: 'h:i p',
      iconColor: 'var(--icon-clock)'
    },
    search: {
      engines: {
        g: ['https://google.com/search?q=', 'Google'],
        y: ['https://youtube.com/results?search_query=', 'Youtube'],
      }
    },
    disabled: [],
    openLastVisitedTab: false,
    tabs: [],
    keybindings: {
      "t": 'todo-list',
      "s": 'search-bar'
    }
  };

  config;

  constructor (config) {
    this.config = config;
    this.storage = new Storage('config');

    this.autoConfig();
    this.setKeybindings();
    this.save();

    return new Proxy(this, {
      ...this,
      __proto__: this.__proto__,
      set: (target, prop, value) =>
        this.settingUpdatedCallback(target, prop, value)
    });
  }

  settingUpdatedCallback(target, prop, val) {
    if (!(prop in target)) return false;

    Reflect.set(target, prop, val);
    Object.assign(this, target);

    this.save();

    return true;
  }

  autoConfig() {
    Object.keys(this.defaults).forEach(setting => {
      if (this.canOverrideStorage(setting))
        this[setting] = this.config[setting];
      else
        if (this.storage.hasValue(setting))
          this[setting] = this.storage.get(setting);
        else
          this[setting] = this.defaults[setting];
    });
  }

  canOverrideStorage(setting) {
    return setting in this.config && (this.config.overrideStorage || setting === 'tabs');
  }

  toJSON() {
    return { ...this, defaults: undefined };
  }

  setKeybindings() {
    document.onkeypress = ({ key }) => {
      if (document.activeElement !== document.body) return;

      if (Object.keys(this.config.keybindings).includes(key))
        Actions.activate(this.config.keybindings[key]);
    };
  }

  save() {
    this.storage.save(stringify(this));
  }

  exportSettings() {
    const anchor = document.createElement('a');
    const filename = 'dawn.config.json';
    const mimeType = 'data:text/plain;charset=utf-8,';

    anchor.href = mimeType + encodeURIComponent(stringify(this, null, 2));
    anchor.download = filename;

    anchor.click();
  }
}
