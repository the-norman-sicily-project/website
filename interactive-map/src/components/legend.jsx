import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'react-leaflet';
import { getListOfOrders, orderLookup } from '../utils';

const Legend = ({ sites, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }
  const orderList = getListOfOrders(sites);
  const orderListMarkup = orderList.map(order => (
    <li key={order}>
      <span
        className="color-block"
        style={{ background: Object.values(orderLookup(order)).toString() }}
      />
      <span className="label-text">{order}</span>
    </li>
  ));
  return (
    <Pane>
      <div className="map-legend">
        <div className="legend-title">
          Norman Sicily&#39;s Monastic Landscape
        </div>
        <div className="legend-scale">
          <ul className="legend-labels">{orderListMarkup}</ul>
        </div>
      </div>
    </Pane>
  );
};

Legend.propTypes = {
  loading: PropTypes.bool.isRequired,
  sites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Legend;
