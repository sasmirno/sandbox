main_div = document.querySelector(".canvas");
main_div.onmousedown=function(e) {
	main_div.onmousemove=function(e) {
		point (e)
	}
}
main_div.onmouseup=function(e) {
	stop()
}
function point(e){
	div=document.createElement("div");
	div.style.left=e.clientX+"px";
	div.style.top=e.clientY+"px";
	div.style.background="red";
	main_div.append(div);
}
function stop() {
	main_div.onmousemove=0;
}