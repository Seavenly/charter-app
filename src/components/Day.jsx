import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Day = ({ moment, status, setDay }) => (
  <div className={`cell day ${status}`}>
    <Link to={`/trips/${moment.format('YYYYMMDD')}`} onClick={() => setDay(moment)}>
      <span>{moment.format('DD')}</span>
    </Link>
  </div>
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
