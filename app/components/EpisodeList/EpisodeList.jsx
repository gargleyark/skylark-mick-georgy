import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './SeasonImage.scss';

export default class SeasonImage extends Component {
  static propTypes = {
    episodes: PropTypes.array
  };

  static defaultProps = {
    episodes: []
  };

  render() {
    const { episodes } = this.props;

    return <section />;
  }
}
