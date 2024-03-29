// Объект с общими переменными и механиками
let common = {
	cells: document.querySelectorAll(".tetris_cell"),
	infoCells: document.querySelectorAll(".tetris__info_cell"),
	score: 0, // Счёт
	game: null, // Текущая игра
	// Кнопки управления
	orientation: 0, // Угол поворота фигуры
	osX: 0, // Отслеживание фигуры по горизонтали
	osY: -1, // Отслеживание фигуры по вертикали
	left: null, // Левая граница, для разных фигур своя
	right: null, // Правая граница, для разных фигур своя
	// Имитация игрового поля
	matrix: [
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
	],
	// Экран следующей фигуры
	screenNextFigure: [0, 0, 0, 0, 0, 0, 0, 0],
	// Функция обнуления ячеек промежуточного поля
	zeroing: function() {
		for (let key in common.matrix) {
			if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0 && common.matrix[key] != 10) {
				common.buffer[key] = 0;
			}
		}
	},
	// Функция визуализации
	visualization: function(a, b) {
		for (let key in a) {
			switch (a[key]) {
				case '0s':
				case 0:
					b[key].style.background="white";
				break;
				case '1s':
				case 1:
					b[key].style.background="red";
				break;
				case '2s':
				case 2:
					b[key].style.background="green";
				break;
				case '3s':
				case 3:
					b[key].style.background="purple";
				break;
				case '4s':
				case 4:
					b[key].style.background="orange";
				break;
				case '5s':
				case 5:
					b[key].style.background="blue";
				break;
				case '6s':
				case 6:
					b[key].style.background="gold";
				break;
				case '7s':
				case 7:
					b[key].style.background="dodgerblue";
				break;
				case '8s':
				case 8:
					b[key].style.background="black";
				break;
				case '10s':
				case 10:
					b[key].style.background="gray";
				break;
			}
		}
		// Вывод счёта на табло
		document.querySelector(".tetris__info_score").innerHTML = common.score;
	},
	// Копия игрового поля
	buffer: null,
	copyMatrix: function() {
		common.buffer = Array.from(common.matrix);
	},
};

// Объект с тетрисом
let tetris = {
	// Запуск тетриса
	tetrisPlay: function() {
		tetris.figureCreation();
		tetris.move();
		timer.time = 1000;
		timer.startTimer(tetris);
	},
	// Создание фигуры
	figure: function (a, b, c, d, l, r, clr) {
		common.buffer[a] = clr;
		common.buffer[b] = clr;
		common.buffer[c] = clr;
		common.buffer[d] = clr;
		common.left = l;
		common.right = r;
	},
	// Создание случайной фигуры
	nextFigure: null,
	currentFigure: null,
	figureCreation: function() {
		let random = Math.round(Math.random() * 6);
		if (tetris.currentFigure == null) {
			tetris.currentFigure = Math.round(Math.random() * 6);
		} else {
			tetris.currentFigure = tetris.nextFigure;
		}
		tetris.nextFigure = random;
		// Создание фигуры в экране следующей фигуры
		for (let key in common.screenNextFigure) {
			common.screenNextFigure[key] = 0;
		}
		switch (tetris.nextFigure) {
			case 0:
				figureNext(0, 1, 2, 3, 1); // Фигура ''''
			break;
			case 1:
				figureNext(1, 2, 3, 6, 2); // Фигура '|'
			break;
			case 2:
				figureNext(1, 2, 5, 6, 3); // Фигура ||
			break;
			case 3:
				figureNext(1, 2, 3, 7, 4); // Фигура ''|
			break;
			case 4:
				figureNext(1, 2, 6, 7, 5); // Фигура '|.
			break;
			case 5:
				figureNext(1, 2, 3, 5, 6); // Фигура |''
			break;
			case 6:
				figureNext(2, 3, 5, 6, 7); // Фигура .|'
			break;
		}
		function figureNext(a, b, c, d, clr) {
			common.screenNextFigure[a] = clr;
			common.screenNextFigure[b] = clr;
			common.screenNextFigure[c] = clr;
			common.screenNextFigure[d] = clr;
		}
		// Создание фигуры в игровом поле
		switch (tetris.currentFigure) {
			case 0:
				copyFigure = Array.from(figures.figure1);
			break;
			case 1:
				copyFigure = Array.from(figures.figure2);
			break;
			case 2:
				copyFigure = Array.from(figures.figure3);
			break;
			case 3:
				copyFigure = Array.from(figures.figure4);
			break;
			case 4:
				copyFigure = Array.from(figures.figure5);
			break;
			case 5:
				copyFigure = Array.from(figures.figure6);
			break;
			case 6:
				copyFigure = Array.from(figures.figure7);
			break;
		}
		return tetris.figure(copyFigure[1][0], copyFigure[1][1], copyFigure[1][2], copyFigure[1][3], copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
	},
	// Движение фигуры вниз
	move: function() {
		// Проверка есть ли свободное место под фигурой
		let free = true;
		for (let key in common.matrix) {
			// Ищем все числа кроме нуля в массиве игрового поля
			if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0) {
				if (isNaN(common.matrix[parseInt(key)+10]) == true) {
					free = false;
				} else {
					common.zeroing();
				}
			}
		}
		if (free == true) {
			for (let key in common.matrix) {
				// Ищем все числа кроме нуля в массиве игрового поля
				if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0) {
					// Создаем их копию в промежуточном поле и смещаем их на один уровень вниз
					common.buffer[parseInt(key)+10] = common.matrix[key];
				}
			}
		} else {
			let raz = 0;
			for (let key in common.matrix) {
				// Ищем все числа кроме нуля в массиве игрового поля
				if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0) {
					if (common.matrix[parseInt(key)-10] == null) {
						// Если верхния ячейка отсуствует заканчиваем игру
						popUp.gameOver();
					} else {
						// Если внизу нет свободных ячеек, то записывает в текущую ячейку некий текст и создаем новую фигуру
						common.buffer[key] = common.matrix[key]+'s';
						common.osX = 0;
						common.osY = -1;
						common.orientation = 0;
						// Костыль чтобы срабатывало только один раз, а  не четыре
						raz += 1;
						if (raz == 3){
							tetris.figureCreation();
						}
					}
				}
			}
		}
		common.osY += 1;
		// Перезаписываем игровое поле из промежуточного поля
		common.matrix = Array.from(common.buffer);
		// Убираем целые линии
		tetris.destroy();
		// Визуализируем массив игрового поля на странице
		common.visualization(common.matrix, common.cells);
		common.visualization(common.screenNextFigure, common.infoCells);
	},
	leftMove: function() {
		let free = true;
		// Проверка есть ли свободное место слева от фигуры
		for (let key in common.matrix) {
			if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0) {
				if (isNaN(common.matrix[parseInt(key)-1]) == true) {
					free = false;
				}
			}
		}
		// Если свободное место есть двигаем фигуру влево
		if (free == true) {
			common.zeroing();
			common.osX -= 1;
			for (let key in common.matrix) {
				if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0) {
					common.buffer[parseInt(key)-1] = common.matrix[key];
				}
			}
		}
	},
	rightMove: function() {
		let free = true;
		// Проверка есть ли свободное место слева от фигуры
		for (let key in common.matrix) {
			if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0) {
				if (isNaN(common.matrix[parseInt(key)+1]) == true) {
					free = false;
				}
			}
		}
		// Если свободное место есть двигаем фигуру вправо
		if (free == true) {
			common.zeroing();
			common.osX += 1;
			for (let key in common.matrix) {
				if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0) {
					common.buffer[parseInt(key)+1] = common.matrix[key];
				}
			}
		}
	},
	turn: function() {
		let position = 10*common.osY+common.osX; // Поправка положения фигуры на игровом поле
		// Функция проверки свободных ячеек
		// Ячейка заполненная не числом, не свободна
		function check(a, b, c, d) {
			let arr = [a, b, c, d];
			for (let key of arr) {
				if (isNaN(common.matrix[parseInt(key)]) == true) {
					return false;
				}
			}
		}
		// Пошла моча по трубам
		switch(copyFigure[0][0]) {
			case 'figure1': // Поворот палки
				switch(common.orientation) {
					case 0:
						if (check(-6+position, 4+position, 14+position, 24+position) != false) {
							common.zeroing();
							tetris.figure(-6+position, 4+position, 14+position, 24+position, -4, 5, 1);
							common.orientation = 90;
						} else if (check(-6+position+10, 4+position+10, 14+position+10, 24+position+10) != false) {
							common.zeroing();
							position += 10;
							tetris.figure(-6+position, 4+position, 14+position, 24+position, -4, 5, 1);
							common.orientation = 90;
						} else if (check(-6+position-10, 4+position-10, 14+position-10, 24+position-10) != false) {
							common.zeroing();
							position -= 10;
							tetris.figure(-6+position, 4+position, 14+position, 24+position, -4, 5, 1);
							common.orientation = 90;
						} else if (check(-6+position+1, 4+position+1, 14+position+1, 24+position+1) != false) {
							common.zeroing();
							position += 1;
							tetris.figure(-6+position, 4+position, 14+position, 24+position, -4, 5, 1);
							common.orientation = 90;
						} else if (check(-6+position-9, 4+position-9, 14+position-9, 24+position-9) != false) {
							common.zeroing();
							position -= 9;
							tetris.figure(-6+position, 4+position, 14+position, 24+position, -4, 5, 1);
							common.orientation = 90;
						}
					break;
					case 90:
						if (common.osX == common.left) {
							if (check(3+position+1, 4+position+1, 5+position+1, 6+position+1) != false) {
								common.zeroing();
								position += 1;
								common.osX += 1;
								tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
								common.orientation = 0;
							}
						} else if (common.osX == common.right) {
							if (check(3+position-2, 4+position-2, 5+position-2, 6+position-2) != false) {
								common.zeroing();
								position -= 2;
								common.osX -= 2;
								tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
								common.orientation = 0;
							}
						} else if (common.osX == common.right-1) {
							if (check(3+position-1, 4+position-1, 5+position-1, 6+position-1) != false) {
								common.zeroing();
								position -= 1;
								common.osX -= 1;
								tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
								common.orientation = 0;
							} else if (check(3+position-2, 4+position-2, 5+position-2, 6+position-2) != false) {
								common.zeroing();
								position -= 2;
								common.osX -= 2;
								tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
								common.orientation = 0;
							}
						} else {
							if (check(3+position, 4+position, 5+position, 6+position) != false) {
								common.zeroing();
								tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
								common.orientation = 0;
							} else if (check(3+position+1, 4+position+1, 5+position+1, 6+position+1) != false) {
								if (common.osX != common.right-2) {
									common.zeroing();
									position += 1;
									common.osX += 1;
									tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
									common.orientation = 0;
								}
							} else if (check(3+position-1, 4+position-1, 5+position-1, 6+position-1) != false) {
								if (common.osX != common.left+1) {
									common.zeroing();
									position -= 1;
									common.osX -= 1;
									tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
									common.orientation = 0;
								}
							} else if (check(3+position-2, 4+position-2, 5+position-2, 6+position-2) != false) {
								if (common.osX != common.left+2) {
									common.zeroing();
									position -= 2;
									common.osX -= 2;
									tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
									common.orientation = 0;
								}
							}
						}
					break;
				}
			break;
			case 'figure2': // Поворот других фигур кроме палки и квадрата
				switch(common.orientation) {
					case 0:
						if (check(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position) != false) {
							common.zeroing();
							tetris.figure(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position, copyFigure[2][4], copyFigure[2][5], copyFigure[2][6]);
							common.orientation = 90;
						} else if (check(copyFigure[2][0]+position+10, copyFigure[2][1]+position+10, copyFigure[2][2]+position+10, copyFigure[2][3]+position+10) != false) {
							common.zeroing();
							position += 10;
							common.osY += 1;
							tetris.figure(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position, copyFigure[2][4], copyFigure[2][5], copyFigure[2][6]);
							common.orientation = 90;
						}
					break;
					case 90:
						if (common.osX == common.right) {
							position -= 1;
							common.osX -= 1;
						}
						if (check(copyFigure[3][0]+position, copyFigure[3][1]+position, copyFigure[3][2]+position, copyFigure[3][3]+position) != false) {
							common.zeroing();
							tetris.figure(copyFigure[3][0]+position, copyFigure[3][1]+position, copyFigure[3][2]+position, copyFigure[3][3]+position, copyFigure[3][4], copyFigure[3][5], copyFigure[3][6]);
							common.orientation = 180;
						} else if (check(copyFigure[3][0]+position-1, copyFigure[3][1]+position-1, copyFigure[3][2]+position-1, copyFigure[3][3]+position-1) != false) {
							if (common.osX != common.left) {
								common.zeroing();
								position -= 1;
								common.osX -= 1;
								tetris.figure(copyFigure[3][0]+position, copyFigure[3][1]+position, copyFigure[3][2]+position, copyFigure[3][3]+position, copyFigure[3][4], copyFigure[3][5], copyFigure[3][6]);
								common.orientation = 180;
							}
						}
					break;
					case 180:
						if (check(copyFigure[4][0]+position, copyFigure[4][1]+position, copyFigure[4][2]+position, copyFigure[4][3]+position) != false) {
							common.zeroing();
							tetris.figure(copyFigure[4][0]+position, copyFigure[4][1]+position, copyFigure[4][2]+position, copyFigure[4][3]+position, copyFigure[4][4], copyFigure[4][5], copyFigure[4][6]);
							common.orientation = 270;
						}
					break;
					case 270:
						if (common.osX == common.left) {
							position += 1;
							common.osX += 1;
						}
						if (check(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position) != false) {
							common.zeroing();
							tetris.figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
							common.orientation = 0;
						} else if (check(copyFigure[1][0]+position+1, copyFigure[1][1]+position+1, copyFigure[1][2]+position+1, copyFigure[1][3]+position+1) != false) {
							if (common.osX != common.right) {
								common.zeroing();
								position += 1;
								common.osX += 1;
								tetris.figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
								common.orientation = 0;
							}
						}
					break;
				}
			break;
			case 'figure3': // "Поворот" квадрата
			break;
		}
	},
	//
	upMove: function() {},
	downMove: function() {
		tetris.move();
	},
	// Функция удаления целых линий
	destroy: function() {
		let fire = true;
		let multiplier = 0; // Множитель за комбо
		// Перебираеи ряды поля
		for (line=0; line<20; line++) {
			// Ищем заполнненый ряд и если не находим таковой, запрещаем дальнейшее действие
			for (i=0; i<10; i++) {
				if (isNaN(common.matrix[i+line*10]) != true) {
					fire = false;
				}
			}
			// Если разрешение есть, то стираем текущий ряд, переписываем игровое поле и обращаемся к функции сдвига тектонических плит
			if (fire == true) {
				for (i=0; i<10; i++) {
					common.buffer[i+line*10] = 0;
				}
				common.matrix = Array.from(common.buffer);
				drop();
			}
			fire = true;
		}
		function drop() {
			// Обнуляем промежуточное поле
			for (let key in common.matrix) {
				if (isNaN(common.matrix[key]) == true) {
					common.buffer[key] = 0;
				}
			}
			// И создаем свой новый, дивный поле
			for (let key in common.matrix) {
				if (isNaN(common.matrix[key]) == true) {
					// Всё что выше удаленного ряда сдвигаем на один ряд ниже
					if (key <= line*10) {
						common.buffer[parseInt(key)+10] = common.matrix[key];
					}
					// Всё что ниже, оставляем на своих местах
					if (key > line*10) {
						common.buffer[parseInt(key)] = common.matrix[key];
					}
				}
			}
			multiplier += 1;
			common.score += 1*multiplier;
			common.matrix = Array.from(common.buffer);
		}
		common.visualization(common.matrix, common.cells);
	},
}

// Корбочка с фигурами тетриса
let figures = {
	// Фигура ''''
	figure1 : [
		['figure1'],
		[3, 4, 5, 6, -3, 3, 1],
	],
	// Фигура '|'
	figure2 : [
		['figure2'],
		[4, 5, 6, 15, -4, 3, 2],
		[-5, 4, 5, 15, -4, 4, 2],
		[-5, 4, 5, 6, -4, 3, 2],
		[-5, 6, 5, 15, -5, 3, 2]
	],
	// Фигура ||
	figure3 : [
		['figure3'],
		[4, 5, 14, 15, -4, 4, 3]
	],
	// Фигура ''|
	figure4 : [
		['figure2'],
		[4, 5, 6, 16, -4, 3, 4],
		[-5, 5, 14, 15, -4, 4, 4],
		[-6, 4, 5, 6, -4, 3, 4],
		[-5, -4, 5, 15, -5, 3, 4]
	],
	// Фигура '|.
	figure5 : [
		['figure2'],
		[4, 5, 15, 16, -4, 3, 5],
		[-5, 4, 5, 14, -4, 4, 5],
		[-6, -5, 5, 6, -4, 3, 5],
		[-4, 5, 6, 15, -5, 3, 5]
	],
	// Фигура ..|
	figure6 : [
		['figure2'],
		[4, 5, 6, 14, -4, 3, 6],
		[-6, -5, 5, 15, -4, 4, 6],
		[-4, 4, 5, 6, -4, 3, 6],
		[-5, 5, 15, 16, -5, 3, 6]
	],
	// Фигура .|'
	figure7 : [
		['figure2'],
		[5, 6, 14, 15, -4, 3, 7],
		[-6, 4, 5, 15, -4, 4, 7],
		[-5, -4, 4, 5, -4, 3, 7],
		[-5, 5, 6, 16, -5, 3, 7]
	],
};

// Объект со змейкой
let shake = {
	shakePlay: function() {
		common.buffer[95] = 8; // Голова змейки
		common.left = -6; // Указатель левой границы
		common.right = 5; // Указатель правой границы
		timer.time = 700; // Интервал движения змейки
		shake.mouse(); // Постановка точки(цель, 'мышь', 'яблоко') в случайное место
		shake.move(); // Запуск змейки
		timer.startTimer(shake); // Запуск таймера
	},
	// Постановка точки в случайное место
	mouse: function(x) {
		let randomCoordinates = Math.round(Math.random() * 199);
		if (common.matrix[randomCoordinates] != 0) {
			shake.mouse();
		} else {
			common.buffer[randomCoordinates] = 10;
		}
	},
	tail: [], // Массив с хвостом змейки
	// Рисуем хвост
	tailGrowth: function(x) {
		shake.mouse();
		common.score += 1;
		let randomColor = Math.ceil(Math.random() * 7);
		shake.tail.push([randomColor+'s', parseInt(x)]);
		// Транслирование хвоста из объекта с хвостом
		for (let key in shake.tail) {
			common.buffer[shake.tail[key][1]] = shake.tail[key][0];
		}
	},
	move: function() {
		switch (common.orientation) {
			case 0:
				// Перебираем все клетки игрового поля
				for (let key in common.matrix) {
					// Ищим все числа кроме нуля и десятки
					if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0 && common.matrix[key] != 10) {
						// Если в ячейке сверху нашли мышь, едим её и наращиваем хвост
						if (common.matrix[parseInt(key)-10] == 10) {
							shake.tailGrowth(key);
						}
						// Проверка есть ли свободное место сверху от фигуры
						if (isNaN(common.matrix[parseInt(key)-10]) == true || common.osY == 8) {
							popUp.gameOver();
						} else {
							// Если свободное место есть двигаем фигуру вверх
							common.zeroing();
							common.osY += 1;
							common.buffer[parseInt(key)-10] = common.matrix[key];
							shake.tailMove(key);
						}
					}
				}
			break;
			case 90:
				for (let key in common.matrix) {
					if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0 && common.matrix[key] != 10) {
						if (common.matrix[parseInt(key)+1] == 10) {
							shake.tailGrowth(key);
						}
						if (isNaN(common.matrix[parseInt(key)+1]) == true || common.osX == 4) {
							popUp.gameOver();
						} else {
							common.zeroing();
							common.osX += 1;
							common.buffer[parseInt(key)+1] = common.matrix[key];
							shake.tailMove(key);
						}
					}
				}
			break;
			case 180:
				for (let key in common.matrix) {
					if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0 && common.matrix[key] != 10) {
						if (common.matrix[parseInt(key)+10] == 10) {
							shake.tailGrowth(key);
						}
						if (isNaN(common.matrix[parseInt(key)+10]) == true || common.osY == -11) {
							popUp.gameOver();
						} else {
							common.zeroing();
							common.osY -= 1;
							common.buffer[parseInt(key)+10] = common.matrix[key];
							shake.tailMove(key);
						}
					}
				}
			break;
			case 240:
				for (let key in common.matrix) {
					if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0 && common.matrix[key] != 10) {
						if (common.matrix[parseInt(key)-1] == 10) {
							shake.tailGrowth(key);
						}
						if (isNaN(common.matrix[parseInt(key)-1]) == true || common.osX == -5) {
							popUp.gameOver();
						} else {
							common.zeroing();
							common.osX -= 1;
							common.buffer[parseInt(key)-1] = common.matrix[key];
							shake.tailMove(key);
						}
					}
				}
			break;
		}
		// Перезаписываем игровое поле из промежуточного поля
		common.matrix = Array.from(common.buffer);
		// Визуализируем массив игрового поля на странице
		common.visualization(common.matrix, common.cells);
	},
	// Движение хвоста
	tailMove: function(y) {
		// Обнуляем игровое поле
		for (let key in common.matrix) {
			if (common.matrix[key] != 0 && common.matrix[key] != 10) {
				common.buffer[key] = 0;
			}
		}
		// Запоминаем координаты первых частей тела змеи
		let odin = parseInt(y);
		let dva = null;
		// Двигаем хвост
		for (let key in shake.tail) {
			dva = shake.tail[key][1];
			shake.tail[key][1] = odin;
			odin = dva;
			common.buffer[shake.tail[key][1]] = shake.tail[key][0];
		}
	},
	upMove: function() {
		// Проверка на наличее хвоста, если он есть, запрещаем двигаться назад
		if (common.orientation != 180 || shake.tail.length == 0) {
			timer.stopTimer();
			common.orientation = 0;
			shake.move();
			timer.startTimer(common.game);
		}
	},
	downMove: function() {
		if (common.orientation != 0 || shake.tail.length == 0) {
			timer.stopTimer();
			common.orientation = 180;
			shake.move();
			timer.startTimer(common.game);
		}
	},
	leftMove: function() {
		if (common.orientation != 90 || shake.tail.length == 0) {
			timer.stopTimer();
			common.orientation = 240;
			shake.move();
			timer.startTimer(common.game);
		}
	},
	rightMove: function() {
		if (common.orientation != 240 || shake.tail.length == 0) {
			timer.stopTimer();
			common.orientation = 90;
			shake.move();
			timer.startTimer(common.game);
		}
	},
	turn: function() {},
}

// Объект с гонкой
let racing = {
	racingPlay: function() {
		// Окрашиваем асфальт в серый
		for (let key in common.matrix) {
			common.buffer[key] = 10;
		}
		// Рисуем болид
		let randomColor = Math.ceil(Math.random() * 7)+'s';
		common.buffer[165] = randomColor;
		common.buffer[175] = randomColor;
		common.buffer[185] = randomColor;
		common.buffer[195] = randomColor;
		common.buffer[174] = randomColor;
		common.buffer[176] = randomColor;
		common.buffer[194] = randomColor;
		common.buffer[196] = randomColor;

		// Правый пунктир
		common.buffer[9] = 8;
		common.buffer[19] = 8;
		common.buffer[29] = 8;
		common.buffer[39] = 0;
		common.buffer[49] = 0;
		common.buffer[59] = 8;
		common.buffer[69] = 8;
		common.buffer[79] = 8;
		common.buffer[89] = 0;
		common.buffer[99] = 0;
		common.buffer[109] = 8;
		common.buffer[119] = 8;
		common.buffer[129] = 8;
		common.buffer[139] = 0;
		common.buffer[149] = 0;
		common.buffer[159] = 8;
		common.buffer[169] = 8;
		common.buffer[179] = 8;
		common.buffer[189] = 0;
		common.buffer[199] = 0;

		// Левый пунктир
		common.buffer[0] = 8;
		common.buffer[10] = 8;
		common.buffer[20] = 8;
		common.buffer[30] = 0;
		common.buffer[40] = 0;
		common.buffer[50] = 8;
		common.buffer[60] = 8;
		common.buffer[70] = 8;
		common.buffer[80] = 0;
		common.buffer[90] = 0;
		common.buffer[100] = 8;
		common.buffer[110] = 8;
		common.buffer[120] = 8;
		common.buffer[130] = 0;
		common.buffer[140] = 0;
		common.buffer[150] = 8;
		common.buffer[160] = 8;
		common.buffer[170] = 8;
		common.buffer[180] = 0;
		common.buffer[190] = 0;

		common.left = -4; // Указатель левой границы
		common.right = 3; // Указатель правой границы
		timer.time = 125; // Скорость движения
		document.querySelector(".tetris__info_speed").innerHTML = 100-timer.time/5;
		racing.move(); // Поехали
		timer.startTimer(racing); // Запуск таймера
	},
	barrier: function() {
		let random = Math.ceil(Math.random() * 5);
		// Препятствие на дороге
		common.buffer[2+random] = '8s';
		common.buffer[11+random] = '8s';
		common.buffer[12+random] = '8s';
		common.buffer[13+random] = '8s';
		common.buffer[22+random] = '8s';/**/
	},
	move: function() {
		let barrier = false;
		common.zeroing();
		for (let key in common.matrix) {
			if (common.matrix[key] == '8s') {
				common.buffer[key] = 10;
			}
		}
		for (let key in common.matrix) {
			if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0 && common.matrix[key] != 10) {
				if (common.matrix[parseInt(key)+10] == null) {
					common.buffer[9] = 8;
					common.buffer[0] = 8;
				} else {
					common.buffer[parseInt(key)+10] = common.matrix[key];
				}
			} else if (common.matrix[key] == '8s') {
				barrier = true;
				if (common.matrix[parseInt(key)+10] != null) {
					if (isNaN(common.matrix[parseInt(key)+10]) == true && common.matrix[parseInt(key)+10] != '8s') {
						popUp.gameOver();
					} else {
						common.buffer[parseInt(key)+10] = common.matrix[key];
					}
				}
			}
		}
		if (barrier == false) {
			racing.barrier();
			common.score += 1;
		}
		// Перезаписываем игровое поле из промежуточного поля
		common.matrix = Array.from(common.buffer);
		// Визуализируем массив игрового поля на странице
		common.visualization(common.matrix, common.cells);
	},
	upMove: function() {
		if (timer.time > 50) {
			timer.stopTimer();
			timer.time -= 25;
			timer.startTimer(racing);
			document.querySelector(".tetris__info_speed").innerHTML = 100-timer.time/5;
		}
	},
	downMove: function() {
		if (timer.time < 200) {
			timer.stopTimer();
			timer.time += 25;
			timer.startTimer(racing);
			document.querySelector(".tetris__info_speed").innerHTML = 100-timer.time/5;
		}
	},
	leftMove: function() {
		// Стираем все строчние значения
		for (let key in common.matrix) {
			if (isNaN(common.matrix[key]) == true && common.matrix[key] != '8s') {
				common.buffer[key] = 10;
			}
		}
		common.osX -= 1;
		for (let key in common.matrix) {
			if (isNaN(common.matrix[key]) == true && common.matrix[key] != '8s') {
				if (isNaN(common.matrix[parseInt(key)-1]) == false && common.matrix[key-1] != 10) {
					popUp.gameOver();
				} else {
					common.buffer[parseInt(key)-1] = common.matrix[key];
				}
			}
		}
	},
	rightMove: function() {
		for (let key in common.matrix) {
			if (isNaN(common.matrix[key]) == true && common.matrix[key] != '8s') {
				common.buffer[key] = 10;
			}
		}
		common.osX += 1;
		for (let key in common.matrix) {
			if (isNaN(common.matrix[key]) == true && common.matrix[key] != '8s') {
				if (isNaN(common.matrix[parseInt(key)+1]) == false && common.matrix[parseInt(key)+1] != 10) {
					popUp.gameOver();
				} else {
					common.buffer[parseInt(key)+1] = common.matrix[key];
				}
			}
		}
	},
	turn: function() {},
}

// Объект с таймер
let timer = {
	time: null,
	downMove: null,
	speed: null,
	startTimer: function(q) {
		// Запрещаем запуск таймера если нет игры
		if (common.game != null) {
			timer.downMove = setInterval(q.move, timer.time);
			if (common.game == tetris) {
				timer.speed = setInterval(timer.speedUp, 60000);
			}
		}
	},
	speedUp: function() {
		if (timer.time > 200) {
			clearInterval(timer.downMove);
			timer.time -= 100;
			timer.downMove = setInterval(tetris.move, timer.time);
			document.querySelector(".tetris__info_speed").innerHTML = 11-timer.time/100;
		}
	},
	stopTimer: function() {
		clearInterval(timer.downMove);
		clearInterval(timer.speed);
	},
}

// Управление
let control = {
	control: function() {
		let buttons = document.querySelectorAll(".tetris_btn");
		let pauseBtn = document.querySelector(".tetris_pause");
		// Вызов окна паузы
		pauseBtn.onclick = function() {
			if (common.game != null) {
				popUp.pause();
			} else {
				popUp.games();
			}
		}
		// Управление с экрана
		for (i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener("click", function() {
				let input = this.id;
				if (common.game != null) {
					// Кнопка вверх
					if (input == 'up') {
						common.game.upMove();
					}
					// Кнопка вниз
					if (input == 'down') {
						common.game.downMove();
					}
					// Кнопка влево
					if (input == 'left' && common.osX > common.left) {
						common.game.leftMove();
					}
					// Кнопка вправо
					if (input == 'right' && common.osX < common.right) {
						common.game.rightMove();
					}
					// Кнопка поворота фигуры
					if (input == 'turn') {
						common.game.turn();
					}
					// Перезаписываем игровое поле и визуализируем на странице
					common.matrix = Array.from(common.buffer);
					common.visualization(common.matrix, common.cells);
				}
			});
		}
		// Управление с клавиатуры
		document.addEventListener('keydown', function(event) {
			if (common.game != null) {
				if (event.code === 'ArrowLeft' && common.osX > common.left) {
					common.game.leftMove();
				}
				if (event.code === 'ArrowRight' && common.osX < common.right) {
					common.game.rightMove();
				}
				if (event.code === 'ArrowDown') {
					common.game.downMove();
				}
				if (event.code === 'ArrowUp' || event.code === 'Space') {
					common.game.turn();
					common.game.upMove();
				}
				// Перезаписываем игровое поле и визуализируем на странице
				common.matrix = Array.from(common.buffer);
				common.visualization(common.matrix, common.cells);
			}
		});

	},
}

// Объект с окнами управления
let popUp = {
	// Экран начала игры
	games: function() {
		let games = document.querySelector(".games");
		let playTetris = document.querySelector(".games_tetris");
		let playSnake = document.querySelector(".games_snake");
		let playRacing = document.querySelector(".games_racing");
		let controlPanel = document.querySelector(".tetris_keyboard");
		// Обнуление всего что только можно
		controlPanel.classList.remove('game_tetris');
		controlPanel.classList.remove('game_shake');
		controlPanel.classList.remove('game_racing');
		tetris.figureNext = null;
		tetris.currentFigure = null;
		common.orientation = 0;
		common.osX = 0;
		common.osY = -1;
		common.left = null;
		common.right = null;
		common.game = null;
		common.score = 0;
		document.querySelector(".tetris__info_speed").innerHTML = 1;
		//document.querySelector(".tetris__info_speed").innerHTML = 11-timer.time/100;
		common.copyMatrix();
		for (let key in common.screenNextFigure) {
			common.screenNextFigure[key] = 0;
		}
		for (let key in common.matrix) {
			common.buffer[key] = 0;
		}
		for (let key in shake.tail) {
			shake.tail.splice(0, shake.tail.length);
		}
		common.matrix = Array.from(common.buffer);
		// Вызов окна  начала игры
		games.style.display = "flex";
		// Начало новой игры
		// Запуск тетриса
		playTetris.onclick = function() {
			common.game = tetris;
			controlPanel.classList.add('game_tetris');
			games.style.display = "none";
			tetris.tetrisPlay();
		}
		// Запуск змейки
		playSnake.onclick = function() {
			common.game = shake;
			controlPanel.classList.add('game_shake');
			games.style.display = "none";
			shake.shakePlay();
		}
		// Запуск гонкиS
		playRacing.onclick = function() {
			common.game = racing;
			controlPanel.classList.add('game_racing');
			games.style.display = "none";
			racing.racingPlay();
		}
		// Закрытие окна конца игры
		window.onclick = function(event) {
			if (event.target == games) {
				games.style.display = "none";
			}
		}
	},
	// Экран паузы
	pause: function() {
		let pause = document.querySelector(".pause");
		let continueGame = document.querySelector(".pause_continue");
		let newGame = document.querySelector(".pause_newGame");
		// Запоминаем таймер
		let time = timer.time;
		// Останавливаем таймер
		timer.stopTimer();
		// Запись счета в окно паузы
		document.querySelector(".pause_score").innerHTML = common.score;
		// Вызов окна паузы
		pause.style.display = "flex";
		// Закрытие окна паузы и продолжение игры
		continueGame.onclick = function() {
			timer.time = time; // Записываем таймер
			timer.startTimer(common.game); // Стартуем таймер заново
			pause.style.display = "none"; // Закрываем окно
		}
		// Вызов окна начала игры
		newGame.onclick = function() {
			pause.style.display = "none";
			popUp.games();
		}
		// Закрытие окна паузы
		window.onclick = function(event) {
			if (event.target == pause) {
				timer.time = time;
				timer.startTimer(common.game);
				pause.style.display = "none";
			}
		}
	},
	// Экран конца игры
	gameOver: function() {
		let gameOver = document.querySelector(".gameOver");
		let newGame = document.querySelector(".gameOver_newGame");
		//
		timer.stopTimer();
		common.game = null;
		// Запись счета в окно конца игры
		document.querySelector(".gameOver_score").innerHTML = common.score;
		// Вызов окна конца игры
		gameOver.style.display = "flex";
		// Вызов окна  начала игры
		newGame.onclick = function() {
			gameOver.style.display = "none";
			popUp.games();
		}
		// Закрытие окна конца игры
		window.onclick = function(event) {
			if (event.target == gameOver) {
				gameOver.style.display = "none";
			}
		}
	}
}
control.control();
popUp.games();