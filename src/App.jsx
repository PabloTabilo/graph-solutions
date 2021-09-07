import React from 'react';
import Canvas from './components/Canvas';
import "./App.css";

function App() {
  let myWidth = window.innerWidth;
  return (
    <React.Fragment>
      <Canvas height={400} width={myWidth}></Canvas>
      <div id="control-panel">
        <div id="changeButtons">
        <button id="addMe">Add Node</button>
        <button id="removeMe">Remove Node</button>
        </div>
        <div id="auto">
          <button>AutoGraph</button>
          <input type="radio" id="sparse"></input><label>Sparse</label>
          <input type="radio" id="dense"></input><label>Dense</label>
        </div>
        <div id="algorithms-topic">
          <h1>Select topic of algorithm for implement: </h1>
          <select>
            <option>Minimum Spaning Tree</option>
            <option>Topological Sorting</option>
            <option>Lowest cost path</option>
            <option>Strongly Connected Components</option>
            <option>Traveling Salesman Problem</option>
          </select>
        </div>
        <div id="algorithms">
          <select>
            <option>Prim's Algorithm</option>
            <option>Kruskal's Algorithm</option>
          </select>
        </div>
      </div>
    </React.Fragment>
  );
}
export default App;
