
export class Vertex{
    constructor(id, x, y){
        this.id = id;
        this.x = x;
        this.y = y;
        this.connectTo = {};
        this.selectMe = false;

        this.numConnections = 0;
    }
    addNeight(idTo, weight=0){
        this.connectTo[idTo] = weight;
        this.numConnections++;
    }
    removeNeight(id){
        delete(this.connectTo[id]);
        this.numConnections--;
    }
    drawEdge(context, vertexTo, directed){
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.beginPath();
        let pad = 15;
        let fromx = this.x;
        let fromy = this.y;
        let tox = vertexTo.x;
        let toy = vertexTo.y;
        /*
        if(this.x < vertexTo.x){
            fromx += pad;
            tox -= pad;
        }else{
            fromx -= pad;
            tox += pad;
        }
        if(this.y < vertexTo.y){
            fromy += pad;
            toy -= pad;
        }else{
            fromy -= pad;
            toy += pad;
        }
        */
        if(directed){
            let headlen = 15; // length head pixels
            let dx = tox - this.x;
            let dy = toy - this.y;
            let angle = Math.atan2(dy, dx);
            context.moveTo(fromx, fromy);
            context.lineTo(tox, toy);

            context.moveTo(tox-pad, toy-pad);
            context.lineTo(tox-pad - headlen * Math.cos(angle - Math.PI / 6), toy-pad - headlen * Math.sin(angle - Math.PI / 6));
            context.moveTo(tox-pad, toy-pad);
            context.lineTo(tox-pad - headlen * Math.cos(angle + Math.PI / 6), toy-pad - headlen * Math.sin(angle + Math.PI / 6));
        }else{
            context.moveTo(fromx, fromy);
            context.lineTo(tox, toy);
        }
        context.stroke();
    }
    drawVertex(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
        if(this.selectMe){
            ctx.fillStyle = "orange";
        }else{
            ctx.fillStyle = "white";
        }
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}