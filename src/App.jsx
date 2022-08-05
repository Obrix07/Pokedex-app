import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/Main';
import Pokeinfo from './Components/Pokeinfo';
import './Components/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route exact path="/pokeinfo/:pokeId" element={<Pokeinfo/>} />
      </Routes>
    </Router>
  );
}

export default App;



{/* <>
<Main/>
</> */}