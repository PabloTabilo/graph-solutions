export function removeNodeCanvas(fromId, myGraph){
    if(fromId !== null && myGraph.nodesOn[fromId].selectMe){
      myGraph.nodesOn[fromId].selectMe = false;
      myGraph.removeNode(fromId);
      return [myGraph, null, true];
    }
    return [myGraph, fromId, false];
}
export function dragNodeCanvas(e, myGraph, fromId, dragMe){
    let xPos = e.clientX;
    let yPos = e.clientY;
    if(fromId !== null && dragMe){
        myGraph.nodesOn[fromId].x = xPos;
        myGraph.nodesOn[fromId].y = yPos;
        return [myGraph, true];
    }
    return [myGraph, false];
}

function closeVertex(myGraph, xPos, yPos){
    // euclidean distance
    let saveIdx = 0;
    let minDist = 10e9;
    for(const i in myGraph.nodesOn){
        let dist = Math.pow(myGraph.nodesOn[i].x - xPos,2) + Math.pow(myGraph.nodesOn[i].y - yPos,2);
        if(minDist > dist){
            minDist = dist;
            saveIdx = i;
        }
    }
    return [minDist, saveIdx];
}

export function AddOrSelect(e, myGraph, fromId, toId){
    let xPos = e.clientX;
    let yPos = e.clientY;
    if(myGraph.numNodes === 0){
        myGraph.addNode(xPos, yPos)
    }else{
        let [minDist, saveIdx] = closeVertex(myGraph, xPos, yPos);
        if(minDist < 800 && !myGraph.nodesOn[saveIdx].selectMe){
            myGraph.nodesOn[saveIdx].selectMe = true;
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
          } // Unselect
          else if (minDist < 800 && myGraph.nodesOn[saveIdx].selectMe){
            myGraph.nodesOn[saveIdx].selectMe = false;
            if(fromId === saveIdx){
              myGraph.nodesOn[fromId].selectMe = false;
              fromId = null;
            }
          }// Create a new Node
          else{
            myGraph.addNode(xPos, yPos);
          }
    }
    return [myGraph, fromId, toId];
}
