field = document.querySelector(".tetris_field");
cells = document.querySelectorAll(".tetris_cell");
buttons = document.querySelectorAll(".tetris_btn");
infoCells = document.querySelectorAll(".info_cell");

let score = 0; // Счёт

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

// Экран следующей фигуры
let screenNextFigure = [0, 0, 0, 0, 0, 0, 0, 0]

// Создание фигуры
function figure(a, b, c, d, l, r, clr) {
	buffer[a] = clr;
	buffer[b] = clr;
	buffer[c] = clr;
	buffer[d] = clr;
	left = l;
	right = r;
}

// Создание случайной фигуры
let figureNext;
let currentFigure;
function figureCreation() {
	let random = Math.round(Math.random() * (7 - 1) + 1);
	if (currentFigure == undefined) {
		currentFigure = Math.round(Math.random() * (7 - 1) + 1);
	} else {
		currentFigure = figureNext;
	}
	figureNext = random;

	// Создание фигуры в экране следующей фигуры
	for (let key in screenNextFigure) {
		screenNextFigure[key] = 0;
	}
	switch (figureNext) {
		case 1:
			nextFigure(0, 1, 2, 3, 1); // Фигура ''''
		break;
		case 2:
			nextFigure(1, 2, 3, 6, 2); // Фигура '|'
		break;
		case 3:
			nextFigure(1, 2, 5, 6, 3); // Фигура ||
		break;
		case 4:
			nextFigure(1, 2, 3, 7, 4); // Фигура ''|
		break;
		case 5:
			nextFigure(1, 2, 6, 7, 5); // Фигура '|.
		break;
		case 6:
			nextFigure(1, 2, 3, 5, 6); // Фигура |''
		break;
		case 7:
			nextFigure(2, 3, 5, 6, 7); // Фигура .|'
		break;
	}
	function nextFigure(a, b, c, d, clr) {
		screenNextFigure[a] = clr;
		screenNextFigure[b] = clr;
		screenNextFigure[c] = clr;
		screenNextFigure[d] = clr;
	}

	// Создание фигуры в игровом поле
	switch (currentFigure) {
		case 1:
			copyFigure = Array.from(figure1);
		break;
		case 2:
			copyFigure = Array.from(figure2);
		break;
		case 3:
			copyFigure = Array.from(figure3);
		break;
		case 4:
			copyFigure = Array.from(figure4);
		break;
		case 5:
			copyFigure = Array.from(figure5);
		break;
		case 6:
			copyFigure = Array.from(figure6);
		break;
		case 7:
			copyFigure = Array.from(figure7);
		break;
	}
	return figure(copyFigure[1][0], copyFigure[1][1], copyFigure[1][2], copyFigure[1][3], copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
}
// Фигура ''''
let figure1 = [
	['figure1'],
	[3, 4, 5, 6, -3, 3, 1],
	[-6, 4, 14, 24, -4, 5, 1]
];
// Фигура '|'
let figure2 = [
	['figure2'],
	[4, 5, 6, 15, -4, 3, 2],
	[-5, 4, 5, 15, -4, 4, 2],
	[-5, 4, 5, 6, -4, 3, 2],
	[-5, 6, 5, 15, -5, 3, 2]
];
// Фигура ||
let figure3 = [
	['figure3'],
	[4, 5, 14, 15, -4, 4, 3]
];
// Фигура ''|
let figure4 = [
	['figure2'],
	[4, 5, 6, 16, -4, 3, 4],
	[-5, 5, 14, 15, -4, 4, 4],
	[-6, 4, 5, 6, -4, 3, 4],
	[-5, -4, 5, 15, -5, 3, 4]
];
// Фигура '|.
let figure5 = [
	['figure2'],
	[4, 5, 15, 16, -4, 3, 5],
	[-5, 4, 5, 14, -4, 4, 5],
	[-6, -5, 5, 6, -4, 3, 5],
	[-4, 5, 6, 15, -5, 3, 5]
];
// Фигура ..|
let figure6 = [
	['figure2'],
	[4, 5, 6, 14, -4, 3, 6],
	[-6, -5, 5, 15, -4, 4, 6],
	[-4, 4, 5, 6, -4, 3, 6],
	[-5, 5, 15, 16, -5, 3, 6]
];
// Фигура .|'
let figure7 = [
	['figure2'],
	[5, 6, 14, 15, -4, 3, 7],
	[-6, 4, 5, 15, -4, 4, 7],
	[-5, -4, 4, 5, -4, 3, 7],
	[-5, 5, 6, 16, -5, 3, 7]
];

// Функция обнуления ячеек промежуточного поля
function zeroing() {
	for (let key in matrix) {
		if (isNaN(matrix[key]) == false && matrix[key] != 0) {
			buffer[key] = 0;
		}
	}
}

// Движение фигуры вниз
function move() {
	// Проверка есть ли свободное место под фигурой
	let free = true;
	for (let key in matrix) {
		// Ищем все числа кроме нуля в массиве игрового поля
		if (isNaN(matrix[key]) == false && matrix[key] != 0) {
			if (isNaN(matrix[parseInt(key)+10]) == true) {
				free = false;
			} else {
				zeroing();
			}
		}
	}
	if (free == true) {
		for (let key in matrix) {
			// Ищем все числа кроме нуля в массиве игрового поля
			if (isNaN(matrix[key]) == false && matrix[key] != 0) {
				// Создаем их копию в промежуточном поле и смещаем их на один уровень вниз
				buffer[parseInt(key)+10] = matrix[key];
			}
		}
	} else {
		let raz = 0;
		for (let key in matrix) {
			// Ищем все числа кроме нуля в массиве игрового поля
			if (isNaN(matrix[key]) == false && matrix[key] != 0) {
				if (matrix[parseInt(key)-10] == undefined) {
					// Если верхния ячейка отсуствует останавливаем таймер
					clearInterval(downMove);
					clearInterval(speed);
					gameOver();
					console.log('stop');
				} else {
					// Если внизу нет свободных ячеек, то записывает в текущую ячейку некий текст и создаем новую фигуру
					buffer[key] = matrix[key]+'s';
					osX = 0;
					osY = -1;
					orientation = 0;
					// Костыль чтобы срабатывало только один раз, а  не четыре
					raz += 1;
					if (raz == 3){
						figureCreation();
					}
				}
			}
		}
	}
	osY += 1;
	// Перезаписываем игровое поле из промежуточного поля
	matrix = Array.from(buffer);
	// Убираем целые линии
	destroy();
	// Визуализируем массив игрового поля на странице
	visualization();
	//console.log('move');
}

// Кнопки управления
let orientation = 0; // Угол поворота фигуры
let osX = 0; // Отслеживание фигуры по горизонтали
let osY = -1; // Отслеживание фигуры по вертикали
let left; // Левая граница, для разных фигур своя
let right; // Правая граница, для разных фигур своя
for (i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function() {
		let input = this.id;
		let free = true;
		// Кнопка вниз
		if (input == 'down') {
			move();
		}
		// Кнопка влево
		if (input == 'left' && osX>left) {
			// Проверка есть ли свободное место слева от фигуры
			for (let key in matrix) {
				if (isNaN(matrix[key]) == false && matrix[key] != 0) {
					if (isNaN(matrix[parseInt(key)-1]) == true) {
						free = false;
					}
				}
			}
			// Если свободное место есть двигаем фигуру влево
			if (free == true) {
				zeroing();
				osX -= 1;
				for (let key in matrix) {
					if (isNaN(matrix[key]) == false && matrix[key] != 0) {
						buffer[parseInt(key)-1] = matrix[key];
					}
				}
			}
		}
		// Кнопка вправо
		if (input == 'right' && osX<right) {
			// Проверка есть ли свободное место слева от фигуры
			for (let key in matrix) {
				if (isNaN(matrix[key]) == false && matrix[key] != 0) {
					if (isNaN(matrix[parseInt(key)+1]) == true) {
						free = false;
					}
				}
			}
			// Если свободное место есть двигаем фигуру вправо
			if (free == true) {
				zeroing();
				osX += 1;
				for (let key in matrix) {
					if (isNaN(matrix[key]) == false && matrix[key] != 0) {
						buffer[parseInt(key)+1] = matrix[key];
					}
				}
			}
		}
		// Кнопка поворота фигуры
		if (input == 'turn') {
			let position = 10*osY+osX; // Поправка положения фигуры на игровом поле
			// Функция проверки свободных ячеек
			function check(a, b, c, d) {
				let arr = [a, b, c, d];
				for (let key of arr) {
					if (isNaN(matrix[parseInt(key)]) == true) {
						free = false;
						return false;
					}
				}
			}
			// Пошла моча по трубам
			switch(copyFigure[0][0]) {
				case 'figure1': // Поворот палки
					switch(orientation) {
						case 0:
							if (check(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position) != false) {
								zeroing();
								figure(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position, copyFigure[2][4], copyFigure[2][5], copyFigure[2][6]);
								orientation = 90;
							} else if (check(copyFigure[2][0]+position-10, copyFigure[2][1]+position-10, copyFigure[2][2]+position-10, copyFigure[2][3]+position-10) != false) {
								zeroing();
								position -= 10;
								figure(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position, copyFigure[2][4], copyFigure[2][5], copyFigure[2][6]);
								orientation = 90;
							} else if (check(copyFigure[2][0]+position+1, copyFigure[2][1]+position+1, copyFigure[2][2]+position+1, copyFigure[2][3]+position+1) != false) {
								zeroing();
								position += 1;
								figure(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position, copyFigure[2][4], copyFigure[2][5], copyFigure[2][6]);
								orientation = 90;
							} else if (check(copyFigure[2][0]+position-9, copyFigure[2][1]+position-9, copyFigure[2][2]+position-9, copyFigure[2][3]+position-9) != false) {
								zeroing();
								position -= 9;
								figure(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position, copyFigure[2][4], copyFigure[2][5], copyFigure[2][6]);
								orientation = 90;
							}
						break;
						case 90:
							if (osX == left) {
								if (check(copyFigure[1][0]+position+1, copyFigure[1][1]+position+1, copyFigure[1][2]+position+1, copyFigure[1][3]+position+1) != false) {
									zeroing();
									position += 1;
									osX += 1;
									figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
									orientation = 0;
								}
							} else if (osX == right) {
								if (check(copyFigure[1][0]+position-2, copyFigure[1][1]+position-2, copyFigure[1][2]+position-2, copyFigure[1][3]+position-2) != false) {
									zeroing();
									position -= 2;
									osX -= 2;
									figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
									orientation = 0;
								}
							} else if (osX == right-1) {
								if (check(copyFigure[1][0]+position-1, copyFigure[1][1]+position-1, copyFigure[1][2]+position-1, copyFigure[1][3]+position-1) != false) {
									zeroing();
									position -= 1;
									osX -= 1;
									figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
									orientation = 0;
								} else if (check(copyFigure[1][0]+position-2, copyFigure[1][1]+position-2, copyFigure[1][2]+position-2, copyFigure[1][3]+position-2) != false) {
									zeroing();
									position -= 2;
									osX -= 2;
									figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
									orientation = 0;
								}
							} else {
								if (check(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position) != false) {
									zeroing();
									figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
									orientation = 0;
								} else if (check(copyFigure[1][0]+position+1, copyFigure[1][1]+position+1, copyFigure[1][2]+position+1, copyFigure[1][3]+position+1) != false) {
									if (osX != right-2) {
										zeroing();
										position += 1;
										osX += 1;
										figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
										orientation = 0;
									}
								} else if (check(copyFigure[1][0]+position-1, copyFigure[1][1]+position-1, copyFigure[1][2]+position-1, copyFigure[1][3]+position-1) != false) {
									if (osX != left+1) {
										zeroing();
										position -= 1;
										osX -= 1;
										figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
										orientation = 0;
									}
								} else if (check(copyFigure[1][0]+position-2, copyFigure[1][1]+position-2, copyFigure[1][2]+position-2, copyFigure[1][3]+position-2) != false) {
									if (osX != left+2) {
										zeroing();
										position -= 2;
										osX -= 2;
										figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
										orientation = 0;
									}
								}
							}
						break;
					}
				break;
				case 'figure2': // Поворот других фигур кроме палки и квадрата
					switch(orientation) {
						case 0:
							if (check(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position) != false) {
								zeroing();
								figure(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position, copyFigure[2][4], copyFigure[2][5], copyFigure[2][6]);
								orientation = 90;
							}
						break;
						case 90:
							if (osX == right) {
								position -= 1;
								osX -= 1;
							}
							if (check(copyFigure[3][0]+position, copyFigure[3][1]+position, copyFigure[3][2]+position, copyFigure[3][3]+position) != false) {
								zeroing();
								figure(copyFigure[3][0]+position, copyFigure[3][1]+position, copyFigure[3][2]+position, copyFigure[3][3]+position, copyFigure[3][4], copyFigure[3][5], copyFigure[3][6]);
								orientation = 180;
							} else if (check(copyFigure[3][0]+position-1, copyFigure[3][1]+position-1, copyFigure[3][2]+position-1, copyFigure[3][3]+position-1) != false) {
								if (osX != left) {
									zeroing();
									position -= 1;
									osX -= 1;
									figure(copyFigure[3][0]+position, copyFigure[3][1]+position, copyFigure[3][2]+position, copyFigure[3][3]+position, copyFigure[3][4], copyFigure[3][5], copyFigure[3][6]);
									orientation = 180;
								}
							}
						break;
						case 180:
							if (check(copyFigure[4][0]+position, copyFigure[4][1]+position, copyFigure[4][2]+position, copyFigure[4][3]+position) != false) {
								zeroing();
								figure(copyFigure[4][0]+position, copyFigure[4][1]+position, copyFigure[4][2]+position, copyFigure[4][3]+position, copyFigure[4][4], copyFigure[4][5], copyFigure[4][6]);
								orientation = 270;
							}
						break;
						case 270:
							if (osX == left) {
								position += 1;
								osX += 1;
							}
							if (check(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position) != false) {
								zeroing();
								figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
								orientation = 0;
							} else if (check(copyFigure[1][0]+position+1, copyFigure[1][1]+position+1, copyFigure[1][2]+position+1, copyFigure[1][3]+position+1) != false) {
								if (osX != right) {
									zeroing();
									position += 1;
									osX += 1;
									figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
									orientation = 0;
								}
							}
						break;
					}
				break;
				case 'figure3': // "Поворот" квадрата
				break;
			}
		}
		// Перезаписываем игровое поле и визуализируем на странице
		matrix = Array.from(buffer);
		visualization();
	});
}

// Функция удаления целых линий
function destroy() {
	let fire = true;
	let multiplier = 0; // Множитель за комбо
	// Перебираеи ряды поля
	for (line=0; line<20; line++) {
		// Ищем заполнненый ряд и если не находим таковой, запрещаем дальнейшее действие
		for (i=0; i<10; i++) {
			if (isNaN(matrix[i+line*10]) != true) {
				fire = false;
			}
		}
		// Если разрешение есть, то стираем текущий ряд, переписываем игровое поле и обращаемся к функции сдвига тектонических плит
		if (fire == true) {
			for (i=0; i<10; i++) {
				buffer[i+line*10] = 0;
			}
			matrix = Array.from(buffer);
			//setTimeout(drop, 1);
			drop();
		}
		fire = true;
	}
	function drop() {
		// Обнуляем промежуточное поле
		for (let key in matrix) {
			if (isNaN(matrix[key]) == true) {
				buffer[key] = 0;
			}
		}
		// И создаем свой новый, дивный поле
		for (let key in matrix) {
			if (isNaN(matrix[key]) == true) {
				// Всё что выше удаленного ряда сдвигаем на один ряд ниже
				if (key <= line*10) {
					buffer[parseInt(key)+10] = matrix[key];
				}
				// Всё что ниже, оставляем на своих местах
				if (key > line*10) {
					buffer[parseInt(key)] = matrix[key];
				}
			}
		}
		multiplier += 1;
		score += 1*multiplier;
		matrix = Array.from(buffer);
	}
	visualization();
}

// Функция визуализации
function visualization() {
	for (let key in matrix) {
		switch (matrix[key]) {
			case '0s':
			case 0:
				cells[key].style.background="white";
			break;
			case '1s':
			case 1:
				cells[key].style.background="red";
			break;
			case '2s':
			case 2:
				cells[key].style.background="green";
			break;
			case '3s':
			case 3:
				cells[key].style.background="purple";
			break;
			case '4s':
			case 4:
				cells[key].style.background="orange";
			break;
			case '5s':
			case 5:
				cells[key].style.background="blue";
			break;
			case '6s':
			case 6:
				cells[key].style.background="gold";
			break;
			case '7s':
			case 7:
				cells[key].style.background="dodgerblue";
			break;
			case 'gg':
				cells[key].style.background="black";
			break;
		}
	}
	for (let key in screenNextFigure) {
		switch (screenNextFigure[key]) {
			case 0:
				infoCells[key].style.background="white";
			break;
			case 1:
				infoCells[key].style.background="red";
			break;
			case 2:
				infoCells[key].style.background="green";
			break;
			case 3:
				infoCells[key].style.background="purple";
			break;
			case 4:
				infoCells[key].style.background="orange";
			break;
			case 5:
				infoCells[key].style.background="blue";
			break;
			case 6:
				infoCells[key].style.background="gold";
			break;
			case 7:
				infoCells[key].style.background="dodgerblue";
			break;
		}
	}
	// Вывод счёта на табло
	document.querySelector(".info_score").innerHTML = score;
}
figureCreation();
move();
visualization();

// Таймер
let time = 1000;
let downMove = setInterval(move, time);
// Ускорятор таймера
let speed = setInterval(speedUp, 60000);
function speedUp() {
	if (time > 200) {
		clearInterval(downMove);
		time -= 100;
		downMove = setInterval(move, time);
		document.querySelector(".info_speed").innerHTML = 11-time/100;
	}
}

// Экран конца игры
function gameOver() {
	let gameOver = document.querySelector('.gameOver');
	let newGame = document.querySelector(".gameOver_newGame");
	// Запись счета в окно конца игры
	document.querySelector(".gameOver_score").innerHTML = score;
	// Вызов окна конца игры
	gameOver.style.display = "flex";
	// Начало новой игры
	newGame.onclick = function() {
		score = 0;
		figureNext = undefined;
		currentFigure = undefined;
		orientation = 0;
		osX = 0;
		osY = -1;
		left = undefined;
		right = undefined;
		time = 1000;
		document.querySelector(".info_speed").innerHTML = 11-time/100;
		for (let key in screenNextFigure) {
			screenNextFigure[key] = 0;
		}
		for (let key in matrix) {
			buffer[key] = 0;
		}
		matrix = Array.from(buffer);
		gameOver.style.display = "none";
		figureCreation();
		move();
		visualization();
		downMove = setInterval(move, time);
		speed = setInterval(speedUp, 60000);
	}
	// Закрытие окна конца игры
	window.onclick = function(event) {
		if (event.target == gameOver) {
			gameOver.style.display = "none";
		}
	}
}