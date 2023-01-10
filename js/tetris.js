field = document.querySelector(".tetris_field");
buttons = document.querySelectorAll(".tetris_btn");


let x = 5;
let y = 0;
let сolumns = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];


function move() {
	//console.log(y);
	if (y<сolumns[x]) {
		shape.style.top = y*25+"px";
		y += 1;
	} else if (сolumns[x] == 0) {
		console.log('stop');
		clearInterval(timerId);
	} else {
		сolumns[x] += -1
		x = 5;
		y = 0;
		shapeCreation();
	}
}

function zigzag() {
	shape.style.position = "absolute";
	shape.style.left = x*20+"px";
	shape.style.width = "75px";
	shape.style.height = "50px";
	shape.innerHTML = '<div style="position: absolute; left: 0px; width: 25px; height: 25px; background: green;"></div><div style="position: absolute; left: 25px; width: 25px; height: 25px; background: green;"></div><div style="position: absolute; left: 25px; bottom: 0px; width: 25px; height: 25px; background: green;"></div><div style="position: absolute; left: 50px; bottom: 0px; width: 25px; height: 25px; background: green;"></div>';
}

function square() {
	shape.style.position = "absolute";
	shape.style.left = x*25+"px";
	shape.style.width = "25px";
	shape.style.height = "25px";
	shape.style.background = "red";
}

function shapeCreation() {
	shape=document.createElement("div");
	zigzag();
	field.append(shape);
}

// Кнопки управления
for (i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function() {
		let input = this.id;
		//console.log(input);
		if (input == 'left' && x>0) {
			if (сolumns[x-1] > y) {
				x += -1;
				shape.style.left = x*25+"px";
			}
			//console.log(сolumns[x-1]);
		}
		if (input == 'right' && x<10) {
			if (сolumns[x+1] > y) {
				x += 1;
				shape.style.left = x*25+"px";
			}
			//console.log(сolumns[x+1]);
		}
		//console.log(x);
		//console.log(сolumns[x]);
	});
}

shapeCreation();
let timerId = setInterval(move, 50);