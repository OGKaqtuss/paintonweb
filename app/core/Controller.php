<?php
/**
 * Created by PhpStorm.
 * User: Niclas
 * Date: 01-11-2018
 * Time: 21:17
 */

class Controller extends Actions
{
    CONST IGNORE_FILES = ["..", "."];

    public function model($model)
    {
        require_once '../app/models/' . $model . '.php';
        return new $model();
    }

    public function view($view, $data = [])
    {
        if(!isset($data['title'])) $data['title'] = 'PaintToWeb';

        $dirPath = '../public/css';
        $data['cssfiles'] = [];

        $dir = new DirectoryIterator($dirPath);

        foreach($dir as $fileInfo){
            if(in_array($fileInfo->getFilename(), self::IGNORE_FILES)) continue;

            $data['cssfiles'][] = $fileInfo->getFilename();
        }

        $data = (object) $data;

        require_once '../app/views/core/header.php';
        require_once '../app/views/' . $view . '.php';
        require_once '../app/views/core/footer.php';
    }
}