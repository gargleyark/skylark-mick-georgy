import React, { Component } from 'react';

import styles from './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <div className={styles.App}>app rendered :tada:</div>;
  }
}
