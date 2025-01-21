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

async function loadQuestions() {
  try {
    const response = await fetch("patterns_data.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    // Загружаем данные
    questionsWithPatterns = data.questionsWithPatterns || [];
    categories = data.categories || [];

    if (questionsWithPatterns.length === 0) {
      console.error("Нет доступных вопросов.");
      return;
    }

    if (!Array.isArray(categories)) {
      console.error("Категории не являются массивом.");
    }

    // Отображаем первый вопрос
    showQuestion();
  } catch (error) {
    console.error("Ошибка при загрузке JSON:", error);
  }
}

// Функция для отображения текущего вопроса
function showQuestion() {
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
      showResultTable();
      showReferenceTable();
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
  document.querySelector(".quiz-patterns__subtitle").innerText = "Выберите слово по смыслу";
  document.getElementById("result-container").style.display = "none";
  document.getElementById("result-table-container").style.display = "none";
  document.getElementById("reference-table-container").style.display = "none";
  document.getElementById("quiz-content").style.display = "flex";
  const quizPatternsBlock = document.querySelector(".quiz-patterns__block");
  quizPatternsBlock.style.maxWidth = "800px";
  showQuestion(); // Показываем первый вопрос
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
  const subtitle = document.querySelector(".quiz-patterns__subtitle");
  const questionCounter = document.getElementById("question-counter");
  const quizPatternsBlock = document.querySelector(".quiz-patterns__block");

  // Скрываем блок с вопросами и счётчик для отображения результатов
  quizContent.style.display = "none";
  questionCounter.style.display = "none";
  subtitle.textContent = "Результаты теста";
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

      // Вычисляем доминантный паттерн
      const dominant = patternsInSubcategory.reduce(
        (current, pattern) => (counts[pattern] > (counts[current] || 0) ? pattern : current),
        patternsInSubcategory[0]
      );

      const dominantPercentage = Math.round((counts[dominant] / totalResponses) * 100);
      const statusText = dominantPercentage <= 40 ? `УМЕРЕННО ${dominant}` : dominantPercentage <= 60 ? `НЕЙТРАЛЬНО` : `ЯВНО ${dominant}`;

      // Сохраняем данные подкатегории в resultsData для отчёта
      resultsData[categoryTitle].push({
        subcategory: subcategoryTitle,
        dominantPattern: dominant,
        percentage: dominantPercentage,
        responses: patternsInSubcategory.map((pattern) => ({
          pattern,
          count: counts[pattern] || 0,
          percentage: Math.round(((counts[pattern] || 0) / totalResponses) * 100),
        })),
      });

      // Формируем HTML этого блока
      let patternResults = `<div class="subcategory-content">`;

      patternsInSubcategory.forEach((pattern) => {
        const patternPercentage = Math.round(((counts[pattern] || 0) / totalResponses) * 100);
        // Найти описание для текущего паттерна
        const currentPatternData = subcategory.patterns.find((p) => (p.pattern.ru || p.pattern.en) === pattern);

        const patternDescription = currentPatternData?.description.ru || "Описание отсутствует";

        patternResults += `
			<div class="pattern-result">
				<div class="pattern-result__label">
					<div class="scale-bar-title-wrapper">
						<p class="scale-bar-title">${pattern}</p>
						<div class="info-tooltiptest-wrapper">
							<div class="info-icon">i</div>
							<div class="tooltiptest">
								${patternDescription}
							</div>
						</div>
					</div>
					<p>${patternPercentage}%</p>
				</div>
				<div class="scale-bar-container">
					<div class="scale-bar" style="width: ${patternPercentage}%;"></div>
				</div>
			</div>`;
      });

      patternResults += `</div>`;

      const analyticsBlock = `
			  <div class="analytics-block">
				 <p>${statusText}</p>
				 <div class="scale-container">
					<div class="scale-line"></div>
					<div class="scale-labels">
					  <div class="scale-labels-item">
						 <div class="indicator" style="opacity: ${dominantPercentage <= 40 ? 1 : 0};"></div>
						 <span>УМЕРЕННО</span>
					  </div>
					  <div class="scale-labels-item">
						 <div class="indicator" style="opacity: ${dominantPercentage > 40 && dominantPercentage <= 60 ? 1 : 0};"></div>
						 <span>НЕЙТРАЛЬНО</span>
					  </div>
					  <div class="scale-labels-item">
						 <div class="indicator" style="opacity: ${dominantPercentage > 60 ? 1 : 0};"></div>
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

  // Вызываем функцию для инициализации тултипов
  initializeTooltips();

  // Делаем контейнер видимым
  resultContainer.style.display = "flex";
  animateOnScroll();

  // Возвращаем JSON для отчётов (например, для PDF)
  return resultsData;
}

function initializeTooltips() {
  // Проверяем, является ли устройство сенсорным
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Добавляем обработчики на все элементы c `.info-tooltiptest-wrapper`
  document.querySelectorAll(".info-tooltiptest-wrapper").forEach((tooltipWrapper) => {
    console.log("Добавляем обработчик для:", tooltipWrapper); // Для отладки
    const tooltip = tooltipWrapper.querySelector(".tooltiptest");
    const infoIcon = tooltipWrapper.querySelector(".info-icon");

    // Проверяем наличие тултипа и иконки
    if (tooltip && infoIcon) {
      if (isTouchDevice) {
        // === ОБРАБОТЧИКИ ДЛЯ СЕНСОРНЫХ УСТРОЙСТВ ===
        tooltipWrapper.addEventListener("click", (event) => {
          console.log("Клик на info-icon (мобильные)");

          // Скрываем все другие тултипы перед открытием текущего
          document.querySelectorAll(".tooltiptest").forEach((otherTooltip) => {
            if (otherTooltip !== tooltip) {
              otherTooltip.style.visibility = "hidden";
              otherTooltip.style.opacity = "0";
            }
          });

          // Переключаем состояние текущего тултипа
          const isVisible = tooltip.style.visibility === "visible";
          if (!isVisible) {
            tooltip.style.visibility = "visible";
            tooltip.style.opacity = "1";
          } else {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = "0";
          }

          // Остановить всплытие события
          event.stopPropagation();
        });
      } else {
        // === ОБРАБОТЧИКИ ДЛЯ ПК — НАВЕДЕНИЕ ===
        infoIcon.addEventListener("mouseenter", () => {
          console.log("Наведение на info-icon");
          tooltip.style.visibility = "visible";
          tooltip.style.opacity = "1";
        });

        infoIcon.addEventListener("mouseleave", () => {
          console.log("Уход курсора с info-icon");
          tooltip.style.visibility = "hidden";
          tooltip.style.opacity = "0";
        });
      }
    }
  });

  // === ОБРАБОТЧИК ГЛОБАЛЬНОГО КЛИКА ===
  document.addEventListener("click", (event) => {
    console.log("Клик вне тултипа: скрываем все тултипы");

    // Проверяем, клик попал ли внутрь `.info-tooltiptest-wrapper`
    const isInside = event.target.closest(".info-tooltiptest-wrapper");
    if (!isInside) {
      // Если клик не попал в тултип или обертку, скрываем все тултипы
      document.querySelectorAll(".tooltiptest").forEach((tooltip) => {
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = "0";
      });
    }
  });
}

// Загрузка вопросов при старте
loadQuestions();

function showResultTable() {
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
 }


function showReferenceTable() {
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
}

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
        console.log(`Element ${entry.target} is visible.`);
        // Добавляем класс, чтобы запускать анимацию
        entry.target.classList.add("_anim-active");
        // Убираем элемент из наблюдения
        observer.unobserve(entry.target);
      } else {
        console.log(`Element ${entry.target} is NOT visible.`);
      }
    });
  };

  // Создаем наблюдатель
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Отслеживаем каждый блок
  animBlocks.forEach((block) => observer.observe(block));
}

// Тест - заполняется
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
  showResultTable();
  showReferenceTable();
}

document.addEventListener("DOMContentLoaded", () => {
  showQuestion();

  // Добавляем обработчик для тестовой кнопки
  document.getElementById("fill-test-answers").addEventListener("click", fillTestAnswers);
});

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
      fontSize: 12,
      alignment: "justify",
      margin: [0, 0, 0, 20],
    },
    categoryHeader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    subCategoryHeader: {
      fontSize: 14,
      italics: true,
      margin: [5, 5, 0, 5],
    },
    noQuestions: {
      fontSize: 12,
      italics: true,
      color: "#ff0000",
      margin: [0, 5, 0, 15],
    },
    tableHeader: {
      bold: true,
      fontSize: 12,
      fillColor: "#f2f2f2",
    },
    tableCell: {
      fontSize: 10,
      alignment: "center",
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
  const generateContent = (results) => {
    const content = [];

    // Заголовок PDF
    content.push({
      text: "Результаты теста",
      style: "pdfTitle", // Заголовок теста
    });

    // Описание теста
    content.push({
      text: "Описание всех категорий, подкатегорий и их паттернов:",
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

      results[category].forEach((subcategory) => {
        // Заголовок подкатегории
        content.push({
          text: subcategory.subcategory,
          style: "subCategoryHeader", // Применение стиля подкатегории
        });

        // Если нет результатов, выводим сообщение
        if (subcategory.responses.length === 0) {
          content.push({
            text: "Нет ответов для этой подкатегории.",
            style: "noQuestions",
          });
        } else {
          // Находим паттерн с максимальным процентом (преобладающий)
          const dominantResponse = subcategory.responses.reduce((max, current) => {
            return current.percentage > max.percentage ? current : max;
          }, subcategory.responses[0]);

          // Преобладающий паттерн
          if (dominantResponse) {
            content.push({
              text: `Преобладающий паттерн: ${dominantResponse.pattern} (${dominantResponse.percentage}%)`,
              style: "dominantPattern", // Применение стиля для выделения преобладающего паттерна
              margin: [0, 5, 0, 10],
            });
          }

          // Перечисление остальных паттернов
          subcategory.responses.forEach((response) => {
            content.push({
              text: `${response.pattern}: ${response.percentage}%`,
              style: "tableCell", // Стиль для перечисления паттернов
              margin: [0, 3, 0, 3], // Отступы для каждого элемента
            });
          });
        }

        // Описание паттернов
        content.push({
          text: "Описание паттернов:",
          margin: [0, 5, 0, 10],
        });

        subcategory.patterns.forEach((pattern) => {
          content.push({
            text: `• ${pattern.title}: ${pattern.description}`,
            style: "tableCell", // Применение стиля для описания паттерна
            margin: [0, 2, 0, 5],
          });
        });
      });
    }

    return content;
  };

  // Определение структуры PDF
  const docDefinition = {
    content: generateContent(enrichedResults),
    styles: styles, // Применение стилей
  };

  // Генерация PDF
  pdfMake.createPdf(docDefinition).download("results.pdf");
}

// Обработчик для кнопки генерации PDF
document.getElementById("download-pdf").addEventListener("click", async () => {
  const resultsData = showResults();
  const patternsData = await loadPatterns();

  const customStyles = {
    categoryHeader: {
      fontSize: 20,
      bold: true,
      color: "#007BFF", // Синий цвет заголовка
      margin: [0, 15, 0, 5],
    },
    subCategoryHeader: {
      fontSize: 16,
      italics: true,
      color: "#000", // Оранжевый цвет подзаголовка
      margin: [0, 10, 0, 5],
    },
    dominantPattern: {
      fontSize: 14,
      color: "#333", // Зеленый цвет для паттернов
      margin: [0, 8, 0, 12],
    },
  };

  generatePDF(resultsData, patternsData, customStyles);
});
