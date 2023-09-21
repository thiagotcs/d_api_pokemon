import { useEffect, useState } from "react";
import axios from "axios";

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
 * você pode acessar as informaçoes de cada Podémon individualmente em:
 * https://pokeapi.co/api/v2/pokemon/:id
 *
 * DICA:
 * imagem => sprintes.front_default
 * experiência => base_experience
 *
 * EXTRA:
 * se puder ordene por nome
 */

// ! 2 resolução do desafio
function App() {
  const [list, setList] = useState([]);

  const fetchApiData = () => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then(res => {
      const sortedArray = [...res.data.results];

      sortedArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      const promisesArray = sortedArray.map(item => axios.get(item.url));

      Promise.all(promisesArray).then(value => setList(value));
    });
  };

  useEffect(() => {
    fetchApiData();
  }, []);
  return (
    <>
      <h3>Desafio Thiago</h3>
      <h1>Consumir api Pokémon</h1>
      <hr />
      {list.length === 0
        ? "carregando Pokémon..."
        : list.map(item => (
            <Pokemon key={item.data.name} details={item.data} />
          ))}
    </>
  );
}

const Pokemon = ({ details }) => {
  return (
    <div
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
          src={details.sprites.front_default}
          alt={details.name}
          style={{ width: 50, marginLeft: 20 }}
        />
      </span>
      <span>
        <b>{details.name}</b> - EXP {details.base_experience}
      </span>
    </div>
  );
};

export default App;
