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
}