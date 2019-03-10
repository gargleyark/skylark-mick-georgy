import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';

jest.mock('axios');

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

    it('should set the state with the axios response', () => {
      axios.get.mockImplementation(() => Promise.resolve('test'));

      wrapper.instance().getSeason();
      expect(wrapper.state().season).toEqual('test');
    });

    it('should set the state to error when the API fails', () => {
      axios.get.mockImplementation(() => Promise.reject());

      wrapper.instance().getSeason();
      expect(wrapper.state().error).toEqual(true);
    });
  });
});
