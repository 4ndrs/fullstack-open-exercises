const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },

      {
        name: "Using props to pass data",
        exercises: 7,
      },

      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  const parts = course.parts.map((part, index) => (
    <Part key={index} name={part.name} exercises={part.exercises} />
  ));

  return <div>{parts}</div>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ course }) => {
  const sumTotal = course.parts.reduce(
    (prev, curr) => prev + curr.exercises,
    0
  );

  return <p>Number of exercises {sumTotal}</p>;
};

export default App;
