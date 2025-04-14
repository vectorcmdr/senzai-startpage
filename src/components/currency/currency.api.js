class CurrencyConversionClient {

  async getCurrencies() {
    var base;
    var amount;
    var curonev;
    var curoneg;
    var curtwov;
    var curtwog;
    this.base = CONFIG.currencyconv.base;
    this.amount = CONFIG.currencyconv.baseamount;
    this.curonev = CONFIG.currencyconv.curone;
    this.curoneg = CONFIG.currencyconv.curoneglyph;
    this.curtwov = CONFIG.currencyconv.curtwo;
    this.curtwog = CONFIG.currencyconv.curtwoglyph;
    
    //Currency API debugging:
    //localStorage.setItem("storedDate", "test");
    var store = localStorage.getItem("storedDate");
    if(typeof store == 'undefined' || store == null){
      localStorage.setItem("storedDate", "placeholder");
    }
  
    var locale = window.navigator.userLanguage;
    var date = new Date().toLocaleDateString(locale);
    if(store !== date || store === "placeholder"){
      localStorage.setItem("storedDate", date);
      try {
        const response = await fetch(`https://api.fxratesapi.com/latest?base=${this.base}&amount=${this.amount}`);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log("It's a new day! Fetching currency data...")
        console.log(this.curoneg + json.rates[`${this.curonev}`]);
        console.log(this.curtwog + json.rates[`${this.curtwov}`]);
        //Currency API debugging:
        //console.log(json);
        localStorage.setItem("curOne", await this.curoneg + (Math.round(json.rates[`${this.curonev}`] * 100) / 100) + " " + this.curonev);
        localStorage.setItem("curTwo", await this.curtwog + (Math.round(json.rates[`${this.curtwov}`] * 100) / 100) + " " + this.curtwov);
      } catch (error) {
        console.error(error.message);
      }
    }
    else{
      console.log("Failed to fetch currency data due to rate-limiting (1 day).\nUsing cached data.");
    }
  }
  
}
