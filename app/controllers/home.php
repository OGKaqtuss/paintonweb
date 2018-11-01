<?php

class home extends Controller
{

    public function index() {
        $data = [];

        $data['title'] = 'Home';

        $this->view('home/index', $data);
    }

    public function create(){
        /*User::create([
            'username' => 'test',
            'email' => 'email'
        ]);*/
    }
}