const canvas = document.getElementById('drawing-board'); // Холст
const toolbar = document.getElementById('toolbar'); // Панель управления

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

// Кнопка очистки холста
toolbar.addEventListener('click', e => {
	if (e.target.id === 'clear') {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
});
// Выбор цвета и толщины
toolbar.addEventListener('change', e => {
	if(e.target.id === 'stroke') {
		ctx.strokeStyle = e.target.value;
	}
	if(e.target.id === 'lineWidth') {
		lineWidth = e.target.value;
	}
});

canvas.addEventListener('mousedown', (e) => {
	isPainting = true;
	startX = e.clientX;
	startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
	isPainting = false;
	ctx.stroke();
	ctx.beginPath();
});

/*canvas.addEventListener('mouseout', e => {
	isPainting = false;
	ctx.stroke();
	ctx.beginPath();
});*/

const draw = (e) => {
	if(!isPainting) {
		return;
	}

	ctx.lineWidth = lineWidth;
	ctx.lineCap = 'round';

	ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
	ctx.stroke();
}

canvas.addEventListener('mousemove', draw);