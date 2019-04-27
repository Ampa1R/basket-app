import React, { Component } from 'react';

import Feed from '../../components/Feed';
import Basket from '../../components/Basket';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basket: {
        items: [],
        total: {
          RUB: 0.00,
          EUR: 0.00,
          USD: 0.00
        }
      },
      feed: {
        isLoading: true,
        items: []
      }
    };
  }
  componentDidMount() {
    this.fetchItems();
  }
  fetchItems = async () => {
    const res = await fetch('http://localhost/api');
    const items = await res.json();
    this.setState((state) => {
      return {
        basket: state.basket,
        feed: {
          isLoading: false,
          items
        }
      }
    });
  };
  handleAddToBasket = (item) => {
    this.setState((state) => {
      let modified = false;
      let basketItems = state.basket.items.map(it => {
        if(it.id === item.id && it.currency === item.currency) {
          it.quantity += item.quantity;
          modified = true;
        }
        return it;
      });
      if(!modified) basketItems.push(item);
      return {
        feed: state.feed,
        basket: {
          items: basketItems,
          total: {
            RUB: 0.00,
            EUR: 0.00,
            USD: 0.00
          }
        }
      }
    });
  };
  handleCalculate = async () => {
    const res = await fetch('http://localhost/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.basket.items)
    });
    const total = await res.json();
    this.setState(state => {
      return {
        feed: state.feed,
        basket: {
          items: state.basket.items,
          total
        }
      }
    });
  };
  render() {
    return (
      <div className="App">
        <Feed items={this.state.feed.items} isLoading={this.state.feed.isLoading} onAddToBasket={this.handleAddToBasket} />
        <Basket items={this.state.basket.items} total={this.state.basket.total} onCalculate={this.handleCalculate} />
      </div>
    )
  }
}

export default App;
