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
const questions = [
  {
    question: "Какое слово в паре <span> 'привязанность - рассудочность' </span> тебе больше нравится по смыслу?",
    options: ["Привязанность", "Расcудочность"],
  },
  { question: "Какое слово в паре <span> 'факты - идеи' </span> тебе больше нравится по смыслу?", options: ["Факты", "Идеи"] },
];
/* const questions = [
	{
	  question: "Какое слово в паре <span> 'привязанность - рассудочность' </span> тебе больше нравится по смыслу?",
	  options: ["Привязанность", "Расcудочность"],
	},
	{ question: "Какое слово в паре <span> 'факты - идеи' </span> тебе больше нравится по смыслу?", options: ["Факты", "Идеи"] },
	{
	  question: "Какое слово в паре <span> 'убедительный - трогательный' </span> тебе больше всего нравится по смыслу?",
	  options: ["Убедительный", "Трогательный"],
	},
	{
	  question: "Какое слово в паре <span> 'предписанный - незапланированный' </span> тебе больше нравится по смыслу?",
	  options: ["Предписанный", "Незапланированный"],
	},
	{ question: "Какое слово в паре <span> 'теория - факт'</span> тебе больше нравится по смыслу?", options: ["Теория", "Факт"] },
	{ question: "Какое слово в паре <span> 'спокойный - оживлённый'</span> тебе больше нравится по смыслу?", options: ["Спокойный", "Оживленный"] },
	{ question: "Какое слово в паре <span> 'писать - говорить'</span> тебе больше нравится по смыслу?", options: ["Писать", "Говорить"] },
	{ question: "Какое слово в паре <span> 'мечтательный - практичный'</span> тебе больше нравится по смыслу?", options: ["Мечтательный", "Практичный"] },
	{ question: "Какое слово в паре <span> 'порыв - решение'</span> тебе больше нравится по смыслу?", options: ["Порыв", "Решение"] },
	{ question: "Какое слово в паре <span> 'производить - творить'</span> тебе больше нравится по смыслу?", options: ["Производить", "Творить"] },
	{
	  question: "Какое слово в паре <span> 'благоразумный - очаровательный'</span> тебе больше нравится по смыслу?",
	  options: ["Благоразумный", "Очаровательный"],
	},
	{ question: "Какое слово в паре <span> 'решительный - преданный'</span> тебе больше нравится по смыслу?", options: ["Решительный", "Преданный"] },
	{ question: "Какое слово в паре <span> 'постоянный - изменяющийся'</span> тебе больше нравится по смыслу?", options: ["Постоянный", "Изменяющийся"] },
	{ question: "Какое слово в паре <span> 'конкретный - абстрактный'</span> тебе больше нравится по смыслу?", options: ["Конкретный", "Абстрактный"] },
	{ question: "Какое слово в паре <span> 'стремительный - тщательный'</span> тебе больше нравится по смыслу?", options: ["Стремительный", "Тщательный"] },
	{ question: "Какое слово в паре <span> 'мягкий - твердый'</span> тебе больше нравится по смыслу?", options: ["Мягкий", "Твердый"] },
	{ question: "Какое слово в паре <span> 'фундамент - шпиль'</span> тебе больше нравится по смыслу?", options: ["Фундамент", "Шпиль"] },
	{ question: "Какое слово в паре <span> 'прощать - терпеть'</span> тебе больше нравится по смыслу?", options: ["Прощать", "Терпеть"] },
	{ question: "Какое слово в паре <span> 'интуиция - опыт'</span> тебе нравится больше по смыслу?", options: ["Интуиция", "Опыт"] },
	{ question: "Какое слово в паре <span> 'кто - что'</span> тебе больше нравится по смыслу?", options: ["Кто", "Что"] },
	{ question: "Какое слово в паре <span> 'похвала - критика'</span> тебе больше нравится по смыслу?", options: ["Похвала", "Критика"] },
	{ question: "Какое слово в паре <span> 'осторожный - доверчивый'</span> тебе больше нравится по смыслу?", options: ["Осторожный", "Доверчивый"] },
	{ question: "Какое слово в паре <span> 'целое - детали'</span> тебе больше нравится по смыслу?", options: ["Целое", "Детали"] },
	{ question: "Какое слово в паре <span> 'понимать - управлять'</span> тебе больше нравится по смыслу?", options: ["Понимать", "Управлять"] },
	{ question: "Кто твой любимый персонаж, <span> 'Доктор Ватсон - Шерлок Холмс'</span>?", options: ["Доктор Ватсон", "Шерлок Холмс"] },
	{ question: "Во время разговора, Вы скорее склонны", options: ["Говорить быстро", "Отвечать с задержкой"] },
 ]; */
// Счетчик текущего вопроса
let currentQuestionIndex = 0;

// Функция для отображения вопроса
function showQuestion() {
  const questionContainer = document.getElementById("question-container");
  const questionCounter = document.getElementById("question-counter");
  const question = questions[currentQuestionIndex];

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

  // Обновление счетчика с номером текущего вопроса
  questionCounter.innerHTML = ` ${currentQuestionIndex + 1} из ${questions.length}`;
}

// Функция для перехода к следующему вопросу
function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      alert("Вы завершили опрос!");
      // Здесь можно добавить логику для обработки ответов
    }
  } else {
    alert("Пожалуйста, выберите вариант ответа!");
  }
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  showQuestion();
});

/* =============================== */
// Счетчик ответов
const answers = [];

// Функция для перехода к следующему вопросу
function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    // Сохраняем выбранный ответ
    answers.push(selectedOption.value);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  } else {
    alert("Пожалуйста, выберите вариант ответа!");
  }
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

  // Подсчет и отображение ответов
  resultContent.innerHTML = answers.map((answer, index) => `<p><span>№ ${index + 1}:</span> ${answer}</p>`).join("");

  // Показываем блок с результатами
  resultContainer.style.display = "flex";
}

// Функция для сброса опроса
function resetQuiz() {
  currentQuestionIndex = 0;
  answers.length = 0; // Очищаем массив ответов
  showQuestion(); // Показываем первый вопрос
  document.getElementById("result-container").style.display = "none"; // Скрываем блок с результатами

  // Показываем счетчик вопросов
  const questionCounter = document.getElementById("question-counter");
  questionCounter.style.display = "block"; // Возвращаем счетчик вопросов

  // Возвращаем текст подзаголовка обратно
  const subtitle = document.querySelector(".quiz-patterns__subtitle");
  subtitle.textContent = "Выберите слово по смыслу"; // Восстанавливаем исходный текст

  // Показываем вопросы
  const quizContent = document.getElementById("quiz-content");
  quizContent.style.display = "flex";
}
