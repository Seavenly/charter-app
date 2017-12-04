import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import dateFns from 'date-fns';

import styled from '@src/styledComponents';

interface IPassedProps {
  date: Date;
  status: string;
}
type Props = IPassedProps;

const Day: React.StatelessComponent<Props> = ({ date, status }) => (
  <Wrapper>
    <DayLink
      to={`/trips/${dateFns.format(date, 'YYYY-MM-DD')}`}
      status={status}
    >
      <DayDate>{dateFns.format(date, 'DD')}</DayDate>
    </DayLink>
  </Wrapper>
);

export default Day;

/**
 * =================
 * Styled Components
 * =================
 */

interface IDayLinkProps extends LinkProps {
  status: string;
}

const Wrapper = styled.div`
  &::after {
    content: '';
    display: flex;
    padding-bottom: 100%;
  }
`;
const DayLink = styled(Link as React.ComponentClass<IDayLinkProps>)`
  color: ${({ theme, status }) => {
    switch (status) {
      case 'today':
      case 'open':
      case 'partial':
      case 'full':
        return 'white';
      case 'inactive':
        return '#ccc';
      default:
        return theme.colors.black;
    }
  }};
  background: ${({ theme, status }) => {
    switch (status) {
      case 'today':
        return theme.colors.today;
      case 'open':
        return theme.colors.open;
      case 'partial':
        return theme.colors.partial;
      case 'full':
        return theme.colors.full;
      case 'empty':
        return theme.colors.empty;
      default:
        return 'none';
    }
  }};
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  position: absolute;
  top: 5%;
  left: 5%;
  right: 5%;
  bottom: 5%;
  overflow: hidden;
`;
const DayDate = styled.span`
  position: relative;
  z-index: 1;
`;
