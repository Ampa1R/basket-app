import React, { useState } from 'react';
import './FeedItem.scss';

function FeedItem({ id, vendor, model, price, onAddToBasket }) {
  const [currency, setCurrency] = useState('RUB');
  const [quantity, setQuantity] = useState(1);
  const addToBasket = () => {
    const item = {
      id,
      vendor,
      model,
      quantity,
      price: price[currency],
      currency
    };
    onAddToBasket(item);

  };
  return (
    <div className="FeedItem">
      <div className="FeedItem__Model">
        {vendor} <strong>{model}</strong>
      </div>
      <div className="FeedItem__Price">
        {price[currency]}
      </div>
      <div className="FeedItem__Currency">
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option>RUB</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>
      <div className="FeedItem__Quantity">
        <button onClick={() => (quantity <= 1) ? setQuantity(1) : setQuantity(quantity - 1)}>-</button>
        {quantity}
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <button onClick={addToBasket} className="FeedItem__Button">Добавить</button>
    </div>
  );
}

export default FeedItem;
