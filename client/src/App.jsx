import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Channel from "./views/Channel";
import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");

  return (
    <div className="main-container">
      {name ? (
        <>
          <Sidebar />
          <Routes>
            <Route
              path="/"
              element={<div className="chat-section">Chat section</div>}
            />
            <Route path="/:id" element={<Channel username={name} />} />
          </Routes>
        </>
      ) : (
        <div>
          <h1>välkommen till min slack!</h1>
          <button onClick={() => setName("ricky")}>Login as ricky</button>
        </div>
      )}
    </div>
  );
}
