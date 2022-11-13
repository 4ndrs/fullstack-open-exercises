import { useState, useEffect } from "react";
import phonebook from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebook.fetch().then((data) => setPersons(data));
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPersonObject = { name: newName, number: newNumber };

    phonebook.add(newPersonObject).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter {...{ filter, setFilter }} />

      <h3>Add a new</h3>
      <PersonForm
        {...{ newName, newNumber, setNewName, setNewNumber, handleAdd }}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name:
        <input
          value={props.newName}
          onChange={(event) => props.setNewName(event.target.value)}
        />
      </div>
      <div>
        number:
        <input
          value={props.newNumber}
          onChange={(event) => props.setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={props.handleAdd}>
          add
        </button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </>
  );
};

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

export default App;
