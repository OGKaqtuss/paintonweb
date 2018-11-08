<?php


class login extends Controller
{
    public function index(){

        $data = [];

        $data['noheader'] = 'true';
        $this->view('login/index', $data);
    }
}