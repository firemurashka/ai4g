
document.addEventListener("DOMContentLoaded", (function () {
	function animateSolution(containerSelector, itemSelector, initialDelay, itemDelay, threshold) {
		const items = document.querySelectorAll(itemSelector);
		const showItems = () => {
			items.forEach(((item, index) => {
				setTimeout((() => {
					item.classList.add("visible");
				}), index * itemDelay);
			}));
		};
		const observer = new IntersectionObserver((entries => {
			entries.forEach((entry => {
				if (entry.isIntersecting) {
					setTimeout(showItems, initialDelay);
					observer.disconnect();
				}
			}));
		}), {
			threshold
		});
		const container = document.querySelector(containerSelector);
		observer.observe(container);
	}

	function animateServiceItems() {
		const items = document.querySelectorAll(".servise-session__item");
		const decorImg = document.querySelector(".servise-session__decor-img");
		if (items.length > 0 && decorImg) {
			items.forEach(((item, index) => {
				const img = item.querySelector(".servise-session__img");
				const block = item.querySelector(".servise-session__block");
				setTimeout((() => {
					img.classList.add("show");
				}), 300 * index);
				setTimeout((() => {
					block.classList.add("show");
				}), 300 * index + 300);
			}));
			setTimeout((() => {
				decorImg.classList.add("show");
			}), 300 * items.length + 200);
		}
	}

	const serviceObserver = new IntersectionObserver((entries => {
		entries.forEach((entry => {
			if (entry.isIntersecting) {
				setTimeout((() => {
					animateServiceItems();
				}), 100);
				serviceObserver.disconnect();
			}
		}));
	}), {
		threshold: .1
	});
	const serviceContainer = document.querySelector(".session__servise");
	animateSolution(".session__solution", ".solution__item", 500, 200, .1);
	setTimeout((() => {
		serviceObserver.observe(serviceContainer);
	}), 500 + 300 * document.querySelectorAll(".solution__item").length + 200);
}));

const animItems = document.querySelectorAll("._anim-items");
if (animItems.length > 0) {
	window.addEventListener("scroll", animOnScroll);
	let animInterval = 300;
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 200;
			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				window.innerHeight, window.innerHeight;
			}
			if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
				if (!animItem.classList.contains("_active")) setTimeout((() => {
					animItem.classList.add("_active");
				}), index * animInterval);
			} else if (!animItem.classList.contains("_anim-no-hide")) animItem.classList.remove("_active");
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft
		};
	}
	animOnScroll();
}


// Валидация формы записи в продуктах (аналогична formValidation)
function formValidation() {
	const validation = new JustValidate(".modal-request__form");


	// Маска для телефона
	const inputMask = new Inputmask("+7 (999) 999-99-99");
	const telSelector = document.querySelector(".modal-request__phone");
	inputMask.mask(telSelector);

	validation
		.addField(".modal-request__name", [
			{
				rule: "minLength",
				value: 2
			},
			{
				rule: "maxLength",
				value: 50
			},
			{
				rule: "required",
				value: true,
				errorMessage: "Введите имя"
			}
		])
		.addField(".modal-request__phone", [
			{
				rule: "required",
				value: true,
				errorMessage: "Введите телефон"
			}
		])
		.addField(".modal-request__email", [
			{
				rule: "required",
				value: true,
				errorMessage: "Введите электронную почту"
			},
			{
				rule: "email",
				value: true,
				errorMessage: "Введите корректную электронную почту"
			}
		])
		.onSuccess((event => {
			let formData = new FormData(event.target);
			let xhr = new XMLHttpRequest;
			console.log(...formData);

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					console.log("Отправлено");
				}
				$.fancybox.close("fancybox-content");
				$.fancybox.open({
					src: "#modal-thanks",
					type: "inline"
				});

			};

			xhr.open("POST", "mail.php", true);
			xhr.send(formData);
			event.target.reset();
		}));
}

function btnValidation() {
	const btn = document.querySelector(".modal-request__btn");
	const inputName = document.querySelector(".modal-request__name");
	const inputPhone = document.querySelector(".modal-request__phone");
	const inputEmail = document.querySelector(".modal-request__email");

	inputName.addEventListener("input", checkLength);
	inputPhone.addEventListener("input", checkLength);
	inputEmail.addEventListener("input", checkLength);

	function checkLength() {
		if (inputName.value.length > 1 && inputPhone.value.length > 1 && inputEmail.value.length > 1 && isValidEmail(inputEmail.value)) {
			btn.classList.add("active");
		} else {
			btn.classList.remove("active");
		}
	}

	function isValidEmail(email) {
		// Регулярное выражение для проверки email-адреса
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
}

formValidation();
btnValidation();



// Валидация формы оплаты в продуктах (аналогична formValidation)
function formValidationPayment() {
	const validation = new JustValidate(".payment__form");

	// Маска для телефона
	const inputMask = new Inputmask("+7 (999) 999-99-99");
	const telSelector = document.querySelector(".payment__phone");
	inputMask.mask(telSelector);

	validation
		.addField(".payment__name", [
			{
				rule: "minLength",
				value: 2,
				errorMessage: "Имя должно состоять минимум из 2 символов"
			},
			{
				rule: "maxLength",
				value: 50,
				errorMessage: "Имя не должно превышать 50 символов"
			},
			{
				rule: "required",
				errorMessage: "Введите имя"
			}
		])
		.addField(".payment__phone", [
			{
				rule: "required",
				errorMessage: "Введите телефон"
			}
		])
		.addField(".payment__email", [
			{
				rule: "required",
				errorMessage: "Введите электронную почту"
			},
			{
				rule: "email",
				errorMessage: "Введите корректную электронную почту"
			}
		])
		.onSuccess((event) => {
			event.target.submit(); // Отправка формы без открытия нового окна
		});
}

// Функция для активации кнопки отправки формы оплаты при заполнении полей
function btnValidationPayment() {
	const btn = document.querySelector(".payment__btn");
	const inputName = document.querySelector(".payment__name");
	const inputPhone = document.querySelector(".payment__phone");
	const inputEmail = document.querySelector(".payment__email");

	inputName.addEventListener("input", checkLength);
	inputPhone.addEventListener("input", checkLength);
	inputEmail.addEventListener("input", checkLength);

	function checkLength() {
		if (inputName.value.length > 1 && inputPhone.value.length > 1 && inputEmail.value.length > 1 && isValidEmail(inputEmail.value)) {
			btn.classList.add("active");
		} else {
			btn.classList.remove("active");
		}
	}

	function isValidEmail(email) {
		// Регулярное выражение для проверки email-адреса
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
}

formValidationPayment();
btnValidationPayment();



// Функция для плавной прокрутки вверх
function scrollUp2() {
	const scrollUp = document.querySelector(".scrollUp");
	window.addEventListener("scroll", () => {
		if (scrollY > 499) scrollUp.classList.add("active");
		else scrollUp.classList.remove("active");
	});
	scrollUp.addEventListener("click", () => {
		$("html, body").animate({
			scrollTop: $("#top").offset().top
		}, "slow");
	});
}
scrollUp2();

