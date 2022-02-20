import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Ingredientes from "./constantes/ingredientes";
import "./App.css";

export default function Home() {
  const [existeItens, setExisteItens] = useState(true);
  const [inicial, setInicial] = useState(0);
  const [final, setFinal] = useState(6);
  const ingredientes = Ingredientes.REGISTROS;
  const [registros, setRegistros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (inicial !== 0 && final !== 6) {
      setInicial(inicial + 6);
      setFinal(final + 6);
    }

    let newIngredientes = ingredientes.slice(inicial, final);

    setRegistros((prevIngredientes) => [
      ...prevIngredientes,
      ...newIngredientes,
    ]);

    if (final === 24) {
      setExisteItens(false);
      return;
    }

    if (inicial === 0 && final === 6) {
      setInicial(inicial + 6);
      setFinal(final + 6);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        console.log("Elemento está visível!");
        setCurrentPage((currentPage) => currentPage + 1);
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinela"));
    return () => intersectionObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      {/* <GlobalStyle /> */}
      <h1>GitHub API: Infinite Scroller</h1>
      <h2>Página atual: {currentPage}</h2>

      <ul>
        {registros.map((registro) => (
          <li key={registro.id}>
            <div>
              {/* <img src={`https://github.com/${follower.login}.png`} /> */}
              <p>
                github.com/<strong>{registro.title}</strong>
              </p>
            </div>
          </li>
        ))}
        {existeItens && (
          <div id="sentinela">
            <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_jwhcwtc2.json"
              style={{ height: "100%", width: "200px" }}
            ></Player>
          </div>
        )}
      </ul>
    </main>
  );
}
