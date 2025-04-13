class Currency extends Component {
  refs = {
  };

  constructor() {
    super();

    this.setDependencies();
  }

  setDependencies() {
    this.currencyCheck = new CurrencyConversionClient();
  }

  imports() {
    return [
      this.resources.icons.material,
      this.resources.fonts.roboto
    ];
  }

  style() {
    return `
      .currency-widget-icon {
            color: var(--icon-currency);
            font-size: 12pt;
            margin-right: 10px;
      }

      .currency-widget {
            white-space: nowrap;
            font: 300 12pt 'Roboto', sans-serif;
            font-weight: bold;
            color: var(--text-major);
            letter-spacing: .5px;
      }
    `;
  }

  template() {
    this.currencyCheck.getCurrencies();
    const curone = localStorage.getItem("curOne");
    const curtwo = localStorage.getItem("curTwo");
    var cururl;
    this.cururl = CONFIG.currencyconv.url;
    return `
        <span class="material-icons currency-widget-icon">currency_exchange</span>
        <p class="currency-widget" onclick="window.open('${this.cururl}')">${curone}</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <p class="currency-widget" onclick="window.open('${this.cururl}')">${curtwo}</p>
    `;
  }

  async connectedCallback() {
    await this.render();
  }
}