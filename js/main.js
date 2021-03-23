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
const closeModal = function() {
	modalCart.classList.remove('show');
}

buttonCart.addEventListener('click', openModal);

//solution 1
// modalCart.addEventListener('click', (e) => {
// 	if (e.target.classList.contains('overlay') || e.target.classList.contains('modal-close')) {
// 		closeModal();
// 	}
// });

//solution 2
modalCart.addEventListener('click', (e) => {
	if (!e.target.closest('.modal') || e.target.matches('.modal-close')) {
		closeModal();
	}
});

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