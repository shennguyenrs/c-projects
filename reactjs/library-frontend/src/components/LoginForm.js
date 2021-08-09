import React from 'react';
import PropTypes from 'prop-types';

import useField from '../hooks/useField';

const LoginForm = ({ show }) => {
  if (!show) return null;

  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    resetUsername();
    resetPassword();
  };

  return (
    <>
      <h2>login form</h2>
      username: <input {...username} /> <br />
      password: <input {...password} /> <br />
      <input value="login" type="button" onClick={handleSubmit} />
    </>
  );
};

export default LoginForm;

// PropsTypes validation
LoginForm.propTypes = {
  show: PropTypes.bool,
};
