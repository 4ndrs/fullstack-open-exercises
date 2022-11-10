const Course = ({ course }) => {
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

  return (
    <p>
      <strong>total of {sumTotal} exercises</strong>
    </p>
  );
};

export default Course;
