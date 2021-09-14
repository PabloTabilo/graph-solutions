
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
        let fromx = this.x;
        let fromy = this.y;
        let tox = vertexTo.x;
        let toy = vertexTo.y;
        context.moveTo(fromx, fromy);

        let dx = tox - this.x;
        let dy = toy - this.y;
        let angle = Math.atan2(dy, dx);

        let pad = 20; // like radius
        let y = toy - Math.sin(angle) * pad;
        let x = tox - Math.cos(angle) * pad;

        context.lineTo(x, y);
        if(directed){
            let headlen = 15; // length head pixels

            context.moveTo(x, y);
            context.lineTo(x - headlen * Math.cos(angle - Math.PI / 6), y - headlen * Math.sin(angle - Math.PI / 6));
            context.moveTo(x, y);
            context.lineTo(x - headlen * Math.cos(angle + Math.PI / 6), y - headlen * Math.sin(angle + Math.PI / 6));
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