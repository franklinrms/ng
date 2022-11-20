import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiTransferAlt } from "react-icons/bi";
import Extract from "../../components/Extract";
import Transfer from "../../components/Transfer";
import UserContext from "../../context/UserContext";
import * as S from "./style";

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
    <S.Container>
      <S.Header>
        <h2>Logo</h2>
        <div>
          <p>{`Olá,  ${user.username}`}</p>
          <button type="button" onClick={logout}>
            Sair
          </button>
        </div>
      </S.Header>
      <S.Wrapper>
        <div className="balance">
          <p>Saldo disponível</p>
          <p className="value">{`R$ ${user.balance
            .toFixed(2)
            .replace(".", ",")}`}</p>
        </div>
        <button type="button" onClick={() => setOnNewTransfer(!onNewTransfer)}>
          <BiTransferAlt size={28} />
          <span>Transferir </span>
        </button>
      </S.Wrapper>
      <div>
        <div>{onNewTransfer && <Transfer />}</div>
        <Extract />
      </div>
    </S.Container>
  );
}
