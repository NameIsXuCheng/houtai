<?php
/**
 * Created by PhpStorm.
 * User: matao
 * Date: 2020/7/27
 * Time: 17:27
 */
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Request;

class Setting extends Basic {
    public function index(){

        return view();
    }

    public function role_admin(){
        return view();
    }

    public function role_purchasing(){
        return view();
    }


}