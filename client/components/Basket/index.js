import React, { Component } from 'react';
import BasketItem from '../BasketItem';
import './Basket.scss';

function Basket({ items, total, onCalculate }) {
  return (
      <div className="Basket">
        {
          items.map(
            item => <BasketItem
                key={item.id + item.currency}
                id={item.id}
                vendor={item.vendor}
                model={item.model}
                quantity={item.quantity}
                currency={item.currency}
                price={item.price}
            />
          )
        }
        <div className="Basket__Total">
          Всего:
          <p><strong>RUB:</strong> {total.RUB}</p>
          <p><strong>USD:</strong> {total.USD}</p>
          <p><strong>EUR:</strong> {total.EUR}</p>
        </div>
        <button className="Basket__Calculate" onClick={onCalculate}>Посчитать</button>
      </div>
  );
}

export default Basket;
