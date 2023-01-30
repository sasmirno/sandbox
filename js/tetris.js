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
function figure(a, b, c, d, l, r) {
	buffer[a] = 2;
	buffer[b] = 2;
	buffer[c] = 2;
	buffer[d] = 2;
	left = l;
	right = r;/**/
}

function figureCreation() {

	return figure(4, 5, 6, 16, -15, 15);

	/*buffer[3] = 1;
	buffer[4] = 1;
	buffer[5] = 1;
	buffer[6] = 1;
	left = -10;
	right = 15;*/

	/*buffer[4] = 2;
	buffer[5] = 2;
	buffer[6] = 2;
	buffer[16] = 2;
	left = -15;
	right = 15;*/

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
				orientation = 0;
				iteration = -1;
				figureCreation();
			}
		}
	}
	iteration += 1;
	//console.log(iteration);
	// Перезаписываем игровое поле
	for (let key in buffer) {
		matrix[key] = buffer[key];
	}
	// Визуализируем массив игрового поля на сайте
	visualization();
	//console.log('move');
}

//console.log(matrix);
//console.log(cells);

// Кнопки управления
let orientation = 0;
let center = 0;
let left;
let right;
let iteration = -1;
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
			let free = true;
			let position = 11*iteration+center/4;
			//console.log(position);
			/*for (let key in matrix) {
				if (isNaN(matrix[key]) == false && matrix[key] != 0) {
					if (isNaN(matrix[parseInt(key)+1]) == true) {
						free = false;
					}
				}
			}*/
			// Функция проверки свободных ячеек
			function check(a, b, c, d) {
				let arr = [a, b, c, d];
				for (let key of arr) {
					if (isNaN(matrix[parseInt(key)]) == true) {
						//console.log(matrix[parseInt(key)]);
						free = false;
					}
				}
			}
			// Функция обнуления ячеек
			function zeroing() {
				for (let key in matrix) {
					if (isNaN(matrix[key]) == false && matrix[key] != 0) {
						if (free == true) {
							buffer[key] = 0;
						}
					}
				}
			}

			let figure0 = [4, 5, 6, 16, -15, 15];
			//let figure0 = [15, 16, 17, 27, -15, 15];
			let figure90 = [6, 16, 17, 28, -20, 15];
			//let figure90 = [5, 15, 16, 27, -15, 20];
			let figure180 = [16, 26, 27, 28, -15, 15];
			//let figure180 = [5, 15, 16, 17, -15, 15];
			let figure270 = [4, 15, 16, 26, -15, 20];
			//let figure270 = [5, 16, 17, 27, -20, 15];

			switch(orientation) {
				case 0:
					check(figure90[0]+position, figure90[1]+position, figure90[2]+position, figure90[3]+position);
					if (free == true) {
						zeroing();
						figure(figure90[0]+position, figure90[1]+position, figure90[2]+position, figure90[3]+position, figure90[4], figure90[5]);
						orientation = 90;
					}
				break;
				case 90:
					if (center == -20) {
						position += 1;
						center += 4;
					}
					check(figure180[0]+position, figure180[1]+position, figure180[2]+position, figure180[3]+position);
					if (free == true) {
						zeroing();
						figure(figure180[0]+position, figure180[1]+position, figure180[2]+position, figure180[3]+position, figure180[4], figure180[5]);
						orientation = 180;
					}
				break;
				case 180:
					check(figure270[0]+position, figure270[1]+position, figure270[2]+position, figure270[3]+position);
					if (free == true) {
						zeroing();
						figure(figure270[0]+position, figure270[1]+position, figure270[2]+position, figure270[3]+position, figure270[4], figure270[5]);
						orientation = 270;
					}
				break;
				case 270:
					if (center == 20) {
						position -= 1;
						center -= 4;
					}
					check(figure0[0]+position, figure0[1]+position, figure0[2]+position, figure0[3]+position);
					if (free == true) {
						zeroing();
						figure(figure0[0]+position, figure0[1]+position, figure0[2]+position, figure0[3]+position, figure0[4], figure0[5]);
						orientation = 0;
					}
				break;
			}
			//console.log(orientation);
			//console.log('turn');
		}
		//console.log(center);
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
			case 'gg':
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


// Экран конца игры
function gameOver() {
	// Буква G
	buffer[177] = 'gg';
	buffer[179] = 'gg';
	buffer[187] = 'gg';
	buffer[190] = 'gg';
	buffer[191] = 'gg';
	buffer[198] = 'gg';
	buffer[202] = 'gg';
	buffer[210] = 'gg';
	buffer[211] = 'gg';
	buffer[212] = 'gg';
	// Буква A
	buffer[122] = 'gg';
	buffer[123] = 'gg';
	buffer[124] = 'gg';
	buffer[125] = 'gg';
	buffer[132] = 'gg';
	buffer[135] = 'gg';
	buffer[143] = 'gg';
	buffer[146] = 'gg';
	buffer[155] = 'gg';
	buffer[156] = 'gg';
	buffer[157] = 'gg';
	buffer[158] = 'gg';
	// Буква M
	buffer[55] = 'gg';
	buffer[56] = 'gg';
	buffer[57] = 'gg';
	buffer[58] = 'gg';
	buffer[59] = 'gg';
	buffer[67] = 'gg';
	buffer[79] = 'gg';
	buffer[89] = 'gg';
	buffer[99] = 'gg';
	buffer[100] = 'gg';
	buffer[101] = 'gg';
	buffer[102] = 'gg';
	buffer[103] = 'gg';
	// Буква E
	buffer[11] = 'gg';
	buffer[15] = 'gg';
	buffer[22] = 'gg';
	buffer[24] = 'gg';
	buffer[26] = 'gg';
	buffer[33] = 'gg';
	buffer[34] = 'gg';
	buffer[35] = 'gg';
	buffer[36] = 'gg';
	buffer[37] = 'gg';
	// Буква O
	buffer[172] = 'gg';
	buffer[173] = 'gg';
	buffer[174] = 'gg';
	buffer[182] = 'gg';
	buffer[186] = 'gg';
	buffer[193] = 'gg';
	buffer[197] = 'gg';
	buffer[205] = 'gg';
	buffer[206] = 'gg';
	buffer[207] = 'gg';
	// Буква V
	buffer[105] = 'gg';
	buffer[106] = 'gg';
	buffer[107] = 'gg';
	buffer[119] = 'gg';
	buffer[131] = 'gg';
	buffer[141] = 'gg';
	buffer[149] = 'gg';
	buffer[150] = 'gg';
	buffer[151] = 'gg';
	// Буква E
	buffer[61] = 'gg';
	buffer[65] = 'gg';
	buffer[72] = 'gg';
	buffer[74] = 'gg';
	buffer[76] = 'gg';
	buffer[83] = 'gg';
	buffer[84] = 'gg';
	buffer[85] = 'gg';
	buffer[86] = 'gg';
	buffer[87] = 'gg';
	// Буква R
	buffer[7] = 'gg';
	buffer[17] = 'gg';
	buffer[19] = 'gg';
	buffer[10] = 'gg';
	buffer[28] = 'gg';
	buffer[30] = 'gg';
	buffer[20] = 'gg';
	buffer[39] = 'gg';
	buffer[40] = 'gg';
	buffer[41] = 'gg';
	buffer[42] = 'gg';
	buffer[43] = 'gg';
	visualization();
}