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

class Update extends Controller {
    public function menu(Request $request){
        //判断是否登陆
        $user_id = Session::get('user_id');
        if(empty($user_id)){
            $this->redirect('/admin/login');
        }

        //开始处理参数
        $param = $request->param();
        $id = $param['id'];
        if(empty($id)){
            return '操作有误';
        }

        $authority_info = Db::name('authority')->where(['id'=>$id])->find();
        $this->assign('authority',$authority_info);

        //获取所有的控制器
        $arr = Db::name('authority')->where(['parent_id'=>0,'model'=>$authority_info['model']])->select();
        $this->assign('model',$arr);

        return view();
    }
}