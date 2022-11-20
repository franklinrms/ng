import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "./style";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="inner">
        <h1>A CARTEIRA DA NOVA GERAÇÃO.</h1>
        <h2>É para todas as idades!</h2>

        <div>
          <button
            type="button"
            className="registration"
            onClick={() => navigate("/registration")}
          >
            Abra sua conta
          </button>
          <button type="button" onClick={() => navigate("/login")}>
            Acessar
          </button>
        </div>
      </div>
    </Container>
  );
}
