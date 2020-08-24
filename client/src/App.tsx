import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Home, Game } from './components';
import { MainProvider } from './contexts/MainContext';

function App() {
  return (
    <div className="App">
      <MainProvider>
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/games/:gameId' component={Game} />
        </Router>
      </MainProvider>
    </div>
  );
}

export default App;
