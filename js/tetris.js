field = document.querySelector(".tetris_field");
cells = document.querySelectorAll(".tetris_cell");
buttons = document.querySelectorAll(".tetris_btn");


let matrix = [
	0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
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

function move() {
	for (let key in matrix) {
		if (matrix[key] == 1) {
			if (matrix[parseInt(key)+11] == 0) {
				matrix[key] = 0;
				matrix[parseInt(key)+11] = 2;
			} else if (matrix[parseInt(key)-11] == undefined) {
				clearInterval(timerId);
				console.log('stop');
			} else {
				matrix[key] = 'purple';
				matrix[5] = 1;
			}
		}
		if (matrix[key] == 2) {
			matrix[key] = 1;
		}
	}
	visualization();
	//console.log('loop');
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
			case 'purple':
				//console.log(key*11+i);
				cells[key].style.background="purple";
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
//shapeCreation();
let timerId = setInterval(move, 50);