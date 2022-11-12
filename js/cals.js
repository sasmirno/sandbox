let btn = document.querySelectorAll(".keys");
let zero = document.querySelector(".zeroing");
let calc = document.querySelector(".calculation");

let out; // Конечный результат

// Вывод вычисления на экран
function screen() {
	if (out != undefined) {
		document.querySelector(".cals__screen").innerHTML = out;
	}
}

// Кнопка обнуления
zero.addEventListener("click", function() {
	out = '';
	point = false;
	plus = false;
	minus = false;
	screen();
});

/*let pr = +10.9+1.15;
console.log(pr);*/

// Прочие кнопки
for (i = 0; i < btn.length; i++) {
	var point = false;
	var plus = false;
	var minus = false;
	btn[i].addEventListener("click", function() {
		let input = this.textContent;
		//let check = parseInt(out[out.length-1]);
		switch (input) {
			case '.':
				if (point == false && out != undefined) {
					out += input;
					point = true;
				} else if (out == undefined) {
					//out = '0';
					out = input;
					point = true;
				}/* else if (isNaN(check) == true) {
					out += '0.';
					point = true;
				}*/ else {
					console.log('Хватит с тебя точек');
				}
				break;
			case '+':
				point = false;
				if (plus == false && out != undefined) {
					out += input;
					plus = true;
				} else {
					console.log('Хватит с тебя плюсиков');
				}
				break;
			case '-':
				point = false;
				if (minus == false && out != undefined) {
					out += input;
					minus = true;
				} else if (out == undefined) {
					out = input;
					minus = true;
				} else {
					console.log('Хватит с тебя минусовик');
				}
				break;
			default:
				plus = false;
				minus = false;
				if (out != undefined) {
					out += input;
				} else {
					out = input;
				}
		}
		/*if (point == true && input == '.') {
			console.log('Хватит с тебя точек');
		} else if (point == false && input == '.') {
			out += input;
			point = true;
		} else if (isNaN(check) == true && input != '.') {
			out += input;
			point = false;
		} else if (out != undefined) {
			out += input;
		} else {
			out = input;
		}*/
		screen();
	});
}

// Преобразование строки  в числа
calc.addEventListener("click", function() {
	let out2;
	let out3;
	let arr2 = [];
	if (out != undefined) {
		let arr = out.split('');
		//console.log('arr2');
		for (let item of arr) {
			let digit = parseInt(item);
			if (isNaN(digit) == false/* || digit == '.'*/) {
				if (out2 !== undefined) {
					out2 += item;
				} else {
					out2 = item;
				}
			} else {
				arr2.push(out2);
				out3 = item;
				arr2.push(out3);
				out2 = undefined;
			}
		}
	} else {}
	arr2.push(out2);
	//console.log(arr2);
	console.log(out);
	//console.log(parseInt(out));
	//screen();
	//const regex = /[0-9]+|[\+*/\-]/g;
	//const found = out.match(regex);
	//console.log(found);
});