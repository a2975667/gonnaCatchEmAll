import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PokedexPage from './pages/pokedexPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokedexPage />} />
      </Routes>
    </Router>
    )
  }

export default App;