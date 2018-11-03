<?php


class admin extends Controller
{
    public function __construct()
    {
        if(!$this->isLoggedInAdmin()){
            $this->redirect('login/index');
        }
    }

    public function index(){
        $this->view('admin/index');
    }
}