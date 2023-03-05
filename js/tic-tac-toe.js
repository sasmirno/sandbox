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
for  (i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", function() {
		field[this.id] = player;
		cells[this.id].style.color="black";
		visualization();
		doYouWin();
	});
}
//console.log(field);

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
	for (let key in winLine) {
		let line = '';
		let draw = true;
		for (i=0; i<3; i++) {
			line += field[winLine[key][i]];
		}
		//console.log(line);
		if (line === 'xxx') {
			gameOver('x');
		} else if (line === 'ooo') {
			gameOver('o');
		} else {
			// Функция хода ИИ
		}
		for (let key in field) {
			if (field[key] === 0) {
				draw = false;
			}
		}
		if (draw === true) {
			console.log('draw');
		}
	}
}

// Написать мега-супер-пупер-искусственный интеллект для игры

// Функция визуализации на сайт
function visualization() {
	for (let key in field) {
		switch (field[key]) {
			case 0:
				cells[key].innerHTML="";
			break;
			case 'x':
				cells[key].innerHTML="&#215;";
			break;
			case 'o':
				cells[key].innerHTML="&#9675;";
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
	// Вызов окна конца игры
	if (player === p) {
		document.querySelector('#result').innerHTML = "Кожаный мешок";
	} else {
		document.querySelector('#result').innerHTML = "Слава роботам";
	}
	gameOver.style.display = "flex";
	// Начало новой игры
	newGame.onclick = function() {
		for (let key in field) {
			field[key] = 0;
			gameOver.style.display = "none";
			visualization();
			play();
		}
	}
	// Закрытие окна конца игры
	window.onclick = function(event) {
		if (event.target == gameOver) {
			gameOver.style.display = "none";
		}
	}
}

play();
//gameOver();