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
let arr = Array.from(matrix);

// Создание фигуры
function figureCreation() {
	arr[5] = 4;
	//arr[6] = 4;
	//arr[16] = 4;
	//arr[17] = 4;
}

// Движение фигуры вниз
function move() {
	for (let key in matrix) {
		// Ищем все числа кроме нуля в массиве игрового поля
		if (isNaN(matrix[key]) == false && matrix[key] != 0) {
			if (matrix[parseInt(key)+11] == 0) {
				// Если нижняя ячейка свободна записываем в неё найденое значение
				arr[parseInt(key)+11] = matrix[key];
				if (matrix[parseInt(key)-11] == 0 || matrix[parseInt(key)-11] == undefined) {
					// Если верхния ячейка свободна обнуляем текущую ячейку
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
			}/**/ else if (matrix[parseInt(key)-11] == undefined) {
				// Если верхния ячейка отсуствует останавливаем таймер
				clearInterval(timerId);
				console.log('stop');
			} else {
				// Если внизу нет свободных ячеек записывает туда текст и создаем новую фигуру
				arr[key] = 'grey';
				x = 5;
				figureCreation();
			}
		}
	}
	// Перезаписываем игровое поле
	for (let key in arr) {
		matrix[key] = arr[key];
	}
	// Визуализируем массив игрового поля на сайте
	visualization();
	console.log('loop');
}

//console.log(matrix);
//console.log(cells);

// Кнопки управления

let x = 5;

for (i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function() {
		let input = this.id;
		//console.log(input);
		if (input == 'left' && x>0) {
			for (let key in matrix) {
				if (isNaN(matrix[key]) == false && matrix[key] != 0) {
					if (matrix[parseInt(key)-1] == 0) {
						x -= 1;
						arr[parseInt(key)-1] = matrix[key];
						if (matrix[parseInt(key)+1] == 0 || matrix[parseInt(key)+1] == undefined) {
							arr[key] = 0;
						}
					}
				}/**/
			}
		}
		if (input == 'right' && x<10) {
			for (let key in matrix) {
				if (isNaN(matrix[key]) == false && matrix[key] != 0) {
					if (matrix[parseInt(key)+1] == 0) {
						x += 1;
						arr[parseInt(key)+1] = matrix[key];
						if (matrix[parseInt(key)-1] == 0 || matrix[parseInt(key)-1] == undefined) {
							arr[key] = 0;
						}
					}
				}/**/
			}
		}
		for (let key in arr) {
			matrix[key] = arr[key];
		}
		//visualization();
		//console.log(x);
		});
}/**/

function visualization() {
	for (let key in matrix) {
		switch (matrix[key]) {
			case 0:
				//console.log(key);
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
			case 'grey':
				//console.log(key*11+i);
				cells[key].style.background="grey";
			break;
			default:
		}
		//console.log(matrix[key]);
	}
}

//visualization();
//move();
figureCreation();
let timerId = setInterval(move, 100);