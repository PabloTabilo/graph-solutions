import React from 'react';
import Canvas from './components/Canvas';
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  let myWidth = window.innerWidth;
  return (
    <Router>
      <React.Fragment>
        <Canvas
          height={400}
          width={myWidth}
        ></Canvas>
    </React.Fragment>
    </Router>
  );
}
export default App;
