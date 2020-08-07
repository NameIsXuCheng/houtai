<?php
/**
 * Created by PhpStorm.
 * User: matao
 * Date: 2020/7/27
 * Time: 17:27
 */
namespace app\admin\controller;
use think\Controller;
use think\Request;

class Admin extends Basic {
    public function index(){
        print_t_new(1111);
        return view();
    }
}