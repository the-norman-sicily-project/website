/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import InteractiveMap from './interactive_map';

const testProps = { loading: false };

it('renders without crashing', () => {
  shallow(<InteractiveMap {...testProps} />);
});

it('renders a map', () => {
  const wrapper = shallow(<InteractiveMap {...testProps} />);
  expect(wrapper.find('Map')).toBeDefined();
});

it('renders a tile layer', () => {
  const wrapper = shallow(<InteractiveMap {...testProps} />);
  expect(wrapper.find('TileLayer')).toBeDefined();
});

it('renders a search bar', () => {
  const wrapper = shallow(<InteractiveMap {...testProps} />);
  expect(wrapper.find('SearchBar')).toBeDefined();
});

it('renders a marker cluster group', () => {
  const wrapper = shallow(<InteractiveMap {...testProps} />);
  expect(wrapper.find('MarkerClusterGroup')).toBeDefined();
});
