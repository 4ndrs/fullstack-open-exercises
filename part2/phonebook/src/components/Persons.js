const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
          <Person key={person.name} person={person} />
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

const Person = ({ person }) => {
  return (
    <>
      {person.name} {person.number}
    </>
  );
};

export default Persons;
