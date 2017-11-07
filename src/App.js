import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import BKDownshift from "./downshift/bkDownshift";

import wordList from "./bkTree/names";
import bkTree from "./bkTree/bkTree";

const tree = new bkTree(wordList, { details: true });

const selected = selected => {
  console.log(`selected: ${selected}!`);
};

// OK, now I am just getting silly.
const range = function*(start, end, step = 1) {
  while (start <= end) {
    yield start;
    start += step;
  }
};

const distanceRange = [...range(0, 10)];
const resultLimit = [...range(5, 100, 5)];

class App extends Component {
  state = {
    matches: [],
    distance: 2,
    resultLimit: 20
  };

  // componentDidMount() {
  //   this.tree = new bkTree(wordList);
  // }

  // componentDidUpdate() {

  // }

  setDistance = event => {
    event.preventDefault();
    this.setState({
      distance: Number(event.target.value)
    });
  };

  setLimit = event => {
    event.preventDefault();
    this.setState({
      resultLimit: Number(event.target.value)
    });
  };

  // findMatches = (event) => {
  //   //console.log(event.target.value);
  //   this.setState({
  //     matches: this.tree.query(event.target.value,1)
  //   });
  // }

  render() {
    console.log(this.state.distance);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <label>Distance </label>
        <select value={this.state.distance} onChange={this.setDistance}>
          {distanceRange.map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <label>Result Limit </label>
        <select value={this.state.resultLimit} onChange={this.setLimit}>
          {resultLimit.map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <BKDownshift
          bkTree={tree}
          selectCallBack={selected}
          distance={this.state.distance}
          resultLimit={this.state.resultLimit}
        />
      </div>
    );
  }
}

export default App;
