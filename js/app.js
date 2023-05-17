//burger
let menuBtn = document.querySelector('.burger__button');
let menu = document.querySelector('.burger__menu');
let lock = document.querySelector('body');
menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('burger_active');
	menu.classList.toggle('burger_active');
	lock.classList.toggle('burger_lock');
})

// accordion
let acc = document.getElementsByClassName("accordion");
for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function() {
		this.classList.toggle("accordion_open");
		let panel = this.nextElementSibling;
		if (panel.style.maxHeight){
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		} 
	});
}

// up button
let btnPgTop = document.querySelector(".btnPgTop");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		btnPgTop.style.display = "block";
	} else {
		btnPgTop.style.display = "none";
	}
}
btnPgTop.addEventListener('click', function(){
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
})