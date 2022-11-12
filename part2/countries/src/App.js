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

const Country = (props) => {
  const [showDetails, setShowDetails] = useState(props.showDetails);
  const country = props.country;
  const name = country.name.common;

  // Re-render if we are already in the view, and then the subsequent item left
  useEffect(() => setShowDetails(props.showDetails), [props.showDetails]);

  if (!showDetails) {
    return (
      <div>
        {name} <button onClick={() => setShowDetails(true)}>Show</button>
      </div>
    );
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

      <Weather capital={capital} />
    </div>
  );
};

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?" +
          `q=${capital}&APPID=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
      });
  }, [capital]);

  if (!weatherData) {
    return;
  }

  const temperature = weatherData.main.temp;
  const wind = weatherData.wind.speed;
  const icon = weatherData.weather[0]?.icon;
  const description = weatherData.weather[0]?.description;
  const imgSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <>
      <h1>Weather in {capital}</h1>
      <div>temperature {temperature} Celcius</div>
      <img alt={description} src={imgSrc} />
      <div>wind {wind} m/s</div>
    </>
  );
};

export default App;
