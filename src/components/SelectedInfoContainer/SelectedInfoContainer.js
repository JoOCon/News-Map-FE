import React from 'react';
import PropTypes from 'prop-types';
import './SelectedInfoContainer.css';

export const SelectedInfoContainer = ({ removeEvent, item, getWeather }) => {
  return (
    <div className="selected-container">
      <p className="selected selected-date">{item.date}</p>
      <p className="selected selected-distance">{item.distance}m</p>
      <p className="selected selected-date">{item.address}</p>
      <p className="selected selected-date">{item.venue_name}</p>
      <a href={item.url}>Event Info</a>
      <button className="get-weather" onClick={e => getWeather(e, item)}>
        Get Weather
      </button>
      <button
        className="selected selected-date"
        onClick={e => removeEvent(e, item)}
      >
        Remove from Watchlist
      </button>
    </div>
  );
};

SelectedInfoContainer.propTypes = {
  displayInfo: PropTypes.object
};
