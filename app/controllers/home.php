<?php

class home extends Controller
{

    public function index($param1, $param2) {
        $this->view('home/index');

    }

    public function create(){
        User::create([
            'username' => 'test',
            'email' => 'email'
        ]);
    }
}