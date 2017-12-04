import React from 'react';

import styled, { withProps, keyframes } from '@src/styledComponents';
import SVG, { Icon } from '@src/components/SVG';

interface IPassedProps {
  /** Is the spinner currenty visible */
  isVisible: boolean;
}
type Props = IPassedProps;

const Spinner: React.StatelessComponent<Props> = ({ isVisible }) => (
  <Wrapper isVisible={isVisible}>
    <SVG icon={Icon.Autorenew} size={48} />
  </Wrapper>
);

export default Spinner;

/**
 * =================
 * Styled Components
 * =================
 */

type WrapperProps = { isVisible: boolean } & React.HTMLProps<HTMLDivElement>;

const Styled = {
  Wrapper: withProps<WrapperProps>()(styled.div),
};

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Wrapper = Styled.Wrapper`
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
