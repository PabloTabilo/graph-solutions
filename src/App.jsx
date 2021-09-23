import React from 'react';
import MinSpaningTree from './components/MinSpaningTree';
import TopologicalSorting from './components/TopologicalSorting';
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
      <main>
          <Switch>
            <Route exact path="/graph-solutions/"><MinSpaningTree width={myWidth} height={400}></MinSpaningTree></Route>
            <Route exact path="/graph-solutions/topo"><TopologicalSorting width={myWidth} height={400}></TopologicalSorting></Route>
            <Route exact path="/graph-solutions/"><MinSpaningTree width={myWidth} height={400}></MinSpaningTree></Route>
            <Route exact path="/graph-solutions/topo"><TopologicalSorting width={myWidth} height={400}></TopologicalSorting></Route>
          </Switch>
      </main>
      <div id="switcher">
        <div><Link to="/graph-solutions/">Minimum Spaning Tree</Link></div>
        <div><Link to="/graph-solutions/topo">Topological Sorting</Link></div>
        <div><Link to="/graph-solutions/">Strongly Connected Components</Link></div>
        <div><Link to="/graph-solutions/topo">MaxFlow</Link></div>
      </div>
    </Router>
  );
}
export default App;
