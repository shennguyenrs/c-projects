import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ errMes }) => {
  if (!errMes) return null;

  return <div style={{ color: 'red' }}>{errMes}</div>;
};

export default Notification;

// PropTypes validation
Notification.propTypes = {
  errMes: PropTypes.string,
};
