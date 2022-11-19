import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registration" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/account" element={<Account />} />
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
