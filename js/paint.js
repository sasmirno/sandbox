const canvas = document.getElementById('drawing-board'); // Холст
const toolbar = document.getElementById('toolbar'); // Панель управления
const wrapper  = document.querySelector('.wrapper');

const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

// Задаёт размеры холста в зависимости от размера окна
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => {
	// Кнопка очистки холста
	if (e.target.id === 'clear') {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	// Уменьшение толщены линии
	if (e.target.id === 'downWidth') {
		if (lineWidth !== 1) {
			lineWidth -= 1;
			document.querySelector("#lineWidth").innerHTML = lineWidth;
		}
	}
	// Увеличение толщены линии
	if (e.target.id === 'upWidth') {
		if (lineWidth <= 15) {
			lineWidth += 1;
			document.querySelector("#lineWidth").innerHTML = lineWidth;
		}
	}
});

// Выбор цвета
toolbar.addEventListener('change', e => {
	if(e.target.id === 'stroke') {
		ctx.strokeStyle = e.target.value;
	}
});

canvas.addEventListener('pointerdown', (e) => {
	isPainting = true;
	startX = e.clientX;
	startY = e.clientY;
});

wrapper.addEventListener('pointerup', e => {
	isPainting = false;
	ctx.stroke();
	ctx.beginPath();
});

const draw = (e) => {
	if(!isPainting) {
		return;
	}
	ctx.lineWidth = lineWidth;
	ctx.lineCap = 'round';
	ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
	ctx.stroke();
}

canvas.addEventListener('pointermove', draw);