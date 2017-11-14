import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import BKDownshift from "./downshift/bkDownshift";

import wordList from "./bkTree/names";
import bkTree from "./bkTree/bkTree";
import Tree from './tree/Tree';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const tree = new bkTree(wordList.slice(0,20), { details: true });

const selected = selected => {
  console.log(`selected: ${selected}!`);
};

/**
 * Generator function that creates ranges of numbers
 * given a start end and step.
 * This is just for fun.
 * 
 * @param {number} start 
 * @param {number} end 
 * @param {number} [step=1] 
 */
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
    distance: 2,
    resultLimit: 20,
    name: "abba"
  };

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

  setName = event => {
    event.preventDefault();
    this.setState({
      name: event.target.value
    })
  }

  // componentDidMount() {
  //   console.log("mounted");
  //   tree.slowQuery(this.state.name,2,20);
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">BK Tree Demo</h1>
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
        <input value={this.state.name} onChange={this.setName}/>
        <Tree tree={tree} word={this.state.name}/>
      </div>
    );
  }
}

export default App;
