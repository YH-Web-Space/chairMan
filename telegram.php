<?php

/* https://api.telegram.org/bot1322118984:AAH4ljOF0Ljs3qBcS-IfJq4sOhYT69Iv3Ro/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
//$email = $_POST['user_files'];
$token = "1322118984:AAH4ljOF0Ljs3qBcS-IfJq4sOhYT69Iv3Ro";
$chat_id = "-426174005";
$arr = array(
  'Имя пользователя: ' => $name,
  'Телефон: ' => $phone
//  'Email' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
?>