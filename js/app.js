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