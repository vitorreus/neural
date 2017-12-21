import {Matrix, Vector, sigmoid} from "./Math";
export class Layer{
	weigths:number[][] = [];
	bias:number[] = [];
	constructor(inSize:number, outSize:number){
		this.bias = [];
		for (var i = 0; i < outSize; i++){
			this.bias.push(Math.random()*2-1);
		}
		this.weigths =[];
		for (var i=0; i < outSize; i++){
			this.weigths.push([])
			for (var j=0; j < inSize; j++){
				this.weigths[i].push(Math.random()*2-1);
			}
		}
	}
	activate(activation:number[]){
		return  this.activateZ(activation).map(sigmoid);
	}

	activateZ(activation:number[]){
		if (activation.length != this.weigths[0].length){
			throw "Incompatible layer input size";
			
		}
		return  Vector.add(
				Matrix.multiply(this.weigths,activation),
				this.bias);
	}
}