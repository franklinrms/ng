import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInputsForm from "../../components/UserInputsForm";
import api from "../../lib/api";
import * as S from "./style";

export default function Registration() {
  const [deniedUser, setDeniedUser] = useState(false);
  const navigate = useNavigate();
  const createUser = async (username: string, password: string) => {
    try {
      const { data } = await api.post("/register", { username, password });
      const token = JSON.stringify(data);
      localStorage.setItem("NGtoken", token);
      navigate("/account");
    } catch (error) {
      setDeniedUser(true);
    }
  };
  return (
    <S.Container>
      <div className="inner">
        <h2>Abra agora sua Conta Digital</h2>
        <UserInputsForm registrationForm onSubmitForm={createUser} />
        {deniedUser && <p>Usuário já existe</p>}
      </div>
      <S.Pic />
    </S.Container>
  );
}
