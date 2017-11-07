import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import wordList from "./bkTree/wordList";
import bkTree from './bkTree/bkTree';

const tree =  new bkTree(wordList);

class App extends Component {
  
  state = {
    matches: [],
    distance: 0,
    word: "tst"
  }

  // componentDidMount() {
  //   this.tree = new bkTree(wordList);
  // }


  // componentDidUpdate() {

  // }

  setDistance = (event) => {
    event.preventDefault();
      this.setState({
        distance: event.target.value
      })
  }

  setWord = (event) => {
    event.preventDefault();
    this.setState({
      word: event.target.value
    })
  }

  // findMatches = (event) => {
  //   //console.log(event.target.value);
  //   this.setState({
  //     matches: this.tree.query(event.target.value,1)
  //   });
  // }
  
  render() {

    const matches = tree.query(this.state.word, this.state.distance);

    console.log(matches, this.state.word);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <label>Distance</label><input value={this.state.distance} onChange={this.setDistance}/>
        <label>Word</label><input value={this.state.word} onChange={this.setWord}/>
        {
          matches.map( (match,index) => {
            return <div>{match}</div>
          })
        }
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
