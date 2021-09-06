import React from 'react';
import PropTypes from 'prop-types';
import "./Canvas.css";
import {Graph} from './Graph';
// unique id

var myGraph = new Graph();

var fromId = null;
var toId = null;

function Canvas({height, width}) {
    const canvas = React.useRef(null);
    var context = null;
    // update
    React.useEffect(() => {
      context = canvas.current.getContext('2d');
    });

    let handleClick = (e) =>{
      let xPos = e.clientX;
      let yPos = e.clientY;
      console.log(e.clientX, e.clientY);
      if(myGraph.numNodes === 0){
        if(myGraph.addNode(xPos, yPos)){
          myGraph.redraw(context, width, height);
        }
      }else{
        // Dist euclediana a todos los vertex
        // tomamos min
        let saveIdx = 0;
        //let minId = 0;
        let minDist = 10e9;
        for(let i = 0; i < myGraph.numNodes; i++){
          let dist = Math.pow(myGraph.nodesOn[i].x - xPos,2) + Math.pow(myGraph.nodesOn[i].y - yPos,2);
          if(minDist > dist){
            //minId = myGraph.nodesOn[i].id;
            minDist = dist;
            saveIdx = i;
          }
          console.log(dist);
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
        myGraph.redraw(context, width, height);
      }
    }

    return (
      <canvas
        onClick={handleClick}
        className="canvas"
        ref={canvas}
        width={width}
        height={height}
        ></canvas>
    );
  }
  Canvas.propTypes = {
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
  };
  export default Canvas;