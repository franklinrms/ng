import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Transfer from "../../components/Transfer";
import api from "../../lib/api";

export default function Account() {
  const [user, setUser] = useState({ username: "", balance: 0 });
  const [onNewTransfer, setOnNewTransfer] = useState(false);

  const navigate = useNavigate();
  const goLogin = () => navigate("/login");

  const NGtoken = localStorage.getItem("NGtoken");
  const token = JSON.parse(NGtoken || "");

  const getUser = async () => {
    try {
      const { data } = await api.get("/user", {
        headers: { authorization: token },
      });
      setUser(data);
    } catch (error) {
      goLogin();
    }
  };

  useEffect(() => {
    if (!NGtoken) {
      goLogin();
    } else {
      getUser();
    }
  });

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
        <div>{onNewTransfer && <Transfer token={token} />}</div>
        <h3>Extrato</h3>
      </div>
    </div>
  );
}
