field = document.querySelector(".tetris_field");
buttons = document.querySelectorAll(".tetris_btn");


let x = 125;
let y = 0;
let column = 5;
let row = 0;
let сolumns = [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500];

/*function start() {
	setInterval(move, 50);
}*/

function move() {
	console.log(row);
	if (y<сolumns[column]) {
		square.style.top = y+"px";
		y += 25;
		row += 1;
	} else if (сolumns[column] == 0) {
		console.log('stop');
		clearInterval(timerId);
	} else {
		сolumns[column] += -25
		x = 125;
		y = 0;
		row = 0;
		column = 5;
		squareCreation();
		//console.log(сolumns);
	}
}

function squareCreation() {
	square=document.createElement("div");
	square.style.position = "absolute";
	square.style.left = x+"px";
	square.style.width = "25px";
	square.style.height = "25px";
	square.style.background = "red";
	field.append(square);
}

// Кнопки управления
for (i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function() {
		let input = this.id;
		//console.log(input);
		//if (сolumns[column] != 0) {}
		//if (сolumns[column-1] <= сolumns[column]) {}
		if (input == 'left' && x>0) {
			column += -1;
			x += -25;
			square.style.left = x+"px";
		}
		if (input == 'right' && x<250) {
			column += 1;
			x += 25;
			square.style.left = x+"px";
		}
		console.log(column);
		//console.log(сolumns[column]);
	});
}

squareCreation();
let timerId = setInterval(move, 50);
//start();