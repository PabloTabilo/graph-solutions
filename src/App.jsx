import React from 'react';
import Canvas from './components/Canvas';
import "./App.css";

function App() {
  let myWidth = window.innerWidth;
  return (
    <React.Fragment>
      <Canvas height={300} width={myWidth}></Canvas>
      <div id="control-panel">
        <button id="addMe">Add</button>
        <button id="removeMe">Remove</button>
      </div>
    </React.Fragment>
  );
}
export default App;
