// Проверяем наличие элемента с классом "swiper" на странице.  Если его нет, код внутри if не выполнится.
const swiper = document.querySelector(".swiper");

if (swiper) {
    // Функция для показа/скрытия блока "4G плоскости подробно"
    function showMore() {
        // Получаем элементы кнопка "4G плоскости подробно"
        const btnReadMore = document.querySelector(".plane__btn");
        const planeItems = document.querySelector(".plane__bottom-items");

        // Проверка на существование элементов перед добавлением обработчика событий.
        if (btnReadMore && planeItems) {
            btnReadMore.addEventListener("click", () => {
                // Переключаем класс "active" для показа/скрытия дополнительной информации
                planeItems.classList.toggle("active");
            });
        } else {
            console.error("Elements .plane__btn or .plane__bottom-items not found!");
        }
    }

    // Функция для анимации блока ".fairway__row-back" при прокрутке страницы
    function showFairway1() {
        // Получаем элементы для анимации
        const fairwayBlock = document.querySelector(".fairway__row");
        const fairwayBlockBack = document.querySelector(".fairway__row-back");

        // Проверка на существование элементов перед добавлением обработчика событий.
        if (fairwayBlock && fairwayBlockBack) {
            window.addEventListener("scroll", () => {
                // Вычисляем высоту и смещение блока
                const animItemHeight = fairwayBlock.offsetHeight;
                const animItemOffset = offset(fairwayBlock).top;
                const animStart = 4; // Коэффициент для определения точки начала анимации
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                // Проверяем, находится ли блок в зоне видимости и запускаем анимацию
                if (window.scrollY > animItemOffset - animItemPoint && window.scrollY < animItemOffset + animItemHeight) {
                    fairwayBlockBack.style.animation = "fairway 2.2s forwards";
                }
            });
        } else {
            console.error("Elements .fairway__row or .fairway__row-back not found!");
        }
    }

    // Функция для анимации фона блока ".mentors__line" при прокрутке страницы
    function mentors() {
        // Получаем элементы для анимации
        const mentorsBlock = document.querySelector(".mentors__line");
        const mentorsBg = document.querySelector(".mentors__line-bg-2");

        // Проверка на существование элементов перед добавлением обработчика событий.
        if (mentorsBlock && mentorsBg) {
            window.addEventListener("scroll", () => {
                // Вычисляем высоту и смещение блока
                const animItemHeight = mentorsBlock.offsetHeight;
                const animItemOffset = offset(mentorsBlock).top;
                const animStart = 4; // Коэффициент для определения точки начала анимации
                const animItemPoint = window.innerHeight - animItemHeight / animStart;
                // Проверяем, находится ли блок в зоне видимости и добавляем класс "active"
                if (window.scrollY > animItemOffset - animItemPoint && window.scrollY < animItemOffset + animItemHeight) {
                    mentorsBg.classList.add("active");
                } else {
                    mentorsBg.classList.remove("active"); // Удаляем класс, если блок выходит из зоны видимости
                }
            });
        } else {
            console.error("Elements .mentors__line or .mentors__line-bg-2 not found!");
        }
    }
    // Функция для анимации блоков с классом "ci-1", "ci-2", "ci-3" при прокрутке страницы
    function choice() {
        // Получаем элементы для анимации
        const choiceBlock = document.querySelector(".choice__items");
        const block1 = document.querySelector(".ci-1");
        const block2 = document.querySelector(".ci-2");
        const block3 = document.querySelector(".ci-3");

        // Проверка на существование элементов перед добавлением обработчика событий.
        if (choiceBlock && block1 && block2 && block3) {
            window.addEventListener("scroll", () => {
                // Вычисляем высоту и смещение блока
                const animItemHeight = choiceBlock.offsetHeight;
                const animItemOffset = offset(choiceBlock).top;
                const animStart = 4; // Коэффициент для определения точки начала анимации
                const animItemPoint = window.innerHeight - animItemHeight / animStart;
                // Проверяем, находится ли блок в зоне видимости и запускаем анимацию
                if (window.scrollY > animItemOffset - animItemPoint && window.scrollY < animItemOffset + animItemHeight) {
                    block1.style.animation = "ci-1 0.5s forwards";
                    block2.style.animation = "ci-2 0.5s forwards";
                    block2.style.animationDelay = "0.5s";
                    block3.style.animation = "ci-3 0.5s forwards";
                    block3.style.animationDelay = "1s";
                } else {
                    block1.style.animation = ""; // Сбрасываем анимацию, если блок выходит из зоны видимости
                    block2.style.animation = ""; // Сбрасываем анимацию, если блок выходит из зоны видимости
                    block3.style.animation = ""; // Сбрасываем анимацию, если блок выходит из зоны видимости
                }
            });
        } else {
            console.error("Elements .choice__items, .ci-1, .ci-2, or .ci-3 not found!");
        }
    }

    // Функция для обрезки текста в элементах с классом "swiper-item__text"
    function cutText() {
        const texts = document.querySelectorAll(".swiper-item__text");
        texts.forEach((text) => {
            // Обрезаем текст, если его длина больше 709 символов и добавляем троеточие
            text.textContent = text.textContent.length > 709 ? text.textContent.slice(0, 709) + "..." : text.textContent;
        });
    }

    // Функция для применения стилей для Firefox
    function isMozilla() {
        const userAgent = navigator.userAgent.toLowerCase();
        const mozila = /firefox/.test(userAgent); // Проверяем, является ли браузер Firefox
        const link = document.querySelector(".fairway__link");
        if (mozila) link.style.marginTop = "-7px"; // Применяем стиль, если браузер Firefox
    }

    // Инициализация Swiper слайдера
    new Swiper(".swiper", {
        speed: 400, // Скорость анимации смены слайдов в мс
        spaceBetween: 50, // Расстояние между слайдами в px
        slidesPerView: 1, // Количество видимых слайдов
        allowTouchMove: false, // Отключаем возможность прокрутки свайпом
        navigation: {
            nextEl: ".swiper-button-next", // Селектор для кнопки "Вперед"
            prevEl: ".swiper-button-prev", // Селектор для кнопки "Назад"
        },
    });

    /* 	function scrollToMentor() { // закомментированная функция
			const mentorIgor = document.getElementById("mentors-igor");
			mentorIgor.addEventListener("click", (() => {
				localStorage.setItem("mentor", "igor");
			}));
		} */

    // Функция для получения смещения элемента относительно документа
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
        };
    }

    // Вызов функций
    showMore();
    showFairway1();
    mentors();
    choice();
    cutText();
    isMozilla();

    /* 	scrollToMentor(); // закомментированная функция */
}

// Функция валидации формы
function formValidation() {
    const form = document.querySelector(".modal-request__form");

    if (!form) {
        // Если формы с .modal-request__form нет, выходим из функции
        console.warn("Form with class .modal-request__form not found on this page. Skipping form validation.");
        return;
    }
    const validation = new JustValidate(".modal-request__form"); // Инициализация JustValidate

    // Маска для телефона
    const inputMask = new Inputmask("+7 (999) 999-99-99");
    const telSelector = document.querySelector(".modal-request__phone");
    inputMask.mask(telSelector); // Применение маски к полю ввода телефона

    validation
        .addField(".modal-request__name", [
            // Валидация поля имени
            {
                rule: "minLength",
                value: 2,
            },
            {
                rule: "maxLength",
                value: 50,
            },
            {
                rule: "required",
                value: true,
                errorMessage: "Введите имя",
            },
        ])
        .addField(".modal-request__phone", [
            // Валидация поля телефона
            {
                rule: "required",
                value: true,
                errorMessage: "Введите телефон",
            },
        ])
        .addField(".modal-request__email", [
            // Валидация поля email
            {
                rule: "required",
                value: true,
                errorMessage: "Введите электронную почту",
            },
            {
                rule: "email",
                value: true,
                errorMessage: "Введите корректную электронную почту",
            },
        ])
        .onSuccess((event) => {
            // Обработка успешной отправки формы
            let formData = new FormData(event.target);
            let xhr = new XMLHttpRequest();
            console.log(...formData); // Вывод данных формы в консоль

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log("Отправлено"); // Сообщение об успешной отправке
                }
                // Код для работы с Fancybox (предполагается подключение библиотеки Fancybox)
                $.fancybox.close("fancybox-content");
                $.fancybox.open({
                    src: "#modal-thanks",
                    type: "inline",
                });
            };

            xhr.open("POST", "mail.php", true); // Отправка данных на сервер
            xhr.send(formData);
            event.target.reset(); // Очистка формы после отправки
        });
}

// Функция валидации формы (проверка полей перед отправкой)
function btnValidation() {
    const btn = document.querySelector(".modal-request__btn");
    const inputName = document.querySelector(".modal-request__name");
    const inputPhone = document.querySelector(".modal-request__phone");
    const inputEmail = document.querySelector(".modal-request__email");

    if (!btn) {
        // Если формы с .modal-request__form нет, выходим из функции
        console.warn("Form with class .modal-request__form not found on this page. Skipping form validation.");
        return;
    }
    inputName.addEventListener("input", checkLength);
    inputPhone.addEventListener("input", checkLength);
    inputEmail.addEventListener("input", checkLength);

    function checkLength() {
        // Проверяем длину полей ввода и валидность email
        if (inputName.value.length > 1 && inputPhone.value.length > 1 && inputEmail.value.length > 1 && isValidEmail(inputEmail.value)) {
            btn.classList.add("active"); // Активируем кнопку, если поля заполнены корректно
        } else {
            btn.classList.remove("active"); // Деактивируем кнопку, если поля заполнены некорректно
        }
    }

    // Функция проверки валидности email адреса
    function isValidEmail(email) {
        // Регулярное выражение для проверки email-адреса
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Вызов функций валидации
formValidation();
btnValidation();

// Функция для отображения кнопки прокрутки вверх
function scrollUp2() {
    const scrollUp = document.querySelector(".scrollUp");
    window.addEventListener("scroll", () => {
        if (scrollY > 499) scrollUp.classList.add("active");
        else scrollUp.classList.remove("active");
    });
    scrollUp.addEventListener("click", () => {
        $("html, body").animate(
            {
                scrollTop: $("#top").offset().top,
            },
            "slow"
        );
    });
}

scrollUp2();
// Простой слайдер для блока .research__slider
/**
 * Инициализация Swiper-слайдера для блока .reviews .swiper
 * @param {string} selector - CSS-селектор контейнера слайдера
 * @param {Object} options - настройки Swiper (опционально)
 */
function initReviewsSlider(selector = ".reviews .swiper", options = {}) {
    if (typeof Swiper === "undefined") {
        console.error("Swiper library is not loaded!");
        return;
    }
    // Стандартные настройки
    const defaultOptions = {
        speed: 500,
        spaceBetween: 32,
        slidesPerView: 1,
        allowTouchMove: true,
        loop: true,
        navigation: {
            nextEl: ".reviews .swiper-button-next",
            prevEl: ".reviews .swiper-button-prev",
        },
        // Можно добавить пагинацию, если нужно:
        // pagination: {
        //     el: ".reviews .swiper-pagination",
        //     clickable: true
        // }
    };
    const swiperOptions = Object.assign({}, defaultOptions, options);
    const slider = document.querySelector(selector);
    if (slider) {
        new Swiper(selector, swiperOptions);
    } else {
        console.warn(`Slider with selector ${selector} not found on page.`);
    }
}

// Вызов после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
    initReviewsSlider();
});
