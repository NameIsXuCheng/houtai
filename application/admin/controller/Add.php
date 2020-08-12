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

class Add extends Controller {
    protected $beforeActionList = [
        'get_user'=>['except'=>'']
    ];

    protected function get_user(){
        $user_id = Session::get('user_id');
        if(empty($user_id)){
            $this->redirect('/admin/login');
        }
    }

    public function menu(Request $request){
        $param = $request->param();
        $id = $param['id'];
        if(empty($id)){
            return json(['code'=>0,'data'=> '操作有误']);
        }

        return json(['code'=>1,'data'=> $id]);
    }
}