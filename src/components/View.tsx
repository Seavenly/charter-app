import React from 'react';

import styled from '@src/styledComponents';
import SVG, { Icon } from '@src/components/SVG';
import Button from '@src/components/Button';

interface IPassedProps {
  /** Header title for the view */
  header: string;
  /** Function to call when pressing the back button */
  back: () => void;
  /** Function to call when pressing the forward button */
  forward?: () => void;
}
type Props = IPassedProps;

const View: React.StatelessComponent<Props> = ({
  children,
  header,
  back,
  forward,
}) => (
  <Wrapper>
    <Header>
      <Button onClick={back}>
        <SVG icon={Icon.ArrowBack} fill="#ffffff" />
      </Button>
      <Heading>
        <Title>{header}</Title>
      </Heading>
      {forward && (
        <Button onClick={forward}>
          <SVG icon={Icon.ArrowForward} fill="#ffffff" />
        </Button>
      )}
    </Header>
    <Body>{children}</Body>
  </Wrapper>
);

export default View;

/**
 * =================
 * Styled Components
 * =================
 */

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
