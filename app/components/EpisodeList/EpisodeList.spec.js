import React from 'react';
import { shallow } from 'enzyme';

import EpisodeList from './EpisodeList';

const mockEpisodes = [
  {
    title: 'cooking with jeff',
    synopsis: 'jeff cooks',
    image: { url: 'hi.png' }
  },
  {
    title: 'cooking with jeff again',
    synopsis: 'jeff cooks again',
    image: { url: 'bye.svg' }
  }
];

describe('EpisodeList.js', () => {
  it('should render a article containing an section for each item in the episodes prop', () => {
    const wrapper = shallow(<EpisodeList episodes={mockEpisodes} />);
    expect(wrapper.find('article section').length).toBe(mockEpisodes.length);
  });

  it('should call toggleHeaderImage on mouse entering an episode', () => {
    const mockToggleHeaderImage = jest.fn();

    const wrapper = shallow(
      <EpisodeList
        episodes={mockEpisodes}
        toggleHeaderImage={mockToggleHeaderImage}
      />
    );

    wrapper
      .find('section')
      .at(1)
      .simulate('mouseleave');

    expect(mockToggleHeaderImage).toBeCalledWith();

    wrapper
      .find('section')
      .at(1)
      .simulate('mouseenter');

    expect(mockToggleHeaderImage).toBeCalledWith('bye.svg');
  });
});
