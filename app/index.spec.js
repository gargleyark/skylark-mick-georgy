import ReactDOM from 'react-dom';
import React from 'react';

jest.mock('react-dom', () => ({ render: jest.fn() }));
global.document.getElementById = jest.fn();

import index from './index.js';
import App from './components/App/App';

describe('Ost Front-end Code Test', () => {
  describe('Index', () => {
    it('renders without crashing', () => {
      expect(ReactDOM.render).toHaveBeenCalledWith(<App />, null);
    });
  });
});
