import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import "./Canvas.css";
import {Graph} from './Graph';
import {Kruskals} from './algorithms/Kruskals';
import {Prims} from "./algorithms/Prims";
import {
  removeNodeCanvas,
  dragNodeCanvas,
  AddOrSelect

} from './useCanvas'

// Return random number between min (include) y max (exclude)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// unique id
var fromId = null;
var toId = null;
var dragMe = false;
//var directedGraph = true;

function MinSpaningTree({height, width}) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    // update References
    useEffect(()=>{
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      contextRef.current = context;
    }, []);

    var myGraph = new Graph(height, width, false);

    let handleRemove = () => {
      let makeChanges = false;
      [myGraph, fromId, makeChanges] = removeNodeCanvas(fromId, myGraph);
      if (makeChanges) myGraph.redraw(contextRef.current);
    }

    let autoGraph = () =>{
      removeGraph();
      let n = getRandomInt(5, 9);
      for(let i = 0; i < n; i++){
        let x = getRandomInt(20, width-20);
        let y = getRandomInt(20, height-20);
        myGraph.addNode(x, y);
      }
      for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
          if(i !== j){
            if(Math.random() >= .8)
              myGraph.addNeightNode(i, j, getRandomInt(-20, 20));
          }
        }
      }
      myGraph.redraw(contextRef.current);
    }

    let removeGraph = () =>{
      myGraph = new Graph(height, width, false);
      myGraph.redraw(contextRef.current);
    }

    let clearAlgo = () =>{
      myGraph.redraw(contextRef.current);
    }

    let handleClick = (e) =>{
      e.preventDefault();
      [myGraph, fromId, toId] = AddOrSelect(e, myGraph, fromId, toId);
      myGraph.redraw(contextRef.current);
    }

    let handleMouseDown = (e) => {
      if(fromId !== null){
        dragMe = true;
      }
    }

    // mobile
    let handleTouchStart = (e) =>{
      if(fromId !== null){
        dragMe = true;
      }
    }

    let handleMouseMove = (e) =>{
      e.preventDefault();
      let makeChanges = false;
      [myGraph, makeChanges] = dragNodeCanvas(e, myGraph, fromId, dragMe);
      if (makeChanges) myGraph.redraw(contextRef.current);
    }

    // mobile
    let handleTouchMove = (e) =>{
      let myE = {clientX:e.touches[0].clientX, clientY:e.touches[0].clientY};
      let makeChanges = false;
      [myGraph, makeChanges] = dragNodeCanvas(myE, myGraph, fromId, dragMe);
      if (makeChanges) myGraph.redraw(contextRef.current);
    }

    let handleMouseUp = (e) =>{
      e.preventDefault();
      dragMe = false;
    }

    // mobile
    let handleTouchEnd = (e) =>{
      dragMe = false;
    }

    let playModel = () =>{
      let selectElement = document.getElementById("algorithms");
      let res;
      if (selectElement.value === "kruskal"){
        let inst = new Kruskals(myGraph);
        inst.solve();
        res = inst.solution;
      }else{
        let inst = new Prims(myGraph);
        inst.solve();
        res = inst.solution;
      }
      animationSolve(0, res);
    }

    function animationSolve(j, res){
      if (j >= res.length) return;
      // j no puede ser superior al tamano de res
      let u = res[j][0];
      let v = res[j][1];
      let w = res[j][2];
      // pintar edge u, v
      myGraph.nodesOn[u].drawEdge(contextRef.current, myGraph.nodesOn[v], false, w, true);
      // pintar u
      myGraph.nodesOn[u].partOfSolution = true;
      myGraph.nodesOn[u].drawVertex(contextRef.current);
      // pintar v
      myGraph.nodesOn[v].partOfSolution = true;
      myGraph.nodesOn[v].drawVertex(contextRef.current);

      myGraph.nodesOn[u].partOfSolution = false;
      myGraph.nodesOn[v].partOfSolution = false;
      setTimeout(()=>{
        animationSolve(j+1, res);
      }, 1000);
    }



    return (
      <main>
        <canvas
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleTouchEnd}
          className="canvas"
          ref={canvasRef}
          width={width}
          height={height}
          ></canvas>

          <div id="control-panel">
            <div id="changeButtons">
              <button id="play" onClick={playModel}>Solve</button>
              <button id="removeMe" onClick={handleRemove}>Remove Node</button>
              <button id="Clear" onClick={clearAlgo}>Clear Board</button>
              <button id="drop" onClick={removeGraph}>Drop Graph</button>
              <button id="autograph" onClick={autoGraph}>AutoGraph</button>
            </div>
            <div id="algorithms-topic">
              <h1>Select an algorithm for Minimum Spaning Tree: </h1>
              <select id="algorithms">
                <option value="kruskal">Kruskal's MST</option>
                <option value="prim">Prim's MST</option>
              </select>
            </div>
        </div>
      </main>
    );
  }
  MinSpaningTree.propTypes = {
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
  };
export default MinSpaningTree;