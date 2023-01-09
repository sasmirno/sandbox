field = document.querySelector(".tetris_field");
buttons = document.querySelectorAll(".tetris_btn");


let x = 5;
let y = 0;
//let column = 5;
//let row = 0;
let сolumns = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

/*function start() {
	setInterval(move, 50);
}*/

function move() {
	//console.log(y);
	if (y<сolumns[x]) {
		square.style.top = y*25+"px";
		y += 1;
		//row += 1;
	} else if (сolumns[x] == 0) {
		console.log('stop');
		clearInterval(timerId);
	} else {
		сolumns[x] += -1
		x = 5;
		y = 0;
		//row = 0;
		//column = 5;
		squareCreation();
		//console.log(сolumns);
	}
}

function squareCreation() {
	square=document.createElement("div");
	square.style.position = "absolute";
	square.style.left = x*25+"px";
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
		//if (сolumns[x] != 0) {}
		/*if (сolumns[x-1] <= сolumns[x]) {
			console.log(сolumns[x-1]);
		}
		if (сolumns[x+1] <= сolumns[x]) {
			console.log(сolumns[x+1]);
		}*/
		if (input == 'left' && x>0) {
			if (сolumns[x-1] > y) {
				x += -1;
				square.style.left = x*25+"px";
			}
			//console.log(сolumns[x-1]);
		}
		if (input == 'right' && x<10) {
			if (сolumns[x+1] > y) {
				x += 1;
				square.style.left = x*25+"px";
			}
			//console.log(сolumns[x+1]);
		}
		//console.log(x);
		//console.log(сolumns[x]);
	});
}

squareCreation();
let timerId = setInterval(move, 50);
//start();