import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/registration" />} />
      <Route path="/login" element={<span> ok </span>} />
      <Route path="/registration" element={<Registration />} />
      {/* <Route path="/account" element={<span> ok </span>} /> */}
    </Routes>
  );
}
