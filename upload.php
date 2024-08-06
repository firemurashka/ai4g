<?php
$ds = DIRECTORY_SEPARATOR;  // Разделитель директорий
$storeFolder = 'uploads';   // Директория для хранения загруженных файлов

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	if (!empty($_FILES)) {
		$tempFile = $_FILES['file']['tmp_name'];  // Временное имя файла
		$targetPath = dirname(__FILE__) . $ds . $storeFolder . $ds;  // Путь сохранения файла
		$targetFile =  $targetPath . $_FILES['file']['name'];  // Полный путь к файлу

		if (move_uploaded_file($tempFile, $targetFile)) {
			// Файл успешно перемещен
			echo json_encode(["status" => "success"]);
		} else {
			// Ошибка при перемещении файла
			http_response_code(500);
			echo json_encode(["status" => "error", "message" => "Failed to move uploaded file."]);
		}
	} else {
		// Нет файлов для загрузки
		http_response_code(400);
		echo json_encode(["status" => "error", "message" => "No files to upload."]);
	}
} else {
	// Метод запроса не POST
	http_response_code(405);
	echo json_encode(["status" => "error", "message" => "Method Not Allowed"]);
}
