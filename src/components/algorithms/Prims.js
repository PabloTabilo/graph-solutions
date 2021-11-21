import { PriorityQueue } from "../data-structure/PriorityQueue";

export class Prims{
    constructor(myGraph){
        this.myGraph = myGraph;
        this.n = myGraph.numNodes;
        this.solution = [];
        this.visited = {};
        this.pq = new PriorityQueue(2*this.n);
        let map = new Map(Object.entries(myGraph.nodesOn)); // for iterable object
        for(let u of map){
            this.visited[u[1].id] = false;
        }
        this.mstCost = 0;
        this.mstEdges = [];
        for(let i = 0; i<this.n; i++){
            this.mstEdges.push(null);
        }
    }
    addEdge(nodeIndex){
        this.visited[nodeIndex] = true;
        let edges = this.myGraph.nodesOn[nodeIndex].connectTo;
        let map = new Map(Object.entries(edges));
        for(let u of map){
            let u_info = this.myGraph.nodesOn[u[0]];
            if(!this.visited[u_info.id])
                this.pq.insert({from: nodeIndex, to: u_info.id, cost: u[1]});
        }
    }
    lazyPrims(s){
        let m = this.n - 1;
        let edgeCount = 0;
        this.addEdge(s);
        while(!this.pq.empty() && edgeCount !== m){
            let edge = this.pq.front().e;
            let nodeIndex = edge.to;
            this.pq.poll();
            if (this.visited[nodeIndex]) continue
            this.mstEdges[edgeCount++] = edge;
            this.mstCost += edge.cost;
            this.solution.push([edge.from, edge.to, edge.cost]);
            this.addEdge(nodeIndex);
        }
        if (edgeCount !== m)
            return false;
        return true;
    }
    solve(){
        this.lazyPrims(this.myGraph.nodesOn[0].id);
    }
}