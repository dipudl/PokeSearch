import './App.css';
import Form from '../components/Form';
import Card from '../components/Card';
import { useEffect, useState } from 'react';

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const ERROR_MESSAGE = "An error occured. Please try again!";

function App() {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [details, setDetails] = useState({});
  const [cardReplacementText, setCardReplacementText] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    pokemonCount();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [count]);

  useEffect(() => {
    if(!initialLoad)
      searchPokemon();
  }, [pokemonList]);

  const onSearchChange = (event) => {
    setQuery(event.target.value);
  }

  const pokemonCount = () => {
    fetch(BASE_URL)
    .then(response => {
      if(!response.ok)
        throw new Error("An error occurred!");
      return response.json();
    })
    .then(result => {
      setCount(result.count);
    })
    .catch(error => {
      if(!initialLoad) {
        setCardReplacementText(ERROR_MESSAGE);
      }
      setInitialLoad(false);
    });
  }

  const fetchPokemons = () => {
    fetch(`${BASE_URL}/?offset=0&limit=${count}`)
    .then(response => {
      if(!response.ok)
        throw new Error("An error occurred while fetching!");
      return response.json();
    })
    .then(result => {
      setPokemonList(result.results);
    })
    .catch(error => {
      if(!initialLoad) {
        setCardReplacementText(ERROR_MESSAGE);
      }
    })
    .finally(() => {
      setInitialLoad(false);
    });
  }

  const loadDetails = (url) => {
    fetch(url)
    .then(response => {
      if(!response.ok)
        throw new Error("An error occurred while loading details!");
      return response.json();
    })
    .then(result => {
      const details = {
        name: result.name,
        image: result.sprites.front_default,
        height: result.height,
        weight: result.weight,
        order: result.order,
        base_experience: result.base_experience
      }

      setDetails(details);
    })
    .catch(error => {
      setCardReplacementText(ERROR_MESSAGE);
    });
  }
 
  const searchPokemon = () => {
    if(!query) return;
    setCardReplacementText("Searching...");
    setDetails({});

    if(count === 0) {
      pokemonCount();
      return;
    } else if(pokemonList.length === 0) {
      fetchPokemons();
      return;
    }

    for (const i in pokemonList) {
      if(query.toLowerCase() === pokemonList[i].name) {
        loadDetails(pokemonList[i].url);
        return;
      }
    }

    setCardReplacementText("Oops! No pokemon found.");
  }

  return (
    <div className="tc f3">
      <h1>Poke Search</h1>
      <Form query={query} searchChange={onSearchChange} search={searchPokemon}/>
      {details.name? <Card details={details} />: <h3 className="f3">{cardReplacementText}</h3>}
    </div>
  );
}

export default App;
