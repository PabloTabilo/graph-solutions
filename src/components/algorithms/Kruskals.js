
function Comparator(a, b){
    if(a[2] < b[2]) return -1;
    if(a[2] > b[2]) return 1;
    return 0;
}

function givemePairs(arr){
    let temp = [];
    for(let i in arr){
        if(i === 0) temp.push(arr[i]);
        else if(i === 1) continue;
        else{
            if(i%2 === 0) temp.push(arr[i])
        }
    }
    return temp;
}

export class Kruskals{
    constructor(myGraph){
        this.myGraph = myGraph;
        this.numComponents = myGraph.numNodes;
        this.solution = [];
    }
    find(p, arrRoot){
        let root = p;
        while(root !== arrRoot[root]){
            root = arrRoot[root];
        }

        while(p !== root){
            let next = arrRoot[p];
            arrRoot[p] = root;
            p = next;
        }
        return root;
    }
    union(p, q, arrRoot, arrSize){
        let root1 = this.find(p, arrRoot);
        let root2 = this.find(q, arrRoot);
        if(root1 === root2) return false; // are in the same group
        if(arrSize[root1] < arrSize[root2]){
            arrSize[root2] += arrSize[root1];
            arrRoot[root1] = parseInt(root2);
        }else{
            arrSize[root1] += arrSize[root2];
            arrRoot[root2] = parseInt(root1);
        }
        this.numComponents--;
        return true;
    }
    solve(){
        let temporalArr = []
        for(let u in this.myGraph.nodesOn){
            for(let v in this.myGraph.nodesOn[u].connectTo){
                let w = this.myGraph.nodesOn[u].connectTo[v];
                let myTuple = [u,v,w];
                temporalArr.push(myTuple);
            }
        }
        temporalArr = givemePairs(temporalArr.sort(Comparator));

        let arrSize = {};
        let arrRoot = {};
        let map = new Map(Object.entries(this.myGraph.nodesOn)); // for iterable object
        for(let u of map){
            arrSize[u[1].id] = 1;
            arrRoot[u[1].id] = u[1].id;
        }
        let i = 0;
        while(i<temporalArr.length){
            let p = parseInt(temporalArr[i][0]);
            let q = parseInt(temporalArr[i][1]);
            if(this.union(p,q,arrRoot,arrSize)){
                let w = parseInt(temporalArr[i][2]);
                this.solution.push([p,q,w]);
            }
            i++;
        }
    }
}