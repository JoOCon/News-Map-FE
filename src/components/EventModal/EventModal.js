import React from 'react';

import './EventModal.css';

export const EventModal = ({
  targetEvent,
  handleFavoriteClick,
  handleHover,
  hoverMessage
}) => {
  const { name, img, date, venue_name, favorite, address } = targetEvent;
  return (
    <div>
      {!favorite ? (
        <i
          className="fas fa-eye"
          onClick={handleFavoriteClick}
          onMouseEnter={e => handleHover(e, 'Add to Watch-list')}
          onMouseLeave={e => handleHover(e, '')}
        >
          <span className="hover-msg">{hoverMessage}</span>
        </i>
      ) : (
        <i
          className="far fa-eye"
          onClick={handleFavoriteClick}
          onMouseEnter={e => handleHover(e, 'Remove from Watch-list')}
          onMouseLeave={e => handleHover(e, '')}
        >
          <span className="hover-msg">{hoverMessage}</span>
        </i>
      )}
      <h1>Event: {name}</h1>
      <h4>Date: {date}</h4>
      <img src={`${img}`} alt='current event' height={400} />
      <p>Location: {venue_name}</p>
      <p>Address: {address}</p>
    </div>
  );
};
