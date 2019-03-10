import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import Header from '../Header/Header';

jest.mock('axios');
jest.mock('../Header/Header', () => 'header');
axios.get.mockImplementation(() => Promise.resolve());

import App from './App';

describe('App.js', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
    jest.clearAllMocks();
  });

  it('should render with a div called .App containing a header', () => {
    expect(wrapper.find('div.App header').length).toBe(1);
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

  describe('getSeasonImage', () => {
    it('should call axios get with the first image url in the image_urls array', () => {
      const spy = jest.spyOn(axios, 'get');
      wrapper.state().season.image_urls = ['www.google.com/cool-dogs'];
      wrapper.instance().getSeasonImage();

      expect(spy).toHaveBeenCalledWith('www.google.com/cool-dogs');
    });
  });

  describe('updateSeasonImage', () => {
    it('should pass the image response into the season state property', () => {
      wrapper
        .instance()
        .updateSeasonImage({ url: 'www.google.com/really-cool-hat' });
      expect(wrapper.state().seasonImage).toBe(
        'www.google.com/really-cool-hat'
      );
    });
  });
});
