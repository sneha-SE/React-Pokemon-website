import React, { useEffect, useState } from "react";
import "./index.css";
import PokemonCard from "./PokemonCard";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=1300";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //   setApiData(data);
      console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponse = await Promise.all(detailedPokemonData);
      console.log(detailedResponse);
      setPokemon(detailedResponse);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  //search

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => (
              <PokemonCard key={curPokemon.id} pokemonData={curPokemon} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Pokemon;
