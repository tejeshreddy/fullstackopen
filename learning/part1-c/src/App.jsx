import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Display from './Display';
import Button from './Button';

function App() {
  const [click, setClick] = useState({
    left: 1,
    right: 1,
  });

  const [count, setCount] = useState(0);
  const increaseByOne = () => {
    setCount(count + 1);
  };

  const decreaseByOne = () => {
    setCount(count - 1);
  };

  const handleLeft = () => {
    setClick({ ...click, left: click.left + 1 });
  };
  const handleRight = () => {
    setClick({ ...click, right: click.right + 1 });
  };

  return (
    <div>
      <button onClick={handleLeft}>left</button>
      <button onClick={handleRight}>right</button>
      {/* <Display count={count} />
      <Button onclick={increaseByOne} text="increase" />
      <Button onclick={decreaseByOne} text="decrease" /> */}

      {/* <button onClick={() => setCount(count + 1)}>Increment me</button> */}
    </div>
  );
}

export default App;
