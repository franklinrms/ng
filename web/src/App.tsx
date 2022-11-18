import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<span> ok </span>} />
      {/* <Route path="/registration" element={<span> ok </span>} /> */}
      {/* <Route path="/account" element={<span> ok </span>} /> */}
    </Routes>
  );
}
