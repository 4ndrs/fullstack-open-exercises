const App = () => {
  const course = "Half Stack application development";

  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };

  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };

  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total list={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  const items = parts.map((part, index) => (
    <Part key={index} name={part.name} exercises={part.exercises} />
  ));

  return <div>{items}</div>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ list }) => {
  const sumTotal = list.reduce((prev, curr) => prev + curr);

  return <p>Number of exercises {sumTotal}</p>;
};

export default App;
