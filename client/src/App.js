import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: null,
    };
  }

  componentWillMount() {
    setInterval(async () => this.updateTime(), 1000);
  }

  async updateTime() {
    try {
        const promise = await axios.get("http://localhost:8000/time");  
        const time = promise.data.time;

        this.setState({ currentTime: new Date().setTime(time) / 366 / 24 / 60 / 60 });
    } catch(err) {
        console.log(err);
    }

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
          <p>The current time is {this.state.currentTime}.</p>
        </header>
      </div>
    );
  }
}

export default App;
