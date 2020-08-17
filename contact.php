<?php
if (isset ($_POST['telFF'])) {
  $to = "bandurkadmitriy@gmail.com";
  $from = "support@tpverstak.ru";
  $subject = "Заполнена контактная форма на сайте ".$_SERVER['HTTP_REFERER'];
  $message = "\nИмя пользователя: ".$_POST['nameFF']."\nТелефон пользователя ".$_POST['telFF']."\n\nАдрес сайта: ".$_SERVER['HTTP_REFERER'];
 
  $boundary = md5(date('r', time()));
  $filesize = '';
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "From: " . $from . "\r\n";
  $headers .= "Reply-To: " . $from . "\r\n";
  $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
  $message="
Content-Type: multipart/mixed; boundary=\"$boundary\"
 
--$boundary
Content-Type: text/plain; charset=\"utf-8\"
Content-Transfer-Encoding: 7bit
 
$message";
     if(is_uploaded_file($_FILES['fileFF']['tmp_name'])) {
         $attachment = chunk_split(base64_encode(file_get_contents($_FILES['fileFF']['tmp_name'])));
         $filename = $_FILES['fileFF']['name'];
         $filetype = $_FILES['fileFF']['type'];
         $filesize = $_FILES['fileFF']['size'];
         $message.="
 
--$boundary
Content-Type: \"$filetype\"; name=\"$filename\"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename=\"$filename\"
 
$attachment";
     }
   $message.="
--$boundary--";
 
  if ($filesize < 10000000) { // проверка на общий размер всех файлов. Многие почтовые сервисы не принимают вложения больше 10 МБ
    mail($to, $subject, $message, $headers);
      header('Location: thank-you.html');
  } else {
    echo 'Извините, письмо не отправлено. Размер всех файлов превышает 10 МБ.';
  }
}


/* https://api.telegram.org/bot1322118984:AAH4ljOF0Ljs3qBcS-IfJq4sOhYT69Iv3Ro/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['nameFF'];
$phone = $_POST['telFF'];
$token = "1322118984:AAH4ljOF0Ljs3qBcS-IfJq4sOhYT69Iv3Ro";
$chat_id = "-426174005";
$arr = array(
    'Имя пользователя: ' => $name,
    'Телефон: ' => $phone
);

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//if ($sendToTelegram) {
//    header('Location: thank-you.html');
//} else {
//    echo "Error";
//}
?>
