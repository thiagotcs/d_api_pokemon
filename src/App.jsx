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

// ! 1 resolução do desafio
function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then(res => {
      const sortedArray = [...res.data.results];

      sortedArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      setList(sortedArray);
    });
  }, []);

  return (
    <>
      <h3>Desafio Thiago</h3>
      <h1>Consumir api Pokémon</h1>
      <hr />
      {list.map(item => (
        <Pokemon key={item.name} data={item} />
      ))}
    </>
  );
}

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(data.url).then(res => setDetails(res.data));
  }, []);

  if (!details) {
    return <div>-</div>;
  }

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
