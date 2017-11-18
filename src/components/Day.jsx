import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Day = ({ moment, status, setDay }) => (
  <Wrapper>
    <DayLink
      to={`/trips/${moment.format('YYYYMMDD')}`}
      onClick={() => setDay(moment)}
      status={status}
    >
      <DayDate>{moment.format('DD')}</DayDate>
    </DayLink>
  </Wrapper>
);

Day.propTypes = {
  moment: PropTypes.instanceOf(Moment).isRequired,
  status: PropTypes.string,
  setDay: PropTypes.func.isRequired,
};

Day.defaultProps = {
  status: '',
};

const mapStateToProps = () => ({});

const mapPropstoDispatch = dispatch => ({
  setDay: moment => dispatch({ type: 'SET_DAY', moment }),
});

export default connect(mapStateToProps, mapPropstoDispatch)(Day);

const Wrapper = styled.div`
  &::after {
    content: '';
    display: flex;
    padding-bottom: 100%;
  }
`;
const DayLink = styled(Link)`
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
