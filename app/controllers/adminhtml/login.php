<?php
/**
 * Created by PhpStorm.
 * User: niclas
 * Date: 11/3/18
 * Time: 11:08 AM
 */

class login extends Controller
{
    public function __construct()
    {
        if($this->isLoggedInAdmin()){
            $this->redirect('admin/index');
        }
    }

    public function index(){
        $this->view('login/index');
    }

    public function login(){
        $username = $this->getParam('username');
        $password = $this->getParam('password');

        if(!$username || !$password) {
            $this->setMessage('error', 'Username and/or password was not set');
            $this->index();
        }

        $password = hash('sha256', $password);

        $user = AdminUser::whereRaw("username = '$username' and password='$password'")->first();

        if($user->count()){
            $this->setUserAdmin($user->userid);
            $this->redirect('admin/index');
        }
    }
}