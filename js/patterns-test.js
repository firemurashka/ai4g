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

/* ====questions======================================= */

const questionsWithPatterns = [
  {
    question: "Какое слово в паре <span>'привязанность - рассудочность'</span> тебе больше нравится по смыслу?",
    options: ["Привязанность", "Расcудочность"],
    patterns: ["Коллективизм", "Индивидуализм"],
  },
  {
    question: "Какое слово в паре <span>'факты - идеи'</span> тебе больше нравится по смыслу?",
    options: ["Факты", "Идеи"],
    patterns: ["Аналитичное мышление", "Системное мышление"],
  },
  {
    question: "Какое слово в паре <span>'убедительный - трогательный'</span> тебе больше всего нравится по смыслу?",
    options: ["Убедительный", "Трогательный"],
    patterns: ["Нейтральность", "Эмоциональность"],
  },
  {
    question: "Какое слово в паре <span>'предписанный - незапланированный'</span> тебе больше нравится по смыслу?",
    options: ["Предписанный", "Незапланированный"],
    patterns: ["Рефлексивность", "Импульсивность"],
  },
  {
    question: "Какое слово в паре <span>'теория - факт'</span> тебе больше нравится по смыслу?",
    options: ["Теория", "Факт"],
    patterns: ["Системное мышление", "Аналитичное мышление"],
  },
  {
    question: "Какое слово в паре <span>'спокойный - оживлённый'</span> тебе больше нравится по смыслу?",
    options: ["Спокойный", "Оживленный"],
    patterns: ["Рефлексивность", "Импульсивность"],
  },
  {
    question: "Какое слово в паре <span>'писать - говорить'</span> тебе больше нравится по смыслу?",
    options: ["Писать", "Говорить"],
    patterns: ["Низкий контекст", "Высокий контекст"],
  },
  {
    question: "Какое слово в паре <span>'мечтательный - практичный'</span> тебе больше нравится по смыслу?",
    options: ["Мечтательный", "Практичный"],
    patterns: ["Системное мышление", "Аналитичное мышление"],
  },
  {
    question: "Какое слово в паре <span>'порыв - решение'</span> тебе больше нравится по смыслу?",
    options: ["Порыв", "Решение"],
    patterns: ["Импульсивность", "Рефлексивность"],
  },
  {
    question: "Какое слово в паре <span>'производить - творить'</span> тебе больше нравится по смыслу?",
    options: ["Производить", "Творить"],
    patterns: ["Делать", "Быть"],
  },
  {
    question: "Какое слово в паре <span>'благоразумный - очаровательный'</span> тебе больше нравится по смыслу?",
    options: ["Благоразумный", "Очаровательный"],
    patterns: ["Формальность", "Неформальность"],
  },

  {
    question: "Какое слово в паре  <span>'решительный - преданный'</span> тебе больше нравится по смыслу?",
    options: ["Решительный", "Преданный"],
    patterns: ["Контроль", "Смирение"],
  },

  {
    question: "Какое слово в паре <span>'постоянный - изменяющийся'</span> тебе больше нравится по смыслу?",
    options: ["Постоянный", "Изменяющийся"],
    patterns: ["Стабильность", "Изменения"],
  },
  {
    question: "Какое слово в паре <span>'конкретный - абстрактный'</span> тебе больше нравится по смыслу?",
    options: ["Конкретный", "Абстрактный"],
    patterns: ["Аналитичное мышление", "Системное мышление"],
  },
  {
    question: "Какое слово в паре <span>'стремительный - тщательный'</span> тебе больше нравится по смыслу?",
    options: ["Стремительный", "Тщательный"],
    patterns: ["Импульсивность", "Рефлексивность"],
  },
  {
    question: "Какое слово в паре <span>'мягкий - твердый'</span> тебе больше нравится по смыслу?",
    options: ["Мягкий", "Твердый"],
    patterns: ["Сотрудничество", "Конкуренция"],
  },
  {
    question: "Какое слово в паре <span>'фундамент - шпиль'</span> тебе больше нравится по смыслу?",
    options: ["Фундамент", "Шпиль"],
    patterns: ["Индивидуализм", "Коллективизм"],
  },
  {
    question: "Какое слово в паре <span>'прощать - терпеть'</span> тебе больше нравится по смыслу?",
    options: ["Прощать", "Терпеть"],
    patterns: ["Гармония", "Смирение"],
  },
  {
    question: "Какое слово в паре <span>'интуиция - опыт'</span> тебе больше нравится по смыслу?",
    options: ["Интуиция", "Опыт"],
    patterns: ["Индуктивное мышление", "Дедуктивное мышление"],
  },
  {
    question: "Какое слово в паре <span>'кто - что'</span> тебе больше нравится по смыслу?",
    options: ["Кто", "Что"],
    patterns: ["Быть", "Делать"],
  },
  {
    question: "Какое слово в паре <span>'похвала - критика'</span> тебе больше нравится по смыслу?",
    options: ["Похвала", "Критика"],
    patterns: ["Непрямая коммуникация", "Прямая коммуникация"],
  },
  {
    question: "Какое слово в паре <span>'осторожный - доверчивый'</span> тебе больше нравится по смыслу?",
    options: ["Осторожный", "Доверчивый"],
    patterns: ["Защищать границы", "Делиться ресурсами"],
  },
  {
    question: "Какое слово в паре <span>'целое - детали'</span> тебе больше нравится по смыслу?",
    options: ["Целое", "Детали"],
    patterns: ["Индуктивное мышление", "Дедуктивное мышление"],
  },

  {
    question: "Какое слово в паре <span>'понимать - управлять'</span> тебе больше нравится по смыслу?",
    options: ["Понимать", "Управлять"],
    patterns: ["Гармония", "Контроль"],
  },
  {
    question: "Какое слово в паре <span>'Доктор Ватсон - Шерлок Холмс'</span> тебе больше нравится по смыслу?",
    options: ["Доктор Ватсон", "Шерлок Холмс"],
    patterns: ["Индуктивное мышление", "Дедуктивное мышление"],
  },
  {
    question: "Во время разговора, вы скорее склонны...",
    options: ["Говорить быстро", "Отвечать с задержкой"],
    patterns: ["Импульсивность", "Рефлексивность"],
  },
];

// Измените массив questions на questionsWithPatterns в следующих функциях
let currentQuestionIndex = 0;
const answers = [];
const patterns = [];

const patternCategories = {
  "Паттерны мышления": [],
  "Паттерны коммуникации": [],
  "Паттерны поведения": [],
  "Паттерны организации времени": [],
};

// Функция для отображения вопроса
function showQuestion() {
  const questionContainer = document.getElementById("question-container");
  const questionCounter = document.getElementById("question-counter");
  const question = questionsWithPatterns[currentQuestionIndex];

  // Получаем текущий выбранный ответ (если он есть)
  const currentAnswer = answers[currentQuestionIndex];

  // Отображаем вопрос и варианты ответа
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

  questionCounter.innerHTML = `${currentQuestionIndex + 1} из ${questionsWithPatterns.length}`;
}

// Функция для отображения результатов
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

  // Скрываем блок с вопросами и счетчик
  quizContent.style.display = "none";
  questionCounter.style.display = "none";
  subtitle.textContent = "Результаты теста";
  quizPatternsBlock.style.maxWidth = "1200px";

  let results = "";

  // Определяем категории, включая паттерны и их наличие
  const categories = {
    "Паттерны мышления": [
      {
        title: "Дедуктивное мышление / Индуктивное мышление",
        patterns: ["Дедуктивное мышление", "Индуктивное мышление"],
      },
      {
        title: "Аналитичное мышление / Системное мышление",
        patterns: ["Аналитичное мышление", "Системное мышление"],
      },
      {
        title: "Полезависимость / Поленезависимость",
        patterns: ["Полезависимость", "Поленезависимость"],
      },
      {
        title: "Рефлексивность / Импульсивность",
        patterns: ["Рефлексивность", "Импульсивность"],
      },
    ],

    "Паттерны организации времени": [
      {
        title: "Дефицит времени / Изобилие времени",
        patterns: ["Дефицит времени", "Изобилие времени"],
      },
      {
        title: "Монохронность / Полихронность",
        patterns: ["Монохронность", "Полихронность"],
      },
      {
        title: "Прошлое / Настоящее / Будущее ",
        patterns: ["Прошлое", "Настоящее", "Будущее"],
      },
      {
        title: "Краткосрочная стратегия / Долгосрочная стратегия",
        patterns: ["Краткосрочная стратегия", "Долгосрочная стратегия"],
      },
    ],

    "Паттерны поведения": [
      {
        title: "Контроль / Гармония / Смирение",
        patterns: ["Контроль", "Гармония", "Смирение"],
      },
      {
        title: "Защищать границы / Делиться ресурсами",
        patterns: ["Защищать границы", "Делиться ресурсами"],
      },
      {
        title: "Быть / Делать",
        patterns: ["Быть", "Делать"],
      },
      {
        title: "Индивидуализм / Коллективизм",
        patterns: ["Индивидуализм", "Коллективизм"],
      },
      {
        title: "Стабильность / Изменения",
        patterns: ["Стабильность", "Изменения"],
      },
      {
        title: "Конкуренция / Сотрудничество",
        patterns: ["Конкуренция", "Сотрудничество"],
      },
    ],

    "Паттерны коммуникации": [
      {
        title: "Высокий контекст / Низкий контекст",
        patterns: ["Высокий контекст", "Низкий контекст"],
      },

      {
        title: "Прямая коммуникация / Непрямая коммуникация",
        patterns: ["Прямая коммуникация", "Непрямая коммуникация"],
      },

      {
        title: "Эмоциональность / Нейтральность",
        patterns: ["Эмоциональность", "Нейтральность"],
      },
      {
        title: "Формальность / Неформальность",
        patterns: ["Формальность", "Неформальность"],
      },
    ],
  };

  // Подсчёт ответов на основе patterns
  const counts = patterns.reduce((acc, pattern) => {
    acc[pattern] = (acc[pattern] || 0) + 1;
    return acc;
  }, {});

  // Функция для получения доминирующего паттерна
  function getDominantPattern(patterns) {
    const totalResponses = patterns.reduce((total, pattern) => total + (counts[pattern] || 0), 0);

    if (totalResponses === 0) return { pattern: null, percentage: 0, totalResponses };

    let dominantPattern = null;
    let highestCount = 0;

    patterns.forEach((pattern) => {
      const count = counts[pattern] || 0;
      if (count > highestCount) {
        highestCount = count;
        dominantPattern = pattern;
      }
    });

    const percentage = Math.round((highestCount / totalResponses) * 100);
    return {
      pattern: dominantPattern,
      percentage,
      totalResponses,
    };
  }

  // Обрабатываем каждую категорию
  for (const category in categories) {
    let subcategoryResults = "";

    categories[category].forEach(({ title, patterns }) => {
      const totalResponses = patterns.reduce((total, pattern) => total + (counts[pattern] || 0), 0);

      if (totalResponses > 0) {
        const dominant = getDominantPattern(patterns);
        const percentages = patterns.map((pattern) => Math.round(((counts[pattern] || 0) / totalResponses) * 100));

        // Определяем уровень на основе заданных условий
        let statusText = "";
        const isThreePatterns = patterns.length === 3;
        const allEqual = percentages.every((p) => p === percentages[0]);

        if (dominant.percentage > 80) {
          statusText = `ЯВНО ${dominant.pattern}`;
        } else if (dominant.percentage >= 60 && dominant.percentage <= 80) {
          statusText = `УМЕРЕННО ${dominant.pattern}`;
        } else if (isThreePatterns) {
          if (allEqual) {
            statusText = "НЕЙТРАЛЬНО";
          }
        }

        // Создание блока аналитики
        const analyticsBlock = `
			<div class="analytics-block">
			  <p>${statusText || "НЕЙТРАЛЬНО"}</p>
			  <div class="scale-container">
				 <div class="scale-line"></div>
				 <div class="scale-labels">
					<div class="scale-labels-item">
					  <div class="indicator" style="opacity: ${percentages[0] > 80 ? 1 : 0};"></div>
					  <span>ЯВНО</span>
					</div>
					<div class="scale-labels-item">
					  <div class="indicator" style="opacity: ${percentages[0] >= 60 && percentages[0] <= 80 ? 1 : 0};"></div>
					  <span>УМЕРЕННО</span>
					</div>
					<div class="scale-labels-item">
					  <div class="indicator" style="opacity: ${percentages[0] >= 40 && percentages[0] < 60 ? 1 : 0};"></div>
					  <span>НЕЙТРАЛЬНО</span>
					</div>
					<div class="scale-labels-item">
					  <div class="indicator" style="opacity: ${percentages[0] >= 20 && percentages[0] < 40 ? 1 : 0};"></div>
					  <span>УМЕРЕННО</span>
					</div>
					<div class="scale-labels-item">
					  <div class="indicator" style="opacity: ${percentages[0] < 20 ? 1 : 0};"></div>
					  <span>ЯВНО</span>
					</div>
				 </div>
			  </div>
			</div>`;

        // Собираем блок результатов для паттернов
        let patternResults = `<div class="subcategory-content">`;
        patterns.forEach((pattern) => {
          const count = counts[pattern] || 0;
          const percentage = Math.round((count / totalResponses) * 100);
          patternResults += `
			  <div class="pattern-result">
				 <p class="scale-bar-title">${pattern}</p>
				 <div class="scale-bar-container">
					<div class="scale-bar" style="width: ${percentage}%;"></div>
				 </div>
				 <p>${percentage}%</p>
			  </div>`;
        });
        patternResults += `</div>`;

        // Объединение аналитики и результатов в единую подкатегорию
        subcategoryResults += `
			<div class="subcategory-block">
			  <div class="subcategory-title">${title}</div>
			  <div class="subcategory-wrapper">
				 <div class="analytics-wrapper">${analyticsBlock}</div>
				 <div class="results-wrapper">${patternResults}</div>
			  </div>
			</div>`;
      }
    });

    // Добавляем результаты категории, если есть заполненные паттерны
    if (subcategoryResults) {
      results += `<div class="category-block"><h3>${category}</h3>${subcategoryResults}</div>`;
    }
  }

  // Вставляем результаты на страницу
  resultContent.innerHTML = results;
  resultContainer.style.display = "flex";
}

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  const errorMessage = document.getElementById("error-message"); // Получаем элемент сообщения об ошибке

  if (selectedOption) {
    // Сохраняем выбранный ответ
    answers.push(selectedOption.value);

    const question = questionsWithPatterns[currentQuestionIndex];
    const selectedIndex = question.options.indexOf(selectedOption.value);
    const pattern = question.patterns[selectedIndex];
    // Сохраняем паттерн
    patterns.push(pattern);

    currentQuestionIndex++;
    errorMessage.style.display = "none";

    if (currentQuestionIndex < questionsWithPatterns.length) {
      showQuestion();
    } else {
      showResults();
    }
  } else {
    // Показать сообщение об ошибке
    errorMessage.style.display = "block"; // Отображаем сообщение
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

// Функция для сброса опроса
function resetQuiz() {
  currentQuestionIndex = 0;
  answers.length = 0;
  patterns.length = 0; // Очищаем массив паттернов
  document.getElementById("error-message").style.display = "none"; // Скрываем сообщение
  showQuestion();
  document.getElementById("result-container").style.display = "none";
  document.getElementById("question-counter").style.display = "block";
  document.querySelector(".quiz-patterns__subtitle").textContent = "Выберите слово по смыслу";
  document.getElementById("quiz-content").style.display = "flex";
  const quizPatternsBlock = document.querySelector(".quiz-patterns__block");
  quizPatternsBlock.style.maxWidth = "800px";
}

const patternCategoryMap = {
  "Паттерны мышления": ["Дедуктивное мышление", "Индуктивное мышление", "Аналитичное мышление", "Системное мышление", "Рефлексивность", "Импульсивность"],
  "Паттерны коммуникации": [
    "Высокий контекст",
    "Низкий контекст",
    "Прямая коммуникация",
    "Непрямая коммуникация",
    "Эмоциональность",
    "Нейтральность",
    "Формальность",
    "Неформальность",
  ],
  "Паттерны поведения": [
    "Контроль",
    "Гармония",
    "Смирение",
    "Защищать границы",
    "Делиться ресурсами",
    "Быть",
    "Делать",
    "Индивидуализм",
    "Коллективизм",
    "Стабильность",
    "Изменения",
    "Конкуренция",
    "Сотрудничество",
  ],
  "Паттерны организации времени": [
    "Дефицит времени",
    "Изобилие времени",
    "Монохронность",
    "Полихронность",
    "Прошлое",
    "Настоящее",
    "Будущее",
    "Краткосрочная стратегия",
    "Долгосрочная стратегия",
  ],
};

// Используем уже определённую функцию categorizePatterns
function categorizePatterns(results) {
  // Очищаем категории
  for (const category in patternCategories) {
    patternCategories[category] = [];
  }

  results.forEach((pattern) => {
    for (const [category, patterns] of Object.entries(patternCategoryMap)) {
      if (patterns.includes(pattern) && !patternCategories[category].includes(pattern)) {
        patternCategories[category].push(pattern);
      }
    }
  });
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  showQuestion();
});

/* ===================================== */
document.addEventListener("DOMContentLoaded", () => {
  showQuestion();

  // Добавляем обработчик для тестовой кнопки
  document.getElementById("fill-test-answers").addEventListener("click", fillTestAnswers);
});
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
