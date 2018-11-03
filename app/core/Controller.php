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
        $isFrontend = str_contains(debug_backtrace()[0]['file'], 'frontend');

        $pathAddon = $isFrontend ? 'frontend' : 'adminhtml';

        require_once '../app/models/' . $pathAddon . '/' . $model . '.php';
        return new $model();
    }

    public function view($view, $data = [])
    {

        $isFrontend = str_contains(debug_backtrace()[0]['file'], 'frontend');

        $pathAddon = $isFrontend ? 'frontend' : 'adminhtml';

        if(!isset($data['title'])) $data['title'] = 'PaintToWeb';

        $dirPath = '../public/'.$pathAddon.'/css';

        $data['cssfiles'] = [];

        try {
            $dir = new DirectoryIterator($dirPath);

            foreach ($dir as $fileInfo) {
                if (in_array($fileInfo->getFilename(), self::IGNORE_FILES)) continue;

                $data['cssfiles'][] = $fileInfo->getFilename();
            }

        } catch(\Exception $e){

        }

        $data['libfiles'] = [];

        try {
            $dir = new DirectoryIterator('../public/lib/css');

            foreach ($dir as $fileInfo) {
                if (in_array($fileInfo->getFilename(), self::IGNORE_FILES)) continue;

                $data['libfiles'][] = $fileInfo->getFilename();
            }
        } catch(\Exception $e) {

        }

        $data['mainfiles'] = [];

        try {
            $dir = new DirectoryIterator('../public/main/');

            foreach ($dir as $dirs) {
                if (in_array($dirs->getFilename(), self::IGNORE_FILES)) continue;

                $dirInner = new DirectoryIterator($dirs->getPathname());

                foreach($dirInner as $fileInfo) {
                    if (in_array($dirs->getFilename(), self::IGNORE_FILES)) continue;
                    $data['mainfiles'][] = $fileInfo->getFilename();
                }
            }
        } catch(\Exception $e) {

        }

        $data['pathaddon'] = $pathAddon;

        $data = (object) $data;

        require_once '../app/views/'.$pathAddon.'/core/header.php';
        require_once '../app/views/' . $pathAddon . '/' . $view . '.php';
        require_once '../app/views/'.$pathAddon.'/core/footer.php';
    }
}