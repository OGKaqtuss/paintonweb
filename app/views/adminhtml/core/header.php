<?php /** @var $data */ ?>
<html>
<head>
    <script type=text/javascript src="/lib/js/jquery.js"></script>
    <?php foreach($data->mainfiles as $mainfile): ?>
        <?php if(str_contains($mainfile, '.js')): ?>
            <script type=text/javascript src="/main/js/<?=$mainfile?>"></script>
        <?php elseif(str_contains($mainfile, '.js')): ?>
            <link rel="stylesheet" type="text/css" href="/main/css/<?=$mainfile?>"/>
        <?php endif; ?>
    <?php endforeach; ?>
    <?php foreach($data->cssfiles as $cssfile): ?>
        <link rel="stylesheet" type="text/css" href="/<?=$data->pathaddon?>/css/<?=$cssfile?>"/>
    <?php endforeach; ?>
    <?php foreach($data->libfiles as $file): ?>
        <link rel="stylesheet" type="text/css" href="/lib/css/<?=$file?>"/>
    <?php endforeach; ?>
    <title><?= $data->title?></title>
</head>
<body>
<?php if($this->isLoggedInAdmin()): ?>
    <div id="left">
        <div class="content">

        </div>
    </div>
<?php endif; ?>
