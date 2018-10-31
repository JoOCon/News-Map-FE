import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Profile from '../Profile/Profile';
import WatchList from '../../containers/WatchList/WatchList';

import { LoginDisplay } from '../LoginDisplay/LoginDisplay';
import { HomeDisplay } from '../HomeDisplay/HomeDisplay';

export const Routes = ({ user, mapType, login, redirect }) => {
  return (
    <div className="App">
      {!window.location.href.includes('home') &&
        redirect === true &&
        user.id && <Redirect to={`/home/${user.id}`} />}
      {window.location.href.includes('home') &&
        redirect === false && <Redirect to={`/`} />}
      <Route
        exact
        path={'/'}
        render={() => {
          return <LoginDisplay login={login} />;
        }}
      />
      {user && (
        <nav>
          <Route
            exact
            path={`/home/${user.id}`}
            render={() => {
              return <HomeDisplay mapType={mapType} />;
            }}
          />
          <Route
            exact
            path={`/home/${user.id}/watchlist`}
            render={() => {
              return <WatchList />;
            }}
          />
          <Route path={`/home/${user.id}/profile`} component={Profile} />
        </nav>
      )}
    </div>
  );
};
