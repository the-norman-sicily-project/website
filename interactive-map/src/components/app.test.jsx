import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import App from './app';

const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

it('renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

it('renders the interactive map', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(wrapper.find('InteractiveMap')).toBeDefined();
});
