import React from 'react';
import { shallow } from 'enzyme';

jest.mock('axios');
axios.get.mockImplementation(() => Promise.resolve());

import EpisodeList from './EpisodeList';

describe('EpisodeList.js', () => {
  it('should render a section containing an article for each item in the episodes prop', () => {
    const mockEpisodes = [
      { title: 'cooking with jeff', synopsis: 'jeff cooks' },
      { title: 'cooking with jeff again', synopsis: 'jeff cooks again' }
    ];
    const wrapper = shallow(<EpisodeList episodes={mockEpisodes} />);
    expect(wrapper.find('section article').length).toBe(mockEpisodes.length);
  });
});
