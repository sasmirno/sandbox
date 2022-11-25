let btn = document.querySelectorAll(".keys");
let zero = document.querySelector(".zeroing");
let calc = document.querySelector(".calculation");

let out; // Конечный результат

// Вывод вычисления на экран
function screen() {
	if (out == undefined) {
		document.querySelector(".cals__screen").innerHTML = '';
	} else {
		document.querySelector(".cals__screen").innerHTML = out;
	}
}

// Кнопка обнуления
zero.addEventListener("click", function() {
	out = undefined;
	double = undefined;
	point = false;
	plus = false;
	minus = false;
	multiplication = false;
	segmentation = false;
	screen();
});

/*let pr = 1+2/0+1;
console.log(pr);*/

// Прочие кнопки
for (i = 0; i < btn.length; i++) {
	var point = false;
	var plus = false;
	var minus = false;
	var multiplication = false;
	var segmentation = false;
	var double;
	btn[i].addEventListener("click", function() {
		let input = this.textContent;
		double += input; //
		let check = double[double.length-2];
		//console.log('> '+check+' <');
		//console.log(double);
		switch (input) {
			case '.':
				if (point == false) {
					if (isNaN(check) == true && out != undefined) {
						out += '0.';
						//console.log('1.1');
					} else if (out == undefined) {
						out = '0.';
						//console.log('2');
					} else {
						out += input;
						//console.log('1.2');
					}
				} else {
					console.log('Хватит с тебя точек');
				}
				point = true;
				plus = false;
				minus = false;
				multiplication = false;
				segmentation = false;
				break;
			case '+':
				/*if (isNaN(check) == true && out != undefined) {
					rewrite();
					plus = true;
					minus = false;
					multiplication = false;
					segmentation = false;
				} else if (check != '.') {
					out += input;
					plus = true;
					minus = false;
					multiplication = false;
					segmentation = false;
				} else if (out == undefined) {
					//
				} else {
					console.log('Хватит с тебя плюсиков');
				}*/
				if (out != undefined) {
					if (isNaN(check) == true) {
						rewrite();
						plus = true;
						minus = false;
						multiplication = false;
						segmentation = false;
					}/* else if () {
						//
					}*/ else {
						console.log('Хватит с тебя плюсиков');
					}
				} else {
					//
				}
				point = false;
				break;
			case '-':
				if (plus == true /*|| multiplication == true || segmentation == true*/) {
					rewrite();
					plus = false;
					minus = true;
					//multiplication = false;
					//segmentation = false;
				} else if (out != undefined && check != '.') {
					out += input;
					minus = true;
				} else if (out == undefined) {
					out = input;
					minus = true;
				} else {
					console.log('Хватит с тебя минусочков');
				}
				point = false;
				break;
			case '*':
				if (isNaN(check) == true/*plus == true || minus == true || segmentation == true*/) {
					rewrite();
					plus = false;
					minus = false;
					multiplication = true;
					segmentation = false;
				} else if (out != undefined && check != '.'/*multiplication == false && out != undefined*/) {
					out += input;
					plus = false;
					minus = false;
					multiplication = true;
					segmentation = false;
				} else if (out == undefined) {
					//out = input;
					//multiplication = true;
				} else {
					console.log('Хватит с тебя *');
				}
				point = false;
				break;
			case '/':
				if (isNaN(check) == true/*plus == true || minus == true || multiplication == true*/) {
					rewrite();
					plus = false;
					minus = false;
					multiplication = false;
					segmentation = true;
				} else if (out != undefined && check != '.'/*segmentation == false && out != undefined*/) {
					out += input;
					plus = false;
					minus = false;
					multiplication = false;
					segmentation = true;
				} else if (out == undefined) {
					//out = input;
					//segmentation = true;
				} else {
					console.log('Хватит с тебя /');
				}
				point = false;
				break;
			default:
				plus = false;
				minus = false;
				multiplication = false;
				segmentation = false;
				if (out != undefined) {
					out += input;
				} else {
					out = input;
				}
		}
		function rewrite() {
			let rewrite;
			for (x=0; x<out.length-1; x++) {
				if (rewrite == undefined) {
					rewrite = out[x];
				} else {
					rewrite += out[x];
				}
			}
			if (rewrite == undefined) {
				rewrite = input;
			} else {
				rewrite += input;
			}
			if (input == '-') {}
			out = rewrite;
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
	console.log(arr2);
	//console.log(out);
	//console.log(parseInt(out));
	//screen();
	//const regex = /[0-9]+|[\+*/\-]/g;
	//const found = out.match(regex);
	//console.log(found);
});