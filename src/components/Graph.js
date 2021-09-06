
import {Vertex} from './Vertex';

export class Graph{
    constructor(){
        this.auto_id = 0;
        this.numNodes = 0;
        this.nodesOn = {};
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

    redraw = (ctx, width, height) => {
        ctx.clearRect(0, 0, width, height);
        for(const v in this.nodesOn){
            this.nodesOn[v].drawVertex(ctx);
            if(this.nodesOn[v].numConnections > 0){
                for(const n in this.nodesOn[v].connectTo){
                    this.nodesOn[v].drawEdge(ctx, this.nodesOn[n]);
                }
            }
        }
    };
}