<?php
/**
 * Created by PhpStorm.
 * User: Niclas
 * Date: 01-11-2018
 * Time: 21:17
 */

class Controller
{
    public function model($model)
    {
        require_once '../app/models/' . $model . '.php';
        return new $model();
    }

    public function view($view, $data = [])
    {
        require_once '../app/views/' . $view . '.php';
    }
}