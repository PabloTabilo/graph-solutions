
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
        while(root !== arrRoot[p])
            root = arrRoot[p];
        return root;
    }
    union(p, q, arrRoot, arrSize){
        let root1 = this.find(p, arrRoot);
        let root2 = this.find(q, arrRoot);
        console.log("p: ", p," ;root1: ", root1,"; arrSize[root1]: ", arrSize[root1]);
        console.log("q: ", q,"; root2: ", root2,"; arrSize[root2]: ", arrSize[root2]);
        if(root1 === root2) return false; // are in the same group
        if(arrSize[root1] < arrSize[root2]){
            arrSize[root2] += arrSize[root1];
            arrRoot[root1] = parseInt(root2);
        }else{
            arrSize[root1] += arrSize[root2];
            arrRoot[root2] = parseInt(root1);
        }
        this.numComponents--;
        console.log("------------------");
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
        console.log(temporalArr);
        let arrSize = [];
        let arrRoot = [];
        for(let i=0; i<this.myGraph.numNodes; i++){
            arrSize.push(1);
            arrRoot.push(i);
        }
        let i = 0;
        while(i<temporalArr.length){
            let p = parseInt(temporalArr[i][0]);
            let q = parseInt(temporalArr[i][1]);
            if(this.union(p,q,arrRoot,arrSize)){
                let w = parseInt(temporalArr[i][2]);
                this.solution.push([p,q,w]);
            }
            console.log("arrSize: ", arrSize);
            console.log("arrRoot: ", arrRoot);
            i++;
        }
    }
}