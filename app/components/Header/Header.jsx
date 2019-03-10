import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import config from '../../config/config.json';

import styles from './Header.scss';

export default class App extends Component {
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
      return <a className={styles.button}>View season</a>;
    }

    return <p>Sorry, we couldn't find that season!</p>;
  };

  render() {
    const { season } = this.props;

    return (
      <section id="header">
        <header className={`${styles.header}`}>
          <h1>{season.title || 'Skylark'}</h1>
          {this.getMessage()}
        </header>
      </section>
    );
  }
}
