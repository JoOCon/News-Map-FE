import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl from 'react-mapbox-gl';
import { Event } from '../Event/Event';

import { getEvents } from '../../utilities/apiCalls/apiCalls';
import { mbAccessToken as TOKEN } from '../../utilities/apiCalls/apiKeys';

export class Map extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      events: []
    };
  }

  componentDidMount() {
    this.setLatLngEvents();
  }

  setLatLngEvents = async () => {
    await navigator.geolocation.getCurrentPosition(async location => {
      const { latitude, longitude } = location.coords;
      const events = await getEvents(latitude, longitude);
      await this.setState({
        latitude,
        longitude,
        events
      });
    });
  };

  showEventInfo = (event, name) => {
    event.preventDefault();
    console.log(name);
  };

  render() {
    const Map = ReactMapboxGl({
      accessToken: TOKEN
    });
    const { latitude, longitude, events } = this.state;
    return (
      <Map
        center={[longitude, latitude]}
        zoom={[13]}
        style={`mapbox://styles/mapbox/${this.props.mapStyle}-v9`}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      >
        <Event showEventInfo={this.showEventInfo} events={events} />
      </Map>
    );
  }
}

const mapDispatchToProps = () => ({});

export default connect(
  null,
  mapDispatchToProps
)(Map);
