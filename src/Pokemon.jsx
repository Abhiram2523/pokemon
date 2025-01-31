import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=150";
  
  const fetchPokemon = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
           const detailedPokemonData = data.results.map((curPokemon) => {
              return fetch(curPokemon.url)
                .then((res) => res.json())
                })
                return Promise.all(detailedPokemonData)
            })
        .then((detailedResponses) => {
                console.log(detailedResponses);
                setPokemon(detailedResponses);
                setLoading(false);
              })
        .catch((error) => {
                console.log(error);
                setLoading(false);
                setError(error);
              });
  };

  useEffect(() => {
    fetchPokemon();
  }, []);


  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1> Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            
            {searchData.map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};