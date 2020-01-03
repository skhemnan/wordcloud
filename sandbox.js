import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactWordCloud from "react-wordcloud";

import "./styles.css";
const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 0,
  scale: "log",
  spiral: "archimedean",
  rotations: 0,
  rotationAngles: [0, 90],
  transitionDuration: 0
};

class App extends Component {
  state = {
    showForm: true
  };

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };

  handleClick = () => {
    let obj = {};
    let newInput = this.state.text.replace(/([()".,!?])/g, "");
    let inputArray = newInput.split(" ");
    inputArray.forEach(item => {
      if (obj.hasOwnProperty(item)) {
        obj[item]++;
      } else {
        obj[item] = 1;
      }
    });
    let finalArray = [];
    Object.keys(obj).forEach(key => {
      finalArray.push({ text: key, value: obj[key] });
    });
    this.setState({
      finalArray,
      showForm: false
    });
  };

  render() {
    return (
      <div className="App">
        <h1>WordCloud</h1>
        {this.state.showForm ? (
          <div>
            <textarea
              value={this.state.text}
              onChange={this.handleTextChange}
            />
            <button onClick={this.handleClick}>Click me</button>
          </div>
        ) : (
          <div style={{ height: 100, width: 285 }}>
            {/*this.state.finalArray.map((x, i) => (
              <span key={i} style={{ fontSize: `${x.value}0px` }}>
                {x.text}
              </span>
            ))*/}
            <ReactWordCloud options={options} words={this.state.finalArray} />
          </div>
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
