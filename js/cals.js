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
	point = false;
	plus = false;
	minus = false;
	multiplication = false;
	segmentation = false;
	screen();
});

/*let pr = 0.+1;
console.log(pr);*/

// Прочие кнопки
for (i = 0; i < btn.length; i++) {
	var point = false;
	var plus = false;
	var minus = false;
	var multiplication = false;
	var segmentation = false;
	let dhh = '0'; //
	btn[i].addEventListener("click", function() {
		let input = this.textContent;
		dhh += input; //
		let check = parseInt(dhh[dhh.length-1]); //
		switch (input) {
			case '.':
				if (point == false && out != undefined) {
					out += input;
					point = true;
					//plus = true;
					//minus = true;
					//multiplication = true;
					//segmentation = true;
				} else if (out == undefined) {
					out = '0.';
					//out = input;
					point = true;
					//plus = true;
					//minus = true;
					//multiplication = true;
					//segmentation = true;
				} else if (isNaN(check) == true) {
					out += '0.';
					point = true;
					console.log('hf,jnftn');
				}/**/ else {
					console.log('Хватит с тебя точек');
				}
				break;
			case '+':
				if (minus == true || multiplication == true || segmentation == true) {
					if (point == false) {
						rewrite();
						point = false;
						plus = true;
						minus = false;
						multiplication = false;
						segmentation = false;
					}
				} else if (plus == false && out != undefined) {
					out += input;
					plus = true;
						point = false;
				} else if (out == undefined) {
					//out = input;
					//plus = true;
				} else {
					console.log('Хватит с тебя плюсиков');
				}
				break;
			case '-':
				point = false;
				if (plus == true /*|| multiplication == true || segmentation == true*/) {
					rewrite();
					plus = false;
					minus = true;
					//multiplication = false;
					//segmentation = false;
				} else if (minus == false && out != undefined) {
					out += input;
					minus = true;
				} else if (out == undefined) {
					out = input;
					minus = true;
				} else {
					console.log('Хватит с тебя минусочков');
				}
				break;
			case '*':
				point = false;
				if (plus == true || minus == true || segmentation == true) {
					rewrite();
					plus = false;
					minus = false;
					multiplication = true;
					segmentation = false;
				} else if (multiplication == false && out != undefined) {
					out += input;
					multiplication = true;
				} else if (out == undefined) {
					//out = input;
					//multiplication = true;
				} else {
					console.log('Хватит с тебя *');
				}
				break;
			case '/':
				point = false;
				if (plus == true || minus == true || multiplication == true) {
					rewrite();
					plus = false;
					minus = false;
					multiplication = false;
					segmentation = true;
				} else if (segmentation == false && out != undefined) {
					out += input;
					segmentation = true;
				} else if (out == undefined) {
					//out = input;
					//segmentation = true;
				} else {
					console.log('Хватит с тебя /');
				}
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