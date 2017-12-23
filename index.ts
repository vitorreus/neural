import "./Canvas"
import {Tuple, Network} from "./Network"
import  mnist = require(  "mnist" );

let canvas:HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
let resizedCanvas:HTMLCanvasElement = document.getElementById('resize') as HTMLCanvasElement;
canvas.addEventListener('mouseup', resize, false);

let clearBtn = document.getElementById('clear')
clearBtn.addEventListener("click", clear)

function resize(){
	
	let ctx:CanvasRenderingContext2D = resizedCanvas.getContext('2d');
	ctx.drawImage(canvas , 0, 0, 280, 280, 0, 0, 28, 28);
	var data:ImageData = ctx.getImageData(0,0,28,28);
	console.log(data.data);
	var input:number[] = [];
	for (var i = 0; i < data.data.length; i+=4){
		input.push(data.data[i+3]/255.0);
	}
	console.log("input:")
	console.log(input)
	var result = network.activate(input)
	console.log(result);
	var resultElement = document.getElementById("result");
	var resultObj = result.map((it, index)=> { return {'prob':it,'number':index} });
	resultObj = resultObj.sort((a:any,b:any) =>  b.prob - a.prob);
	resultElement.innerHTML =  `${resultObj[0].number} (${Math.round(resultObj[0].prob*100)}%)  
								${resultObj[1].number} (${Math.round(resultObj[1].prob*100)}%)
								${resultObj[2].number} (${Math.round(resultObj[2].prob*100)}%)
								`

}

function clear(){
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	resizedCanvas.getContext('2d').clearRect(0, 0, resizedCanvas.width, resizedCanvas.height);
}



function getBatch(set, start, end):Tuple[]{
	var result = [];
	for (var i = start; i < end; i++){
		result.push(new Tuple(set[i].input,set[i].output))
	}
	return result;
}

var trainSetSize =  10000
var set = mnist.set(20000, 50);


var batches = 100;
var batchSize = trainSetSize/batches


var neuronsPerLayer = [28*28,16,16,10];
var network = new Network(neuronsPerLayer);

console.log("Learning images...")
var previousPercentile = -1;

var j = 0;
setTimeout(train,1)

var iterations = 15;

function train(){
	for (var i = 0; i < batches; i++){
		var start = i*batchSize;
		var end = start + batchSize;
		var trainingSet:Tuple[] = getBatch(set.training,start, end );
		var learningSpeed = 10
		network.learn(trainingSet,learningSpeed);
		var percentile = Math.round( i/batches*100 );
		if (percentile%10 == 0 && previousPercentile != percentile){
			previousPercentile = percentile;
			console.log(percentile + "%  Total: " +  j + " of " + iterations)
		}
	}
	if (j++ < iterations){
		setTimeout(train,10)
	}
}
