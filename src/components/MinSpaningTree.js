import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import "./Canvas.css";
import {Graph} from './Graph';
import {Kruskals} from './algorithms/Kruskals';
import {
  removeNodeCanvas,
  dragNodeCanvas,
  AddOrSelect

} from './useCanvas'

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

    let handleClick = (e) =>{
      e.preventDefault();
      [myGraph, fromId, toId] = AddOrSelect(e, myGraph, fromId, toId);
      myGraph.redraw(contextRef.current);
    }

    let handleMouseDown = (e) => {
      //console.log("handleMouseDown");
      if(fromId !== null){
        dragMe = true;
      }
    }

    let handleTouchStart = (e) =>{
      console.log("handleTouchStart");
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

    let handleTouchMove = (e) =>{
      let myE = {clientX:e.touches[0].clientX, clientY:e.touches[0].clientY};
      let makeChanges = false;
      [myGraph, makeChanges] = dragNodeCanvas(myE, myGraph, fromId, dragMe);
      if (makeChanges) myGraph.redraw(contextRef.current);
    }

    let handleMouseUp = (e) =>{
      e.preventDefault();
      //console.log("handleMouseUp");
      dragMe = false;
    }

    let handleTouchEnd = (e) =>{
      console.log("handleTouchEnd");
      dragMe = false;
    }

    let playModel = () =>{
      let inst = new Kruskals(myGraph);
      inst.solve();
      let res = inst.solution;
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
            <button id="autograph">AutoGraph</button>
            </div>
          <div id="algorithms-topic">
            <h1>Select an algorithm for find the minimum spaning Tree: </h1>
            <select>
              <option>Kruskal's MST</option>
              <option>Prim's MST</option>
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