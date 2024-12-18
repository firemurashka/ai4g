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
    question: "Какое слово в паре <span>'решительный - преданный'</span> тебе больше нравится по смыслу?",
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

// Функция для отображения вопроса
function showQuestion() {
  const questionContainer = document.getElementById("question-container");
  const questionCounter = document.getElementById("question-counter");
  const question = questionsWithPatterns[currentQuestionIndex];

  questionContainer.innerHTML = `
		  <div class="question">${question.question}</div>
		  ${question.options
        .map(
          (option) => `
					 <label class="option">
						  <input type="radio" name="answer" value="${option}">
						  <span class="radio-label">${option}</span>
					 </label>
				`
        )
        .join("")}
	 `;

  questionCounter.innerHTML = ` ${currentQuestionIndex + 1} из ${questionsWithPatterns.length}`;
}

// Функция для отображения результатов
function showResults() {
  const resultContainer = document.getElementById("result-container");
  const quizContent = document.getElementById("quiz-content");
  const resultContent = document.getElementById("result-content");
  const subtitle = document.querySelector(".quiz-patterns__subtitle");
  const questionCounter = document.getElementById("question-counter");

  // Скрываем блок с вопросами
  quizContent.style.display = "none";

  // Скрываем счетчик вопросов
  questionCounter.style.display = "none";

  // Изменяем текст подзаголовка на "Результаты теста"
  subtitle.textContent = "Результаты теста";
  const results = answers
    .map((answer, index) => {
      const question = questionsWithPatterns[index];
      const selectedIndex = question.options.indexOf(answer);
      const pattern = question.patterns[selectedIndex];
      return `<p><span>№ ${index + 1}:</span> Ответ: ${answer} | Паттерн: ${pattern}</p>`;
    })
    .join("");

  resultContent.innerHTML = results;

  resultContainer.style.display = "flex";
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  showQuestion();
});

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  const errorMessage = document.getElementById("error-message"); // Получаем элемент сообщения об ошибке

  if (selectedOption) {
    // Сохраняем выбранный ответ
    answers.push(selectedOption.value);
    currentQuestionIndex++;
    // Скрываем сообщение об ошибке, если оно видно
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

// Функция для сброса опроса
function resetQuiz() {
  currentQuestionIndex = 0;
  answers.length = 0;
  showQuestion();
  document.getElementById("result-container").style.display = "none";
  document.getElementById("question-counter").style.display = "block";
  document.querySelector(".quiz-patterns__subtitle").textContent = "Выберите слово по смыслу";
  document.getElementById("quiz-content").style.display = "flex";
}
