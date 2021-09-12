import React from "react";

function MinSpaningTree({height, width}){
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  var myGraph = new Graph(height, width, false);

  // update References
  useEffect(()=>{
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;
  }, []);

    return (
        <div id="algorithms">
            <select>
              <option>Prim's Algorithm</option>
              <option>Kruskal's Algorithm</option>
            </select>
          </div>
    );
}

export default MinSpaningTree;