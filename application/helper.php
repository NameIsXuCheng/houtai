<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/10/11
 * Time: 16:32
 */
include APP_PATH.'lang/zh-cn.php';
function LANGS($name){
    if(isset($L[$name])){
        return $L[$name];
    }
    return '';
}