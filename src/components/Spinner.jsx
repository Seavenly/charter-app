import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const Spinner = ({ isVisible }) => (
  <Wrapper isVisible={isVisible}>
    <i className="material-icons">autorenew</i>
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
  i {
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-name: ${rotate360};
    animation-iteration-count: ${({ isVisible }) =>
      isVisible ? 'infinite' : 1};
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.today};
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transition: opacity 0.3s;
  }
`;
