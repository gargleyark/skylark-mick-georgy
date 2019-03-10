import React, { Component } from 'react';
import axios from 'axios';

import config from '../../config/config.json';

import styles from './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    season: {},
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

  render() {
    return <div className={styles.App}>app rendered :tada:</div>;
  }
}
