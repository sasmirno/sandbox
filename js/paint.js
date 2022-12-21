canvas = document.querySelector(".canvas");
color_btn = document.querySelectorAll(".color");
size_btn = document.querySelectorAll(".size");

// Выбор цвета
let color = "black";
for  (i = 0; i < color_btn.length; i++) {
	color_btn[i].addEventListener("click", function() {
		color = this.id;
	});
}
// Выбор размера
let size = "5px";
for  (i = 0; i < size_btn.length; i++) {
	size_btn[i].addEventListener("click", function() {
		size = this.id;
	});
}

canvas.onmousedown=function(e) {
	canvas.onmousemove=function(e) {
		point (e)
	}
}

canvas.onmouseup=function(e) {
	stop()
}

function point(e){
	div=document.createElement("div");
	div.style.left=e.clientX+"px";
	div.style.top=e.clientY+"px";
	div.style.width=size;
	div.style.height=size;
	div.style.background=color;
	canvas.append(div);
}

function stop() {
	canvas.onmousemove=0;
}