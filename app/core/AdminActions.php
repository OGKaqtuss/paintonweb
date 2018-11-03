<?php


class AdminActions
{

    public function setUserAdmin($userid){
        $_SESSION['admin_user'] = $userid;
    }

    public function isLoggedInAdmin(){
        return isset($_SESSION['admin_user']);
    }

}