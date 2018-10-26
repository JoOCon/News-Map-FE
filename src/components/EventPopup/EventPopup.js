import React from 'react';
import { Popup } from 'react-mapbox-gl';
import './EventPopup.css';

export const EventPopup = ({ targetEvent }) => {
  const { name, img, lat, lng } = targetEvent;
  const coords = [lng, lat];
  return (
    <Popup
      coordinates={coords}
      offset={{
        'bottom-left': [12, -38],
        bottom: [0, -38],
        'bottom-right': [-12, -38]
      }}
    >
      <h1>Event: {name}</h1>
      <img src={`${img}`} alt='container displaying event info' height={200} />
    </Popup>
  );
};
