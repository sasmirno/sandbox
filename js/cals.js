let btn = document.querySelectorAll(".keys");
let zero = document.querySelector(".zeroing");
let calc = document.querySelector(".calculation");
let back = document.querySelector(".back");

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
	//double = undefined;
	point = false;
	plus = false;
	minus = false;
	multiplication = false;
	segmentation = false;
	screen();
});

// Кнопка удаления
back.addEventListener("click", function() {
	//out = undefined;
	//double = undefined;
	//point = false;
	//plus = false;
	//minus = false;
	//multiplication = false;
	//segmentation = false;
	rewrite('');
	screen();
});


function rewrite(n) {
	let rewrite;
	for (x=0; x<out.length-1; x++) {
		if (rewrite == undefined) {
			rewrite = out[x];
		} else {
			rewrite += out[x];
		}
	}
	if (rewrite == undefined) {
		rewrite = n;
	} else if (n == '') {
		/*if (out == '') {
			rewrite = undefined;
		}*/
	} else {
		rewrite += n;
	}
	//if (input == '-') {console.log('минус');}
	out = rewrite;
}

/*let pr = 1+2/0+1;
console.log(pr);*/

// Прочие кнопки
for (i = 0; i < btn.length; i++) {
	var point = false;
	var plus = false;
	var minus = false;
	var multiplication = false;
	var segmentation = false;
	btn[i].addEventListener("click", function() {
		let input = this.textContent;
		let double = '';
		//double += input; //
		double += out;
		let check = double[double.length-1];
		//console.log('> '+check+' <');
		//console.log(double);
		switch (input) {
			case '.':
				if (point == false) {
					if (out == undefined) {
						out = '0.';
					} else if (isNaN(check) == true) {
						out += '0.';
					} else {
						out += input;
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
				if (out != undefined) {
					if (isNaN(check) == true) {
						if (check == '-' && out.length <= 1) {
							out = undefined;
						} else {
							rewrite(input);
							plus = true;
							//minus = false;
						}
					} else {
						out += input;
						plus = true;
						//minus = false;
					}
				} else {
					//console.log('Хватит с тебя плюсиков');
				}
				point = false;
				break;
			case '-':
				/*if (plus == true || multiplication == true || segmentation == true) {
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
				}*/
				if (out == undefined) {
					out = input;
					minus = true;
				} /*else if (isNaN(check) == true) {
					rewrite();
					minus = true;
				}*/ else {
					out += input;
					minus = true;
				}
				point = false;
				break;
			case '*':
				if (out != undefined) {
					if (isNaN(check) == true) {
						if (check == '-' && out.length <= 1) {
							out = undefined;
						} else {
							rewrite(input);
							multiplication = true;
							//minus = false;
						}
					} else {
						out += input;
						multiplication = true;
						//minus = false;
					}
				}
				point = false;
				break;
			case '/':
				if (out != undefined) {
					if (isNaN(check) == true) {
						if (check == '-' && out.length <= 1) {
							out = undefined;
						} else {
							rewrite(input);
							segmentation = true;
							//minus = false;
						}
					} else {
						out += input;
						segmentation = true;
						//minus = false;
					}
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
		/*function rewrite() {
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
			//if (input == '-') {console.log('минус');}
			out = rewrite;
		}*/
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