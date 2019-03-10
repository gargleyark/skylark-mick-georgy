import React from 'react';
import { shallow } from 'enzyme';

import EpisodeList from './EpisodeList';

describe('EpisodeList.js', () => {
  it('should render a article containing an section for each item in the episodes prop', () => {
    const mockEpisodes = [
      { title: 'cooking with jeff', synopsis: 'jeff cooks' },
      { title: 'cooking with jeff again', synopsis: 'jeff cooks again' }
    ];
    const wrapper = shallow(<EpisodeList episodes={mockEpisodes} />);
    expect(wrapper.find('article section').length).toBe(mockEpisodes.length);
  });
});
