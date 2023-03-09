cells = document.querySelectorAll(".tic-tac-toe__field_cell");

let player;
let ai;

let field = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// Рисование знака в ячейке при наведенее на неё
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
				artificialIdiot();
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
	for (let key in field) {
		if (field[key] === 0) {
			deadHeat = false;
		}
	}
	if (deadHeat === true && playing === true) {
		gameOver('=');
	}
}

// Написать мега-супер-пупер-искусственный интеллект для игры
function artificialIdiot() {
	/*if (playing === true) {
		if (field[4] === 0) {
			field[4] = ai;
		} else if (twoIdenticalCharacters() === true) {
			twoIdenticalCharacters();
		} else {
			let random = Math.round(Math.random() * 3);
			let options = [0, 2, 6, 8];
			//console.log(random);
			if (field[options[random]] === 0) {
				field[options[random]] = ai;
			} else {
				artificialIdiot();
			}
		}
		console.log(field);
		doYouWin();
		visualization();
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
			if (line === player + player) {
				//console.log('xx');
				//console.log(number+' number');
				field[number] = ai;
				return true
			} else if (line === ai + ai) {
				//console.log('oo');
				//field[number] = ai;
				return true
			}
		}
	}*/
	// Искусственный идиот
	if (playing === true) {
		let random = Math.round(Math.random() * 8);
		if (field[random] === 0) {
			field[random] = ai;
		} else {
			artificialIdiot();
		}
		doYouWin();
		visualization();
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
		ai = 'o';
		play.style.display = "none";
	}
	// Выбор нолика
	zero.onclick = function() {
		player = 'o';
		ai = 'x';
		play.style.display = "none";
	}
	// Закрытие окна начала игры
	window.onclick = function(event) {
		if (event.target == play) {
			player = 'x';
			ai = 'o';
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