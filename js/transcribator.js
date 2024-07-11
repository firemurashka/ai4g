
// Инициализация Dropzone--------------------------
Dropzone.options.myDropzone = {
	init: function () {
		this.on("addedfile", function (file) {
			// Обработка добавленного файла
			document.getElementById('upload-button').classList.add('hidden');
			document.getElementById('button-add').classList.add('show');
			document.getElementById('button-proccess').classList.add('show');
		});
		this.on("uploadprogress", function (file, progress) {
			// Обновление прогресса загрузки
			var progressElement = document.getElementById('upload-progress');
			progressElement.style.width = progress + '%';
			progressElement.textContent = Math.round(progress) + '%';
		});
		this.on("complete", function (file) {
			// Обработка завершения загрузки
		});
	},
	clickable: ['.trancrib__form']
};

// Инициализация Dropzone
let myDropzone = new Dropzone("#my-dropzone", {
	url: "upload.php",
	autoProcessQueue: false,
	uploadMultiple: true,
	parallelUploads: 5,
	maxFiles: 5,
	maxFilesize: 2, // MB
	dictDefaultMessage: "Перетащите файлы сюда для загрузки"
});

// Обработка клика на кнопку "добавить файл"
document.getElementById('upload-button').addEventListener('click', function () {
	myDropzone.hiddenFileInput.click();
});

// Обработка клика на область с картинкой и текстом
/* document.querySelectorAll('.trancrib__img, .trancrib__text').forEach(function (element) {
	element.addEventListener('click', function () {
		myDropzone.hiddenFileInput.click();
	});
}); */
const trancribForm = document.querySelector('.trancrib__form');
trancribForm.addEventListener('click', function (event) {
	if (event.target.matches('#upload-button') || event.target.closest('.trancrib__img') || event.target.closest('.trancrib__text')) {
		myDropzone.hiddenFileInput.click();
	}
});
// Обработка клика на кнопку "Добавить еще файлы"
document.getElementById('button-add').addEventListener('click', function () {
	myDropzone.hiddenFileInput.click();
});



// Обработка клика на кнопку "Конвертировать"
document.getElementById('button-proccess').addEventListener('click', function () {
	// Открытие модального окна с помощью библиотеки Fancybox
	$.fancybox.open({
		src: '#modal-oplata',
		type: 'inline',
		opts: {
			afterShow: function (instance, slide) {
				// Дополнительные действия после открытия модального окна
			}
		}
	});
});

//Обработка формы modal-oplata==================================================

// Функция валидации формы modal-oplata для транскрибатора
function formValidationOplata() {
	const validation = new JustValidate('.modal-oplata__form');
	const inputMask = new Inputmask('+7 (999) 999-99-99');
	const telSelector = document.querySelector('.modal-oplata__phone');
	inputMask.mask(telSelector);

	validation
		.addField('.modal-oplata__name', [
			{ rule: 'minLength', value: 2 },
			{ rule: 'maxLength', value: 50 },
			{ rule: 'required', value: true, errorMessage: 'Введите имя' },
		])
		.addField('.modal-oplata__phone', [
			{
				rule: 'required',
				value: true,
				errorMessage: 'Введите телефон',
			},
		])
		.addField('.modal-oplata__email', [
			{ rule: 'required', value: true, errorMessage: 'Введите электронную почту' },
			{ rule: 'email', value: true, errorMessage: 'Введите действующий электронный адрес' },
		])
		.onSuccess((event) => {
			let formData = new FormData(event.target);
			let xhr = new XMLHttpRequest();

			console.log(...formData);

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					console.log('отправлено');
					// Открываем вторую модалку после успешной отправки первой формы
					openModalPay(formData);
				}
			};

			xhr.open('POST', 'oplata.php', true);
			xhr.send(formData);
			event.target.reset();
		});
}
formValidationOplata();

// Функция проверки и включения кнопки отправки формы modal-oplata
function btnValidationOplata() {
	const btn = document.querySelector('.modal-oplata__btn');
	const inputName = document.querySelector('.modal-oplata__name');
	const inputPhone = document.querySelector('.modal-oplata__phone');
	const inputEmail = document.querySelector('.modal-oplata__email');

	[inputName, inputPhone, inputEmail].forEach(input => {
		input.addEventListener('input', checkLength);
	});

	function checkLength() {
		const isNameValid = inputName.value.trim().length > 1;
		const isPhoneValid = inputPhone.value.trim().length > 1;
		const isEmailValid = inputEmail.value.trim().length > 1;
		const shouldActivate = isNameValid && isPhoneValid && isEmailValid;
		btn.classList.toggle('active', shouldActivate);
	}

	checkLength(); // начальная проверка
}
btnValidationOplata();

$(document).ready(function () {
	// Перехватываем событие отправки формы с id "oplata-form"
	$('#oplata-form').submit(function (event) {
		event.preventDefault(); // Предотвращаем стандартное поведение формы

		// Получаем данные из формы
		let formData = new FormData(this);

		// Вызываем функцию для открытия окна с id "modal-pay"
		openModalPay(formData);
	});

	// Функция для открытия окна с id "modal-pay"
	function openModalPay(formData) {
		$.fancybox.close(); // Закрываем текущий fancybox (если он открыт)

		// Заполняем скрытые поля в форме с id "modal-pay"
		document.querySelector('.hidden-name').value = formData.get('name');
		document.querySelector('.hidden-phone').value = formData.get('phone');
		document.querySelector('.hidden-email').value = formData.get('email');

		// Открываем окно с id "modal-pay"
		$.fancybox.open({
			src: '#modal-pay',
			type: 'inline',
		});
	}
});

// Валидация формы modal-pay
function formValidationPay() {
	const validation = new window.JustValidate('.modal-pay__form');
	const paymentMethods = document.querySelectorAll('input[name="payment_method"]');

	validation
		.addField('input[name="payment_method"]', [
			{ rule: 'required', value: true, errorMessage: 'Выберите метод оплаты' },
		])
		.onSuccess((event) => {
			let formData = new FormData(event.target);
			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					console.log('оплата отправлена');
					// Открываем третью модалку после успешной отправки второй формы

				}
			};
			$.fancybox.close();
			$.fancybox.open({
				src: '#file-sent',
				type: 'inline',
			});


			xhr.open('POST', 'pay.php', true);
			xhr.send(formData);
			event.target.reset();
		});
	// Функция проверки и включения кнопки отправки формы modal-pay
	function btnValidationPay() {
		const btn = document.querySelector('.modal-pay__btn');
		paymentMethods.forEach(method => {
			method.addEventListener('change', checkSelected);
		});

		function checkSelected() {
			const selectedMethod = document.querySelector('input[name="payment_method"]:checked');
			btn.classList.toggle('active', !!selectedMethod);
		}
		checkSelected();
	}
	btnValidationPay();
}
formValidationPay();

