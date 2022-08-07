import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Header from "./header";

const Pokeinfo = () => {

  let { pokeId } = useParams();

  const [currentPokemon, setCurrentPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
      setCurrentPokemon(data);
    }
    fetchPokemon()
  }, []);

  const [evolutions, setEvolutions] = useState([]);

  function getEvolutions(chain, evolutions = []) {
    const name = chain.species.name;
    const id = Number(chain.species.url.split('/').reverse()[1]);

    evolutions.push({ name, id });

    if (chain.evolves_to.length === 0)
        return evolutions;
    else
        return getEvolutions(chain.evolves_to[0], evolutions)
}

  useEffect(() => {
    async function fetchData() {
      const species = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokeId}`
      );
      const urlChain = species.data.evolution_chain.url;

      const evolution = await axios.get(urlChain);
      setEvolutions(getEvolutions(evolution.data.chain));
    }
    fetchData();
  }, []);

  return (
    <>
      <header>
          <Header />
      </header>
      {!currentPokemon ? (
        ""
      ) : (

        
        <div className="container-pokeinfo">
          <div className="poke-evo">
            <h1>{currentPokemon.name}</h1>
            <div className="evolution">
            <div style={{ display: "flex" }}>
            {evolutions.map((evo) => (
              <div key={evo.name}>
                <p>{evo.name}</p>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`}
                  alt=""
                />
              </div>
            ))}
          </div>
            </div>
            <p className="evolution-text"> Liste des évolutions</p>
          </div>

          <div className="type">
            {currentPokemon.types.map((poke) => {
              return (
                <div className="group" key={poke.type.name}>
                    <h3>{poke.type.name}</h3>
                  </div>
              );
            })}
          </div>
          <div className="base-stat">
            {currentPokemon.stats.map((poke) => {
              return (
                  <h3 key={poke.stat.name}>
                    {poke.stat.name} : {poke.base_stat}
                  </h3>
              );
            })}
          </div>
          <div className="abilities">
            {currentPokemon.abilities.map((poke) => {
              return (
                  <div className="group" key={poke.ability.name}>
                    <h2>{poke.ability.name}</h2>
                  </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};


export default Pokeinfo;