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
	buffer[177] = 1;
	buffer[187] = 1;
	buffer[198] = 1;
	buffer[202] = 1;
	buffer[191] = 1;
	buffer[190] = 1;
	buffer[179] = 1;
	buffer[210] = 1;
	buffer[211] = 1;
	buffer[212] = 1;
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
				//gameOver();
				console.log('stop');
			} else {
				// Если внизу нет свободных ячеек записывает в текущую ячейку текст и создаем новую фигуру
				buffer[key] = 'stop';
				center = 0;
				figureCreation();
				//console.log('true');
			}
		}
	}
	// Перезаписываем игровое поле
	for (let key in buffer) {
		matrix[key] = buffer[key];
	}
	// Визуализируем массив игрового поля на сайте
	visualization();
	console.log('loop');
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
			default:
				cells[key].style.background="grey";
		}
	}
}

//visualization();
//move();
figureCreation();
let timerId = setInterval(move, 500);