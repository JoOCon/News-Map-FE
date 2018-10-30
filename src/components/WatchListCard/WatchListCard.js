import React from 'react';
import PropTypes from 'prop-types';
import './WatchListCard.css';

export const WatchListCard = ({ handleSelection, item }) => {
  return (
    <div
      className="watch-list-card-container"
      onClick={event => handleSelection(event, item)}
    >
      <h1 className="watch-list-card">{item.name}</h1>
      <img
        className="img-card"
        alt="shows who is playing the event"
        src={item.img}
      />
    </div>
  );
};

WatchListCard.propTypes = {
  item: PropTypes.object,
  handleSelection: PropTypes.func
};
