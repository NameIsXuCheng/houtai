<?php
/**
 * Created by PhpStorm.
 * User: matao
 * Date: 2020/8/5
 * Time: 17:41
 */

namespace app\purchasing\controller;

use think\Db;
use think\Session;

class Index extends Base{
    public function index(){
        return view();
    }
}