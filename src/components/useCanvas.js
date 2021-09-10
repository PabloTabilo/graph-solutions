import { useEffect, useRef } from 'react';

function reDrawMyGraph(myGraph, context){
    myGraph.redraw(context);
}

export function UseCanvas(myGraph){
    const canvas = useRef(null);
    useEffect(()=>{
        const canvasObj = canvas.current;
        const context = canvasObj.getContext('2d');
        // clear the canvas area before rendering the coordinates held in state
        // draw all coordinates held in state
        reDrawMyGraph(myGraph, context)
    });
    return canvas;
}