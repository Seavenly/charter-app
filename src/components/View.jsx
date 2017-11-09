import React from 'react';
import PropTypes from 'prop-types';

const View = ({ children, header, back, forward }) => (
  <div className="view">
    <div className="view__header">
      <div className="control">
        <button className="control__btn" onClick={back}>
          <i className="material-icons">arrow_back</i>
        </button>
      </div>
      <div className="view__heading">
        <h2>{header}</h2>
      </div>
      {forward && (
        <div className="control">
          <button className="control__btn" onClick={forward}>
            <i className="material-icons">arrow_forward</i>
          </button>
        </div>
      )}
    </div>
    <div className="view__body">{children}</div>
  </div>
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
