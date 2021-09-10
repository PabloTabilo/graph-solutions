
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
    drawEdge(ctx, vertexTo, directed){
        console.log("Add line");
        console.log(this.x, this.y);
        console.log(vertexTo.x, vertexTo.y);
        console.log(this.connectTo);
        if(directed){
            var tox = vertexTo.x;
            var toy = vertexTo.y;
            var headlen = 10; // length of head in pixels
            var dx = vertexTo.x - this.x;
            var dy = vertexTo.y - this.y;
            var angle = Math.atan2(dy, dx);
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        if (directed) ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(vertexTo.x, vertexTo.y);
        if (directed) ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }
    drawVertex(ctx){
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
        if(this.selectMe){
            ctx.fillStyle = "orange";
            ctx.fill();
        }else{
            ctx.strokeStyle = "gray";
            ctx.stroke();
        }
    }
}