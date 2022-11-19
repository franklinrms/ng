import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInputsForm from "../../components/UserInputsForm";
import api from "../../lib/api";

export default function Login() {
  const [deniedUser, setDeniedUser] = useState(false);
  const navigate = useNavigate();
  const getUser = async (username: string, password: string) => {
    try {
      const { data } = await api.post("/login", { username, password });
      const token = JSON.stringify(data);
      localStorage.setItem("NGtoken", token);
      navigate("/account");
    } catch (error) {
      setDeniedUser(true);
    }
  };
  return (
    <div>
      <h2>Acessar Conta Digital</h2>
      <UserInputsForm registrationForm={false} onSubmitForm={getUser} />
      {deniedUser && <p>usuário ou senha inválidos</p>}
    </div>
  );
}
