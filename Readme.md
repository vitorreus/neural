Neural network experiments
==========================

Implementation of a feedforward network that learns using backpropagation.

Usage sample:
```
import {Tuple, Network} from "./Network"

var trainingSet:Tuple[] = [
	new Tuple([0,0],[1]),
	new Tuple([0,1],[0]),
	new Tuple([1,0],[0]),
	new Tuple([1,1],[1])];

console.log("Learning xor...")
var neuronsPerLayer = [2,2,1];
var network = new Network(neuronsPerLayer);
for (var i = 0; i < 1000; i++){
	var learningSpeed = 10
	network.learn(trainingSet,learningSpeed);
}
console.log("Done.")

console.log("0,0:")
console.log(network.activate([0,0]))
console.log("0,1:")
console.log(network.activate([0,1]))
console.log("1,0:")
console.log(network.activate([1,0]))
console.log("1,1:")
console.log(network.activate([1,1]))
```

Handwritten recognition demo:
-----------------------------

Run webpack and then open index.html
Wait for the learning process to complete (folow the progress in console)
Write a digit and see the result.
