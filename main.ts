import {Layer} from "./Layer";
import {sigmoid, sigmoidPrime, inverse, Vector, Matrix} from "./Math";
import {LayerGradient} from "./LayerGradient"



class Tuple {
	activation: number[];
	result: number[];
	constructor(activation:number[] = [], result:number[] = []){
		this.activation = activation;
		this.result = result;
	}
}

class Network{
	layers:Layer[];
	constructor(layerSizes:number[]){
		this.layers = [];
		for(var i:number = 0; i< layerSizes.length-1;i++){
			this.layers.push(new Layer(layerSizes[i], layerSizes[i+1]));
		}
	}
	activate(input:number[]):number[]{
		var result = input;
		for(var i:number = 0; i< this.layers.length;i++){
			result = this.layers[i].activate(result);
		}
		return result;
	}

	learn(batch : Tuple[],eta:number){
		var nabla:Layer[] = [];
		for (var layer of this.layers){
			nabla.push(new Layer(layer.weigths[0].length,layer.bias.length, ()=>0));
		}
		for ( var tuple of batch){
			var deltas:LayerGradient[] = this.backprop(tuple.activation, tuple.result);
			for (var i = 0; i < deltas.length; i++){
				nabla[i].add(deltas[i]);
			}
		}
		for (var i:number =0; i< this.layers.length; i++){
			this.layers[i].weigths = Matrix.subtract(this.layers[i].weigths,
				Matrix.map(nabla[i].weigths,(nw)=>(eta/batch.length)*nw));
			this.layers[i].bias = Vector.subtract(this.layers[i].bias,
				nabla[i].bias.map((nb)=>(eta/batch.length)*nb));
		}
	}

	backprop(activation :number[],expectedOutput:number[]):LayerGradient[]{
		//init:
		var result:LayerGradient[] = [];
		for (var i:number = 0; i < this.layers.length; i++){
			result.push(new LayerGradient());
		}
		//feedforward
		var activations:number[][] = [activation];
		var zs:number[][] = [] //list to store all the z vectors, layer by layer
		for(var i:number = 0; i< this.layers.length;i++){
			var z:number[] = this.layers[i].activateZ(activation);
			zs.push(z);
			activation = z.map(sigmoid);
			activations.push(activation);
		}
		//backward pass
		var delta:number[] = Vector.product( cost_derivative(activations[activations.length-1],expectedOutput) ,
		        zs[zs.length-1].map(sigmoidPrime));
		result[result.length-1].bias = delta;
		result[result.length-1].weigths =delta.map((d:number):number[] =>
			activations[activations.length-2].map((a:number):number => a*d)
		);
		for (var l:number = 2; l <= this.layers.length; l++){
			z = zs[zs.length-l]
			var sp:number[] = z.map(sigmoidPrime)
			delta = Vector.product(
				Matrix.multiply(
					Matrix.transpose(this.layers[this.layers.length-l+1].weigths),
					delta),
				sp);
			result[result.length-l].bias = delta;
			result[result.length-l].weigths = delta.map((d:number):number[] =>
				activations[this.layers.length-l-1].map((a:number):number => a*d)
			);

		}

		return result;
	}

}

function cost_derivative(output_activations:number[], y:number[]):number[]{
	return Vector.add(output_activations,y.map(inverse))
}
