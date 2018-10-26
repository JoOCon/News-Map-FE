import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Map from '../../components/Map/Map';
import { loginUser } from '../../actions';
import NavBar from '../../components/NavBar/NavBar';
import { Routes } from '../../components/Routes/Routes';
import './App.css';

import * as keys from '../../utilities/apiCalls/apiKeys';
import { postUser } from '../../utilities/apiCalls/apiCalls';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      mapType: 'streets',
      displaySidebar: false
    };
  }

  login = async res => {
    const activeUser = await postUser(res.profileObj);
    this.props.loginUser(activeUser);
    this.setState({ user: res, redirect: true });
  };

  logout = res => {
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
    const { user, mapType, displaySidebar } = this.state;
    return (
      <Router>
        <main className="App">
          {!user && (
            <GoogleLogin
              clientId={keys.googleClientId}
              buttonText="Login w/ Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          )}
          {user && (
            <i
              class={
                !displaySidebar
                  ? `fas fa-bars ${mapType}`
                  : 'far fa-window-close'
              }
              onClick={this.displaySidebar}
            />
          )}
          {displaySidebar && <NavBar />}

          {user && (
            <div className="main-container">
              {/* <GoogleLogout
                className="logout-button"
                buttonText="Logout"
                onLogoutSuccess={this.logout}
              /> */}
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
              <Routes gid={user.googleId} mapStyle={mapType} />
            </div>
          )}
        </main>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  loginUser: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
