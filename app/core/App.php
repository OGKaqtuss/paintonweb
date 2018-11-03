<?php
/**
 * Created by PhpStorm.
 * User: Niclas
 * Date: 01-11-2018
 * Time: 21:16
 */

class App extends Actions
{

    protected $adminController = 'login';

    protected $controller = 'home';

    protected $method = 'index';

    protected $params = [];

    public function __construct()
    {
        $url = $this->parseUrl();

        array_splice($url, 0, 1);

        if(str_contains($url[0], 'adminhtml')){
            unset($url[0]);
            if($this->isLoggedInAdmin()){
                if (file_exists('../app/controllers/adminhtml/' . $url[1] . '.php')) {
                    $this->adminController = $url[1];
                    unset($url[1]);
                }
            }

            require_once '../app/controllers/adminhtml/' . $this->adminController . '.php';

            $this->adminController = new $this->adminController;

            if (isset($url[2])) {
                if (method_exists($this->adminController, $url[2])) {
                    $this->method = $url[2];
                    unset($url[2]);
                }
            }

            $this->params = $url ? array_values($url) : [];

            call_user_func_array([$this->adminController, $this->method], $this->params);
        }
        else {
            if (file_exists('../app/controllers/frontend/' . $url[0] . '.php')) {
                $this->controller = $url[0];
                unset($url[0]);
            }

            require_once '../app/controllers/frontend/' . $this->controller . '.php';

            $this->controller = new $this->controller;

            if (isset($url[1])) {
                if (method_exists($this->controller, $url[1])) {
                    $this->method = $url[1];
                    unset($url[1]);
                }
            }

            $this->params = $url ? array_values($url) : [];

            call_user_func_array([$this->controller, $this->method], $this->params);

        }
    }

    protected function parseUrl(){
        if(isset($_GET['url'])) {
            return $url = explode('/', filter_var(rtrim($_GET['url'], '/'), FILTER_SANITIZE_URL));
        }
    }
}