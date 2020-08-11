<?php
/**
 * Created by PhpStorm.
 * User: matao
 * Date: 2020/8/5
 * Time: 17:41
 */

namespace app\purchasing\controller;

use think\Controller;
use think\Db;
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
        if(!captcha_check($verify)){
            return json(['code'=>0,'data'=>'验证失败']);
        }

        $UserMessage=Db::name('user_message');
        $data=$UserMessage->field('role_id,password,salt,user_name,id,parent_id,shipping_default,logo_img')
            ->where(['username|user_name'=>$username])->find();
        if(!$data){
            return json(['code'=>0,'data'=>'用户名账户或密码错误']);
        }
        if(md5($password.$data['salt'])==$data['password']){
            Session::set('username', $username);
            Session::set('user_name', $data['user_name']);
            Session::set('user_id',$data['parent_id']==0?$data['id']:$data['parent_id']);//标记为某个企业的账户

            //首页logo
            $logo = empty($data['logo_img'])?'__PUBLIC__/imgs/login/img/logo2.png':$data['logo_img'];
            Session::set('logo', $logo);

            Session::set('child_user_id', $data['id']);
            if($data['role_id'] == 12){
                Session::set('is_partner', 1);
            }else{
                Session::set('is_partner', 0);
            }

            //权限获取过来
//            Session::set("privilege",$this->privilege($data['id']));
            Session::set("privilege",$this->privilege($data['role_id']));
            Session::set("role_id",$data['role_id']);
            //是否是分销商
//            if(Db::name("p_distribution")->where(['distributior_username'=>$username])->value("id")){
//                Session::set("is_distributior",1);
//            }
            return json(['code'=>1,'data'=>'登陆成功','url'=>'/index.php/purchasing/index/index']);
        }
        return json(['code'=>0,'data'=>'用户名或者密码错误']);
    }

    public function privilege($role_id){
        $privilege_id=Db::name("role")->where(['id'=>$role_id])->value("privilege_id");
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