<?php
/**
 * Created by PhpStorm.
 * User: Niclas
 * Date: 01-11-2018
 * Time: 22:28
 */

class game extends Controller
{
    public function index(){
        $this->view('game/index');
    }
}