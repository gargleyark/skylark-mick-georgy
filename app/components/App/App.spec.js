import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App.js', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render with static text', () => {
    expect(wrapper.text()).toEqual('app rendered :tada:');
  });

  it('should initialise with an empty state of shows', () => {
    expect(wrapper.state().shows).toEqual([]);
  });
});
