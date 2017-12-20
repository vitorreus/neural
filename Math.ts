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
}

export class Vector{
	static add(v1:number[], v2:number[]){
		var result:number[] = [];
		for (var i:number = 0; i < v1.length; i++){
			result.push(v1[i]+v2[i]);
		}
		return result;
	}
}


export function sigmoid(x:number): number{
	return 1 / (1+ Math.pow( Math.E, -x))
}