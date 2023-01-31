field = document.querySelector(".tetris_field");
cells = document.querySelectorAll(".tetris_cell");
buttons = document.querySelectorAll(".tetris_btn");

// Имитация игрового поля
let matrix = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

// Копия игрового поля
let buffer = Array.from(matrix);

// Создание фигуры
function figure(a, b, c, d, l, r, clr) {
	buffer[a] = clr;
	buffer[b] = clr;
	buffer[c] = clr;
	buffer[d] = clr;
	left = l;
	right = r;/**/
}

function figureCreation() {

	//return figure(3, 4, 5, 6, -3, 3, 1);
	return figure(4, 5, 6, 15, -4, 3, 2);
	//return figure(4, 5, 14, 15, -4, 4, 3);
	//return figure(4, 5, 6, 16, -4, 3, 4);
	//return figure(4, 5, 15, 16, -4, 3, 5);

}

// Движение фигуры вниз
function move() {
	// Проверка если свободное место под фигурой
	let free = true;
	for (let key in matrix) {
		if (isNaN(matrix[key]) == false && matrix[key] != 0) {
			if (isNaN(matrix[parseInt(key)+10]) == true) {
				free = false;
			}
		}
	}
	for (let key in matrix) {
		// Ищем все числа кроме нуля в массиве игрового поля
		if (isNaN(matrix[key]) == false && matrix[key] != 0) {
			if (free == true) {
				buffer[parseInt(key)+10] = matrix[key];
				if (matrix[parseInt(key)-10] == 0 || matrix[parseInt(key)-10] == undefined) {
					// Если верхния ячейка свободна обнуляем текущую ячейку
					buffer[key] = 0;
				}
			} else if (matrix[parseInt(key)-10] == undefined) {
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
			// Если свободное место есть двигаем фигуру влево
			if (free == true) {
				center -= 1;
				for (let key in matrix) {
					if (isNaN(matrix[key]) == false && matrix[key] != 0) {
						buffer[parseInt(key)-1] = matrix[key];
						if (matrix[parseInt(key)+1] == 0 || matrix[parseInt(key)+1] == undefined || isNaN(matrix[parseInt(key)+1]) == true) {
							buffer[key] = 0;
						}
					}
				}
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
			// Если свободное место есть двигаем фигуру вправо
			if (free == true) {
				center += 1;
				for (let key in matrix) {
					if (isNaN(matrix[key]) == false && matrix[key] != 0) {
						buffer[parseInt(key)+1] = matrix[key];
						if (matrix[parseInt(key)-1] == 0 || matrix[parseInt(key)-1] == undefined || isNaN(matrix[parseInt(key)-1]) == true) {
							buffer[key] = 0;
						}
					}
				}
			}
		}
		if (input == 'turn') {
			let free = true;
			let position = 10*iteration+center;
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
			// Фигура ''''
			/*let figure0 = [3, 4, 5, 6, -3, 3, 1];
			let figure90 = [-6, 4, 14, 24, -4, 5, 1];
			let figure180 = [3, 4, 5, 6, -3, 3, 1];
			let figure270 = [-5, 5, 15, 25, -5, 4, 1];*/

			// Фигура '|'
			let figure0 = [4, 5, 6, 15, -4, 3, 2];
			let figure90 = [-5, 4, 5, 15, -4, 4, 2];
			let figure180 = [-5, 4, 5, 6, -4, 3, 2];
			let figure270 = [-5, 6, 5, 15, -5, 3, 2];/**/

			// Фигура ||
			/*let figure0 = [4, 5, 14, 15, -4, 4, 3];
			let figure90 = [4, 5, 14, 15, -4, 4, 3];
			let figure180 = [4, 5, 14, 15, -4, 4, 3];
			let figure270 = [4, 5, 14, 15, -4, 4, 3];*/

			// Фигура |''
			/*let figure0 = [4, 5, 6, 16, -4, 3, 4];
			let figure90 = [-5, 5, 14, 15, -4, 4, 4];
			let figure180 = [-6, 4, 5, 6, -4, 3, 4];
			let figure270 = [-5, -4, 5, 15, -5, 3, 4];*/

			// Фигура .|'
			/*let figure0 = [4, 5, 15, 16, -4, 3, 5];
			let figure90 = [-5, 4, 5, 14, -4, 4, 5];
			let figure180 = [4, 5, 15, 16, -4, 3, 5];
			let figure270 = [-5, 4, 5, 14, -4, 4, 5];*/

			switch(orientation) {
				case 0:
					check(figure90[0]+position, figure90[1]+position, figure90[2]+position, figure90[3]+position);
					if (free == true) {
						zeroing();
						figure(figure90[0]+position, figure90[1]+position, figure90[2]+position, figure90[3]+position, figure90[4], figure90[5], figure90[6]);
						orientation = 90;
					}
				break;
				case 90:
					if (center == 4) {
						position -= 1;
						center -= 1;
					}
					check(figure180[0]+position, figure180[1]+position, figure180[2]+position, figure180[3]+position);
					if (free == true) {
						zeroing();
						figure(figure180[0]+position, figure180[1]+position, figure180[2]+position, figure180[3]+position, figure180[4], figure180[5], figure180[6]);
						orientation = 180;
					}
				break;
				case 180:
					check(figure270[0]+position, figure270[1]+position, figure270[2]+position, figure270[3]+position);
					if (free == true) {
						zeroing();
						figure(figure270[0]+position, figure270[1]+position, figure270[2]+position, figure270[3]+position, figure270[4], figure270[5], figure270[6]);
						orientation = 270;
					}
				break;
				case 270:
					if (center == -5) {
						position += 1;
						center += 1;
					}
					check(figure0[0]+position, figure0[1]+position, figure0[2]+position, figure0[3]+position);
					if (free == true) {
						zeroing();
						figure(figure0[0]+position, figure0[1]+position, figure0[2]+position, figure0[3]+position, figure0[4], figure0[5], figure0[6]);
						orientation = 0;
					}
				break;
			}
			//console.log(orientation);
			//console.log('turn');
		}
		console.log(center);
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
	buffer[161] = 'gg';
	buffer[163] = 'gg';
	buffer[170] = 'gg';
	buffer[180] = 'gg';
	buffer[173] = 'gg';
	buffer[174] = 'gg';
	buffer[184] = 'gg';
	buffer[191] = 'gg';
	buffer[192] = 'gg';
	buffer[193] = 'gg';
	// Буква A
	buffer[111] = 'gg';
	buffer[112] = 'gg';
	buffer[113] = 'gg';
	buffer[114] = 'gg';
	buffer[120] = 'gg';
	buffer[130] = 'gg';
	buffer[141] = 'gg';
	buffer[142] = 'gg';
	buffer[143] = 'gg';
	buffer[144] = 'gg';
	buffer[123] = 'gg';
	buffer[133] = 'gg';
	// Буква M
	buffer[50] = 'gg';
	buffer[51] = 'gg';
	buffer[52] = 'gg';
	buffer[53] = 'gg';
	buffer[54] = 'gg';
	buffer[61] = 'gg';
	buffer[72] = 'gg';
	buffer[81] = 'gg';
	buffer[90] = 'gg';
	buffer[91] = 'gg';
	buffer[92] = 'gg';
	buffer[93] = 'gg';
	buffer[94] = 'gg';
	// Буква E
	buffer[10] = 'gg';
	buffer[20] = 'gg';
	buffer[30] = 'gg';
	buffer[31] = 'gg';
	buffer[32] = 'gg';
	buffer[33] = 'gg';
	buffer[34] = 'gg';
	buffer[24] = 'gg';
	buffer[14] = 'gg';
	buffer[22] = 'gg';
	// Буква O
	buffer[156] = 'gg';
	buffer[157] = 'gg';
	buffer[158] = 'gg';
	buffer[165] = 'gg';
	buffer[175] = 'gg';
	buffer[169] = 'gg';
	buffer[179] = 'gg';
	buffer[186] = 'gg';
	buffer[187] = 'gg';
	buffer[188] = 'gg';
	// Буква V
	buffer[95] = 'gg';
	buffer[96] = 'gg';
	buffer[97] = 'gg';
	buffer[108] = 'gg';
	buffer[119] = 'gg';
	buffer[128] = 'gg';
	buffer[137] = 'gg';
	buffer[136] = 'gg';
	buffer[135] = 'gg';
	// Буква E
	buffer[55] = 'gg';
	buffer[65] = 'gg';
	buffer[75] = 'gg';
	buffer[76] = 'gg';
	buffer[77] = 'gg';
	buffer[78] = 'gg';
	buffer[79] = 'gg';
	buffer[67] = 'gg';
	buffer[69] = 'gg';
	buffer[59] = 'gg';
	// Буква R
	buffer[6] = 'gg';
	buffer[9] = 'gg';
	buffer[18] = 'gg';
	buffer[17] = 'gg';
	buffer[15] = 'gg';
	buffer[27] = 'gg';
	buffer[25] = 'gg';
	buffer[35] = 'gg';
	buffer[36] = 'gg';
	buffer[37] = 'gg';
	buffer[38] = 'gg';
	buffer[39] = 'gg';
	visualization();
}