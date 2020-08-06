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

class Basic extends Controller {
    public function getAuthority(){
        //获取对应的的地址
        $info = Db::name('authority')->where(['model'=>'admin'])->order('sort asc')->select();

//        foreach (){
//
//        }
        return $info;
    }
}