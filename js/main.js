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
//solution 1 scroll
// (function() {
// 	const scrollLink = document.querySelectorAll('a.scroll-link');

// 	for (let i = 0; i < scrollLink.length; i++) {
// 		scrollLink[i].addEventListener('click', function(e) {
// 			e.preventDefault();
// 			const id = scrollLink[i].getAttribute('href');
// 			document.querySelector(id).scrollIntoView({
// 				behavior: 'smooth',
// 				block: 'start'
// 			})
// 		})
// 	}
// })()

//solution 2 scroll
{
	const scrollLinks = document.querySelectorAll('a.scroll-link');

	for (const scrollLink of scrollLinks) {
		scrollLink.addEventListener('click', function(e) {
			e.preventDefault();
			const id = scrollLink.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		})
	}
}

//goods
// const more = document.querySelector('.more');
const viewAll = document.querySelectorAll('.view-all');
const navigationLink = document.querySelectorAll('.navigation-link:not(.view-all)');
const longGoodsList = document.querySelector('.long-goods-list');

//solution 1 to response
const getGoods = async function() {
	const result = await fetch('db/db.json');
	console.log(result);
	if (!result.ok) {
		throw 'Error ' + result.status
	}
	return result.json();
}

//solution 2 to response
// fetch('db/db.json')
// 	.then(function (response) {
// 		return response.json()
// 	})
// 	.then(function (data) {
// 		console.log(data);
// 	})

const createCard = function ({ label, name, img, description, id, price }) {
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6';

	card.innerHTML = `
		<div class="goods-card">
						${label ? `<span class="label">${label}</span>` : ''}
						<img src="db/${img}" alt="${name}" class="goods-image">
						<h3 class="goods-title">${name}</h3>
						<p class="goods-description">${description}</p>
						<button class="button goods-card-btn add-to-cart" data-id="${id}">
							<span class="button-price">$${price}</span>
						</button>
					</div>
	`;
	return card;
}

const renderCards = function (data) {
	longGoodsList.textContent = '';
	const cards = data.map(createCard);
	//solution 1 with forEach
	// cards.forEach(function (card) {
	// 	longGoodsList.append(card);
	// })

	//solution 2 with ...
	longGoodsList.append(...cards);
	document.body.classList.add('show-goods');
}

const showAll = function(event) {
	event.preventDefault();
	getGoods().then(renderCards);
}

viewAll.forEach(function(elem) {
	elem.addEventListener('click', showAll)
})

const filterCards = function (field, value) {
	getGoods().then(function (data) {
		const filteredGoods = data.filter(function(good) {
			return good[field] === value
		});
		return filteredGoods;
	})
	.then(renderCards)
}

navigationLink.forEach(function (link) {
	link.addEventListener('click', function (event) {
		event.preventDefault();
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value)
	})
});

const showAccessories = document.querySelectorAll('.show-accessories');
const showClothing = document.querySelectorAll('.show-clothing');

showAccessories.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'Accessories')
	})
})
showClothing.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'Clothing')
	})
})

//hw 2

// const btnText = document.querySelectorAll('.special-offers .button-text');
// const arrBtnText = [...btnText];
// const btnViewAll = arrBtnText.filter(function(btn) {
// 	return btn.innerHTML === 'View all' 
// })
// btnViewAll.forEach(function(link) {
// 	link.addEventListener('click', function(event) {
// 		event.preventDefault();
// 		const field = link.dataset.field;
// 		const value = link.dataset.value;
// 		filterCards(field, value);
// 		document.querySelector('#body').scrollIntoView({
// 			behavior: 'smooth',
// 			block: 'start'
// 		})
// 	})
// })