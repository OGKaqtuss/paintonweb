<?php
/**
 * Created by PhpStorm.
 * User: Niclas
 * Date: 01-11-2018
 * Time: 21:50
 */

class home extends Controller
{
    public function index($param1, $param2) {
        $user = $this->model('User');
        $user->name = $param1;

        $this->view('home/index', $this->getData());
    }

    public function getData(){
        $dummyData = (object) [];

        $dummyData->name = "Test";

        $dummyData->desc = "Hello there";

        return $dummyData;
    }
}