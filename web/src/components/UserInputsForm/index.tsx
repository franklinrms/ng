import React, { useEffect, useState } from "react";

interface UserInputsFormProps {
  registrationForm: boolean;
  onSubmitForm: (username: string, password: string) => void;
}
export default function UserInputsForm({
  registrationForm,
  onSubmitForm,
}: UserInputsFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const checkPassword = () =>
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(password);
  const checkUsername = () => username.length >= 2;

  const enableButton = () => {
    if (checkUsername() && checkPassword()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    enableButton();
  }, [username, password]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmitForm(username, password);
      }}
    >
      <input
        type="text"
        placeholder="username"
        onChange={({ target }) => setUsername(target.value)}
        required
      />
      <input
        type="password"
        placeholder="password"
        onChange={({ target }) => setPassword(target.value)}
        required
      />
      <button type="submit" disabled={isButtonDisabled}>
        {registrationForm ? "Cadastrar" : "Acessar"}
      </button>
    </form>
  );
}
