import React, { Component } from 'react';
import Fetch from './components/Fetch'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1 className='header'>Welcome to Austin</h1>
        <Fetch />
      </div>
    );
  }
}

export default App;
