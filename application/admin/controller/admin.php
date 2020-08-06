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
        //获取对应的的地址
        return view();
    }
}