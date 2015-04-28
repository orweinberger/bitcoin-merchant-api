<?php
	$paymentRequest = file_get_contents('http://localhost:3000/payment/generate/' . $_GET["currency"] . '/' . $_GET["amount"] . '?token=change-this');
	echo $paymentRequest;
?>