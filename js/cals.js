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

// Кнопка равно
calc.addEventListener("click", function() {
// Преобразование строки в массив
	//if (out != undefined) {
	//	const regex = /[0-9]+|[\+*/.\-]/g;
	//	const found = out.match(regex);
	//	console.log(found);
	//}
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
					arr.push(parseInt(number));
				}
				notNumber = item;
				arr.push(notNumber);
				number = undefined;
			}
		}
	} else {
		number = '0';
	}
	arr.push(parseInt(number));
	//console.log(arr);
// Получение дробных чисел из массива и запись оных обратно
	for (let key in arr) {
		if (arr[key] == '.') {
			let fraction = (arr[parseInt(key)-1]+'.'+arr[parseInt(key)+1])*1;
			arr.splice(parseInt(key)-1, 3, fraction);
		}
	}
	//console.log(arr);
// Вычисление и вывод результата на экран
	let expression;
	function calculation(i, e) {
		arr.splice(i, 3, e);
	}
	if (isNaN(check()) == false) {
		for (i=0;i<arr.length;i++) {
			for (let key in arr) {
				if (arr[key] == '*') {
					expression = arr[parseInt(key)-1]*arr[parseInt(key)+1];
					let inx = parseInt(key)-1;
					calculation(inx, expression);
				}
				if (arr[key] == '/') {
					expression = arr[parseInt(key)-1]/arr[parseInt(key)+1];
					let inx = parseInt(key)-1;
					calculation(inx, expression);
				}
			}
			for (let key in arr) {
				if (arr[key] == '+') {
					expression = arr[parseInt(key)-1]+arr[parseInt(key)+1];
					let inx = parseInt(key)-1;
					calculation(inx, expression);
				}
				if (arr[key] == '-') {
					expression = arr[parseInt(key)-1]-arr[parseInt(key)+1];
					let inx = parseInt(key)-1;
					calculation(inx, expression);
				}
			}
		}
		//console.log(arr);
		out = String(arr);
		screen();
	}
});