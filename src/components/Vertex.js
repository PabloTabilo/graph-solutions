
export class Vertex{
    constructor(id, x, y){
        this.id = id;
        this.x = x;
        this.y = y;
        this.connectTo = {};
        this.selectMe = false;
        this.partOfSolution = false;
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
    drawEdge(context, vertexTo, directed, weight, partOfSolEdge){
        if(partOfSolEdge){
            context.strokeStyle = "orange";
            context.lineWidth = 5;
        }
        else{
            context.lineWidth = 1;
            context.strokeStyle = "black";
        }
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
        context.font = "25px Comic Sans MS";
        if(partOfSolEdge){
            context.fillStyle = "red";
        }else{
            context.fillStyle = "gray";
        }
        context.textAlign = "center";
        context.fillText(weight, (fromx+tox)/2, (fromy+toy)/2);
    }
    drawVertex(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
        if(this.selectMe){
            ctx.fillStyle = "orange";
        }else{
            ctx.fillStyle = "white";
        }
        if(this.partOfSolution){
            ctx.fillStyle = "orange";
        }
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.font = "15px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this.id, this.x, this.y);
    }
}