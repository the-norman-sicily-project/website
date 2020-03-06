import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer } from 'react-leaflet';
import MarkersContainer from '../containers/markers';
import SearchBarContainer from '../containers/search_bar';
import LegendContainer from '../containers/legend';
import config from '../config';
import apikeys from '../apikeys';

const InteractiveMap = ({ loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Map
        center={config.centerPoint}
        zoom={config.initialZoom}
        maxZoom={config.maxZoom}
      >
        <TileLayer
          url={config.tileURL + apikeys.MAPBOX_ACCESS_TOKEN}
          attribution={config.mapAttribution}
        />
        <MarkersContainer />
        <SearchBarContainer />
        <LegendContainer />
      </Map>
    </div>
  );
};

InteractiveMap.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default InteractiveMap;
