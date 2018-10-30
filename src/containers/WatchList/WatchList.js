import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { WatchListCard } from '../../components/WatchListCard/WatchListCard';
import { SelectedInfoContainer } from '../../components/SelectedInfoContainer/SelectedInfoContainer';
import * as call from '../../utilities/apiCalls/apiCalls';
import './WatchList.css';

export class WatchList extends Component {
  constructor() {
    super();
    this.state = {
      userWatchList: [],
      displayInfo: {},
      currentItem: null
    };
  }

  componentDidMount() {
    this.getUserWatchlist();
  }

  getUserWatchlist = async () => {
    const userWatchList = await call.getUserWatchlist(this.props.activeUser.id);
    this.setState({ userWatchList });
  };

  handleSelection = (event, selectedItem) => {
    event.preventDefault();
    const { currentItem } = this.state;
    if (currentItem !== selectedItem.id) {
      this.setState({
        displayInfo: selectedItem,
        currentItem: selectedItem.id
      });
    } else {
      this.setState({ currentItem: null });
    }
  };

  getWeather = async (event, selectedItem) => {
    event.preventDefault();
    const response = await call.getEventWeather(
      selectedItem.lat,
      selectedItem.lng,
      selectedItem.unix
    );
    console.log(response);
  };

  removeEvent = async (e, event) => {
    e.preventDefault();
    const { userWatchList } = this.state;
    await call.removeFromWatchlist(this.props.activeUser.id, event.id);
    const userList = userWatchList.filter(item => item.e_id !== event.e_id);
    this.setState({ userWatchList: userList, currentItem: null });
  };

  render() {
    const { displayInfo, userWatchList, currentItem } = this.state;
    const displayFavorites = userWatchList.map(item => (
      <WatchListCard
        handleSelection={this.handleSelection}
        key={item.e_id}
        item={item}
      />
    ));
    return (
      <div className="watch-list">
        <div className="favorites-list">{displayFavorites}</div>
        {currentItem && (
          <SelectedInfoContainer
            getWeather={this.getWeather}
            removeEvent={this.removeEvent}
            item={displayInfo}
          />
        )}
      </div>
    );
  }
}

WatchList.propTypes = {
  activeUser: PropTypes.object
};

export const mapStateToProps = state => ({
  activeUser: state.activeUser,
  watchlist: state.watchlist
});

export default connect(mapStateToProps)(WatchList);
