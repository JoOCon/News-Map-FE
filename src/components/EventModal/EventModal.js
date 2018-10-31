import React from 'react';
import './EventModal.css';

export const EventModal = ({ targetEvent, handleFavoriteClick, handleHover, hoverMessage }) => {
  const { name, img, date, venue_name, favorite, address } = targetEvent;
  return (
    <div className="event-modal-container">
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
      <h1 className="event-name">{name}</h1>
      <h4 className="event-date">{date}</h4>
      <img
        src={`${img}`}
        alt="current event"
        height={400}
        className="event-img"
      />
      <p className="event-venue">{venue_name}</p>
      <p className="event-address">{address}</p>
    </div>
  );
};
