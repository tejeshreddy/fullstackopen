import React from 'react';

const Button = (props) => {
  return <button onClick={props.onclick}>{props.text}</button>;
};

export default Button;
