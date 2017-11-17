<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
if (isset($name) && isset($email) && isset($message)) {
	if (mail('me@jfbarrios.com', 'mensaje de ' .  $email, $message)){
		echo "mensaje enviado correctamente";
	} else {
		header('HTTP/1.1 500 Internal Server Error');
		die(0);
	}
} else {
	header('HTTP/1.1 500 Datos inválidos');
	die(0);
}
?>