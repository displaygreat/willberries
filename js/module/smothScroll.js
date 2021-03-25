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
		scrollLink.addEventListener('click', e => {
			e.preventDefault();
			const id = scrollLink.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		})
	}
}