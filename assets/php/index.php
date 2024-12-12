<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // אימות טוקן CSRF
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        die("שגיאה: אימות CSRF נכשל.");
    }

    // קבלת נתוני הטופס
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // אימות בסיסי
    if (!$name || !$email || !$subject || !$message) {
        die("נא למלא את כל השדות הנדרשים.");
    }

    // אימות Google reCAPTCHA
    $recaptchaSecret = "6LdplpUqAAAAAM-sS-nCJQUih7_L3JzByHJyJR32";
    $response = $_POST['g-recaptcha-response'];
    $remoteIp = $_SERVER['REMOTE_ADDR'];

    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$response}&remoteip={$remoteIp}");
    $captchaSuccess = json_decode($verify);

    if (!$captchaSuccess->success) {
        die("אימות reCAPTCHA נכשל. נסה שוב.");
    }

    // עיבוד הנתונים (לדוגמה, שליחת דוא"ל)
    $to = "your-email@example.com";
    $subject = "פניה חדשה מאתר: $subject";
    $body = "שם: $name\nמייל: $email\nטלפון: $phone\nהודעה:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "ההודעה נשלחה בהצלחה.";
    } else {
        echo "שגיאה בשליחת ההודעה.";
    }
}
?>
