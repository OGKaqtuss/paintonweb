<?php /** @var $data */ ?>
<html>
<head>
    <?php foreach($data->cssfiles as $cssfile): ?>
        <link rel="stylesheet" type="text/css" href="/paintonweb/public/css/<?=$cssfile?>"/>
    <?php endforeach; ?>
    <title><?= $data->title?></title>
</head>
<body>
<header>

</header>
