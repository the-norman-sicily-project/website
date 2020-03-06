import React from 'react';
import { connect } from 'react-redux';
import InteractiveMapContainer from '../containers/interactive_map';
import { initMap } from '../actions';
import './app.css';

const App = () => <InteractiveMapContainer />;

const mapDispatchToProps = dispatch => {
  return {
    initMap: () => {
      dispatch(initMap());
    },
  };
};

export default connect(mapDispatchToProps)(App);
