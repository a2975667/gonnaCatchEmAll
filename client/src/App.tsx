import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PokedexPage from './pages/pokedexPage';
import PokemonPage from './pages/pokemonPage';


const App: React.FC = () => {
  return (
    <Router basename={process.env.REACT_APP_BASE_URL || "/"}>
      <Routes>
        <Route path="/" element={<PokedexPage />} />
        <Route path="/searchPokemon/:pokemonID" element={<PokemonPage />} />
      </Routes>
    </Router>
    )
  }

export default App;