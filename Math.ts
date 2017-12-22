export class Matrix{
	static multiply(matrix:number[][], vector:number[]){
		if (matrix[0].length != vector.length){
			throw "Incompatible matrix and vector size";
			
		}
		var result:number[] = [];
		for (var i:number = 0; i < matrix.length; i++){
			result[i] = 0;
		}
		for (var row:number=0; row < matrix.length; row++){
			for (var column:number=0;column < vector.length;column++){
				result[row] = result[row]+matrix[row][column] * vector[column];
			}
		}
		return result;
	}

	static add(m1:number[][],m2:number[][]):number[][]{
		var result:number[][] = []
		for (var i = 0; i <m1.length; i++){
			result.push(Vector.add(m1[i], m2[i]));
		}
		return result;
	}

	static subtract(m1:number[][],m2:number[][]):number[][]{
		var result:number[][] = []
		for (var i = 0; i <m1.length; i++){
			result.push(Vector.subtract(m1[i], m2[i]));
		}
		return result;
	}

	static map(matrix:number[][], fun:(x:number)=>number):number[][]{
		var result:number[][] = [];
		for (var line of matrix){
			result.push(line.map(fun));
		}
		return result
	}

	static transpose(matrix:number[][]):number[][]{
		var newArray:number[][] = [],
		    origArrayLength:number = matrix.length,
		    arrayLength:number = matrix[0].length,
		    i:number;
		for(i = 0; i < arrayLength; i++){
		    newArray.push([]);
		};

		for(i = 0; i < origArrayLength; i++){
		    for(var j = 0; j < arrayLength; j++){
		        newArray[j].push(matrix[i][j]);
		    };
		};
		return newArray;
	}
}

export class Vector{
	static op(v1:number[], v2:number[], fun:(n1:number,n2:number) => number):number[]{
		var result:number[] = [];
		for (var i:number = 0; i < v1.length; i++){
			result.push(fun(v1[i],v2[i]));
		}
		return result;
	}

	static add(v1:number[], v2:number[]):number[]{
		var result:number[] = [];
		for (var i:number = 0; i < v1.length; i++){
			result.push(v1[i]+v2[i]);
		}
		return result;
	}

	static subtract(v1:number[], v2:number[]):number[]{
		return this.add(v1,v2.map(inverse));
	}

	static cost(result:number[],expected:number[]):number{
		return Vector.add(result, expected.map(inverse))
			.map(square)
			.reduce(sum,0);
	}

	static product(v1:number[], v2:number[]):number[]{
		var result:number[] = []
		for (var i:number = 0; i < v1.length; i++){
			result.push(v1[i]*v2[i]);
		}
		return result;
	}
}

export function inverse(x:number):number{
	return -x;
}

export function square(x:number):number{
	return Math.pow(x,2);
}

export function sum(a,b):number{
	return a+b;
}

export function sigmoid(x:number): number{
	return 1 / (1+ Math.pow( Math.E, -x))
}

export function sigmoidPrime(x:number): number {
	return sigmoid(x)*(1-sigmoid(x));
}