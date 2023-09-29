/*
 *
 * consuma a API e liste todos os Pokémon da consulta do seguinte endpoint.
 * https://pokeapi.co/api/v2/pokemon
 *
 * você deve exibir, de cada Pokémon:
 * - imagem
 * - nome
 * - experiência
 *
 * você pode acessar as informações de cada Pokémon individualmente em:
 * https://pokeapi.co/api/v2/pokemon/:id
 *
 * DICA:
 * imagem => sprintes.front_default
 * experiência => base_experience
 *
 * EXTRA:
 * se puder ordene por nome
 */

// ! 3 resolução do desafio IA
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");

      const sortedArray = [...response.data.results];

      sortedArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      const promisesArray = sortedArray.map(item => axios.get(item.url));

      const pokemonDetails = await Promise.all(promisesArray);

      setPokemonList(pokemonDetails);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPokemonData();
  }, []);
  return (
    <>
      <h3>Desafio Thiago</h3>
      <h1>Consumir api Pokémon</h1>
      <hr />
      {loading
        ? "carregando Pokémon..."
        : pokemonList.map(pokemon => {
            return (
              <div
                key={pokemon.data.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                  justifyContent: "space-Between",
                  margin: "0 auto",
                }}
              >
                <span>
                  <img
                    src={pokemon.data.sprites.front_default}
                    alt={pokemon.data.name}
                    style={{ width: 50, marginLeft: 20 }}
                  />
                </span>
                <span>
                  <b>{pokemon.data.name}</b> - EXP{" "}
                  {pokemon.data.base_experience}
                </span>
              </div>
            );
          })}
    </>
  );
}

export default App;
