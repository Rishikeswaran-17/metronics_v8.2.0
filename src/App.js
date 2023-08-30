import React from "react";
import Login from "./LOGIN/Login";
import Register from "./LOGIN/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataTables from "./Components/Tables/DataTables";


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/snowflake" element={<DataTables />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
