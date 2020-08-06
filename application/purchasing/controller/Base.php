<?php
/**
 * Created by PhpStorm.
 * User: matao
 * Date: 2020/8/5
 * Time: 17:39
 */
namespace app\purchasing\controller;

use think\Controller;
use think\Db;
use think\Request;
use think\Session;

class Base extends Controller {
    private $model = 'purchasing';
    //判断是否有权限
    public function _initialize(){
        parent::_initialize();
        /////判断是否登录
        $this->is_login();
        //判断是否具有权限  默认有一些是不需要权限的   其他需要权限
        $this->privilege_listen();
        $privilege = Session::get("privilege");
        $action = Request::instance()->action();
        $controller = Request::instance()->controller();
        $privilege[$this->model][$controller]['open'] = 1;
        $privilege[$this->model][$controller]['child'][$action]['is_selected'] = 1;
//        print_t_new($privilege);
        $this->assign('pri',$privilege[$this->model]);

        //判断logo
        $logo = Session::get("logo");
        $this->assign('logo',$logo);
    }

    public function is_login(){
        if(Session::get('user_id')==''){
            $param = Request::instance()->param();
            $this->redirect('login/login',$param);
            exit;
        }
    }

    private function privilege_listen(){
        $privilege=Session::get("privilege");
        if(!isset($privilege[$this->model][Request::instance()->controller()])){
            header("Content-type:text/html;charset=utf-8");
            if(Request::instance()->isAjax()){
                echo json_encode(['code'=>0,'data'=>lang('msg_has_no_privilege')]);
                exit;
            }else{
                $this->redirect('Login/login');
                exit;
            }
        }else{
            $action = Request::instance()->action();
            $action_arr = array_column($privilege[$this->model][Request::instance()->controller()]['child'],'action');
            if(!in_array($action,$action_arr)){
                if(Request::instance()->isAjax()){
                    echo json_encode(['code'=>0,'data'=>lang('msg_has_no_privilege')]);
                }else{
                    $this->redirect('Login/login');
                    exit;
                }
            }
        }
    }
}