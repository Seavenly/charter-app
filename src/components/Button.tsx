import React from 'react';

import styled, { withProps } from '@src/styledComponents';

interface IPassedProps {
  /** Is the button currently active or not */
  isActive?: boolean;
  /** Action to perfom when the user clicks the button */
  onClick?: () => void;
}
type Props = IPassedProps;

const ControlButton: React.StatelessComponent<Props> = ({
  children,
  onClick = () => null,
  isActive = false,
}) => (
  <Wrapper>
    <Button onClick={onClick} isActive={isActive}>
      {children}
    </Button>
  </Wrapper>
);

export default ControlButton;

/**
 * =================
 * Styled Components
 * =================
 */

interface IButtonProps {
  isActive?: IPassedProps['isActive'];
}
const Styled = {
  Button: withProps<IButtonProps>()(styled.button),
};

const Wrapper = styled.div`
  flex: 0 1 20%;
`;

const Button = Styled.Button`
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
