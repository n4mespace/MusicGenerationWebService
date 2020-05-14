import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import GenresGrid from './Components/GenresGrid.js';
import TopBar from './Components/TopBar.js';
import Sky from 'react-sky';

// const GenresGrid = React.lazy(() => import('./Component/GenresGrid/index.js'));


export default class App extends Component {
  constructor(props) {
    super(props);
    this.noteImages = {};

    this.importAllImages(
      require.context('./MusicalNotes', false, /\.(png|svg)$/)
    ).map((elem, i) => {
      this.noteImages[i] = elem;
    });
  }

  importAllImages(context) {
    return context.keys().map(context);
  }

  render() {
    return (
      <div className="App">
        <Sky
          images={this.noteImages}
          how={50} 
          time={30} 
          size={'90px'} 
        />
        <TopBar />
        <GenresGrid />
      </div>
    );
  }
}
