
import {Vertex} from './Vertex';

export class Graph{
    constructor(height_canvas, width_canvas){
        this.auto_id = 0;
        this.numNodes = 0;
        this.nodesOn = {};
        this.height = height_canvas;
        this.width = width_canvas;
    }
    addNode(x, y){
        if(this.nodesOn[this.auto_id] === undefined){
            this.nodesOn[this.auto_id] = new Vertex(this.auto_id, x, y);
            this.auto_id++;
            this.numNodes++;
            return true;
        }
        return false;
    }

    addNeightNode(idFrom, idTo, weight){
        this.nodesOn[idFrom].addNeight(idTo, weight);
    }

    removeNode(v_id){
        console.log(this.nodesOn);
        this.nodesOn[v_id].connectTo = {}
        delete this.nodesOn[v_id];
        this.numNodes--;
        console.log(this.nodesOn);
    }

    redraw = (ctx) => {
        ctx.clearRect(0, 0, this.width, this.height);
        for(const v in this.nodesOn){
            this.nodesOn[v].drawVertex(ctx);
            if(this.nodesOn[v].numConnections > 0){
                for(const n in this.nodesOn[v].connectTo){
                    this.nodesOn[v].drawEdge(ctx, this.nodesOn[n], true);
                }
            }
        }
    };
}