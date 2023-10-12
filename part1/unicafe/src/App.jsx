import { useState } from 'react';
import './App.css';

const StatisticLine = (props) => {
  const { text, value } = props;
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  return good + neutral + bad === 0 ? (
    <div>No feedback given</div>
  ) : (
    <table>
      <tbody>
        <tr>
          <td>statistics</td>
        </tr>

        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + bad + neutral} />
        <StatisticLine
          text="average"
          value={(good * 1 + neutral * 0 + bad * -1) / (good + bad + neutral)}
        />
        <StatisticLine text="positive" value={good / (good + bad + neutral)} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
