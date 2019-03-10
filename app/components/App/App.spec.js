import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import config from '../../config/config.json';
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
      wrapper.instance().updateSeason({ data: 'test' });
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
      wrapper.state().season = { image_urls: ['www.google.com/cool-dogs'] };
      wrapper.instance().getSeasonImage();

      expect(spy).toHaveBeenCalledWith(
        `${config.apiURL}www.google.com/cool-dogs`
      );
    });
  });

  describe('updateSeasonImage', () => {
    it('should pass the image response into the season state property', () => {
      wrapper
        .instance()
        .updateSeasonImage({ data: { url: 'www.google.com/really-cool-hat' } });
      expect(wrapper.state().seasonImage).toBe(
        'www.google.com/really-cool-hat'
      );
    });
  });

  describe('getSeasonEpisodes', () => {
    it('should call axios get with the season items', () => {
      const spy = jest.spyOn(axios, 'get');
      wrapper.state().season.items = [
        'www.google.com/cool-dogs',
        'www.bing.com/nice-sunsets'
      ];
      wrapper.instance().getSeasonEpisodes();

      expect(spy).toHaveBeenCalledWith(
        `${config.apiURL}www.google.com/cool-dogs`
      );
    });
  });

  describe('updateSeasonEpisodes', () => {
    it('should pass the Episodes response into the season state property', () => {
      wrapper
        .instance()
        .updateSeasonEpisodes(['www.google.com/really-cool-hat']);
      expect(wrapper.state().seasonEpisodes).toEqual([
        'www.google.com/really-cool-hat'
      ]);
    });
  });

  describe('toggleView', () => {
    it('should allow a user to toggle between overview and episode view', () => {
      wrapper.instance().toggleView('episode');
      expect(wrapper.state().viewType).toBe('episode');

      wrapper.instance().toggleView('overview');
      expect(wrapper.state().viewType).toBe('overview');

      wrapper.instance().toggleView();
      expect(wrapper.state().viewType).toBe('overview');
    });
  });
});
