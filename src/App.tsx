import React from 'react';
import './App.css';
import Home from './Components/Home';
import { Pp } from './Components/styled';

function App() {
  return (
    <div className="App-header">
      <header className='title'>
        <h1>Labor Data (2020~2021) </h1>
        <Pp>This site represents the labor data of Australia during the COVID stage, from 2020 to 2021.
          The original data comes from ABS (Australian Bureau of Statistics).
        </Pp>
      </header>
      <Home />
    </div>
  );
}

export default App;
