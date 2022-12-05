let btn = document.querySelectorAll(".keys");
let zero = document.querySelector(".zeroing");
let calc = document.querySelector(".calculation");
let back = document.querySelector(".backspace");

let out; // Конечный результат

// Вывод строки на экран
function screen() {
	if (out == undefined) {
		document.querySelector(".cals__screen").innerHTML = '';
	} else {
		document.querySelector(".cals__screen").innerHTML = out;
	}
	//console.log(out);
	//console.log(check());
}

// Кнопка обнуления всего на свете
zero.addEventListener("click", function() {
	out = undefined;
	point = false;
	screen();
});

// Кнопка удаления последнего символа
back.addEventListener("click", function() {
	if (check() == '.') {
		point = false;
	}
	if (out != undefined) {
		if (out.length <= 1) {
			out = undefined;
		} else {
			rewrite('');
		}
	}
	screen();
});

// Нахождение последнего символа
function check() {
	let check;
	if (out != undefined) {
		check = out[out.length-1];
	}
	return check;
}

// Перепись последнего символа
function rewrite(n) {
	let rewrite;
	for (i=0; i<out.length-1; i++) {
		if (rewrite == undefined) {
			rewrite = out[i];
		} else {
			rewrite += out[i];
		}
	}
	if (rewrite == undefined) {
		rewrite = n;
	} else {
		rewrite += n;
	}
	out = rewrite;
}

/*let pr = 1+2/0+1;
console.log(pr);*/

// Прочие кнопки
for (i = 0; i < btn.length; i++) {
	var point = false;
	btn[i].addEventListener("click", function() {
		let input = this.textContent;
		function entry() {
			if (out != undefined) {
				if (isNaN(check()) == true) {
					if (check() == '-') {
						if (out.length <= 1) {
							out = undefined;
						} else {
							rewrite('');
							if (isNaN(check()) == false) {
								out += input;
							}
						}
					} else {
						rewrite(input);
					}
				} else {
					out += input;
				}
			}
		}
		switch (input) {
			case '.':
				if (point == false) {
					if (out == undefined) {
						out = '0.';
					} else if (isNaN(check()) == true) {
						out += '0.';
					} else {
						out += input;
					}
				}
				point = true;
				break;
			case '+':
				entry();
				point = false;
				break;
			case '-':
				if (out != undefined) {
					if (isNaN(check()) == true) {
						if (check() == '-' && out.length <= 1) {
							out = undefined;
						} else if (check() == '*' || check() == '/') {
							out += input;
						} else {
							rewrite(input);
						}
					} else {
						out += input;
					}
				} else {
					out = input;
				}
				point = false;
				break;
			case '*':
				entry();
				point = false;
				break;
			case '/':
				entry();
				point = false;
				break;
			default:
				if (out != undefined) {
					out += input;
				} else {
					out = input;
				}
		}
		screen();
	});
}

// Преобразование строки  в вычисляемое выражение
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