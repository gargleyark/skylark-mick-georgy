import React, { Component } from 'react';
import axios from 'axios';

import config from '../../config/config.json';
import Header from '../Header/Header';
import SeasonImage from '../SeasonImage/SeasonImage';
import EpisodeList from '../EpisodeList/EpisodeList';

import styles from './App.scss';
import { EOPNOTSUPP } from 'constants';

export default class App extends Component {
  state = {
    season: {},
    seasonImage: '',
    seasonEpisodes: [],
    error: false,
    loading: true,
    viewType: 'overview'
  };

  componentDidMount() {
    this.getSeason();
  }

  getSeason = () => {
    axios
      .get(
        `${config.apiURL}/api/seasons/seas_e85496eb48df4225b9d9f3fde1010398/`
      )
      .then(this.updateSeason)
      .catch(this.setErrorState);
  };

  setErrorState = () => {
    this.setState({ error: true, loading: false });
  };

  updateSeason = season => {
    if (season && season.data) {
      this.setState({ season: season.data, loading: false }, () => {
        this.getSeasonImage();
        this.getSeasonEpisodes();
      });
    } else {
      this.setErrorState();
    }
  };

  getSeasonImage = () => {
    const { image_urls } = this.state.season;

    if (image_urls) {
      axios
        .get(`${config.apiURL}${image_urls[0]}`)
        .then(this.updateSeasonImage)
        .catch(this.setErrorState);
    }
  };

  updateSeasonImage = response => {
    if (response && response.data && response.data.url) {
      this.setState({ seasonImage: response.data.url });
    }
  };

  getSeasonEpisodes = async () => {
    const { items } = this.state.season;

    const episodeResponses = await Promise.all(
      items.map(item => axios.get(`${config.apiURL}${item}`))
    );

    const seasonEpisodes = episodeResponses
      .filter(response => response.status === 200)
      .map(response => response.data);

    this.updateSeasonEpisodes(seasonEpisodes);
  };

  updateSeasonEpisodes = seasonEpisodes => {
    if (seasonEpisodes.length) {
      this.setState({ seasonEpisodes });
    }
  };

  toggleView = (viewType = 'overview', selectedEpisode) =>
    this.setState({
      viewType,
      selectedEpisode: (viewType === 'episode' && selectedEpisode) || undefined
    });

  render() {
    const { loading, season, error, seasonImage, seasonEpisodes } = this.state;

    return (
      <div className={styles.App}>
        <Header loading={loading} season={season} error={error} />
        {(seasonImage && <SeasonImage image={seasonImage} />) || ''}
        {seasonEpisodes.length && <EpisodeList episodes={EpisodeList} />}
      </div>
    );
  }
}
