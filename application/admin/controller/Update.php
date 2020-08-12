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
    //更新菜单数据
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

    public function menu_do(Request $request){
        $param = $request->param();

        $authority = Db::name('authority');

        //获取父级数据
        $father = $authority->where(['id'=>$param['controller']])->find();

        $update = [
            'controller'=>$father['controller'],
            'parent_id'=>$param['controller'],
            'action'=>$param['action'],
            'icon'=>$param['icon'],
            'is_show'=>$param['is_show'],
            'name'=>$param['name'],
            'sort'=>$param['sort'],
        ];
        $up_back = $authority->where(['id'=>$param['id']])->setField($update);
        if($up_back!==false){
            return ['code'=>1,'data'=>'更新成功'];
        }else{
            return ['code'=>0,'data'=>'更新失败'];
        }
    }
}