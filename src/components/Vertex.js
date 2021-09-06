
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
    drawEdge(ctx, vertexTo){
        console.log("Add line");
        console.log(this.x, this.y);
        console.log(vertexTo.x, vertexTo.y);
        console.log(this.connectTo);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(vertexTo.x, vertexTo.y);
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