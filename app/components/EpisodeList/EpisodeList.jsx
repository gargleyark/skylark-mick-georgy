import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './EpisodeList.scss';

export default class EpisodeList extends Component {
  static propTypes = {
    episodes: PropTypes.array
  };

  static defaultProps = {
    episodes: []
  };

  render() {
    const { episodes } = this.props;

    return (
      <article className={styles.episodeList}>
        {episodes.map(episode => (
          <section key={episode.title}>
            <h3>{episode.title}</h3>
            <p>{episode.synopsis}</p>
          </section>
        ))}
      </article>
    );
  }
}
