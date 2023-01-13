field = document.querySelector(".tetris_field");
cells = document.querySelectorAll(".tetris_cell");
buttons = document.querySelectorAll(".tetris_btn");


let matrix = [
	[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let x = 5;
let y = 0;
let сolumns = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

function move() {
	//let cell;
	for (let key in matrix) {
		for (i=0; i<11; i++) {
			if (matrix[key][i] == 1 && [parseInt(key)+1][i] != 3) {
				matrix[key][i] = 0;
				matrix[parseInt(key)+1][i] = 2;
				//console.log(matrix[parseInt(key)+1][i]);
				//console.log(parseInt(key)+1);
				//console.log(i);
			}
		}
		for (i=0; i<11; i++) {
			if (matrix[key][i] == 2 && [parseInt(key)+1][i] != 3) {
				//matrix[parseInt(key)-1][i] = 0;
				matrix[key][i] = 1;
				//matrix[parseInt(key)+1][i] = 2;
				//console.log(matrix[parseInt(key)+1][i]);
				//console.log(parseInt(key)+1);
				//console.log(key);
				//cell = key;
			}
		}
	}
	visualization();
	/*if (cell < 19) {
		setTimeout(move, 50);
	}*/
	//clearInterval(timerId);
}
console.log(matrix);
//console.log(cells);

function visualization() {
	for (let key in matrix) {
		for (i=0; i<11; i++) {
			//if (matrix[key][i] == 1) {}
			//let g = matrix[key][i];
			//console.log(g);
			switch (matrix[key][i]) {
				case 0:
					//console.log('0');
				break;
				case 1:
					//console.log(matrix[key][i]);
					console.log(key);
					console.log(i);
					//console.log(cells[i].length);
					//console.log(matrix[key][i]);
					cells[i].style.background="red";
				break;
				case 3:
					//console.log(matrix[key][i]);
					//console.log(key);
					//console.log(i);
					//console.log('3');
				break;
				default:
			}/**/
		}
	}
}

// Кнопки управления
for (i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function() {
		let input = this.id;
		//console.log(input);
		if (input == 'left' && x>0) {
			if (сolumns[x-1] > y) {
				x += -1;
				shape.style.left = x*25+"px";
			}
			//console.log(сolumns[x-1]);
		}
		if (input == 'right' && x<10) {
			if (сolumns[x+1] > y) {
				x += 1;
				shape.style.left = x*25+"px";
			}
			//console.log(сolumns[x+1]);
		}
		//console.log(x);
		//console.log(сolumns[x]);
	});
}

visualization();
//move();
//shapeCreation();
//let timerId = setInterval(move, 50);