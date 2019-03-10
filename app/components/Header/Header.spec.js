import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a loading view when loading is true', () => {
    const wrapper = shallow(
      <Header loading={true} season={{}} error={false} />
    );
    expect(wrapper.find('h1').text()).toEqual('Skylark');
    expect(wrapper.find('p').text()).toEqual(
      'fetching your favourite tv shows...'
    );
  });

  it('should render a season name and view button when passed a season', () => {
    const wrapper = shallow(
      <Header
        loading={false}
        season={{ title: 'Cooking with Jeff', items: ['episode uno'] }}
        error={false}
      />
    );
    expect(wrapper.find('h1').text()).toEqual('Cooking with Jeff');
    expect(wrapper.find('a').text()).toEqual('View season');
  });

  it('should render an error message when there is an error', () => {
    const wrapper = shallow(
      <Header loading={false} season={{}} error={true} />
    );
    expect(wrapper.find('h1').text()).toEqual('Skylark');
    expect(wrapper.find('p').text()).toEqual(
      "Sorry, we couldn't find that season!"
    );
  });

  describe('viewEpisodes', () => {
    it('should scroll to show the episodes', () => {
      const mockScroll = jest.fn();
      global.scrollTo = mockScroll;

      const wrapper = shallow(
        <Header
          loading={false}
          season={{ title: 'Cooking with Jeff', items: ['episode uno'] }}
          error={false}
        />
      );

      wrapper.instance().viewEpisodes();

      expect(mockScroll).toBeCalledWith({
        top: 800,
        left: 0,
        behavior: 'smooth'
      });
    });
  });
});
