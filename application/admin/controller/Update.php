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

    public function role(Request $request){
        $user_id = Session::get('user_id');
        if(empty($user_id)){
            $this->redirect('/admin/login');
        }

        $type = $request->param('type');
        $this->assign('type',$type);

        //获取全部的权限
        $authority = Db::name('authority');
        $role_id = $request->param('id');
        $role = Db::name('role');

        //获取父级权限
        $role_info = $role->where(['id'=>$role_id])->find();
        $this->assign('role_info',$role_info);
        if($role_info['p_user_id']==0){
            $authority_info = $authority->where(['model'=>$type])->order('sort asc')->select();
        }else{
            //获取父级数据
            $id = Db::name('admin_user')->where(['id'=>$role_info['p_user_id']])->value('role_id');
            $authority_id = $role->where(['id'=>$id])->value('privilege_id');
            $authority_info = $authority->where(['id'=>['in',explode(',',$authority_id)]])->order('sort asc')->select();
        }
        $selected_role_id = explode(',',$role_info['privilege_id']);

        $list = [];
        foreach ($authority_info as $k=>$value){

            if($value['parent_id'] == 0){
                if(in_array($value['id'],$selected_role_id)){
                    $selected = 1;
                }else{
                    $selected = 0;
                }
                $list[$value['id']] = [
                    'name'=>$value['name'],
                    'id'=>$value['id'],
                    'is_selected'=>$selected
                ];
            }else{
                //将权限归属到最高父级
                $get_root_parent = $this->getRootParent($value['parent_id']);
                if(in_array($value['id'],$selected_role_id)){
                    $selected = 1;
                }else{
                    $selected = 0;
                }
                $list[$get_root_parent]['child'][] = [
                    'name'=>$value['name'],
                    'id'=>$value['id'],
                    'is_selected'=>$selected
                ];
            }
        }
        $this->assign('list',$list);
        return view();
    }

    public function role_do(Request $request){
        $user_id = Session::get('user_id');
        if(empty($user_id)){
            $this->redirect('/admin/login');
        }

        $param = $request->param();

        $privilege_id_arr = $param['action_ids'];
        if(empty($privilege_id_arr)){
            return json(['code'=>0,'data'=>'请选择权限！']);
        }

        $role = Db::name('role');
        $info = $role->where(['id'=>$param['id']])->setField([
            'model'=>trim($param['model']),
            'role_name'=>trim($param['role_name']),
            'privilege_id'=>implode(',',$privilege_id_arr),
            'p_user_id'=>$user_id,
        ]);
        if($info){
            return json(['code'=>1,'data'=>'修改成功']);
        }else{
            return json(['code'=>0,'data'=>'修改失败']);
        }

    }
    public function getRootParent($parent_id){
        $authority = Db::name('authority');
        $info = $authority->where(['id'=>$parent_id])->find();
        if($info['parent_id'] == 0){
            return $info['id'];
        }else{
            return $this->getRootParent($info['parent_id']);
        }
    }
}