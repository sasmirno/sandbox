cells = document.querySelectorAll(".tic-tac-toe__field_cell");

let player;
let robot;
let step = 1;

let field = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// Появление знака в ячейке при наведенее на ячейку
for  (i = 0; i < cells.length; i++) {
	cells[i].addEventListener("mouseover", function() {
		if (field[this.id] === 0) {
			if (player === 'x') {
				cells[this.id].innerHTML="&#215;";
			} else {
				cells[this.id].innerHTML="&#9675;";
			}
			cells[this.id].style.color="grey";
		}
	});
	cells[i].addEventListener("mouseout", function() {
		if (field[this.id] === 0) {
			cells[this.id].style.color="white";
		}
	});
}

// Установка знака в игровую ячейку
let playing = true;
for  (i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", function() {
		if (playing === true) {
			if (field[this.id] === 0) {
				field[this.id] = player;
				visualization();
				doYouWin();
				artificialIntelligence();
			}
		}
	});
}

// Проверка на выигрышные линии или ничью
// Выигрышные комбинации
let winLine = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
function doYouWin() {
	let deadHeat = true;
	// Поиск выигрышных линий
	for (let key in winLine) {
		let line = '';
		for (i=0; i<3; i++) {
			line += field[winLine[key][i]];
		}
		if (line === 'xxx') {
			gameOver('x');
		} else if (line === 'ooo') {
			gameOver('o');
		}
	}
	// Проверка на ничью
	for (let key in field) {
		if (field[key] === 0) {
			deadHeat = false;
		}
	}
	if (deadHeat === true && playing === true) {
		gameOver('=');
	}
}

// Мега-супер-пупер-искусственный интеллект
let artificialIdiot = false;
function artificialIntelligence() {
	if (artificialIdiot === false) {
		if (playing === true) {
			let random = Math.round(Math.random() * 3);
			let corners = [0, 2, 6, 8];
			let sides = [1, 2, 5, 7];
			switch (step) {
				case 2:
					if (field[4] === 0) {
						field[4] = robot;
					} else {
						field[corners[random]] = robot;
					}
					break;
				case 4:
					if (twoIdenticalCharacters() === true) {
						twoIdenticalCharacters();
					} else {
						if (field[4] === robot) {
							if (field[1] === player && field[5] === player) {
								field[2] = robot;
							} else if (field[5] === player && field[7] === player) {
								field[8] = robot;
							} else if (field[7] === player && field[3] === player) {
								field[6] = robot;
							} else if (field[3] === player && field[1] === player) {
								field[0] = robot;
							} else {
								if (field[sides[random]] === 0) {
									field[sides[random]] = robot;
								} else {
									artificialIntelligence();
								}
							}
						} else {
							if (field[corners[random]] === 0) {
								field[corners[random]] = robot;
							} else {
								artificialIntelligence();
							}
						}
					}
					break;
				default:
					if (twoIdenticalCharacters() === true) {
						twoIdenticalCharacters();
					} else {
						if (field[corners[random]] === 0) {
							field[corners[random]] = robot;
						} else {
							if (field[sides[random]] === 0) {
								field[sides[random]] = robot;
							} else {
								artificialIntelligence();
							}
						}
					}
			}
			doYouWin();
			visualization();
		}
	}
	// Искусственный идиот
	if (artificialIdiot === true) {
		if (playing === true) {
			let random = Math.round(Math.random() * 8);
			if (twoIdenticalCharacters() === true) {
				twoIdenticalCharacters();
			} else {
				if (field[random] === 0) {
					field[random] = robot;
				} else {
					artificialIntelligence();
				}
			}
			doYouWin();
			visualization();
		}
	}
	function twoIdenticalCharacters() {
		for (let key in winLine) {
			let line = '';
			let number;
			for (i=0; i<3; i++) {
				if (field[winLine[key][i]] != 0) {
					line += field[winLine[key][i]];
				} else {
					number = winLine[key][i];
				}
			}
			if (line === robot + robot && playing === true) {
				field[number] = robot;
				playing = false;
				return true
			}
		}
		for (let key in winLine) {
			let line = '';
			let number;
			for (i=0; i<3; i++) {
				if (field[winLine[key][i]] != 0) {
					line += field[winLine[key][i]];
				} else {
					number = winLine[key][i];
				}
			}
			if (line === player + player && playing === true) {
				field[number] = robot;
				playing = false;
				return true
			}
		}
		playing = true;
	}
}

// Функция визуализации на сайт
function visualization() {
	for (let key in field) {
		switch (field[key]) {
			case 0:
				cells[key].innerHTML="";
			break;
			case 'x':
				cells[key].innerHTML="&#215;";
				cells[key].style.color="black";
			break;
			case 'o':
				cells[key].innerHTML="&#9675;";
				cells[key].style.color="black";
			break;
		}
	}
	step++;
}

// Экран начала игры
function play() {
	let play = document.querySelector('#play');
	let cross = document.querySelector('#cross');
	let zero = document.querySelector('#zero');
	// Вызов окна начала игры
	play.style.display = "flex";
	// Выбор крестика
	cross.onclick = function() {
		player = 'x';
		robot = 'o';
		play.style.display = "none";
	}
	// Выбор нолика
	zero.onclick = function() {
		player = 'o';
		robot = 'x';
		play.style.display = "none";
	}
	// Закрытие окна начала игры
	window.onclick = function(event) {
		if (event.target == play) {
			player = 'x';
			robot = 'o';
			play.style.display = "none";
		}
	}
}

// Экран конца игры
function gameOver(p) {
	let gameOver = document.querySelector('#gameOver');
	let newGame = document.querySelector('#newGame_btn');
	playing = false;
	// Вызов окна конца игры
	if (player === p) {
		document.querySelector('#result').innerHTML = "Смерть челавекам!";
	} else {
		document.querySelector('#result').innerHTML = "Слава роботам!";
	}
	if (p === '=') {
		document.querySelector('#result').innerHTML = "Ничья";
	}
	gameOver.style.display = "flex";
	// Начало новой игры
	newGame.onclick = function() {
		for (let key in field) {
			field[key] = 0;
		}
		playing = true;
		gameOver.style.display = "none";
		visualization();
		step = 1;
		play();
	}
	// Закрытие окна конца игры
	window.onclick = function(event) {
		if (event.target == gameOver) {
			gameOver.style.display = "none";
		}
	}
}

play();