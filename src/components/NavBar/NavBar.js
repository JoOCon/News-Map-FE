import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import './NavBar.css';

export class NavBar extends Component {
  render() {
    const { id, first_name } = this.props.activeUser;
    return (
      <nav className="nav-container">
        <h1 className="greeting">{`Hello, ${first_name}`}</h1>
        <NavLink className="nav-link" exact to={`/home/${id}`}>
          Home
        </NavLink>
        <NavLink className="nav-link" to={`/home/${id}/profile`}>
          Profile
        </NavLink>
        <NavLink className="nav-link" to={`/home/${id}/watchlist`}>
          Watchlist
        </NavLink>
        <GoogleLogout
          className="nav-link"
          buttonText="Logout"
          onLogoutSuccess={this.props.logout}
        />
      </nav>
    );
  }
}

export const mapStateToProps = state => ({
  activeUser: state.activeUser
});

NavBar.propTypes = {
  activeUser: PropTypes.object
};

export default connect(mapStateToProps)(NavBar);
