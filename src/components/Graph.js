
import {Vertex} from './Vertex';

export class Graph{
    constructor(height_canvas, width_canvas, directed){
        this.auto_id = 0;
        this.numNodes = 0;
        this.nodesOn = {};
        this.height = height_canvas;
        this.width = width_canvas;
        this.directed = directed;
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
        if (!this.directed) this.nodesOn[idTo].addNeight(idFrom, weight);
    }

    removeNode(v_id){
        console.log(this.nodesOn);
        // Eliminate any edge (track) of this vertex
        for(const v in this.nodesOn){
            if(this.nodesOn[v].numConnections > 0){
                for(const n in this.nodesOn[v].connectTo){
                    if(n === v_id) delete this.nodesOn[v].connectTo[n];
                }
            }
        }
        // Delete vertex of graph
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