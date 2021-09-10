import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import "./Canvas.css";
import {Graph} from './Graph';
// unique id

var fromId = null;
var toId = null;
var dragMe = false;
//var directedGraph = true;

function Canvas({removeVal, height, width}) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    // update References
    useEffect(()=>{
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      contextRef.current = context;
    }, []);

    var myGraph = new Graph(height, width);
    function handleRemove(e){
      if(fromId !== null && myGraph.nodesOn[fromId].selectMe){
        myGraph.nodesOn[fromId].selectMe = false;
        myGraph.removeNode(fromId);
        fromId = null;
        myGraph.redraw(contextRef.current);
        console.log("Node eliminate")
      }else{
        console.log("Select a node!")
      }
    }

    let handleClick = (e) =>{
      let xPos = e.clientX;
      let yPos = e.clientY;
      console.log(e.clientX, e.clientY);
      if(myGraph.numNodes === 0){
        myGraph.addNode(xPos, yPos)
      }else{
        // Dist euclediana a todos los vertex
        // tomamos min
        let saveIdx = 0;
        //let minId = 0;
        let minDist = 10e9;
        for(const i in myGraph.nodesOn){
          let dist = Math.pow(myGraph.nodesOn[i].x - xPos,2) + Math.pow(myGraph.nodesOn[i].y - yPos,2);
          if(minDist > dist){
            //minId = myGraph.nodesOn[i].id;
            minDist = dist;
            saveIdx = i;
          }
          console.log("dist: ",dist);
        }
        // check si estamos dentro del area de un vertex
        // de ser asi, seleccionamos
        if(minDist < 700 && !myGraph.nodesOn[saveIdx].selectMe){
          myGraph.nodesOn[saveIdx].selectMe = true;
          console.log("Seleccionar");
          if(fromId === null){
            fromId = saveIdx;
          }else{
            toId = saveIdx;
            // Crear edge
            myGraph.addNeightNode(fromId, toId, 1);
            myGraph.nodesOn[fromId].selectMe = false;
            myGraph.nodesOn[toId].selectMe = false;
            fromId = null;
            toId = null;
          }
          console.log(fromId);
          console.log(toId);
        } // cualquier otro caso, significa deseleccionar
        else if (minDist < 700 && myGraph.nodesOn[saveIdx].selectMe){
          myGraph.nodesOn[saveIdx].selectMe = false;
          console.log("Deseleccionar");
          if(fromId !== null && fromId === saveIdx){
            fromId = null;
          }else{
            toId = null;
          }
        }else{
          myGraph.addNode(xPos, yPos);
          console.log("crear nodo");
        }
      }
      myGraph.redraw(contextRef.current);
    }

    let handleMouseDown = (e) => {
      console.log("handleMouseDown");
      if(fromId !== null){
        // Seleccionado, ademas quiero arrastrarlo
        dragMe = true;
      }
    }

    let handleTouchStart = (e) =>{
      console.log("handleTouchStart");
    }

    let handleMouseMove = (e) =>{
      console.log("handleMouseMove");
      let xPos = e.clientX;
      let yPos = e.clientY;
      if(fromId !== null && dragMe){
        // Seleccionado, ademas quiero arrastrarlo
        myGraph.nodesOn[fromId].x = xPos;
        myGraph.nodesOn[fromId].y = yPos;
        myGraph.redraw(contextRef.current);
      }
    }

    let handleMouseUp = (e) =>{
      console.log("handleMouseUp");
      dragMe = false;
    }

    let handleTouchEnd = (e) =>{
      console.log("handleTouchEnd");
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
            <input type="radio" id="directed"></input><label>Directed Graph</label>
            <input type="radio" id="undirected"></input><label>Undirected graph</label>
          </div>
          <div id="auto">
            <button>AutoGraph</button>
            <div>
              <input type="radio" id="sparse"></input>
              <label>Sparse</label>
              <input type="radio" id="dense"></input>
              <label>Dense</label>
            </div>
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
      </main>
    );
  }
  Canvas.propTypes = {
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
  };
export default Canvas;