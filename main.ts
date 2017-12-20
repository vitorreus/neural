import {Layer} from "./Layer";


class Network{
	layers:Layer[];
	constructor(layerSizes:number[]){
		this.layers = [];
		for(var i:number = 0; i< layerSizes.length-1;i++){
			this.layers.push(new Layer(layerSizes[i], layerSizes[i+1]));
		}
	}
	activate(input:number[]){
		var result = input;
		for(var i:number = 0; i< this.layers.length;i++){
			result = this.layers[i].activate(result);
		}
		return result;
	}
}

console.log (new Network([3,2]));

console.log (new Network([16,16,10]).activate([1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6]));