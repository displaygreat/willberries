//cart
const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const modalClose = document.querySelector('.modal-close');
const viewAll = document.querySelectorAll('.view-all');
const navigationLink = document.querySelectorAll('.navigation-link:not(.view-all)');
const longGoodsList = document.querySelector('.long-goods-list');
const cartTableGoods = document.querySelector('.cart-table__goods');
const cardTableTotal = document.querySelector('.card-table__total');
const cartCount = document.querySelector('.cart-count');
const btnClear = document.querySelector('.btn-clear');

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

const cart = {
	// cartGoods: [],
	//solution 2 with local storage
	cartGoods: JSON.parse(localStorage.getItem('cartWillberries')) || [],
	updateLocalStorage() {
		localStorage.setItem('cartWillberries', JSON.stringify(this.cartGoods))
	},
	getCountCartGoods() {
		return this.cartGoods.length;
	},
  countQuantity() {
    cartCount.textContent = this.cartGoods.reduce((acc, item) => {
      return acc + item.count;
    }, 0)
  },
  clearCart() {
    this.cartGoods.length = 0;
    this.countQuantity();
		this.updateLocalStorage();
    this.renderCart();
  },
	renderCart(){
		cartTableGoods.textContent = '';
		this.cartGoods.forEach(({ id, name, price, count }) => {
			const trGood = document.createElement('tr');
			trGood.className = 'cart-item';
			trGood.dataset.id = id;
			trGood.innerHTML = `
				<td>${name}</td>
						<td>${price}</td>
						<td><button class="cart-btn-minus">-</button></td>
						<td>${count}</td>
						<td><button class="cart-btn-plus">+</button></td>
						<td>${price*count}</td>
						<td><button class="cart-btn-delete">x</button></td>
			`;
			cartTableGoods.append(trGood);
		});
		const totalPrice = this.cartGoods.reduce((acc, item) => {
			return acc + (item.price*item.count)
		}, 0);
		cardTableTotal.textContent = totalPrice + '$'
	},
	deleteGood(id){
		this.cartGoods = this.cartGoods.filter(item => id !== item.id);
		this.countQuantity();
		this.updateLocalStorage();
		this.renderCart();
	},
	minusGood(id){
		for (const item of this.cartGoods) {
			if (item.id === id) {
				if (item.count <=1) {
					this.deleteGood(id);
          this.countQuantity();
				} else {
					item.count--;
				}
				break;
			}
		}
    this.countQuantity();
		this.updateLocalStorage();
		this.renderCart();
	},
	plusGood(id){
		for (const item of this.cartGoods) {
			if (item.id === id) {
				item.count++;
				break;
			}
		}
    this.countQuantity();
		this.updateLocalStorage();
		this.renderCart();
	},
	addCartGoods(id){
		const goodItem = this.cartGoods.find(item => item.id === id);
		if (goodItem) {
			this.plusGood(id)
		} else {
			getGoods()
				.then(data => data.find(item => item.id === id))
				.then(({id, name, price}) => {
					this.cartGoods.push({
						id,
						name,
						price,
						count: 1
					})
          this.countQuantity();
					this.updateLocalStorage();
				})
		}
		console.log(goodItem);
    
	}
}

btnClear.addEventListener('click', () => {
  cart.clearCart();
});

document.body.addEventListener('click', event => {
	const addToCart = event.target.closest('.add-to-cart');
	if (addToCart) {
		cart.addCartGoods(addToCart.dataset.id);
	}
})

cartTableGoods.addEventListener('click', e => {
	const target = e.target;
	if (target.tagName === 'BUTTON') {
		const id = target.closest('.cart-item').dataset.id;
		if (target.classList.contains('cart-btn-delete')) {
			cart.deleteGood(id);
		}
		if (target.classList.contains('cart-btn-minus')) {
			cart.minusGood(id);
		}
		if (target.classList.contains('cart-btn-plus')) {
			cart.plusGood(id);
		}
	}
})

const openModal = () => {
	cart.renderCart();
	modalCart.classList.add('show');
}
const closeModal = () => {
	modalCart.classList.remove('show');
}

buttonCart.addEventListener('click', openModal);

//solution 1
modalCart.addEventListener('click', (e) => {
	if (e.target.classList.contains('overlay') || e.target.classList.contains('modal-close')) {
		closeModal();
	}
});

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

viewAll.forEach(elem => {
	elem.addEventListener('click', showAll)
})

const filterCards = function (field, value) {
	getGoods()
		.then(data => data.filter(good => good[field] === value))
		.then(renderCards)
}

navigationLink.forEach(function (link) {
	link.addEventListener('click', event => {
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

const modalForm = document.querySelector('.modal-form');

const postData = dataUser => fetch('server.php', {
	method: 'POST',
	body: dataUser
});

const validForm = (formData) => {
	let valid = false;
	 for (const [, value] of formData) {
		if (value.trim()) {
			return valid = true;
		} else {
			return valid = false;
			break;
		}
	}
}

modalForm.addEventListener('submit', event => {
	event.preventDefault();
	const formData = new FormData(modalForm);

	if (validForm(formData) && cart.getCountCartGoods()) {

		const data = {};
		for (const [name, value] of formData) {
			data[name] = value;
		}
		
		data.cart = cart.cartGoods;

		console.log(JSON.stringify(data));
		//solution 1
		// formData.append('cart', JSON.stringify(cart.cartGoods))
		// postData(formData)

		//solution 2
		postData(JSON.stringify(data))
			.then(response => {
				if(!response.ok) {
					throw new Error(response.status);
				}
				alert('Your order has been sent')
			})
			.catch(error => {
				alert('An error has occurred, try again later');
				console.error(error);
			})
			.finally(() => {
				closeModal();
				modalForm.reset();
				cart.cartGoods.length = 0;
				cart.clearCart();
			}) 
	} else {
		if (!cart.getCountCartGoods()) {
			alert('Add goods to cart')
		}
		if (!validForm(formData)) {
			alert ('All the fields are required')
		}
	}
})