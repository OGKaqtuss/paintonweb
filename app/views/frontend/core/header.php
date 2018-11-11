<?php /** @var $data */ ?>
<html>
<head>
    <script type=text/javascript src="/lib/js/jquery.js"></script>
    <?php foreach($data->libfiles as $file): ?>
        <link rel="stylesheet" type="text/css" href="/lib/css/<?=$file?>"/>
    <?php endforeach; ?>
    <?php foreach($data->mainfiles as $mainfile): ?>
        <?php if(str_contains($mainfile, '.js')): ?>
            <script type=text/javascript src="/main/js/<?=$mainfile?>"></script>
        <?php elseif(str_contains($mainfile, '.css')): ?>
        <link rel="stylesheet" type="text/css" href="/main/css/<?=$mainfile?>"/>
        <?php endif; ?>
    <?php endforeach; ?>
    <?php foreach($data->cssfiles as $cssfile): ?>
        <link rel="stylesheet" type="text/css" href="/<?=$data->pathaddon?>/css/<?=$cssfile?>"/>
    <?php endforeach; ?>
    <title><?= $data->title?></title>
</head>
<body>
<?php if(!isset($data->noheader)): ?>
<header>
    <div class="inner-header">
        <div class="header-logo">
            <a class="header-title" href="<?=$this->getBaseUrl()?>">PaintOnWeb</a>
        </div>
        <nav class="nav-right">
            <ul>
                <li><a href="/login">Sign in</a></li>
                <li><a href="/login">Sign up</a></li>
            </ul>
        </nav>
    </div>
</header>
<?php endif; ?>
