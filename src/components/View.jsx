import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SVG from './SVG';
import Button from './Button';

const View = ({ children, header, back, forward }) => (
  <Wrapper>
    <Header>
      <Button onClick={back}>
        <SVG kind="arrow_back" fill="#ffffff" />
      </Button>
      <Heading>
        <Title>{header}</Title>
      </Heading>
      {forward && (
        <Button onClick={forward}>
          <SVG kind="arrow_forward" fill="#ffffff" />
        </Button>
      )}
    </Header>
    <Body>{children}</Body>
  </Wrapper>
);

View.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string.isRequired,
  back: PropTypes.func.isRequired,
  forward: PropTypes.func,
};

View.defaultProps = {
  forward: null,
};

export default View;

const Wrapper = styled.div`
  text-align: center;
  border-radius: 0.2rem;
  overflow: hidden;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.today};
  padding: 0.6rem 0;
  color: white;
  box-shadow: 0 0.2rem rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 5;
  position: fixed;
  width: 100%;
  max-width: 30rem;
  border-radius: 0.2rem 0.2rem 0 0;
`;
const Heading = styled.div`
  flex: 0 3 60%;
`;
const Title = styled.h2`
  font-weight: 400;
  text-transform: uppercase;
  font-size: 1.2rem;
  white-space: nowrap;
`;
export const Body = styled.div`
  margin-top: 4.8rem;
`;
