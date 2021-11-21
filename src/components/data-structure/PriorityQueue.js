const INF = 1e9;
const debug = false;
export class PriorityQueue{
    constructor(capacity){
        this.capacity = capacity;
        this.heap_size = 0;
        this.triplete = {};
        this.values = {};
        this.pm = {};
        this.idCount = 0;
        this.im = new Array(capacity);
        for (let i = 0; i < capacity; i++){
            this.im[i] = INF;
        }
    }
    poll(){
        // copiar last element on position  0
        // apply sink;
        let id0 = this.im[0];
        this.im[0] = this.im[this.heap_size-1];
        this.pm[this.im[this.heap_size-1]] = 0;

        this.values[id0] = INF;
        this.im[this.heap_size-1] = INF;
        this.pm[id0] = -1;

        this.heap_size--;
        this.sink(0);
    }
    sink(i){
        while (true){
            let left = this.leftChild(i);
            let right = this.rightChild(i);
            let smallest = left;
            if(debug) console.log(i, this.im[i], " - ",left, right, this.im[right], this.im[left]);
            if(right <= this.heap_size-1 && this.values[this.im[right]] < this.values[this.im[left]]){
                smallest = right;
            }
            if(smallest > this.heap_size-1 || this.values[this.im[smallest]] > this.values[this.im[i]]){
                break;
            }
            this.swap(i, smallest);
            i = smallest;
        }
    }
    // up node i until hi is satisfied
    swim(i){
        while(this.parent(i) >= 0 && this.values[this.im[this.parent(i)]] > this.values[this.im[i]]){
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }
    swap(i, down){
        // swap values
        this.pm[this.im[i]] = down;
        this.pm[this.im[down]] = i;

        let temp = this.im[i];
        this.im[i] = this.im[down];
        this.im[down] = temp;
    }
    insert(edgeObject){
        if(this.heap_size === this.capacity){
            // Crear new arr with double capacity
            let t_im = this.im;
            this.im = new Array(2*this.capacity);

            for(let i = 0; i < this.capacity; i++){
                this.im[i] = INF;
            }

            this.capacity = 2*this.capacity;
            for(let i = 0; i < t_im.length; i++){
                this.im[i] = t_im[i];
            }
        }
        this.heap_size++;
        let i = this.heap_size - 1;
        if(debug) console.log("id, cost, i: ", this.idCount,", " ,edgeObject.cost, ", ", i);
        this.values[this.idCount] = edgeObject.cost;
        this.triplete[this.idCount] = edgeObject;
        this.pm[this.idCount] = this.heap_size-1;
        this.im[this.heap_size-1] = this.idCount;
        this.idCount++;
        this.swim(i);
    }
    empty(){return this.heap_size === 0;}
    parent(i) {return ((i-1)/2)|0;}
    leftChild(i){return (2*i+1);}
    rightChild(i){return (2*i+2);}
    front(){return {id: this.im[0], c: this.values[this.im[0]], e:this.triplete[this.im[0]]}}
}