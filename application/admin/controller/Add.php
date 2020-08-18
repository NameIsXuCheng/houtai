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
    public function menu(Request $request){
        $user_id = Session::get('user_id');
        if(empty($user_id)){
            $this->redirect('/admin/login');
        }

        //获取基本数据
        $authority = Db::name('authority');
        $model_arr = $authority->group('model')->column('model','id');
        //获取对应的控制器
        foreach ($model_arr as $k=>$value){
            $model[$k]['model'] = $value;
            $model[$k]['controller']=$authority->where(['model'=>$value])->group('controller')->select();
        }
//        print_t_new($model);
        $this->assign('model',$model);
        return view();
    }

    public function menu_do(Request $request){
        $user_id = Session::get('user_id');
        if(empty($user_id)){
            $this->redirect('/admin/login');
        }

        $param = $request->param();

        //根据控制器  判断
        $model_controller =  $param['model'];
        $arr = explode('-',$model_controller);
        $model = $arr[0];
        Db::startTrans();
        $authority = Db::name('authority');

        if(empty($param['action'])){
            return json(['code'=>0,'data'=>'方法名必须填写！']);
        }

        if(empty($param['name'])){
            return json(['code'=>0,'data'=>'菜单名称必须填写！']);
        }

        if($arr[1] == '0'){
            if(empty($param['controller'])){
                return json(['code'=>0,'data'=>'控制器名称必须填写！']);
            }
            $controller = ucfirst($param['controller']);

            //判断有没有
            if($authority->where(['model'=>$model,'controller'=>$controller,'parent_id'=>0])->count()>0){
                return json(['code'=>0,'data'=>'控制器已经存在！']);
            }

            if($authority->where(['model'=>$model,'controller'=>$controller,'action'=>$param['action']])->count()>0){
                return json(['code'=>0,'data'=>'方法名已经存在！']);
            }

            //添加父级元素
            $authority->insert([
                'model'=>$model,
                'controller'=>$controller,
                'action'=>$param['action'],
                'name'=>$param['name'],
                'sort'=>$param['action'],
                'parent_id'=>0,
                'is_show'=>$param['is_show'],
                'icon'=>$param['icon'],
            ]);

            $parent_id = $authority->getLastInsID();
        }else{
            $controller = $arr[1];
            if($authority->where(['model'=>$model,'controller'=>$controller,'action'=>$param['action']])->count()>0){
                return json(['code'=>0,'data'=>'方法名已经存在！']);
            }

            $parent_id = $authority->where(['model'=>$model,'controller'=>$controller])->value('id');
        }

        //将对应的数据添加进去
        $back = $authority->insert([
            'model'=>$model,
            'controller'=>$controller,
            'action'=>$param['action'],
            'name'=>$param['name'],
            'sort'=>$param['action'],
            'parent_id'=>$parent_id,
            'is_show'=>$param['is_show'],
            'icon'=>$param['icon'],
        ]);

        if($back){
            Db::commit();
            return json(['code'=>1,'data'=>'保存成功']);
        }else{
            Db::rollback();
            return json(['code'=>0,'data'=>'保存失败']);
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
        $role_id = Session::get('role_id');
        $role = Db::name('role');

        //获取父级权限
        $role_info = $role->where(['id'=>$role_id])->find();
        if($role_info['p_user_id']==0){
            $authority_info = $authority->where(['model'=>$type])->order('sort asc')->select();
        }else{
            $authority_id = $role_info['privilege_id'];
            $authority_info = $authority->where(['id'=>['in',explode(',',$authority_id)]])->order('sort asc')->select();
        }

        $list = [];
        $selected = 0;
        foreach ($authority_info as $k=>$value){
            if($value['parent_id'] == 0){
                $list[$value['id']] = [
                    'name'=>$value['name'],
                    'id'=>$value['id'],
                    'is_selected'=>$selected
                ];
            }else{
                //将权限归属到最高父级
                $get_root_parent = $this->getRootParent($value['parent_id']);
                $list[$get_root_parent]['child'][] = [
                    'name'=>$value['name'],
                    'id'=>$value['id'],
                    'is_selected'=>$selected
                ];
            }
        }
//        print_t_new($list);
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
        $info = $role->insert([
            'model'=>trim($param['model']),
            'role_name'=>trim($param['role_name']),
            'privilege_id'=>implode(',',$privilege_id_arr),
            'p_user_id'=>$user_id,
            'created_at'=>date('Y-m-d H:i:s',time()),
        ]);
        if($info){
            return json(['code'=>1,'data'=>'添加成功']);
        }else{
            return json(['code'=>0,'data'=>'添加失败']);
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

    public function admin_user(){
        $user_id = Session::get('user_id');
        if(empty($user_id)){
            $this->redirect('/admin/login');
        }

        if($user_id == 136){
            $where['p_user_id'] = ['in',[0,136]];
        }else{
            $where['p_user_id'] = $user_id;
        }
        $where['model'] = 'admin';
        //获取权限表
        $role_info = Db::name('role')->where($where)->select();
        $this->assign('role_info',$role_info);
        return view();
    }

    public function admin_user_do(Request $request){
        $param = $request->param();
        $admin_user = Db::name('admin_user');

        if($admin_user->where(['user_name'=>$param['username']])->count()>0){
            return json(['code'=>0,'data'=>'账号已经存在！']);
        }

        if($admin_user->where(['phone'=>$param['phone']])->count()>0){
            return json(['code'=>0,'data'=>'手机号已经绑定账号！']);
        }

        $salt = time();
        $back = $admin_user->insert([
            'user_name'=>$param['username'],
            'username'=>$param['phone'],
            'salt'=>$salt,
            'password'=>md5($param['password'].$salt),
            'sex'=>$param['sex'],
            'email'=>$param['email'],
            'phone'=>$param['phone'],
            'id_card'=>$param['id_card'],
            'role_id'=>$param['role'],
            'created_at'=>date('Y-m-d H:i:s',time()),
        ]);

        if(!$back){
            return json(['code'=>0,'data'=>'添加失败']);
        }
        return json(['code'=>1,'data'=>'添加成功']);
    }
}