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

class Index extends Basic {
    public function index(){
        //获取所有的权限
        $this->getAuthority();

        return view();
    }
}