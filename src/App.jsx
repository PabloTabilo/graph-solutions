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
        </Switch>
      </main>
      <div>
        <Link to="/graph-solutions/">MST</Link>
        <Link to="/graph-solutions/topo">TopologicalSorting</Link>
      </div>
    </Router>
  );
}
export default App;
