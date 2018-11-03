<?php
/**
 * Created by PhpStorm.
 * User: Niclas
 * Date: 02-11-2018
 * Time: 00:16
 */

class Actions extends AdminActions
{
    public function __construct()
    {

    }

    public function getBaseUrl()
    {
        return "http://localhost/";
    }

    public function getBaseUrlAdmin()
    {
        return "http://localhost/adminhtml/";
    }

    public function isLoggedIn()
    {
        return isset($_SESSION['user']);
    }

    public function setUser($userid)
    {
        $_SESSION['user'] = $userid;
    }

    public function getParam($paramName)
    {
        $get = isset($_GET[$paramName]);
        $post = isset($_POST[$paramName]);

        if($get) {
            return $_GET[$paramName];
        }
        else if($post){
            return $_POST[$paramName];
        }
        return null;
    }

    public function setMessage($type, $message)
    {
        setcookie('message',"$type|$message");
    }

    public function redirect($url)
    {
        $isFrontend = str_contains($_SERVER['REQUEST_URI'], 'adminhtml') ? 'adminhtml/' : '';
        header("Location: /$isFrontend$url");
        exit();
    }
}