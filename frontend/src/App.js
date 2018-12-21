import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Main from './Page/Main';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default connect()(App);
