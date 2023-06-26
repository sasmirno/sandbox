field = document.querySelector(".tetris_field");
cells = document.querySelectorAll(".tetris_cell");
buttons = document.querySelectorAll(".tetris_btn");
infoCells = document.querySelectorAll(".tetris__info_cell");

// Объект с общими переменными и механиками
let common = {
	score: 0, // Счёт
	play: true, // Игра запущена и идёт

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
			if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0) {
				buffer[key] = 0;
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
			}
		}
		// Вывод счёта на табло
		document.querySelector(".tetris__info_score").innerHTML = common.score;
	},
	//buffer: matrix,
};

// Копия игрового поля
let buffer = Array.from(common.matrix);
//let buffer = common.matrix;

// Объект с тетрисом
let tetris = {
	// Создание фигуры
	figure: function (a, b, c, d, l, r, clr) {
		buffer[a] = clr;
		buffer[b] = clr;
		buffer[c] = clr;
		buffer[d] = clr;
		tetris.left = l;
		tetris.right = r;
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
					buffer[parseInt(key)+10] = common.matrix[key];
				}
			}
		} else {
			let raz = 0;
			for (let key in common.matrix) {
				// Ищем все числа кроме нуля в массиве игрового поля
				if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0) {
					if (common.matrix[parseInt(key)-10] == null) {
						// Если верхния ячейка отсуствует заканчиваем игру
						gameOver();
					} else {
						// Если внизу нет свободных ячеек, то записывает в текущую ячейку некий текст и создаем новую фигуру
						buffer[key] = common.matrix[key]+'s';
						tetris.osX = 0;
						tetris.osY = -1;
						tetris.orientation = 0;
						// Костыль чтобы срабатывало только один раз, а  не четыре
						raz += 1;
						if (raz == 3){
							tetris.figureCreation();
						}
					}
				}
			}
		}
		tetris.osY += 1;
		// Перезаписываем игровое поле из промежуточного поля
		common.matrix = Array.from(buffer);
		// Убираем целые линии
		tetris.destroy();
		// Визуализируем массив игрового поля на странице
		common.visualization(common.matrix, cells);
		common.visualization(common.screenNextFigure, infoCells);
	},

	// Кнопки управления
	orientation: 0, // Угол поворота фигуры
	osX: 0, // Отслеживание фигуры по горизонтали
	osY: -1, // Отслеживание фигуры по вертикали
	left: null, // Левая граница, для разных фигур своя
	right: null, // Правая граница, для разных фигур своя
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
			tetris.osX -= 1;
			for (let key in common.matrix) {
				if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0) {
					buffer[parseInt(key)-1] = common.matrix[key];
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
			tetris.osX += 1;
			for (let key in common.matrix) {
				if (isNaN(common.matrix[key]) == false && common.matrix[key] != 0) {
					buffer[parseInt(key)+1] = common.matrix[key];
				}
			}
		}
	},
	turn: function() {
		let position = 10*tetris.osY+tetris.osX; // Поправка положения фигуры на игровом поле
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
				switch(tetris.orientation) {
					case 0:
						if (check(-6+position, 4+position, 14+position, 24+position) != false) {
							common.zeroing();
							tetris.figure(-6+position, 4+position, 14+position, 24+position, -4, 5, 1);
							tetris.orientation = 90;
						} else if (check(-6+position+10, 4+position+10, 14+position+10, 24+position+10) != false) {
							common.zeroing();
							position += 10;
							tetris.figure(-6+position, 4+position, 14+position, 24+position, -4, 5, 1);
							tetris.orientation = 90;
						} else if (check(-6+position-10, 4+position-10, 14+position-10, 24+position-10) != false) {
							common.zeroing();
							position -= 10;
							tetris.figure(-6+position, 4+position, 14+position, 24+position, -4, 5, 1);
							tetris.orientation = 90;
						} else if (check(-6+position+1, 4+position+1, 14+position+1, 24+position+1) != false) {
							common.zeroing();
							position += 1;
							tetris.figure(-6+position, 4+position, 14+position, 24+position, -4, 5, 1);
							tetris.orientation = 90;
						} else if (check(-6+position-9, 4+position-9, 14+position-9, 24+position-9) != false) {
							common.zeroing();
							position -= 9;
							tetris.figure(-6+position, 4+position, 14+position, 24+position, -4, 5, 1);
							tetris.orientation = 90;
						}
					break;
					case 90:
						if (tetris.osX == tetris.left) {
							if (check(3+position+1, 4+position+1, 5+position+1, 6+position+1) != false) {
								common.zeroing();
								position += 1;
								tetris.osX += 1;
								tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
								tetris.orientation = 0;
							}
						} else if (tetris.osX == tetris.right) {
							if (check(3+position-2, 4+position-2, 5+position-2, 6+position-2) != false) {
								common.zeroing();
								position -= 2;
								tetris.osX -= 2;
								tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
								tetris.orientation = 0;
							}
						} else if (tetris.osX == tetris.right-1) {
							if (check(3+position-1, 4+position-1, 5+position-1, 6+position-1) != false) {
								common.zeroing();
								position -= 1;
								tetris.osX -= 1;
								tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
								tetris.orientation = 0;
							} else if (check(3+position-2, 4+position-2, 5+position-2, 6+position-2) != false) {
								common.zeroing();
								position -= 2;
								tetris.osX -= 2;
								tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
								tetris.orientation = 0;
							}
						} else {
							if (check(3+position, 4+position, 5+position, 6+position) != false) {
								common.zeroing();
								tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
								tetris.orientation = 0;
							} else if (check(3+position+1, 4+position+1, 5+position+1, 6+position+1) != false) {
								if (tetris.osX != tetris.right-2) {
									common.zeroing();
									position += 1;
									tetris.osX += 1;
									tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
									tetris.orientation = 0;
								}
							} else if (check(3+position-1, 4+position-1, 5+position-1, 6+position-1) != false) {
								if (tetris.osX != tetris.left+1) {
									common.zeroing();
									position -= 1;
									tetris.osX -= 1;
									tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
									tetris.orientation = 0;
								}
							} else if (check(3+position-2, 4+position-2, 5+position-2, 6+position-2) != false) {
								if (tetris.osX != tetris.left+2) {
									common.zeroing();
									position -= 2;
									tetris.osX -= 2;
									tetris.figure(3+position, 4+position, 5+position, 6+position, -3, 3, 1);
									tetris.orientation = 0;
								}
							}
						}
					break;
				}
			break;
			case 'figure2': // Поворот других фигур кроме палки и квадрата
				switch(tetris.orientation) {
					case 0:
						if (check(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position) != false) {
							common.zeroing();
							tetris.figure(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position, copyFigure[2][4], copyFigure[2][5], copyFigure[2][6]);
							tetris.orientation = 90;
						} else if (check(copyFigure[2][0]+position+10, copyFigure[2][1]+position+10, copyFigure[2][2]+position+10, copyFigure[2][3]+position+10) != false) {
							common.zeroing();
							position += 10;
							tetris.osY += 1;
							tetris.figure(copyFigure[2][0]+position, copyFigure[2][1]+position, copyFigure[2][2]+position, copyFigure[2][3]+position, copyFigure[2][4], copyFigure[2][5], copyFigure[2][6]);
							tetris.orientation = 90;
						}
					break;
					case 90:
						if (tetris.osX == tetris.right) {
							position -= 1;
							tetris.osX -= 1;
						}
						if (check(copyFigure[3][0]+position, copyFigure[3][1]+position, copyFigure[3][2]+position, copyFigure[3][3]+position) != false) {
							common.zeroing();
							tetris.figure(copyFigure[3][0]+position, copyFigure[3][1]+position, copyFigure[3][2]+position, copyFigure[3][3]+position, copyFigure[3][4], copyFigure[3][5], copyFigure[3][6]);
							tetris.orientation = 180;
						} else if (check(copyFigure[3][0]+position-1, copyFigure[3][1]+position-1, copyFigure[3][2]+position-1, copyFigure[3][3]+position-1) != false) {
							if (tetris.osX != tetris.left) {
								common.zeroing();
								position -= 1;
								tetris.osX -= 1;
								tetris.figure(copyFigure[3][0]+position, copyFigure[3][1]+position, copyFigure[3][2]+position, copyFigure[3][3]+position, copyFigure[3][4], copyFigure[3][5], copyFigure[3][6]);
								tetris.orientation = 180;
							}
						}
					break;
					case 180:
						if (check(copyFigure[4][0]+position, copyFigure[4][1]+position, copyFigure[4][2]+position, copyFigure[4][3]+position) != false) {
							common.zeroing();
							tetris.figure(copyFigure[4][0]+position, copyFigure[4][1]+position, copyFigure[4][2]+position, copyFigure[4][3]+position, copyFigure[4][4], copyFigure[4][5], copyFigure[4][6]);
							tetris.orientation = 270;
						}
					break;
					case 270:
						if (tetris.osX == tetris.left) {
							position += 1;
							tetris.osX += 1;
						}
						if (check(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position) != false) {
							common.zeroing();
							tetris.figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
							tetris.orientation = 0;
						} else if (check(copyFigure[1][0]+position+1, copyFigure[1][1]+position+1, copyFigure[1][2]+position+1, copyFigure[1][3]+position+1) != false) {
							if (tetris.osX != tetris.right) {
								common.zeroing();
								position += 1;
								tetris.osX += 1;
								tetris.figure(copyFigure[1][0]+position, copyFigure[1][1]+position, copyFigure[1][2]+position, copyFigure[1][3]+position, copyFigure[1][4], copyFigure[1][5], copyFigure[1][6]);
								tetris.orientation = 0;
							}
						}
					break;
				}
			break;
			case 'figure3': // "Поворот" квадрата
			break;
		}
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
					buffer[i+line*10] = 0;
				}
				common.matrix = Array.from(buffer);
				drop();
			}
			fire = true;
		}
		function drop() {
			// Обнуляем промежуточное поле
			for (let key in common.matrix) {
				if (isNaN(common.matrix[key]) == true) {
					buffer[key] = 0;
				}
			}
			// И создаем свой новый, дивный поле
			for (let key in common.matrix) {
				if (isNaN(common.matrix[key]) == true) {
					// Всё что выше удаленного ряда сдвигаем на один ряд ниже
					if (key <= line*10) {
						buffer[parseInt(key)+10] = common.matrix[key];
					}
					// Всё что ниже, оставляем на своих местах
					if (key > line*10) {
						buffer[parseInt(key)] = common.matrix[key];
					}
				}
			}
			multiplier += 1;
			common.score += 1*multiplier;
			common.matrix = Array.from(buffer);
		}
		common.visualization(common.matrix, cells);
	},
}

// Корбочка с фигурами
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

// Управление с экрана
for (i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function() {
		let input = this.id;
		// Кнопка вниз
		if (input == 'down') {
			tetris.move();
		}
		// Кнопка влево
		if (input == 'left' && tetris.osX>tetris.left) {
			tetris.leftMove();
		}
		// Кнопка вправо
		if (input == 'right' && tetris.osX<tetris.right) {
			tetris.rightMove();
		}
		// Кнопка поворота фигуры
		if (input == 'turn') {
			tetris.turn();
		}
		// Перезаписываем игровое поле и визуализируем на странице
		common.matrix = Array.from(buffer);
		common.visualization(common.matrix, cells);
	});
}
// Управление с клавиатуры
document.addEventListener('keydown', function(event) {
	if (event.code === 'ArrowLeft' && tetris.osX>tetris.left) {
		tetris.leftMove();
	}
	if (event.code === 'ArrowRight' && tetris.osX<tetris.right) {
		tetris.rightMove();
	}
	if (event.code === 'ArrowDown') {
		tetris.move();
		console.log(timer.time);
	}
	if (event.code === 'ArrowUp' || event.code === 'Space') {
		tetris.turn();
	}
	// Перезаписываем игровое поле и визуализируем на странице
	common.matrix = Array.from(buffer);
	common.visualization(common.matrix, cells);
});

// Таймер
let timer = {
	time: 1000,
	startTimer: function() {
		let downMove = setInterval(tetris.move, timer.time);
		let speed = setInterval(speedUp, 60000);
		function speedUp() {
			if (common.play === true) {
				if (timer.time > 200) {
					clearInterval(downMove);
					timer.time -= 100;
					downMove = setInterval(tetris.move, timer.time);
					document.querySelector(".tetris__info_speed").innerHTML = 11-timer.time/100;
				}
			} else {
				clearInterval(downMove);
				clearInterval(speed);
			}
		}
	},
}

tetris.figureCreation();
tetris.move();
common.visualization(common.matrix, cells); // Рисует основное поле
common.visualization(common.screenNextFigure, infoCells); // Рисует поле следущий фигуры
timer.startTimer();

// Экран конца игры
function gameOver() {
	let gameOver = document.querySelector('.tetris__gameOver');
	let newGame = document.querySelector(".tetris__gameOver_newGame");
	//
	common.play = false;
	// Запись счета в окно конца игры
	document.querySelector(".tetris__gameOver_score").innerHTML = common.score;
	// Вызов окна конца игры
	gameOver.style.display = "flex";
	// Начало новой игры
	newGame.onclick = function() {
		common.score = 0;
		figureNext = null;
		currentFigure = null;
		tetris.orientation = 0;
		tetris.osX = 0;
		tetris.osY = -1;
		tetris.left = null;
		tetris.right = null;
		timer.time = 1000;
		document.querySelector(".tetris__info_speed").innerHTML = 11-time/100;
		for (let key in common.screenNextFigure) {
			common.screenNextFigure[key] = 0;
		}
		for (let key in common.matrix) {
			buffer[key] = 0;
		}
		common.matrix = Array.from(buffer);
		gameOver.style.display = "none";
		tetris.figureCreation();
		tetris.move();
		common.visualization(common.matrix, cells);
		common.visualization(common.screenNextFigure, infoCells);
	}
	// Закрытие окна конца игры
	window.onclick = function(event) {
		if (event.target == gameOver) {
			gameOver.style.display = "none";
		}
	}
}