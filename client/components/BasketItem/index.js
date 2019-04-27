import React from 'react';
import './BasketItem.scss';

function BasketItem({ model, vendor, price, currency, quantity }) {

  return (
      <div className="BasketItem">
        <div className="BasketItem__Name">
          {model} <strong>{vendor}</strong> x{quantity}
        </div>
        <div className="BasketItem__Price">
          <strong>{price}</strong> {currency} за 1 шт.
        </div>

      </div>
  );
}

export default BasketItem;
