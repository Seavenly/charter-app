import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import SVG from './SVG';

const Spinner = ({ isVisible }) => (
  <Wrapper isVisible={isVisible}>
    <SVG kind="autorenew" size="48" />
  </Wrapper>
);

Spinner.propTypes = {
  isVisible: PropTypes.bool,
};
Spinner.defaultProps = {
  isVisible: true,
};

export default Spinner;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const Wrapper = styled.div`
  position: absolute;
  top: 8rem;
  left: 50%;
  z-index: 0;
  transform: translatex(-50%);
  svg {
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-name: ${rotate360};
    animation-iteration-count: ${({ isVisible }) =>
      isVisible ? 'infinite' : 1};
    fill: ${({ theme }) => theme.colors.today};
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transition: opacity 0.3s;
  }
`;
