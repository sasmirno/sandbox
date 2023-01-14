field = document.querySelector(".tetris_field");
cells = document.querySelectorAll(".tetris_cell");
buttons = document.querySelectorAll(".tetris_btn");


let matrix = [
	[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
];

let x = 5;
let y = 0;
let сolumns = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

function move() {
	//let cell;
	for (let key in matrix) {
		for (i=0; i<11; i++) {
			if (matrix[key][i] == 1) {
				matrix[key][i] = 0;
				matrix[parseInt(key)+1][i] = 2;
				//console.log(matrix[parseInt(key)+1][i]);
				//console.log(parseInt(key)+1);
				//console.log(i);
			} else {
				//clearInterval(timerId);
				//console.log('i');
			}
		}
		for (i=0; i<11; i++) {
			if (key < matrix.length) {
				if (matrix[key][i] == 2) {
					if (matrix[parseInt(key)+1][i] == 0) {
						matrix[key][i] = 1;
					} else {
						matrix[key][i] = 3;
						clearInterval(timerId);
						matrix[0][5] = 1;
						move();
					}
					//console.log(matrix[parseInt(key)+1][i]);
					//console.log(parseInt(key)+1);
					//console.log(key);
					//cell = key;
				} else {
					//matrix[key][i] = 3;
				}
			}
		}/**/
	}
	visualization();
	/*if (cell < 19) {
		setTimeout(move, 50);
	} else {
		matrix[0][5] = 1;
		cell = 0;
		//move();
	}
	*/
	//clearInterval(timerId);
}
console.log(matrix);
//console.log(cells);

function visualization() {
	for (let key in matrix) {
		for (i=0; i<11; i++) {
			switch (matrix[key][i]) {
				case 0:
					//console.log(key*11+i);
					cells[key*11+i].style.background="white";
				break;
				case 1:
					//console.log(matrix[key][i]);
					//console.log(key);
					//console.log(i);
					//console.log(cells[i].length);
					//console.log(key*11+i);
					cells[key*11+i].style.background="red";
				break;
				case 3:
					//console.log(key*11+i);
					cells[key*11+i].style.background="purple";
				break;
				default:
			}/**/
		}
	}
}

// Кнопки управления
/*for (i = 0; i < buttons.length; i++) {
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
}*/

visualization();
move();
//shapeCreation();
let timerId = setInterval(move, 50);