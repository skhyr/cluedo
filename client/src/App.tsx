import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Home, Game } from './components';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={Home} />
        <Route path='/games/:gameId' component={Game} />
      </Router>
    </div>
  );
}

export default App;
