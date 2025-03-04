<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

session_start();

// Проверка на Honeypot
if (!empty($_POST['hidden_field'])) {
    die('Спам-бот обнаружен!');
}

// Проверка времени заполнения формы
$current_time = time();
$time_limit = 5; // Минимум 5 секунд для заполнения формы
if (isset($_SESSION['last_submit_time']) && $current_time - $_SESSION['last_submit_time'] < $time_limit) {
    die('Форма заполнена слишком быстро.');
}
$_SESSION['last_submit_time'] = $current_time;

// Ограничение по IP
$ip = $_SERVER['REMOTE_ADDR'];
$_SESSION['ip_attempts'][$ip] = $_SESSION['ip_attempts'][$ip] ?? 0;
if ($_SESSION['ip_attempts'][$ip] > 5) {
    die('Слишком много запросов с вашего IP.');
}
$_SESSION['ip_attempts'][$ip]++;

// Проверка полей формы
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    die('Некорректный email.');
}
if (!preg_match('/^[а-яА-ЯёЁa-zA-Z ]+$/u', $_POST['Имя'])) {
    die('Имя содержит недопустимые символы.');
}

// Настройки PHPMailer
$mail = new PHPMailer(true);

try {
    // Серверные настройки
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com'; // SMTP сервер
    $mail->SMTPAuth = true;
    $mail->Username = 'your_email@example.com'; // SMTP логин
    $mail->Password = 'your_password'; // SMTP пароль
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Получатели
    $mail->setFrom('your_email@example.com', 'Ваше имя');
    $mail->addAddress('recipient@example.com', 'Получатель');

    // Содержимое письма
    $mail->isHTML(true);
    $mail->Subject = 'Новое сообщение с сайта';
    $mail->Body = "<p><strong>Имя:</strong> " . htmlspecialchars($_POST['Имя']) . "</p>" .
                  "<p><strong>Телефон:</strong> " . htmlspecialchars($_POST['Телефон']) . "</p>" .
                  "<p><strong>Email:</strong> " . htmlspecialchars($_POST['email']) . "</p>";

    // Отправка письма
    $mail->send();
    echo 'Сообщение успешно отправлено!';
} catch (Exception $e) {
    echo "Ошибка при отправке сообщения: {$mail->ErrorInfo}";
}

?>
