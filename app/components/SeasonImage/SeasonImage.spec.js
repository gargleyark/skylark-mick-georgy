import React from 'react';
import { shallow } from 'enzyme';

import SeasonImage from './SeasonImage';

describe('SeasonImage.js', () => {
  it('should render a section with a the season image as the background', () => {
    const wrapper = shallow(<SeasonImage image={'jeff.png'} />);
    expect(wrapper.find('section').html()).toContain(
      'background-image:url(jeff.png)'
    );
  });
});
