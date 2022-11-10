import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseValue = (type) => {
    switch (type) {
      case "good": {
        setGood(good + 1);
        return;
      }

      case "neutral": {
        setNeutral(neutral + 1);
        return;
      }

      case "bad": {
        setBad(bad + 1);
        return;
      }

      default: {
        throw Error(`No such type: ${type}`);
      }
    }
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={() => increaseValue("good")} text="good" />
      <Button onClick={() => increaseValue("neutral")} text="neutral" />
      <Button onClick={() => increaseValue("bad")} text="bad" />

      <Header text="statistics" />
      <Feedback {...{ good, neutral, bad }} />
    </div>
  );
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button {...{ onClick }}>{text}</button>;
};

const Feedback = ({ good, neutral, bad }) => {
  const getTotal = () => good + neutral + bad;
  const getAverage = () => (good - bad) / getTotal() || 0;
  const getGoodPercent = () => (good * 100) / getTotal() || 0;

  return (
    <div>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {getTotal()}</div>
      <div>average {getAverage()}</div>
      <div>positive {getGoodPercent()} %</div>
    </div>
  );
};

export default App;
