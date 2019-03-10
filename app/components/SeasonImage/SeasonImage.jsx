import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SeasonImage.scss';

export default class SeasonImage extends Component {
  static propTypes = {
    image: PropTypes.string
  };

  static defaultProps = {
    image: ''
  };

  render() {
    const { image } = this.props;

    return (
      <section
        className={`${styles.seasonImage}`}
        style={{ backgroundImage: `url(${image})` }}
      />
    );
  }
}
