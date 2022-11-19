import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Extract from "../../components/Extract";
import Transfer from "../../components/Transfer";
import UserContext from "../../context/UserContext";

export default function Account() {
  const [onNewTransfer, setOnNewTransfer] = useState(false);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const goLogin = () => navigate("/login");

  const logout = () => {
    localStorage.clear();
    goLogin();
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <h1>Logo</h1>
        <p>{`Olá, ${user.username}`}</p>
        <button type="button" onClick={logout}>
          Sair
        </button>
      </header>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div>
          <p>Saldo disponível</p>
          <p>{`R$ ${user.balance.toFixed(2).replace(".", ",")}`}</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setOnNewTransfer(!onNewTransfer)}
          >
            Transferir
          </button>
        </div>
      </div>
      <div>
        <div>{onNewTransfer && <Transfer />}</div>
        <h3>Extrato</h3>
        <Extract />
      </div>
    </div>
  );
}
