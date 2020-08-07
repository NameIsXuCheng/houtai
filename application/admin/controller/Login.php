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

class Login extends Controller {
    public function login(){
        return view();
    }

    public function login_do(){
        $username=input("param.username");
        $password=input("param.password");
        $verify=input("param.verify");

        if($username=='' || $password==''){
            return json(['code'=>0,'data'=>'账户或者密码不能为空']);
        }
//        if(!captcha_check($verify)){
//            return json(['code'=>0,'data'=>'验证失败']);
//        }

        $UserMessage=Db::name('admin_user');
        $data=$UserMessage->field('role_id,password,salt,user_name,id,parent_id')
            ->where(['username|user_name'=>$username])->find();
        if(!$data){
            return json(['code'=>0,'data'=>'用户名或密码错误']);
        }
        if(md5($password.$data['salt'])==$data['password']){
            Session::set('username', $username);
            Session::set('user_name', $data['user_name']);
            Session::set('user_id',$data['parent_id']==0?$data['id']:$data['parent_id']);//标记为某个企业的账户

            Session::set('child_user_id', $data['id']);
            //权限获取过来
            Session::set("privilege",$this->privilege($data['role_id']));
            Session::set("role_id",$data['role_id']);
            return json(['code'=>1,'data'=>'登陆成功','url'=>$_SERVER['SERVER_NAME'].'/admin/index']);
        }
        return json(['code'=>0,'data'=>'用户名或者密码错误']);
    }

    public function privilege($role_id){
        $privilege_id = Db::name("role")->where(['id'=>$role_id])->value("privilege_id");
        $privilege=Db::name("authority")->where(['id'=>['in',$privilege_id],'parent_id'=>0,'is_show'=>1])
            ->order('sort asc')->select();
        $tmp=[];
        foreach($privilege as $k=>$v){
            //查看子级数据
            $privilege_child=Db::name("authority")
                ->where(['id'=>['in',$privilege_id],'parent_id'=>$v['id'],'is_show'=>1])
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
                        'is_selected'=>0,
                    ];
                }
            }else{
                continue;
            }
        }
        return $tmp;
    }
}