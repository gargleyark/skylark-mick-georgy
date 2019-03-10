import React, { Component } from 'react';
import axios from 'axios';

import config from '../../config/config.json';
import Header from '../Header/Header';

import styles from './App.scss';

export default class App extends Component {
  state = {
    season: {},
    seasonImage: '',
    error: false,
    loading: true
  };

  componentDidMount() {
    this.getSeason();
  }

  getSeason = () => {
    axios
      .get(config.apiURL)
      .then(this.updateSeason)
      .catch(this.setErrorState);
  };

  setErrorState = () => {
    this.setState({ error: true, loading: false });
  };

  updateSeason = season => {
    if (!season || !season.data || season.status !== 200) {
      this.setErrorState();
    } else {
      this.setState({ season: season.data, loading: false });
    }
  };

  getSeasonImage = () => {
    const { image_urls } = this.state.season;

    axios
      .get(image_urls[0])
      .then(this.updateSeasonImage)
      .catch(this.setErrorState);
  };

  updateSeasonImage = data => {
    if (data && data.url) {
      this.setState({ seasonImage: data.url });
    }
  };

  render() {
    const { loading, season, error } = this.state;

    return (
      <div className={styles.App}>
        <Header loading={loading} season={season} error={error} />
        {/* TODO put image component here*/}
        {/* TODO put episode list here*/}
      </div>
    );
  }
}
