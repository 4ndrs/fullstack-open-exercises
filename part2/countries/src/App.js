import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const filteredCountries = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  return (
    <>
      <Filter {...{ filter, setFilter }} />
      <Countries countries={filteredCountries} />
    </>
  );
};

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      find countries
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  const showDetails = countries.length === 1;

  return (
    <>
      {countries.map((country) => (
        <Country
          key={country.name.common}
          country={country}
          showDetails={showDetails}
        />
      ))}
    </>
  );
};

const Country = ({ country, showDetails }) => {
  const name = country.name.common;

  if (!showDetails) {
    return <div>{name}</div>;
  }

  const languages = [];
  for (const lang in country.languages) {
    languages.push(<li key={lang}>{country.languages[lang]}</li>);
  }

  const capital = country.capital.join(", ");
  const area = country.area;
  const flagSrc = country.flags.png;

  return (
    <div>
      <h1>{name}</h1>
      <div>capital {capital}</div>
      <div>area {area}</div>

      <h3>languages:</h3>
      <ul>{languages}</ul>

      <img alt={`Flag of ${name}`} src={flagSrc} />
    </div>
  );
};

export default App;
