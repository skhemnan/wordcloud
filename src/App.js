import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactWordCloud from "react-wordcloud";
import './index.css';

const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [10, 100],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 0,
  scale: "log",
  spiral: "archimedean",
  rotations: 0,
  rotationAngles: [0, 90],
  transitionDuration: 0
};

class App extends React.Component{	
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
	
	render(){
    return (
      <div className="App container">
        <h1 className="display-1">WordCloud</h1>
        {this.state.showForm ? (
          <div>
						<h2 className="display-5">Enter Your Text Below</h2>
            <textarea
              value={this.state.text}
              onChange={this.handleTextChange}
            />
            <button className="btn-outline-primary"onClick={this.handleClick}>Create WordCloud</button>
          </div>
        ) : (
          <div className="cloud">
              <ReactWordCloud options={options} words={this.state.finalArray} />
          </div>
        )}
      </div>
    );
	}
}

export default App;
