import React, { Component } from 'react';
import FeedItem from '../FeedItem';
import Loader from '../../components/Loader';
import './Feed.scss';

function Feed({ items, isLoading, onAddToBasket }) {
  return (
    <div className="Feed">
      {items.map(
        item => <FeedItem
            key={item.id}
            id={item.id}
            vendor={item.vendor}
            model={item.model}
            price={item.price}
            onAddToBasket={onAddToBasket}
          />
      )}
      {
        isLoading &&
        <div className="Feed__Loading">
          <Loader />
        </div>
      }
    </div>
  );
}

export default Feed;
