import React from 'react';
import PropTypes from 'prop-types';

const SVG = ({ fill, kind, size }) => {
  switch (kind) {
    case 'arrow_back':
      return (
        <svg
          fill={fill}
          height={size}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      );
    case 'arrow_forward':
      return (
        <svg
          fill={fill}
          height={size}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        </svg>
      );
    case 'autorenew':
      return (
        <svg
          fill={fill}
          height={size}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      );
    case 'email':
      return (
        <svg
          fill={fill}
          height={size}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      );
    case 'person':
      return (
        <svg
          fill={fill}
          height={size}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      );
    default:
      return null;
  }
};

SVG.propTypes = {
  fill: PropTypes.string,
  kind: PropTypes.string.isRequired,
  size: PropTypes.number,
};

SVG.defaultProps = {
  fill: '#2d2d2d',
  size: 24,
};

export default SVG;
