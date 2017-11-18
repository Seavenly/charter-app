import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ControlButton = ({ children, onClick, isActive }) => (
  <Wrapper>
    <Button onClick={onClick} isActive={isActive}>
      {children}
    </Button>
  </Wrapper>
);

ControlButton.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

ControlButton.defaultProps = {
  isActive: false,
};

export default ControlButton;

const Wrapper = styled.div`
  flex: 0 1 20%;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.today : 'white')};
  background: ${({ isActive }) => (isActive ? 'white' : '#64b5f6')};
  padding: 0.5rem;
  display: inline-flex;
  align-items: center;
  border-radius: 0.2rem;
  box-shadow: 0 0.2rem ${({ isActive }) => (isActive ? '#ddd' : '#1e88e5')};
  transition: all 0.2s;
  position: relative;
  top: 0;
  &:hover {
    box-shadow: 0 0.4rem ${({ isActive }) => (isActive ? '#ddd' : '#1e87e5')};
    top: -0.2rem;
  }
  &:active {
    box-shadow: 0 0.2rem ${({ isActive }) => (isActive ? '#ddd' : '#1e88e5')};
    transition: all 0s;
    top: 0;
  }
`;
