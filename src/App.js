import React from "react";
import Login from "./LOGIN/Login";
import Register from "./LOGIN/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataTables from "./Components/Tables/DataTables";
import Tables from "./Components/Tables/Tables";
import ChatRecord from "./Components/Tables/ChatRecord";


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/snowflake" element={<ChatRecord />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
