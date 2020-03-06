import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ color, icon, size, translate, scale }) => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: color,
      stroke: '#fff',
      strokeWidth: '25',
    },
  };

  return (
    <svg
      style={styles.svg}
      width={`${size}px`}
      height={`${size}px`}
      transform={`translate(${translate}) scale(${scale})`}
      viewBox="0 0 1024 1024"
    >
      <g style={styles.path}>
        <path d={icon} />
      </g>
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  translate: PropTypes.string,
  scale: PropTypes.string,
};

Icon.defaultProps = {
  color: '#000000',
  scale: '',
  translate: '',
  size: 55,
};

export default Icon;
