import "./Canvas"
let canvas:HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
let resizedCanvas:HTMLCanvasElement = document.getElementById('resize') as HTMLCanvasElement;
canvas.addEventListener('mouseup', resize, false);

let clearBtn = document.getElementById('clear')
clearBtn.addEventListener("click", clear)

function resize(){
	
	let ctx:CanvasRenderingContext2D = resizedCanvas.getContext('2d');
	ctx.drawImage(canvas , 0, 0, 280, 280, 0, 0, 28, 28);
	var data:ImageData = ctx.getImageData(10,10,50,50);
	console.log(data.data);
}

function clear(){
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	resizedCanvas.getContext('2d').clearRect(0, 0, resizedCanvas.width, resizedCanvas.height);
}