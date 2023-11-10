import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <span>Username:</span>
          <input
            type="text"
            name="Username"
            value={props.username}
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          <span>Password:</span>
          <input
            type="password"
            name="Password"
            value={props.password}
            onChange={props.handlePasswordChange}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
};

export default Login;
