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

  it('should initialise with an empty state of shows and in loading state', () => {
    expect(wrapper.state().shows).toEqual([]);
    expect(wrapper.state().loading).toEqual(true);
  });

  it('should call getSeason when the component mounts', () => {});

  describe('getSeason', () => {
    it('should call axios with the API endpoint', () => {});
  });
});
