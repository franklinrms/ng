import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";

export default function Account() {
  const [user, setUser] = useState({ username: "", balance: 0 });
  const [onNewTransfer, setOnNewTransfer] = useState(false);
  const navigate = useNavigate();
  const goLogin = () => navigate("/login");

  const getUser = async (token: string) => {
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
    const NGtoken = localStorage.getItem("NGtoken");
    if (!NGtoken) {
      goLogin();
    } else {
      const token = JSON.parse(NGtoken || "");
      getUser(token);
    }
  }, []);

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
        <div>{onNewTransfer && <h5>transferir</h5>}</div>
        <h3>Extrato</h3>
      </div>
    </div>
  );
}
