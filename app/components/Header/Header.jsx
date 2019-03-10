import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Header.scss';

export default class Header extends Component {
  static propTypes = {
    season: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
  };

  getMessage = () => {
    const { season, loading, error } = this.props;

    if (loading) {
      return (
        <p>
          fetching your favourite tv shows...<span className={styles.loading} />
        </p>
      );
    }

    if (season.items && season.items.length) {
      return (
        <a className={styles.button} onClick={this.viewEpisodes}>
          View season
        </a>
      );
    }

    return <p>Sorry, we couldn't find that season!</p>;
  };

  viewEpisodes = () => {
    window.scrollTo({
      top: 800,
      left: 0,
      behavior: 'smooth'
    });
  };

  render() {
    const { season } = this.props;

    return (
      <article id="header">
        <header className={`${styles.header}`}>
          <h1>{season.title || 'Skylark'}</h1>
          {this.getMessage()}
        </header>
      </article>
    );
  }
}
