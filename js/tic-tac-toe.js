// Экран начала игры
function play() {
	let play = document.querySelector('#play');
	let play_btn = document.querySelector('#play_btn');
	let cross = document.querySelector('#cross');
	let zero = document.querySelector('#zero');
	// Вызов окна начала игры
	play.style.display = "flex";
	// Начало игры
	play_btn.onclick = function() {
		
	}
	// Закрытие окна начала игры
	window.onclick = function(event) {
		if (event.target == play) {
			play.style.display = "none";
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

//play();
//gameOver();