import { useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorization } from "./pages/Authorization";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/authorization" element={<Authorization />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
