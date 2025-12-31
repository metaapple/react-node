import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Board from "./components/Board";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Board />
      </main>
      <Footer />
    </div>
  );
}

export default App;
