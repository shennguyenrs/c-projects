import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// useEffect and useState to change the state of the notification
// in 5 seconds
const Notification = ({ newNoti }) => {
  const [noti, setNoti] = useState(newNoti);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(true);
    setNoti(newNoti);

    const interval = setInterval(() => {
      setHidden(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [newNoti]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return <>{hidden && <div style={style}>{noti}</div>}</>;
};

const mapStateToProps = (state) => {
  return { newNoti: state.notification };
};

export default connect(mapStateToProps)(Notification);

// PropTypes validation
Notification.propTypes = {
  newNoti: PropTypes.string,
};
