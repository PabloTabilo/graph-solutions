import React from 'react';
import Canvas from './components/Canvas';
import "./App.css";

function App() {
  let myWidth = window.innerWidth;
  return (
    <React.Fragment>
      <Canvas
        height={400}
        width={myWidth}
      ></Canvas>
    </React.Fragment>
  );
}
export default App;
