import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import * as keys from '../../data/secretKeys';
export class App extends Component {
  responseGoogle = res => {
    console.log(res);
    //googleid, familyname, givenName, email
  };

  logout = res => {
    console.log(res);
  };

  render() {
    return (
      <div className="App">
        <button>
          <GoogleLogin
            clientId={keys.googleClientId}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
          <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
        </button>
        <header className="App-header">
          <h1>Hello World</h1>
        </header>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
