import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <Header text="statistics" />
      <Statistics {...{ good, neutral, bad }} />
    </div>
  );
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button {...{ onClick }}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  const getTotal = () => good + neutral + bad;
  const getAverage = () => (good - bad) / getTotal();
  const getGoodPercent = () => (good * 100) / getTotal();

  if (!good && !neutral && !bad) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={getTotal()} />
          <StatisticLine text="average" value={getAverage()} />
          <StatisticLine text="positive" value={getGoodPercent() + " %"} />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;
