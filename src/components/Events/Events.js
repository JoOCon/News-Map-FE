import React, { Component } from 'react';
import { Marker } from 'react-mapbox-gl';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import * as apiCalls from '../../utilities/apiCalls/apiCalls';

import { EventModal } from '../EventModal/EventModal';
import { EventPopup } from '../EventPopup/EventPopup';

import './Events.css';

export class Events extends Component {
  constructor() {
    super();
    this.state = {
      targetEvent: {},
      displayPopup: false,
      displayModal: false,
      hoverMessage: ''
    };
  }

  plotEvents = () => {
    const { events } = this.props;
    return events.map((eve, index) => {
      let coordinates = [eve.lng, eve.lat];
      return (
        <Marker
          onClick={event => this.handleModalClick(event, 'open')}
          onMouseEnter={event => this.showEventInfo(event, eve)}
          onMouseLeave={this.closePopup}
          key={`event-${index}`}
          coordinates={coordinates}
          anchor="bottom"
        >
          <img
            className="event-marker"
            alt='map marker for an event'
            src="http://landon-homes.net/wp-content/uploads/2015/04/map-pin.png"
          />
        </Marker>
      );
    });
  };

  showEventInfo = (event, targetEvent) => {
    event.preventDefault();
    this.setState({ targetEvent, displayPopup: true });
  };

  closePopup = () => {
    this.setState({ displayPopup: false });
  };

  handleModalClick = (event, order) => {
    event.preventDefault();
    order === 'open'
      ? this.setState({ displayModal: true })
      : this.setState({ displayModal: false });
  };

  handleFavoriteClick = async () => {
    const { first_name, last_name, gid, email, id } = this.props.activeUser;
    const { targetEvent } = this.state;
    let userObj = {
      given_name: first_name,
      family_name: last_name,
      google_id: gid,
      email
    };
    const favoritedEvent = { ...targetEvent, favorite: !targetEvent.favorite };
    if (!targetEvent.favorite) {
      const eventObj = { ...targetEvent };
      delete eventObj.favorite;
      const response = await apiCalls.setFavorite(userObj, eventObj, id);
      console.log(response);
    } else {
    }
    this.setState({ targetEvent: favoritedEvent });
  };

  handleHover = (event, hoverMessage) => {
    event.preventDefault();
    this.setState({ hoverMessage });
  };

  render() {
    const {
      targetEvent,
      hoverMessage,
      displayPopup,
      displayModal
    } = this.state;
    const event = this.plotEvents();
    return (
      <div>
        {event}
        {displayPopup && <EventPopup targetEvent={targetEvent} />}
        <Modal
          open={displayModal}
          onClose={event => this.handleModalClick(event)}
          center
        >
          <EventModal
            handleHover={this.handleHover}
            hoverMessage={hoverMessage}
            handleFavoriteClick={this.handleFavoriteClick}
            targetEvent={targetEvent}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeUser: state.activeUser
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
