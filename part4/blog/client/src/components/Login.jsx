import React from 'react';

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

export default Login;
