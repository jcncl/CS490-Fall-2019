<?php
//var_dump($response);
$array = json_decode($_POST['json_string']);
$curl = curl_init();
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_URL, 'https://web.njit.edu/~ec223/middleCurl.php');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $array);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);

$response = json_decode(curl_exec($curl));

curl_close($curl);
echo json_encode($response);
