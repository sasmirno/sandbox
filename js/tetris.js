field = document.querySelector(".tetris_field");
buttons = document.querySelectorAll(".tetris_btn");


let x = 125;
let y = 0;

function creation() {
	if (y==0) {}
	square=document.createElement("div");
	setInterval(move, 500);
	//figure();
}

function move() {
	if (y<500) {
		square.style.top = y+"px";
		y += 25;
		figure();
	} else {
		clearInterval(move);
		y = 0;
	}
}

function figure() {
	square.style.position = "absolute";
	square.style.left = x+"px";
	//square.style.top = y+"px";
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
		//console.log(x);
		if (input == 'left' && x>0) {
			x += -25;
			figure();
		} else if (input == 'right' && x<250) {
			x += 25;
			figure();
		}
	});
}

//figure();
creation();

//setInterval(move, 1000);