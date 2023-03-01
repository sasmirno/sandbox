cells = document.querySelectorAll(".tic-tac-toe__field_cell");

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

let player;
let ai;

let field = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// Установка знака в игровую ячейку
for  (i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", function() {
		field[this.id] = player;
		visualization();
	});
}
//console.log(field);

// Функция визуализации
function visualization() {
	for (let key in field) {
		switch (field[key]) {
			case 0:
				//cells[key].style.background="white";
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


// Экран конца игры
function gameOver() {
	let gameOver = document.querySelector('#gameOver');
	let newGame = document.querySelector('#newGame_btn');
	// Вызов окна конца игры
	gameOver.style.display = "flex";
	// Начало новой игры
	newGame.onclick = function() {
		
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