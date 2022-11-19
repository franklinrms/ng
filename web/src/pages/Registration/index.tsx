import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInputsForm from "../../components/UserInputsForm";
import api from "../../lib/api";

export default function Registration() {
  const [deniedUser, setDeniedUser] = useState(false);
  const navigate = useNavigate();
  const createUser = async (username: string, password: string) => {
    try {
      const { data } = await api.post("/register", { username, password });
      const token = JSON.stringify(data);
      localStorage.setItem("NGtoken", token);
    } catch (error) {
      setDeniedUser(true);
    }
    navigate("/account");
  };
  return (
    <div>
      <h2>Abra agora sua Conta Digital</h2>
      <UserInputsForm registrationForm onSubmitForm={createUser} />
      {deniedUser && <p>Usuário já existe</p>}
    </div>
  );
}
