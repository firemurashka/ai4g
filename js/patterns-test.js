// Функция для отображения кнопки прокрутки вверх
function scrollUp() {
  const scrollUp = document.querySelector(".scrollUp");

  // Отображать кнопку при прокрутке
  window.addEventListener("scroll", () => {
    if (window.scrollY > 499) {
      scrollUp.classList.add("active");
    } else {
      scrollUp.classList.remove("active");
    }
  });

  // Прокрутка вверх при нажатии на кнопку
  scrollUp.addEventListener("click", () => {
    window.scrollTo({
      top: 0, // Прокрутка к началу страницы
      behavior: "smooth", // Эффект анимации
    });
  });
}

scrollUp();

/* ==================================================== */
let questionsWithPatterns = []; // Глобальный массив для вопросов
let categories = []; // Глобальный объект для категорий
let currentQuestionIndex = 0; // Индекс текущего вопроса
let answers = []; // Массив для сохранения ответов пользователя
let patterns = []; // Массив для сохранения паттернов

// Глобальная переменная для хранения имени пользователя
let userFullName = "";

// Функция обработки кнопки "Начать тест"
function handleStartTestButton() {
  // Получаем элементы формы и тестового блока
  const fioForm = document.getElementById("fio-form"); // Контейнер формы с ФИО
  const testBlock = document.getElementById("test-block"); // Блок с тестом
  const fullNameInput = document.getElementById("fullName"); // Поле ввода ФИО

  // Элементы для вывода информации
  const fioDisplay = document.getElementById("fio-display"); // Элемент для отображения ФИО
  const timeDisplay = document.getElementById("time-display"); // Элемент для отображения времени
  const errorMessage = document.getElementById("error-message-fio"); // Сообщение об ошибке

  // Получаем значение из поля ввода и удаляем лишние пробелы
  const fullName = fullNameInput.value.trim();

  // Проверяем ввод ФИО (не менее 3 символов)
  if (!fullName || fullName.length < 3) {
    // Выводим сообщение об ошибке
    errorMessage.style.display = "block";
    errorMessage.textContent = "Пожалуйста, введите корректное ФИО (не менее 3 символов)!";
    return; // Прекращаем выполнение функции, если ввод некорректен
  }

  // Если проверка пройдена успешно, скрываем сообщение об ошибке
  errorMessage.style.display = "none";

  // Сохраняем введённое ФИО в глобальную переменную
  userFullName = fullName;

  // Отображаем введённое ФИО перед блоком теста, оборачивая его в <span>
  fioDisplay.innerHTML = `ФИО: <span>${userFullName}</span>`;

  // Получаем текущую дату
  const now = new Date();

  // Форматируем дату (например, в формате: "28 января 2025")
  const formattedDate = now.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Отображаем текущую дату, оборачивая её в <span>
  timeDisplay.innerHTML = `Дата: <span>${formattedDate}</span>`;

  // Скрываем форму ввода ФИО
  fioForm.style.display = "none";

  // Показываем блок с тестом
  testBlock.style.display = "block";

  // Запускаем загрузку вопросов
  loadQuestions();
}

document.addEventListener("DOMContentLoaded", () => {
  const startTestButton = document.getElementById("start-test-button"); // Кнопка "Начать тест"

  // Подключаем обработчик клика к кнопке "Начать тест"
  startTestButton.addEventListener("click", handleStartTestButton);
});

document.addEventListener("DOMContentLoaded", () => {
  const startFillButton = document.getElementById("fill-test-answers"); // Кнопка "Начать тест"

  // Подключаем обработчик клика к кнопке "Начать тест"
  startFillButton.addEventListener("click", fillTestAnswers);
});

// Функция загрузки вопросов
async function loadQuestions() {
  try {
    toggleLoaderTest(true); // Включаем лоадер

    const response = await fetch("patterns_data.json");
    if (!response.ok) throw new Error(`Ошибка HTTP: статус ${response.status}`);
    const data = await response.json();

    // Заполняем глобальные переменные вопросами и категориями
    questionsWithPatterns = data.questionsWithPatterns || [];
    categories = data.categories || [];

    // Проверка наличия данных
    if (questionsWithPatterns.length === 0 || !Array.isArray(categories)) {
      throw new Error("Данные тестов не найдены.");
    }

    // Прокрутка вверх страницы
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Показываем первый вопрос
    showQuestion();
  } catch (error) {
    console.error("Ошибка при загрузке вопросов:", error);
  } finally {
    toggleLoaderTest(false); // Выключаем лоадер
  }
}

// Тестовая кнопка заполнения
function fillTestAnswers() {
  // Очистка массивов ответов и паттернов
  answers.length = 0; // Или answers = [];
  patterns.length = 0; // Или patterns = [];

  // Проверка на наличие вопросов
  for (let i = 0; i < questionsWithPatterns.length; i++) {
    if (questionsWithPatterns[i].options.length > 0) {
      answers.push(questionsWithPatterns[i].options[0]); // Выбираем первый вариант
    }
    if (questionsWithPatterns[i].patterns.length > 0) {
      patterns.push(questionsWithPatterns[i].patterns[0]); // Соответствующий паттерн
    }
  }

  // Устанавливаем индекс на конец вопросов
  currentQuestionIndex = questionsWithPatterns.length;
  showResults(); // Показываем результаты
}

function toggleLoaderTest(show) {
  const loader = document.getElementById("loader-test");
  if (loader) {
    loader.style.display = show ? "block" : "none"; // Изменение display
  } else {
    console.error("Элемент с ID 'loader-test' не найден в DOM.");
  }
}

/* ======================================== */

// Функция для перемешивания массива (алгоритм Фишера-Йетса)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // меняем местами элементы
  }
  return array;
}
// Функция для рандомизации вопросов и их ответов
function randomizeQuestionsAndAnswers() {
	if (!Array.isArray(questionsWithPatterns)) {
	  console.error("questionsWithPatterns не инициализирован или не является массивом.");
	  return;
	}


	// Перемешиваем массив вопросов
	const shuffledQuestions = shuffleArray(questionsWithPatterns.slice());

	// Перемешиваем варианты ответов и соответствующие им паттерны каждого вопроса
	questionsWithPatterns = shuffledQuestions.map((question) => {
	  // Создаем массив пар [option, pattern]
	  const pairedOptions = question.options.map((option, index) => ({
		 option,
		 pattern: question.patterns[index],
	  }));

	  // Перемешиваем пары
	  const shuffledPairs = shuffleArray(pairedOptions.slice());

	  // Возвращаем новый объект с перемешанными options и patterns
	  return {
		 question: question.question,
		 options: shuffledPairs.map((pair) => pair.option), // Извлекаем перемешанные options
		 patterns: shuffledPairs.map((pair) => pair.pattern), // Извлекаем перемешанные patterns
	  };
	});

 }


/* ======================================== */
//Показать вопрос
function showQuestion() {
  // Если массив вопросов ещё не перемешан, перемешиваем их вместе с вариантами
  if (currentQuestionIndex === 0) {
    randomizeQuestionsAndAnswers();
  }
  // Проверяем, есть ли вопросы
  if (!questionsWithPatterns.length) {
    console.error("Нет доступных вопросов.");
    return;
  }

  // Получаем элементы интерфейса
  const questionContainer = document.getElementById("question-container");
  const questionCounter = document.getElementById("question-counter");
  const errorMessage = document.getElementById("error-message");

  // Скрываем сообщение об ошибке
  errorMessage.style.display = "none";

  // Получаем текущий вопрос
  const question = questionsWithPatterns[currentQuestionIndex];

  // Получаем текущий выбранный ответ (если он есть)
  const currentAnswer = answers[currentQuestionIndex];

  // Обновляем содержимое контейнера вопроса
  questionContainer.innerHTML = `
	  <div class="question">${question.question}</div>
	  ${question.options
      .map(
        (option) => `
		 <label class="option">
			<input type="radio" name="answer" value="${option}" ${currentAnswer === option ? "checked" : ""}>
			<span class="radio-label">${option}</span>
		 </label>
		 `
      )
      .join("")}
	`;

  // Обновляем счётчик вопросов
  questionCounter.innerHTML = `Вопрос ${currentQuestionIndex + 1} из ${questionsWithPatterns.length}`;
}

//Следующий вопрос
function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked'); // Получаем выбранный вариант
  const errorMessage = document.getElementById("error-message"); // Сообщение об ошибке

  if (selectedOption) {
    // Сохраняем ответ пользователя
    answers[currentQuestionIndex] = selectedOption.value; // Обновляем массив ответов, сохраняя по индексу

    // Сохраняем соответствующий паттерн
    const question = questionsWithPatterns[currentQuestionIndex];
    const selectedIndex = question.options.indexOf(selectedOption.value); // Получаем индекс выбранного варианта
    const pattern = question.patterns[selectedIndex]; // Паттерн, соответствующий выбранному индексу
    patterns[currentQuestionIndex] = pattern; // Обновляем массив паттернов

    // Убираем сообщение об ошибке (если было отображено раньше)
    errorMessage.style.display = "none";

    // Переход к следующему вопросу
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsWithPatterns.length) {
      showQuestion(); // Показываем следующий вопрос
    } else {
      // Если это последний вопрос, показываем результаты
      showResults();
    }
  } else {
    // Если ответ не выбран, показываем сообщение об ошибке
    errorMessage.style.display = "block"; // Отображаем сообщение об ошибке
  }
}

//Предыдущий вопрос
function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--; // Возвращаемся на один вопрос назад

    // Убираем сообщение об ошибке (если оно было)
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "none";

    showQuestion(); // Показываем предыдущий вопрос
  }
}

// Функция для сброса опроса
function resetQuiz() {
  currentQuestionIndex = 0; // Сбрасываем индекс текущего вопроса
  answers = []; // Очищаем массив пользовательских ответов
  patterns = []; // Очищаем массив паттернов

  document.getElementById("question-counter").style.display = "block";
  document.getElementById("result-container").style.display = "none";
  document.getElementById("quiz-content").style.display = "flex";
  const quizPatternsBlock = document.querySelector(".quiz-patterns__block");
  quizPatternsBlock.style.maxWidth = "800px";
  showQuestion(); // Показываем первый вопрос

  // Прокрутка страницы вверх
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Отображение результатов
function showResults() {
  if (!patterns || patterns.length === 0) {
    alert("Вы не завершили тест. Пожалуйста, ответьте на все вопросы.");
    resetQuiz();
    return;
  }

  const resultContainer = document.getElementById("result-container");
  const quizContent = document.getElementById("quiz-content");
  const resultContent = document.getElementById("result-content");
  const questionCounter = document.getElementById("question-counter");
  const quizPatternsBlock = document.querySelector(".quiz-patterns__block");

  // Скрываем блок с вопросами и счётчик для отображения результатов
  quizContent.style.display = "none";
  questionCounter.style.display = "none";
  quizPatternsBlock.style.maxWidth = "1200px";

  let results = ""; // Для финального HTML результата
  const resultsData = {}; // Для хранения итоговых данных

  // Создаем объект для подсчета количества паттернов
  const counts = patterns.reduce((acc, pattern) => {
    acc[pattern] = (acc[pattern] || 0) + 1;
    return acc;
  }, {});

  // Если нет категорий, показываем сообщение об ошибке
  if (!categories || categories.length === 0) {
    console.error("Категории отсутствуют или системе не удалось их загрузить.");
    resultContent.innerHTML = "<p>Категории данных отсутствуют. Проверьте данные или перезагрузите страницу.</p>";
    resultContainer.style.display = "flex";
    return;
  }

  // Массив для соотношения категорий и классов
  const categoryClassMap = {
    "Паттерны мышления": "category-block__mind",
    "Паттерны поведения": "category-block__man",
    "Паттерны коммуникации": "category-block__hands",
    "Паттерны организации времени": "category-block__clock",
  };

  // Обходим каждую категорию
  categories.forEach((category) => {
    const categoryTitle = category.title?.ru || category.title?.en || "Неизвестная категория";
    let subcategoryResults = ""; // Сюда добавляем все подкатегории этой категории

    // Пропускаем категорию, если в ней нет подкатегорий
    if (!category.subcategories || category.subcategories.length === 0) {
      return;
    }

    // Динамически выбираем дополнительный класс из заранее заданного объекта
    const additionalClass = categoryClassMap[categoryTitle] || "";

    // Инициализируем массив для текущей категории в resultsData
    resultsData[categoryTitle] = [];

    // Обходим каждую подкатегорию
    category.subcategories.forEach((subcategory) => {
      const subcategoryTitle = subcategory.title?.ru || subcategory.title?.en || "Неизвестная подкатегория";

      // Пропускаем подкатегории без паттернов
      if (!subcategory.patterns || subcategory.patterns.length === 0) {
        return;
      }

      // Формируем список паттернов в подкатегории
      const patternsInSubcategory = subcategory.patterns.map((pattern) => pattern.pattern?.ru || pattern.pattern?.en || "Без названия");

      // Подсчитываем общее количество ответов для этой подкатегории
      const totalResponses = patternsInSubcategory.reduce((total, pattern) => total + (counts[pattern] || 0), 0);

      // Если в подкатегории нет ответов, пропускаем её
      if (totalResponses === 0) {
        return;
      }

      // Определяем проценты для каждого паттерна
      const responses = patternsInSubcategory.map((pattern) => ({
        pattern,
        count: counts[pattern] || 0,
        percentage: Math.round(((counts[pattern] || 0) / totalResponses) * 100),
      }));

      // Сортируем их по процентам для более удобного анализа
      responses.sort((a, b) => b.percentage - a.percentage);

      // Максимальный процент
      const maxPercentage = responses[0].percentage;

      // Выбираем паттерны с максимальным процентом
      const dominantResponses = responses.filter((r) => r.percentage === maxPercentage);

      // Логика для определения статуса
      let dominant = dominantResponses.map((r) => r.pattern).join(", ");
      let statusText = "";

      if (dominantResponses.length === patternsInSubcategory.length) {
        // Все паттерны имеют одинаковые проценты (например, три по 33%)
        statusText = `НЕЙТРАЛЬНО`;
        dominant = "НЕЙТРАЛЬНЫЕ";
      } else if (dominantResponses.length > 1) {
        // Два паттерна с одинаковым высоким процентом
        statusText = `НЕЙТРАЛЬНО`;
      } else {
        // Один доминантный паттерн
        statusText = maxPercentage <= 40 ? `УМЕРЕННО ${dominant}` : maxPercentage <= 60 ? `НЕЙТРАЛЬНО` : `ЯВНО ${dominant}`;
      }

      // Сохраняем данные подкатегории в resultsData для отчёта
      resultsData[categoryTitle].push({
        subcategory: subcategoryTitle,
        dominantPattern: dominant,
        percentage: maxPercentage,
        responses,
      });

      // Формируем HTML этого блока
      let patternResults = `<div class="subcategory-content">`;

      responses.forEach(({ pattern, percentage }) => {
        // Найти описание для текущего паттерна
        const currentPatternData = subcategory.patterns.find((p) => (p.pattern.ru || p.pattern.en) === pattern);

        const patternDescription = currentPatternData?.description.ru || "Описание отсутствует";

        patternResults += `
  <div class="pattern-result">
    <div class="pattern-result__label">
      <div class="scale-bar-title-wrapper">
        <p class="scale-bar-title">${pattern}</p>
        <div class="info-icon">
          <span>i</span>
          <div class="tooltiptest hidden">
            ${patternDescription}
          </div>
        </div>
      </div>
      <p>${percentage}%</p>
    </div>
    <div class="scale-bar-container">
      <div class="scale-bar" style="width: ${percentage}%;"></div>
    </div>
  </div>`;
      });

      patternResults += `</div>`;

      const analyticsBlock = `
			  <div class="analytics-block">
				 <p  class="scale-status">${statusText}</p>
				 <div class="scale-container">
					<div class="scale-line"></div>
					<div class="scale-labels">
					  <div class="scale-labels-item">
						 <div class="indicator" style="opacity: ${maxPercentage <= 40 ? 1 : 0};"></div>
						 <span>УМЕРЕННО</span>
					  </div>
					  <div class="scale-labels-item">
						 <div class="indicator" style="opacity: ${maxPercentage > 40 && maxPercentage <= 60 ? 1 : 0};"></div>
						 <span>НЕЙТРАЛЬНО</span>
					  </div>
					  <div class="scale-labels-item">
						 <div class="indicator" style="opacity: ${maxPercentage > 60 ? 1 : 0};"></div>
						 <span>ЯВНО</span>
					  </div>
					</div>
				 </div>
			  </div>`;

      subcategoryResults += `
			  <div class="subcategory-block">
				 <div class="subcategory-title">${subcategoryTitle}</div>
				 <div class="subcategory-wrapper">
					<div class="analytics-wrapper">${analyticsBlock}</div>
					<div class="results-wrapper">${patternResults}</div>
				 </div>
			  </div>`;
    });

    // Если подкатегории содержат данные, добавляем их в категорию
    if (subcategoryResults) {
      results += `
			  <div class="category-block ${additionalClass}">
				 <h3 class="category-label">${categoryTitle}</h3>
				 ${subcategoryResults}
			  </div>`;
    }
  });

  // Если результат пустой, значит ничего не сгенерировалось
  if (results.trim() === "") {
    results = "<p>Не найдено данных для отображения результатов.</p>";
  }

  // Вставляем HTML результатов
  resultContent.innerHTML = results;
  // Создаем Blob с текстом
  const blob = new Blob([results], { type: "text/plain" });

  // Делаем контейнер видимым
  resultContainer.style.display = "flex";
  animateOnScroll();
  initializeTooltips();
  // Возвращаем JSON для отчётов (например, для PDF)
  return resultsData;
}

/* Всплывающий текст описания паттернов */
function initializeTooltips() {
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  document.querySelectorAll(".info-icon").forEach((infoIcon) => {
    const tooltip = infoIcon.querySelector(".tooltiptest");

    if (tooltip) {
      const showTooltip = () => {
        tooltip.classList.remove("hidden");
        tooltip.classList.add("visible");
      };

      const hideTooltip = () => {
        tooltip.classList.remove("visible");
        tooltip.classList.add("hidden");
      };

      if (isTouchDevice) {
        infoIcon.addEventListener("click", (event) => {
          if (tooltip.classList.contains("visible")) {
            hideTooltip(); // Закрыть тултип, если он уже открыт
          } else {
            // Закрывает другие тултипы
            document.querySelectorAll(".tooltiptest.visible").forEach((t) => {
              t.classList.remove("visible");
              t.classList.add("hidden");
            });
            showTooltip(); // Показать текущий тултип
          }
          event.stopPropagation(); // Предотвращает действие события на родителе
        });
      } else {
        infoIcon.addEventListener("mouseenter", showTooltip);
        infoIcon.addEventListener("mouseleave", hideTooltip);
      }
    }
  });

  document.addEventListener("click", (event) => {
    // Проверяем, был ли клик в пределах тултипа
    document.querySelectorAll(".tooltiptest.visible").forEach((tooltip) => {
      if (!tooltip.contains(event.target) && !tooltip.previousElementSibling.contains(event.target)) {
        tooltip.classList.remove("visible");
        tooltip.classList.add("hidden");
      }
    });
  });
}

/* Таблица с результатами */
/* function showResultTable() {
	 if (!answers || answers.length === 0) {
		alert("Вы не завершили тест. Пожалуйста, ответьте на все вопросы.");
		resetQuiz();
		return;
	 }

	 const resultTableContainer = document.getElementById("result-table-container");
	 let tableResults = `<h2>Таблица с результатами</h2><div class="result-table-content">`;

	 tableResults += `
		 <table>
			<thead>
			  <tr>
				 <th>№</th>
				 <th>Вопрос</th>
				 <th>Вариант ответа 1</th>
				 <th>Расшифровка 1</th>
				 <th>Вариант ответа 2</th>
				 <th>Расшифровка 2</th>
			  </tr>
			</thead>
			<tbody>`;

	 questionsWithPatterns.forEach((question, index) => {
		if (!question) return;

		// Обработка вопроса, вариантов и расшифровки
		const option1 = question.options[0] || "Нет данных";
		const pattern1 = question.patterns[0] || "Нет данных";
		const option2 = question.options[1] || "Нет данных";
		const pattern2 = question.patterns[1] || "Нет данных";

		// Добавляем строку с вопросом и его деталями
		tableResults += `
			<tr>
			  <td>${index + 1}</td>
			  <td>${question.question}</td>
			  <td>${option1}</td>
			  <td>${pattern1}</td>
			  <td>${option2}</td>
			  <td>${pattern2}</td>
			</tr>`;
	 });

	 tableResults += `</tbody></table></div>`;

	 resultTableContainer.innerHTML = tableResults;
	 resultTableContainer.style.display = "block";
  } */

/* function showReferenceTable() {
	 const referenceTableContainer = document.getElementById("reference-table-container"); // Контейнер для справки
	 let referenceTableResults = ""; // Хранение результирующего HTML

	 // Заголовок для справочной таблицы
	 referenceTableResults += `<h2>Справочная таблица вопросов</h2>`;
	 referenceTableResults += `<div class="reference-table-content">`;

	 // Проверка: данные категорий существуют
	 if (!Array.isArray(categories) || categories.length === 0) {
		referenceTableResults += `<p>Категории не найдены.</p>`;
		referenceTableContainer.innerHTML = referenceTableResults;
		referenceTableContainer.style.display = "block";
		return;
	 }

	 // Обход категорий
	 categories.forEach((category) => {
		const categoryTitle = category.title.ru || category.title.en; // Получаем название категории (на русском или английском)

		// Генерируем заголовок категории перед таблицей
		referenceTableResults += `<h3>${categoryTitle}</h3>`;

		if (!Array.isArray(category.subcategories) || category.subcategories.length === 0) {
		  referenceTableResults += `<p>Нет подкатегорий для этой категории.</p>`;
		  return;
		}

		// Начало таблицы для текущей категории
		referenceTableResults += `<table>
				  <thead>
					 <tr>
						 <th>Вопрос</th>
						 <th>Вариант ответа</th>
						 <th>Расшифровка ответа</th>
						 <th>№</th> <!-- Столбец для номера вопроса -->
					 </tr>
				  </thead>
				  <tbody>`;

		// Обход подкатегорий
		category.subcategories.forEach((subcategory) => {
		  const subcategoryTitle = subcategory.title.ru || subcategory.title.en;

		  const questionDetails = {}; // Для хранения вопросов и их вариантов

		  // Обход паттернов подкатегории
		  subcategory.patterns.forEach((pattern) => {
			 questionsWithPatterns.forEach((question, questionIndex) => {
				const patternIndex = question.patterns.indexOf(pattern.pattern.ru || pattern.pattern.en);
				if (patternIndex !== -1) {
				  if (!questionDetails[question.question]) {
					 questionDetails[question.question] = [];
				  }
				  questionDetails[question.question].push({
					 answer: question.options[patternIndex],
					 explanation: question.patterns[patternIndex],
					 number: questionIndex + 1,
				  });
				}
			 });
		  });

		  // Заголовок текущей подкатегории (добавляется всегда, вне зависимости от наличия вопросов)
		  referenceTableResults += `
			  <tr>
				 <th colspan="4" class="reference__subtitlecategory">${subcategoryTitle}</th>
			  </tr>`;

		  // Если в подкатегории есть вопросы
		  if (Object.keys(questionDetails).length > 0) {
			 // Печать вопросов и вариантов для подкатегории
			 Object.entries(questionDetails).forEach(([questionText, variants]) => {
				const firstVariant = variants[0];
				const countVariants = variants.length;

				// Добавляем строку с первым вариантом ответа (и объединение ячеек через rowspan)
				referenceTableResults += `
						  <tr>
							 <td class="question-cell" rowspan="${countVariants}">${questionText}</td>
							 <td>${firstVariant.answer}</td>
							 <td>${firstVariant.explanation}</td>
							 <td class="question-cell-number" rowspan="${countVariants}">${firstVariant.number}</td>
						  </tr>`;

				// Добавляем остальные строки для других вариантов
				for (let i = 1; i < variants.length; i++) {
				  const variant = variants[i];
				  referenceTableResults += `
							<tr>
								<td>${variant.answer}</td>
								<td>${variant.explanation}</td>
							</tr>`;
				}
			 });
		  } else {
			 // Если для подкатегории нет вопросов
			 referenceTableResults += `
			  <tr>
				 <td colspan="4" class="no-questions">Нет вопросов для этой подкатегории</td>
			  </tr>`;
		  }
		});

		// Закрыть таблицу для текущей категории
		referenceTableResults += `
				  </tbody>
				</table>`;
	 });

	 // Закрываем общий контейнер для справочной таблицы
	 referenceTableResults += `</div>`;
	 referenceTableContainer.innerHTML = referenceTableResults;
	 referenceTableContainer.style.display = "block"; // Показываем итоговый контейнер
  } */

//Функция анимации
function animateOnScroll() {
  // Находим все элементы для анимации
  const animBlocks = document.querySelectorAll(".subcategory-wrapper, .category-label, .subcategory-title");

  // Проверяем, найдены ли элементы на странице
  if (animBlocks.length === 0) {
    console.warn("No elements found to animate!");
    return;
  }

  // Опции для наблюдателя
  const observerOptions = {
    root: null, // Наблюдение в пределах viewport (области просмотра)
    rootMargin: "0px", // Без отступов
    threshold: 0.2, // Запустить при 10% видимости элемента
  };

  // Функция срабатывания для отдельных элементов
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Добавляем класс, чтобы запускать анимацию
        entry.target.classList.add("_anim-active");
        // Убираем элемент из наблюдения
        observer.unobserve(entry.target);
      }
    });
  };

  // Создаем наблюдатель
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Отслеживаем каждый блок
  animBlocks.forEach((block) => observer.observe(block));
}

/* Скачивание ПДФ ===================================== */
// Функция для загрузки файла patterns_data.json
async function loadPatterns() {
  try {
    const response = await fetch("patterns_data.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    // Возвращаем список категорий
    return data.categories || [];
  } catch (error) {
    console.error("Ошибка загрузки patterns_data.json:", error);
    return []; // Возвращаем пустой массив, если произошла ошибка
  }
}

// Функция для генерации PDF
function generatePDF(resultsData, patternsData, customStyles = {}) {
  // Базовые стили
  const defaultStyles = {
    pdfTitle: {
      fontSize: 22,
      bold: true,
      alignment: "center",
      margin: [0, 0, 0, 10],
    },
    descriptionText: {
      fontSize: 14,
      alignment: "center",
      margin: [0, 0, 0, 10],
    },
    categoryHeader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    subCategoryHeader: {
      fontSize: 14,
      margin: [5, 5, 0, 5],
    },
    noQuestions: {
      fontSize: 14,
      italics: true,
      color: "#ff0000",
      margin: [0, 5, 0, 15],
    },
    tableHeader: {
      bold: true,
      fontSize: 14,
      fillColor: "#f2f2f2",
      margin: [0, 5, 0, 15],
    },
    tableCell: {
      fontSize: 12,
      alignment: "left",
    },
    clientInfo: {
      fontSize: 12,
      bold: false,
      alignment: "left",
    },
  };

  // Слияние пользовательских и стандартных стилей
  const styles = { ...defaultStyles, ...customStyles };

  // Функция обогащения данных
  const enrichData = (patternsData, resultsData) => {
    const enrichedData = {};

    patternsData.forEach((category) => {
      const categoryTitle = category.title.ru;
      enrichedData[categoryTitle] = [];

      category.subcategories.forEach((subcategory) => {
        const subcategoryTitle = subcategory.title.ru;

        const testResults = resultsData[categoryTitle]?.find((resultSubcategory) => resultSubcategory.subcategory === subcategoryTitle);

        enrichedData[categoryTitle].push({
          subcategory: subcategoryTitle,
          responses: testResults?.responses || [],
          patterns: subcategory.patterns.map((pattern) => ({
            title: pattern.pattern.ru,
            description: pattern.description.ru,
          })),
        });
      });
    });

    return enrichedData;
  };

  // Обогащение данных
  const enrichedResults = enrichData(patternsData, resultsData);

  // Генерация контента для PDF
  const generateContent = (results, userFullName, testDate) => {
    const content = [];
    // Добавляем информацию о клиенте (ФИО слева, дата справа)
    content.push({
      columns: [
        {
          text: `ФИО: ${userFullName}`, // Имя пользователя слева
          style: "clientInfo",
          alignment: "left",
        },
        {
          text: `Дата: ${testDate}`, // Дата справа
          style: "clientInfo",
          alignment: "right",
        },
      ],
      margin: [0, 0, 0, 20], // Отступ снизу
    });

    // Заголовок PDF
    content.push({
      text: "Результат теста",
      style: "pdfTitle", // Заголовок теста
    });

    // Описание теста
    content.push({
      text: "Описание всех категорий, подкатегорий и их паттернов",
      style: "descriptionText",
    });

    // Итерация по категориям и подкатегориям
    let isFirstCategory = true; // Флаг для добавления разрыва страницы начиная со второй категории
    for (const category in results) {
      // Добавляем разрыв страницы, если это не первая категория
      if (!isFirstCategory) {
        content.push({
          text: "",
          pageBreak: "before", // Разрыв страницы
        });
      }

      isFirstCategory = false; // После первой категории ставим флаг в false

      // Добавление заголовка категории
      content.push({
        text: category,
        style: "categoryHeader", // Применение стиля категории
      });
      let subcategoryCounter = 0; // Счетчик количества подкатегорий на текущей странице

      results[category].forEach((subcategory, index) => {
        // Если это третья подкатегория, переносим ее на новую страницу
        if (subcategoryCounter === 2 || index === 0) {
          content.push({
            text: "",
            pageBreak: subcategoryCounter === 2 ? "before" : "", // Перенос можно сделать после двух подкатегорий
          });
          subcategoryCounter = 0; // Сбрасываем счетчик для новой страницы
        }

        // Заголовок подкатегории
        content.push({
          text: subcategory.subcategory,
          style: "subCategoryHeader", // Применение стиля подкатегории
          margin: [0, 20, 0, 10],
        });

        if (subcategory.responses.length === 0) {
          content.push({
            text: "Нет ответов для этой подкатегории.",
            style: "noQuestions",
            margin: [0, 10, 0, 15],
          });
        } else {
          // Генерация контента по паттернам и доминирующим паттернам (как у вас уже описано)
          // Находим максимальный процент
          const maxPercentage = Math.max(...subcategory.responses.map((res) => res.percentage));
          const dominantResponses = subcategory.responses.filter((res) => res.percentage === maxPercentage);

          // Проверяем случаи для "НЕЙТРАЛЬНО"
          if (dominantResponses.length > 1) {
            const allEqual = subcategory.responses.every((res) => res.percentage === maxPercentage);

            if (allEqual) {
              content.push({
                text: "НЕЙТРАЛЬНО",
                style: "dominantPattern",
                margin: [0, 10, 0, 10],
              });
            } else {
              content.push({
                text: "НЕЙТРАЛЬНО",
                style: "dominantPattern",
                margin: [0, 10, 0, 10],
              });
            }
          } else {
            // Если только один доминирующий паттерн
            const dominantResponse = dominantResponses[0];
            const percentage = dominantResponse.percentage;

            let dominanceLabel = ""; // Лейбл для доминирующего паттерна
            let descriptionText = ""; // Описание для паттерна, если нужно

            if (percentage <= 40) {
              dominanceLabel = "УМЕРЕННО";
              descriptionText = `УМЕРЕННО ${dominantResponse.pattern}`;
            } else if (percentage > 40 && percentage < 60) {
              dominanceLabel = "НЕЙТРАЛЬНО";
              descriptionText = "Нейтральное распределение между вариантами.";
            } else if (percentage >= 60) {
              dominanceLabel = "ЯВНО";
              descriptionText = `ЯВНО ${dominantResponse.pattern}`;
            }

            content.push({
              text: descriptionText.toUpperCase(), // Выводим описание с уровнем и паттерном
              style: "dominantPattern",
              margin: [0, 10, 0, 10],
            });
          }

          // Добавляем все остальные паттерны с указанием процентов
          subcategory.responses.forEach((response) => {
            // Добавляем текст с процентами
            content.push({
              text: `${response.pattern}: ${response.percentage}%`,
              style: "tableCell",
              margin: [0, 3, 0, 3],
            });

            // Добавляем линейку выраженности
            content.push(
              // Фон линейки (равен 100%)
              {
                canvas: [
                  {
                    type: "rect", // Прямоугольник для фона
                    x: 0,
                    y: 0,
                    w: 400, // Фиксированная ширина для полного диапазона (100%)
                    h: 8, // Высота линейки
                    color: "#e0e0e0", // Цвет фона линейки (серый)
                    r: 5, // Радиус скругления углов
                  },
                ],
                margin: [0, 2, 0, -8], // Отступы; -8, чтобы наложить следующую линейку поверх этой
              },

              // Динамическая заполненная линейка (процентное значение)
              {
                canvas: [
                  {
                    type: "rect", // Прямоугольник для заполнения
                    x: 0,
                    y: 0,
                    w: (response.percentage / 100) * 400, // Ширина в зависимости от процента
                    h: 8, // Высота линейки
                    color: "#a3cfff", // Цвет заполнения (синий)
                    r: 5, // Радиус скругления углов
                  },
                ],
                margin: [0, 0, 0, 10], // Отступы для второй линейки
              }
            );
          });
        }

        // Описание паттернов
        content.push({
          text: "Описание паттернов:",
          style: "depictionPatterns",
          margin: [0, 10, 0, 5],
          color: "#353535",
        });

        subcategory.patterns.forEach((pattern) => {
          content.push({
            text: [
              {
                text: `${pattern.title}`,
                bold: true,
                color: "#767676",
              },
              { text: `: ${pattern.description}`, color: "#767676" }, // Добавление описания без подчеркивания
            ],
            style: "tableCell", // Общий стиль
            margin: [0, 2, 0, 5], // Отступы между элементами
          });
        });

        subcategoryCounter++; // Увеличиваем счетчик подкатегорий
      });
    }

    return content;
  };
  // Получаем текущую дату в формате "28 января 2025"
  const now = new Date();
  const testDate = now.toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Определение структуры PDF
  const docDefinition = {
    content: generateContent(enrichedResults, userFullName, testDate), // Передаём FIO и дату
    styles: styles, // Применение стилей
  };

  // Генерация PDF
  pdfMake.createPdf(docDefinition).download("Результат теста.pdf");
}

// Обработчик для кнопки генерации PDF
document.getElementById("download-pdf").addEventListener("click", async () => {
  // Показываем пользователю прелоадер
  toggleLoader(true, "Подождите, идет генерация PDF...");

  try {
    // Получаем данные для PDF
    const resultsData = showResults();
    const patternsData = await loadPatterns();

    const customStyles = {
      categoryHeader: {
        fontSize: 22,
        bold: true,
        color: "#000",
        margin: [0, 15, 0, 5],
      },
      subCategoryHeader: {
        fontSize: 16,
        bold: true,
        color: "#007BFF",
        margin: [0, 10, 0, 5],
      },
      dominantPattern: {
        fontSize: 12,
        bold: true,
        color: "#000",
      },
      depictionPatterns: {
        bold: true,
        color: "#505050",
      },
    };

    // Генерация PDF
    generatePDF(resultsData, patternsData, customStyles);
  } catch (error) {
    console.error("Ошибка при создании PDF:", error);

    // Уведомление об ошибке
    alert("Произошла ошибка при создании PDF. Пожалуйста, попробуйте снова.");
  } finally {
    // Скрываем прелоадер независимо от результатов
    toggleLoader(false);
  }
});

// Показываем/скрываем прелоадер
function toggleLoader(show, message = "Подождите, идет генерация...") {
  const loaderOverlay = document.getElementById("loader-overlay");
  const loaderText = document.getElementById("loader-text");

  if (show) {
    loaderText.textContent = message; // Устанавливаем сообщение
    loaderOverlay.style.display = "flex"; // Показываем прелоадер
  } else {
    loaderOverlay.style.display = "none"; // Скрываем прелоадер
  }
}
