import React, { useEffect, useState } from "react";
import api from "../../lib/api";

export default function Transfer({ token }: { token: string }) {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [deniedTransfer, setDeniedTransfer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessfulTransfer, setIsSuccessfulTransfer] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const balance = 3;

  const onSubmitTransfer = async () => {
    setIsLoading(true);
    try {
      await api.post(
        "/transfer",
        { username, amount },
        { headers: { authorization: token } }
      );
      setIsLoading(false);
      setDeniedTransfer(false);
      setIsSuccessfulTransfer(true);
    } catch (error) {
      setDeniedTransfer(true);
    }
  };

  const enableButton = () => {
    if (amount > balance || isLoading) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    enableButton();
  }, [amount]);

  return (
    <div>
      <h3>Transferir</h3>
      <div>
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
              Enviar
            </button>
          </form>
        )}
      </div>
      {amount > balance && <span>Saldo insuficiente</span>}
      {deniedTransfer && <p>usuário não encontrado</p>}
    </div>
  );
}
