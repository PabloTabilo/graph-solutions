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
          <Route exact path="/"><MinSpaningTree width={myWidth} height={400}></MinSpaningTree></Route>
          <Route exact path="/topo"><TopologicalSorting width={myWidth} height={400}></TopologicalSorting></Route>
        </Switch>
      </main>
      <div>
        <Link to="/">MST</Link>
        <Link to="/topo">TopologicalSorting</Link>
      </div>
    </Router>
  );
}
export default App;
