import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

jest.mock('axios');
axios.get.mockImplementation(() => Promise.resolve());

import App from './App';

describe('App.js', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
    jest.clearAllMocks();
  });

  it('should render with static text', () => {
    expect(wrapper.text()).toEqual('app rendered :tada:');
  });

  it('should call getSeason when the component mounts', () => {
    const spy = jest.spyOn(wrapper.instance(), 'getSeason');

    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  describe('getSeason', () => {
    it('should call axios with the API endpoint', () => {
      const spy = jest.spyOn(axios, 'get');

      wrapper.instance().getSeason();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('updateSeason', () => {
    it('should pass a correct API response into the season state property', () => {
      wrapper.instance().updateSeason({ data: 'test', status: 200 });
      expect(wrapper.state().season).toBe('test');
    });
  });

  describe('setErrorState', () => {
    it('should set the state to error', () => {
      wrapper.instance().setErrorState();
      expect(wrapper.state().error).toBe(true);
    });
  });
});
