field = document.querySelector(".tetris_field");
cells = document.querySelectorAll(".tetris_cell");
buttons = document.querySelectorAll(".tetris_btn");


let matrix = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

let arr = Array.from(matrix);

function figureCreation() {
	arr[5] = 1;
	arr[16] = 1;
	//arr[27] = 1;
	//arr[38] = 1;
}

function move() {
	for (let key in matrix) {
		if (matrix[key] == 1) {
			if (matrix[parseInt(key)+11] == 0) {
				arr[parseInt(key)+11] = matrix[key];
				if (matrix[parseInt(key)-11] == 0 || matrix[parseInt(key)-11] == undefined) {
					arr[key] = 0;
				}
			} else if (matrix[parseInt(key)+22] == 0) {
				//arr[parseInt(key)+22] = 1;
				if (matrix[parseInt(key)-11] == 0 || matrix[parseInt(key)-11] == undefined) {
					arr[key] = 0;
				}
			} else if (matrix[parseInt(key)+33] == 0) {
				//arr[parseInt(key)+33] = 1;
				if (matrix[parseInt(key)-11] == 0 || matrix[parseInt(key)-11] == undefined) {
					arr[key] = 0;
				}
			} else if (matrix[parseInt(key)+44] == 0) {
				//arr[parseInt(key)+44] = 1;
				if (matrix[parseInt(key)-11] == 0 || matrix[parseInt(key)-11] == undefined) {
					arr[key] = 0;
				}
			} else if (matrix[parseInt(key)-11] == undefined) {
				clearInterval(timerId);
				console.log('stop');
			} else {
				arr[key] = 'grey';
				figureCreation();
			}
		}
	}
	for (let key in arr) {
		matrix[key] = arr[key];
	}
	visualization();
	console.log('loop');
}

//console.log(matrix);
//console.log(cells);

function visualization() {
	for (let key in matrix) {
		switch (matrix[key]) {
			case 0:
				//console.log(key);
				cells[key].style.background="white";
			break;
			case 1:
				//console.log(matrix[key]);
				//console.log(key);
				//console.log(i);
				//console.log(cells[i].length);
				//console.log(key*11+i);
				cells[key].style.background="red";
			break;
			case 2:
				cells[key].style.background="green";
			break;
			case 3:
				cells[key].style.background="blue";
			break;
			case 4:
				cells[key].style.background="orange";
			break;
			case 5:
				cells[key].style.background="purple";
			break;
			case 'grey':
				//console.log(key*11+i);
				cells[key].style.background="grey";
			break;
			default:
		}/**/
		//console.log(matrix[key]);
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

//visualization();
//move();
figureCreation();
let timerId = setInterval(move, 50);