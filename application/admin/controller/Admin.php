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

class Admin extends Basic {
    public function index(){
        return view();
    }

    public function role_admin(){
        return view();
    }

    public function role_purchasing(){
        return view();
    }

    public function menu(){
        $authorityModel = Db::name('authority');

        $privilege=$authorityModel->where(['parent_id'=>0])
            ->order('sort asc')->select();
        $tmp = [];
        foreach ($privilege as $k=>$v){
            //查询子级
            $privilege_child=Db::name("authority")
                ->where(['parent_id'=>$v['id']])
                ->order('sort asc')->select();
            if(!empty($privilege_child)){
                $tmp[$v['model']][$v['controller']]['name'] = $v['name'];
                $tmp[$v['model']][$v['controller']]['sort'] = $v['sort'];
                $tmp[$v['model']][$v['controller']]['icon'] = $v['icon'];
                $tmp[$v['model']][$v['controller']]['is_show'] = $v['is_show'];
                $tmp[$v['model']][$v['controller']]['id'] = $v['id'];
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
                        'icon'=> $value['icon']
                    ];
                }
            }else{
                continue;
            }
        }
//        print_t_new($tmp);
        $this->assign('menu',$tmp);
        return view();
    }
}