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
use think\Session;

class Basic extends Controller {
    private $model = 'admin';

    public function _initialize(){
        parent::_initialize();
        //判断是否登录
        $this->is_login();

        $role_id = Session::get("role_id");
        //权限获取过来
//        Session::set("privilege",$this->privilege($role_id));
        $privilege = $this->privilege($role_id);
        //判断是否具有权限  默认有一些是不需要权限的   其他需要权限
        $this->privilege_listen($privilege);
        $action = Request::instance()->action();
        $controller = Request::instance()->controller();
        $privilege[$this->model][$controller]['open'] = 1;
        $privilege[$this->model][$controller]['child'][$action]['is_selected'] = 1;
        $this->assign('pri',$privilege[$this->model]);
        //判断logo
        $logo = Session::get("logo");
        $this->assign('logo',$logo);
    }

    public function privilege($role_id){
        $privilege_id = Db::name("role")->where(['id'=>$role_id])->value("privilege_id");
        $privilege=Db::name("authority")->where(['id'=>['in',$privilege_id],'parent_id'=>0,'is_show'=>1])
            ->order('sort asc')->select();
        $tmp=[];
        foreach($privilege as $k=>$v){
            //查看子级数据
            $privilege_child=Db::name("authority")
                ->where(['id'=>['in',$privilege_id],'parent_id'=>$v['id']])
                ->order('sort asc')->select();
            if(!empty($privilege_child)){
                $tmp[$v['model']][$v['controller']]['name'] = $v['name'];
                $tmp[$v['model']][$v['controller']]['icon'] = $v['icon'];
                $tmp[$v['model']][$v['controller']]['open'] = 0;
                foreach ($privilege_child as $j=>$value){
                    $tmp[$v['model']][$v['controller']]['child'][$value['action']]=[
                        'model'=> $value['model'],
                        'controller'=> $value['controller'],
                        'action'=> $value['action'],
                        'url' => url("{$value['controller']}/{$value['action']}"),
                        'name'=> $value['name'],
                        'sort'=> $value['sort'],
                        'code'=> $value['code'],
                        'is_show'=> $value['is_show'],
                        'is_selected'=>0,
                    ];
                }
            }else{
                continue;
            }
        }
        return $tmp;
    }

    public function is_login(){
        if(Session::get('user_id')==''){
            $param = Request::instance()->param();
            $this->redirect('/admin/login',$param);
            exit;
        }
    }

    private function privilege_listen($privilege){
//        $privilege=Session::get("privilege");
        if(!isset($privilege[$this->model][Request::instance()->controller()])){
            //exit(json_encode($privilege[$this->model][Request::instance()->controller()]));
            header("Content-type:text/html;charset=utf-8");
            if(Request::instance()->isAjax()){
                echo json_encode(['code'=>0,'data'=>'没有权限']);
                exit;
            }else{
                $this->redirect('/admin/login');
                exit;
            }
        }else{
            $action = Request::instance()->action();
            $action_arr = array_column($privilege[$this->model][Request::instance()->controller()]['child'],'action');
            if(!in_array($action,$action_arr)){
                if(Request::instance()->isAjax()){
                    echo json_encode(['code'=>0,'data'=>lang('msg_has_no_privilege')]);
                    exit;
                }else{
                    $this->redirect('/admin/login');
                    exit;
                }
            }
        }
    }

}