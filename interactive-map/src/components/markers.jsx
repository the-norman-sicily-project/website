import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import _ from 'lodash';
import Icons from '../icons';
import Icon from './icon';
import { placeTypeLookup, orderLookup } from '../utils';
import SitePopup from './site_popup';

const markerIcon = feature => {
  const setProps = {
    ...Icons.defaultProps,
    ...placeTypeLookup(feature.properties.place_type),
    ...orderLookup(feature.properties.order),
  };
  return L.divIcon({
    html: ReactDOMServer.renderToString(
      <Icon
        icon={setProps.icon}
        color={setProps.color}
        translate={setProps.translate}
        scale={setProps.scale}
        size={setProps.size}
      />
    ),
  });
};

const handleMarkerClick = async marker => {
  const feature = _.get(marker, 'layer.options.data');
  if (feature) {
    ReactDOM.render(
      <SitePopup feature={feature} />,
      document.getElementById('feature-popup')
    );
  }
};

const Markers = ({ sites }) => {
  const markersMarkup = sites.map(feature => {
    const coordinates = _.get(feature, 'geometry.coordinates');
    if (coordinates) {
      const { english_place_name, italian_place_name } = feature.properties;
      return (
        <Marker
          key={feature.id}
          position={coordinates.reverse()} // argh!
          icon={markerIcon(feature)}
          data={feature} // this.ends up in marker.layer.options.data
        >
          <Popup minWidth="662" maxWidth="662" className="leaflet_popup">
            <div id="feature-popup" />
          </Popup>
          <Tooltip>
            {/* eslint-disable camelcase */}
            <div className="popup-container">
              <div className="popup-content">
                {`${italian_place_name} (${english_place_name})`}
              </div>
            </div>
            {/* eslint-enable camelcase */}
          </Tooltip>
        </Marker>
      );
    }
    return null;
  });

  return (
    <MarkerClusterGroup onClick={marker => handleMarkerClick(marker)}>
      {markersMarkup}
    </MarkerClusterGroup>
  );
};

Markers.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Markers;
