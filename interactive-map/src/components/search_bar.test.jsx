import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './search_bar';

it('renders without crashing', () => {
  shallow(<SearchBar />);
});

it('renders a geo search control', () => {
  const wrapper = shallow(<SearchBar />);
  expect(wrapper.find('GeoSearchControl')).toBeDefined();
});
