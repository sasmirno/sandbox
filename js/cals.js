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
	let number;
	let notNumber;
	let arr = [];
	if (out != undefined) {
		for (let item of out) {
			if (isNaN(item) == false) {
				if (number != undefined) {
					number += item;
				} else {
					number = item;
				}
			} else {
				if (number != undefined) {
					arr.push(number);
				}
				notNumber = item;
				arr.push(notNumber);
				number = undefined;
			}
		}
	} else {
		number = '0';
	}
	arr.push(number);
	console.log(arr);
	//if (out != undefined) {
	//	const regex = /[0-9]+|[\+*/.\-]/g;
	//	const found = out.match(regex);
	//	console.log(found);
	//}
	let expression;
	function calculation(i, e) {
		arr.splice(i, 3, e);
	}
	for (i=0;i<arr.length;i++) {
		/*for (let key in arr) {
			if (arr[key] == '.') {
				expression = (parseInt(arr[parseInt(key)-1])+'.'+parseInt(arr[parseInt(key)+1]))*1;
				let inx = parseInt(key)-1;
				calculation(inx, expression);
			}
		}*/
		for (let key in arr) {
			if (arr[key] == '*') {
				expression = parseInt(arr[parseInt(key)-1])*parseInt(arr[parseInt(key)+1]);
				let inx = parseInt(key)-1;
				calculation(inx, expression);
			}
			if (arr[key] == '/') {
				expression = parseInt(arr[parseInt(key)-1])/parseInt(arr[parseInt(key)+1]);
				let inx = parseInt(key)-1;
				calculation(inx, expression);
			}
		}
		for (let key in arr) {
			if (arr[key] == '+') {
				expression = parseInt(arr[parseInt(key)-1])+parseInt(arr[parseInt(key)+1]);
				let inx = parseInt(key)-1;
				calculation(inx, expression);
			}
			if (arr[key] == '-') {
				expression = parseInt(arr[parseInt(key)-1])-parseInt(arr[parseInt(key)+1]);
				let inx = parseInt(key)-1;
				calculation(inx, expression);
			}
		}
	}
	console.log(arr);
	//console.log(expression);
	out = arr;
	screen();
});

/*let pr = 1+'0.1'*1;
console.log(pr);*/