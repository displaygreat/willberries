const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

//cart
const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const modalClose = document.querySelector('.modal-close');

const openModal = function() {
	modalCart.classList.add('show');
}

const closeModal = function(e) {
	if (!e.target.closest('.modal') || e.target.matches('.modal-close')) {
	modalCart.classList.remove('show');
	}
}

buttonCart.addEventListener('click', openModal);
modalCart.addEventListener('click', closeModal);

//scroll smooth
(function() {
	const scrollLink = document.querySelectorAll('a.scroll-link');

	for (let i = 0; i < scrollLink.length; i++) {
		scrollLink[i].addEventListener('click', function(e) {
			e.preventDefault();
			const id = scrollLink[i].getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		})
	}
})()