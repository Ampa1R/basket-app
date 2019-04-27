const fetch = require('node-fetch');

const getCurrency = async () => {
  const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const data = await res.json();
  return {
    "USD": data.Valute.USD.Value,
    "EUR": data.Valute.EUR.Value
  };
};

exports.get = (req, res) => {
  const data = require('./data.json');
  getCurrency()
      .then(currency => {
        const items = data.map(it => {
          if(typeof it.price === "object") return it;
          it.price = {
            RUB: (it.price).toFixed(2),
            EUR: (it.price / currency.EUR).toFixed(2),
            USD: (it.price / currency.USD).toFixed(2)
          };
          return it;
        });
        res.json(items);
      });
};

exports.calculate = (req, res) => {
  getCurrency()
      .then(currency => {
        const itemsPrice = req.body.map(it => {
          if (it.currency === "EUR")
            return it.price * currency.EUR * it.quantity;
          else if(it.currency === "USD")
            return it.price * currency.USD * it.quantity;
          else
            return it.price * it.quantity;
        });
        let totalPriceRub = 0;
        if(itemsPrice.length)
          totalPriceRub = itemsPrice.reduce((prev, next) => prev + next);
        const totalPrice = {
          "RUB": (totalPriceRub).toFixed(2),
          "USD": (totalPriceRub / currency.USD).toFixed(2),
          "EUR": (totalPriceRub / currency.EUR).toFixed(2)
        };
        res.json(totalPrice);
      });
};