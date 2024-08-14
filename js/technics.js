
/* Стрелка */
function scrollUp() {
	const scrollUp = document.querySelector(".scrollUp");
	window.addEventListener("scroll", (() => {
		if (scrollY > 499) scrollUp.classList.add("active"); else scrollUp.classList.remove("active");
	}));
	scrollUp.addEventListener("click", (() => {
		$("html, body").animate({
			scrollTop: $("#top").offset().top
		}, "slow");
	}));
}
scrollUp();


/* sort-------------------------------------------------------------------------- */

const sortDropdown = document.querySelector('.sort__dropdown');
const sortSelected = sortDropdown.querySelector('.sort__selected');
const sortSelectedArrow = sortDropdown.querySelector('.sort__selected-arrow');
const sortOptions = sortDropdown.querySelector('.sort__options');
const sortOptionElements = sortDropdown.querySelectorAll('.sort__option');

sortSelected.addEventListener('click', () => {
	sortOptions.style.display = sortOptions.style.display === 'none' ? 'block' : 'none';
});

sortOptionElements.forEach(option => {
	option.addEventListener('click', () => {
		const selectedValue = option.dataset.value;
		sortSelected.querySelector('span').textContent = option.querySelector('span').textContent;
		sortSelectedArrow.style.display = selectedValue !== 'default' ? 'inline-block' : 'none';
		sortSelectedArrow.classList.toggle('sort__option_02', selectedValue === 'desc');
		sortOptions.style.display = 'none';
		sortCards(selectedValue);
	});
});

// Добавьте этот код для установки сортировки по умолчанию
document.addEventListener('DOMContentLoaded', () => {
	const defaultOption = sortDropdown.querySelector('.sort__option[data-value="default"]');
	defaultOption.click();
});


/* filter-------------------------------------------------------------------------- */

let activeCategory = null; // Пускай будет null для отсутствия выбора
let activeTimeRange = null;
let noCardsPlaceholder; // Переменная для хранения ссылки на элемент-заглушку

document.addEventListener('DOMContentLoaded', () => {
	noCardsPlaceholder = document.getElementById('no-cards-placeholder');

	// Получаем параметры из URL и устанавливаем активные фильтры
	const urlParams = new URLSearchParams(window.location.search);
	const initialCategory = urlParams.get('category') || null;
	const initialTimeRange = urlParams.get('time') || null;

	activeCategory = initialCategory;
	activeTimeRange = initialTimeRange;

	// Применяем фильтры и обновляем отображение кнопки сброса
	filterCards(activeCategory, activeTimeRange);
	updateResetButtonVisibility();

	// Подгрузка данных из файла Excel
	loadExcelFile();
});

document.querySelectorAll('.filter__btn').forEach(btn => {
	btn.addEventListener('click', () => {
		const category = btn.dataset.category;
		const timeRange = btn.dataset.time;

		// Обновляем активные фильтры
		if (category !== 'all') {
			activeCategory = (activeCategory === category) ? null : category; // Снять фильтр, если уже активен
		}

		if (timeRange !== 'all') {
			activeTimeRange = (activeTimeRange === timeRange) ? null : timeRange; // Снять фильтр, если уже активен
		}

		// Применяем фильтрацию
		filterCards(activeCategory, activeTimeRange);
		updateResetButtonVisibility();
	});
});

document.querySelector('.reset-filter[data-reset="all"]').addEventListener('click', () => {
	activeCategory = null;
	activeTimeRange = null;
	filterCards(activeCategory, activeTimeRange);
	updateResetButtonVisibility();
});


function filterCards(category, timeRange) {
	const cards = document.querySelectorAll('.card');
	const filterButtons = document.querySelectorAll('.filter__btn');
	let hasVisibleCards = false;

	// Убираем активный класс со всех кнопок
	filterButtons.forEach(btn => btn.classList.remove('active'));

	// Добавляем активный класс к кнопкам по выбранным фильтрам
	if (category) {
		document.querySelector(`.filter__btn[data-category="${category}"]`).classList.add('active');
	}
	if (timeRange) {
		document.querySelector(`.filter__btn[data-time="${timeRange}"]`).classList.add('active');
	}

	// Фильтруем карточки по выбранной категории и времени
	cards.forEach(card => {
		const cardCategory = card.dataset.tag;
		const cardTimeRange = card.dataset.time;
		if ((!category || cardCategory === category) && (!timeRange || cardTimeRange === timeRange)) {
			card.style.display = 'block';
			hasVisibleCards = true; // Найдена хотя бы одна видимая карточка
		} else {
			card.style.display = 'none';
		}
	});

	// Проверяем, есть ли видимые карточки, и обновляем заглушку
	if (hasVisibleCards) {
		noCardsPlaceholder.style.display = 'none';
	} else {
		noCardsPlaceholder.style.display = 'block';
	}

	// Обновляем URL при изменении фильтров
	updateURL(category, timeRange);
}



function updateResetButtonVisibility() {
	const resetButton = document.querySelector('.reset-filter[data-reset="all"]');
	if (activeCategory || activeTimeRange) {
		resetButton.style.display = 'inline-block';
	} else {
		resetButton.style.display = 'none';
	}
}

function updateURL(category, timeRange) {
	const params = new URLSearchParams();

	if (category) {
		params.set('category', category);
	}

	if (timeRange) {
		params.set('time', timeRange);
	}

	const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
	history.replaceState(null, '', newUrl);
}



/* сортировка по алфавиту */
document.getElementById('sortOrder').addEventListener('change', (event) => {
	const order = event.target.value;
	sortCards(order);
});
function sortCards(order) {
	const cardsContainer = document.querySelector('.tekhniki__body');
	const cards = Array.from(cardsContainer.querySelectorAll('.card'));

	if (order === 'default') {
		// Сортируем по индексу (начальному порядку)
		cards.sort((a, b) => {
			const indexA = parseInt(a.getAttribute('data-index'));
			const indexB = parseInt(b.getAttribute('data-index'));
			return indexA - indexB;
		});
	} else {
		// Сортировка по заголовку
		cards.sort((a, b) => {
			const titleA = a.querySelector('.card__subtitle').textContent.trim().toLowerCase();
			const titleB = b.querySelector('.card__subtitle').textContent.trim().toLowerCase();

			if (order === 'asc') {
				return titleA.localeCompare(titleB);
			} else if (order === 'desc') {
				return titleB.localeCompare(titleA);
			}
			return 0;
		});
	}

	// Прикрепляем отсортированные карточки обратно в контейнер
	cards.forEach(card => cardsContainer.appendChild(card));
}


/* -------------------------------------- */
function loadExcelFile() {
	fetch('technics.xlsx')
		.then(response => response.arrayBuffer())
		.then(data => {
			const workbook = XLSX.read(data, { type: 'array' });
			const firstSheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[firstSheetName];
			const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

			const cardsContainer = document.querySelector('.tekhniki__body');
			cardsContainer.innerHTML = '';

			for (let i = 1; i < jsonData.length; i++) {
				const row = jsonData[i];
				const dataTag = row[3];
				const subtitle = row[4];
				const description = row[5];
				const category = row[2];
				const time = row[9];
				const link = row[6];
				const imageUrl = row[7];
				const card = document.createElement('div');
				card.className = 'card';
				card.setAttribute('data-tag', dataTag);
				card.setAttribute('data-time', getTimeRange(time));
				card.setAttribute('data-index', i); // Устанавливаем начальный индекс

				function getTimeRange(time) {
					const minutes = parseInt(time);
					if (minutes < 10) {
						return 'lt10';
					} else if (minutes >= 10 && minutes < 30) {
						return '10-30';
					} else if (minutes >= 30 && minutes < 60) {
						return '30-60';
					} else {
						return 'all';
					}
				}

				card.innerHTML = `
				  <div class="card__body">
				     <div class="card__top">
					   <div class="card__img">
					     <img src="${imageUrl}" alt="">
					   </div>				
				       <h3 class="card__subtitle">${subtitle}</h3>
				       <div class="card__description">${description}</div>
				       <div class="card__category ${dataTag}">${category}</div>
				     </div>
				     <div class="card__time">${time}</div>
				     <a href="${link}" class="card__link">
				       Подробнее
				     </a>
				  </div>
				`;

				cardsContainer.appendChild(card);
			}

			// Применяем фильтрацию после того, как все карточки добавлены
			filterCards(activeCategory, activeTimeRange);
			updateResetButtonVisibility();

		})
		.catch(error => console.error('Ошибка при загрузке или обработке файла Excel:', error));
}


document.addEventListener('DOMContentLoaded', loadExcelFile);


