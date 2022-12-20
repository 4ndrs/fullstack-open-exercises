interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: Array<CoursePart> = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "http://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <>
      {courseParts.map((part, index) => (
        <div key={index} style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Part part={part} />
        </div>
      ))}
    </>
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(`Whoops, unhandled union member: ${JSON.stringify(value)}`);
  };

  let additionalContent: JSX.Element;

  switch (part.type) {
    case "normal":
      additionalContent = (
        <div>
          <em>{part.description}</em>
        </div>
      );
      break;
    case "groupProject":
      additionalContent = <div>project exercises {part.groupProjectCount}</div>;
      break;
    case "submission":
      additionalContent = (
        <div>
          <em>{part.description}</em>
          <div>submit to {part.exerciseSubmissionLink}</div>
        </div>
      );
      break;
    default:
      return assertNever(part);
  }

  return (
    <>
      <strong>
        {part.name} {part.exerciseCount}
      </strong>
      {additionalContent}
    </>
  );
};

const Total = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce(
        (totalCount, part) => totalCount + part.exerciseCount,
        0
      )}
    </p>
  );
};

export default App;
