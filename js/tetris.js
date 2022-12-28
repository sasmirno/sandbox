field = document.querySelector(".tetris_field");
buttons = document.querySelectorAll(".tetris_btn");


let x = 125;
let y = 0;
let column = 5;
let сolumns = [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500];

/*function start() {
	setInterval(move, 500);
}*/

function move() {
	if (y<сolumns[column]) {
		square.style.top = y+"px";
		y += 25;
	} else if (сolumns[column] == 0) {
		console.log('stop');
		clearInterval(move);
	} else {
		clearInterval(move);
		сolumns[column] += -25
		x = 125;
		y = 0;
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
		//console.log(column);
		if (input == 'left' && x>0) {
			column += -1;
			x += -25;
			square.style.left = x+"px";
		} else if (input == 'right' && x<250) {
			column += 1;
			x += 25;
			square.style.left = x+"px";
		}
	});
}

squareCreation();
setInterval(move, 500);
//start();