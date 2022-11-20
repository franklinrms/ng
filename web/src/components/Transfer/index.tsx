import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import api from "../../lib/api";
import Loading from "../Loading";
import * as S from "./style";

export default function Transfer() {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [deniedTransfer, setDeniedTransfer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessfulTransfer, setIsSuccessfulTransfer] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { user, getUser, token } = useContext(UserContext);

  const onSubmitTransfer = async () => {
    setIsLoading(true);
    try {
      await api.post(
        "/transfer",
        { username, amount },
        { headers: { authorization: token } }
      );
      setDeniedTransfer(false);
      await getUser();
      setIsSuccessfulTransfer(true);
    } catch (error) {
      setDeniedTransfer(true);
    }
    setIsLoading(false);
  };

  const enableButton = () => {
    if (amount > user.balance || isLoading) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    enableButton();
  }, [amount, isLoading]);

  return (
    <S.Container>
      <h3>Transferir</h3>
      <S.WrapperTransfer>
        {isSuccessfulTransfer ? (
          <p>Transferência realizada com sucesso!</p>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmitTransfer();
            }}
          >
            <input
              type="text"
              placeholder="usuário"
              minLength={3}
              required
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              type="number"
              placeholder="0,00"
              required
              min="1"
              step="0.01"
              onChange={({ target }) => setAmount(Number(target.value))}
            />
            <button disabled={isButtonDisabled} type="submit">
              {isButtonDisabled ? <Loading /> : "Enviar"}
            </button>
          </form>
        )}
      </S.WrapperTransfer>
      {amount > user.balance && <span>Saldo insuficiente</span>}
      {deniedTransfer && <span>Usuário não encontrado</span>}
    </S.Container>
  );
}
