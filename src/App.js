import React from "react";
import Login from "./LOGIN/Login";
import Register from "./LOGIN/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SnowflakeHeader from "./Components/Header/SnowflakeHeader";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/snowflake" element={<SnowflakeHeader />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
