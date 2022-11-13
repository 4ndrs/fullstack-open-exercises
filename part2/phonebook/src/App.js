import { useState, useEffect } from "react";

import phonebook from "./services/phonebook";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [notificationError, setNotificationError] = useState("");

  useEffect(() => {
    setTimeout(() => setNotificationText(""), 4000);
  }, [notificationText]);

  useEffect(() => {
    setTimeout(() => setNotificationError(""), 4000);
  }, [notificationError]);

  useEffect(() => {
    phonebook.fetch().then((data) => setPersons(data));
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();

    const person = persons.find((person) => person.name === newName);
    if (person) {
      const message =
        `${person.name} is already added to phonebook, replace ` +
        "the old number with a new one?";
      if (window.confirm(message)) {
        phonebook
          .update(person.id, { ...person, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (person.id !== p.id ? p : returnedPerson))
            );
            setNotificationText(`Updated ${returnedPerson.name}`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotificationError(
              `Information of ${person.name} has already been removed from ` +
                "server"
            );
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }

      return;
    }

    const newPersonObject = { name: newName, number: newNumber };

    phonebook.add(newPersonObject).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNotificationText(`Added ${newPerson.name}`);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      phonebook
        .remove(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)));
    }
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationText} />
      <Notification message={notificationError} error={true} />

      <Filter {...{ filter, setFilter }} />

      <h3>Add a new</h3>
      <PersonForm
        {...{ newName, newNumber, setNewName, setNewNumber, handleAdd }}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
