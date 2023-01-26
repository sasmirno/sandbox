field = document.querySelector(".tetris_field");
cells = document.querySelectorAll(".tetris_cell");
buttons = document.querySelectorAll(".tetris_btn");

// Имитация игрового поля
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

// Копия игрового поля
let buffer = Array.from(matrix);

// Создание фигуры
function figureCreation() {
	/*buffer[3] = 1;
	buffer[4] = 1;
	buffer[5] = 1;
	buffer[6] = 1;
	left = -10;
	right = 15;*/

	buffer[4] = 2;
	buffer[5] = 2;
	buffer[6] = 2;
	buffer[16] = 2;
	left = -15;
	right = 15;/**/

	/*buffer[4] = 3;
	buffer[5] = 3;
	buffer[15] = 3;
	buffer[16] = 3;
	left = -15;
	right = 20;*/

	/*buffer[4] = 4;
	buffer[5] = 4;
	buffer[15] = 4;
	buffer[26] = 4;
	left = -15;
	right = 20;*/

	/*buffer[4] = 5;
	buffer[5] = 5;
	buffer[16] = 5;
	buffer[17] = 5;
	left = -15;
	right = 15;*/
}

// Экран конца игры
function gameOver() {
	// Буква G
	buffer[177] = 6;
	buffer[179] = 6;
	buffer[187] = 6;
	buffer[190] = 6;
	buffer[191] = 6;
	buffer[198] = 6;
	buffer[202] = 6;
	buffer[210] = 6;
	buffer[211] = 6;
	buffer[212] = 6;
	// Буква A
	buffer[122] = 6;
	buffer[123] = 6;
	buffer[124] = 6;
	buffer[125] = 6;
	buffer[132] = 6;
	buffer[135] = 6;
	buffer[143] = 6;
	buffer[146] = 6;
	buffer[155] = 6;
	buffer[156] = 6;
	buffer[157] = 6;
	buffer[158] = 6;
	// Буква M
	buffer[55] = 6;
	buffer[56] = 6;
	buffer[57] = 6;
	buffer[58] = 6;
	buffer[59] = 6;
	buffer[67] = 6;
	buffer[79] = 6;
	buffer[89] = 6;
	buffer[99] = 6;
	buffer[100] = 6;
	buffer[101] = 6;
	buffer[102] = 6;
	buffer[103] = 6;
	// Буква E
	buffer[11] = 6;
	buffer[15] = 6;
	buffer[22] = 6;
	buffer[24] = 6;
	buffer[26] = 6;
	buffer[33] = 6;
	buffer[34] = 6;
	buffer[35] = 6;
	buffer[36] = 6;
	buffer[37] = 6;
	// Буква O
	buffer[183] = 6;
	buffer[184] = 6;
	buffer[185] = 6;
	buffer[193] = 6;
	buffer[197] = 6;
	buffer[204] = 6;
	buffer[208] = 6;
	buffer[216] = 6;
	buffer[217] = 6;
	buffer[218] = 6;
	// Буква V
	buffer[105] = 6;
	buffer[106] = 6;
	buffer[107] = 6;
	buffer[119] = 6;
	buffer[131] = 6;
	buffer[141] = 6;
	buffer[149] = 6;
	buffer[150] = 6;
	buffer[151] = 6;
	// Буква E
	buffer[61] = 6;
	buffer[65] = 6;
	buffer[72] = 6;
	buffer[74] = 6;
	buffer[76] = 6;
	buffer[83] = 6;
	buffer[84] = 6;
	buffer[85] = 6;
	buffer[86] = 6;
	buffer[87] = 6;
	// Буква R
	buffer[7] = 6;
	buffer[17] = 6;
	buffer[19] = 6;
	buffer[21] = 6;
	buffer[28] = 6;
	buffer[30] = 6;
	buffer[31] = 6;
	buffer[39] = 6;
	buffer[40] = 6;
	buffer[41] = 6;
	buffer[42] = 6;
	buffer[43] = 6;
	visualization();
}

// Движение фигуры вниз
function move() {
	// Проверка если свободное место под фигурой
	let free = true;
	for (let key in matrix) {
		if (isNaN(matrix[key]) == false && matrix[key] != 0) {
			if (isNaN(matrix[parseInt(key)+11]) == true) {
				free = false;
			}
		}
	}
	for (let key in matrix) {
		// Ищем все числа кроме нуля в массиве игрового поля
		if (isNaN(matrix[key]) == false && matrix[key] != 0) {
			if (free == true) {
				buffer[parseInt(key)+11] = matrix[key];
				if (matrix[parseInt(key)-11] == 0 || matrix[parseInt(key)-11] == undefined) {
					// Если верхния ячейка свободна обнуляем текущую ячейку
					buffer[key] = 0;
				}
			} else if (matrix[parseInt(key)-11] == undefined) {
				// Если верхния ячейка отсуствует останавливаем таймер
				clearInterval(timerId);
				gameOver();
				console.log('stop');
			} else {
				// Если внизу нет свободных ячеек записывает в текущую ячейку текст и создаем новую фигуру
				buffer[key] = 'stop';
				center = 0;
				figureCreation();
			}
		}
	}
	// Перезаписываем игровое поле
	for (let key in buffer) {
		matrix[key] = buffer[key];
	}
	// Визуализируем массив игрового поля на сайте
	visualization();
	//console.log('loop');
}

//console.log(matrix);
//console.log(cells);

// Кнопки управления
let center = 0;
let left;
let right;
for (i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function() {
		let input = this.id;
		//console.log(input);
		if (input == 'down') {
			move();
		}
		if (input == 'left' && center>left) {
			// Проверка если свободное место слева от фигуры
			let free = true;
			for (let key in matrix) {
				if (isNaN(matrix[key]) == false && matrix[key] != 0) {
					if (isNaN(matrix[parseInt(key)-1]) == true) {
						free = false;
					}
				}
			}
			for (let key in matrix) {
				if (isNaN(matrix[key]) == false && matrix[key] != 0) {
					if (free == true) {
						center -= 1;
						buffer[parseInt(key)-1] = matrix[key];
						if (matrix[parseInt(key)+1] == 0 || matrix[parseInt(key)+1] == undefined || isNaN(matrix[parseInt(key)+1]) == true) {
							buffer[key] = 0;
						}
					}
				}/**/
			}
		}
		if (input == 'right' && center<right) {
			// Проверка если свободное место слева от фигуры
			let free = true;
			for (let key in matrix) {
				if (isNaN(matrix[key]) == false && matrix[key] != 0) {
					if (isNaN(matrix[parseInt(key)+1]) == true) {
						free = false;
					}
				}
			}
			for (let key in matrix) {
				if (isNaN(matrix[key]) == false && matrix[key] != 0) {
					if (free == true) {
						center += 1;
						buffer[parseInt(key)+1] = matrix[key];
						if (matrix[parseInt(key)-1] == 0 || matrix[parseInt(key)-1] == undefined || isNaN(matrix[parseInt(key)-1]) == true) {
							buffer[key] = 0;
						}
					}
				}/**/
			}
		}
		if (input == 'turn') {
			console.log('turn');
		}
		for (let key in buffer) {
			matrix[key] = buffer[key];
		}
		visualization();
	});
}/**/

function visualization() {
	for (let key in matrix) {
		switch (matrix[key]) {
			case 0:
				//console.log(key*11+i);
				cells[key].style.background="white";
			break;
			case 1:
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
			case 6:
				cells[key].style.background="black";
			break;
			default:
				cells[key].style.background="grey";
		}
	}
}

//visualization();
//move();
figureCreation();
let timerId = setInterval(move, 500);