import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(sessionStorage);
    let sessionKey = sessionStorage.getItem('session_key_app');

    if(sessionKey != "") {
      sessionStorage.setItem('session_key_app', 'zxcvbn');
    }
  }

  componentWillUnmount() {
    sessionStorage.removeItem('session_key_app');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
