import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route
        path="/account"
        element={
          <UserContextProvider>
            <Account />
          </UserContextProvider>
        }
      />
      <Route
        path="*"
        element={
          <div>
            <h1>404</h1>
            <p>ops, pagina não encontrada</p>
          </div>
        }
      />
    </Routes>
  );
}
