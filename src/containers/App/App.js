import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { loginUser, setUserLocation } from '../../actions';
import { Routes } from '../../components/Routes/Routes';
import NavBar from '../../components/NavBar/NavBar';

import { postUser } from '../../utilities/apiCalls/apiCalls';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      mapType: 'streets',
      displaySidebar: false,
      redirect: false
    };
  }

  async componentDidMount() {
    await this.setLatLngEvents();
  }

  setLatLngEvents = () => {
    navigator.geolocation.getCurrentPosition(location => {
      const { latitude, longitude } = location.coords;
      this.props.setUserLocation({ latitude, longitude });
    });
  };

  login = async res => {
    // if (!res.email) {
    //   console.log(res);
    //   return;
    // }
    const activeUser = await postUser(res.profileObj);
    this.props.loginUser(activeUser);
    this.setState({ user: activeUser, redirect: true });
  };

  logout = () => {
    this.setState({ user: null, redirect: false });
  };

  changeMap = (event, style) => {
    event.preventDefault();
    const { mapType } = this.state;
    mapType !== style
      ? this.setState({ mapType: style })
      : this.setState({ mapType: 'streets' });
  };

  displaySidebar = () => {
    this.setState({ displaySidebar: !this.state.displaySidebar });
  };

  render() {
    const { mapType, redirect, displaySidebar, user } = this.state;
    return (
      <Router>
        <div>
          {user && (
            <div>
              <div
                className={
                  mapType === 'streets'
                    ? 'toggle-map-style'
                    : 'toggle-map-style-active'
                }
              >
                <button
                  className={`${mapType}-button`}
                  onClick={event => this.changeMap(event, 'dark')}
                />
              </div>
              <i
                className={
                  !displaySidebar
                    ? `fas fa-bars ${mapType}`
                    : 'far fa-window-close'
                }
                onClick={this.displaySidebar}
              />
            </div>
          )}
          {displaySidebar && <NavBar logout={this.logout} />}
          <Routes
            redirect={redirect}
            changeMap={this.changeMap}
            displaySidebar={this.displaySidebar}
            stateSidebar={displaySidebar}
            user={user}
            mapType={mapType}
            login={this.login}
          />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  loginUser: PropTypes.func,
  setUserLocation: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
  setUserLocation: coordinates => dispatch(setUserLocation(coordinates))
});

export default connect( null, mapDispatchToProps)(App);
