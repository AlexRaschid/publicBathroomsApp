import React from 'react';
import './App.css';
import { BathroomMap } from './BathroomFinder/map.js';
import { NavBar } from './BathroomFinder/navbar.js';
import { Grid } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BathroomMap></BathroomMap>
    </div>
  );
}

export default App;
