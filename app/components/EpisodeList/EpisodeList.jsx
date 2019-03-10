import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './EpisodeList.scss';

export default class EpisodeList extends Component {
  static propTypes = {
    episodes: PropTypes.array,
    toggleHeaderImage: PropTypes.func
  };

  static defaultProps = {
    episodes: [],
    toggleHeaderImage: () => {}
  };

  render() {
    const { episodes, toggleHeaderImage } = this.props;

    return (
      <article className={styles.episodeList}>
        {episodes.map(episode => (
          <section
            key={episode.title}
            onMouseEnter={() => toggleHeaderImage(episode.image.url)}
            onMouseLeave={() => toggleHeaderImage()}
          >
            <div>
              <h3>{episode.title}</h3>
              <p>{episode.synopsis}</p>
            </div>
          </section>
        ))}
      </article>
    );
  }
}
