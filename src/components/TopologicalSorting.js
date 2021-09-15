import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import "./Canvas.css";
import {Graph} from './Graph';
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

function TopologicalSorting({height, width}) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    // update References
    useEffect(()=>{
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      contextRef.current = context;
    }, []);

    var myGraph = new Graph(height, width, true);
    let handleRemove = () => {
      let makeChanges = false;
      [myGraph, fromId, makeChanges] = removeNodeCanvas(fromId, myGraph);
      if (makeChanges) myGraph.redraw(contextRef.current);
    }

    let handleClick = (e) =>{
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
      //console.log("handleTouchStart");
    }

    let handleMouseMove = (e) =>{
      let makeChanges = false;
      [myGraph, makeChanges] = dragNodeCanvas(e, myGraph, fromId, dragMe);
      if (makeChanges) myGraph.redraw(contextRef.current);
    }

    let handleMouseUp = (e) =>{
      //console.log("handleMouseUp");
      dragMe = false;
    }

    let handleTouchEnd = (e) =>{
      //console.log("handleTouchEnd");
    }

    return (
      <main>
        <canvas
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
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
            <button id="removeMe" onClick={handleRemove}>Remove Node</button>
            <button id="autograph">AutoGraph</button>
            </div>
          <div id="algorithms-topic">
            <h1>Select an algorithm for find the TopologicalSorting: </h1>
            <select>
              <option>Kahn Algorithm</option>
              <option>Classic DFS</option>
            </select>
          </div>
        </div>
      </main>
    );
  }
  TopologicalSorting.propTypes = {
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
  };
export default TopologicalSorting;