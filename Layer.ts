import {Matrix, Vector, sigmoid} from "./Math";
import {LayerGradient} from "./LayerGradient"


export class Layer{
	weigths:number[][] = [];
	bias:number[] = [];

	constructor(inSize:number, outSize:number, initFunction?:() => number){
		if (!initFunction){
			initFunction = () => Math.random()*2-1;
		}
		this.init(inSize, outSize, initFunction);
	}

	private init(inSize:number, outSize:number, initFunction?:() => number){
		this.bias = [];
		for (var i = 0; i < outSize; i++){
			this.bias.push(initFunction());
		}
		this.weigths =[];
		for (var i=0; i < outSize; i++){
			this.weigths.push([])
			for (var j=0; j < inSize; j++){
				this.weigths[i].push(initFunction());
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
	add (gradient:LayerGradient){
		this.weigths = Matrix.add(this.weigths,gradient.weigths);
		this.bias = Vector.add(this.bias,gradient.bias);
	}
}