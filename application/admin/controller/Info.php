<?php
/**
 * Created by PhpStorm.
 * User: 富春
 * Date: 2020/08/11
 * Time: 13:27
 */
namespace app\admin\controller;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;

class Info extends Basic {
    public function index(){
        return view();
    }

    public function article(){

        $articleModel=Db::name('article');

        $article_info = $articleModel->select();

        $this->assign('article_info',$article_info);
        return view();
    }

    public function article_edt(){
        if($this->request->isGet()){
            $param = $this->request->param();
            $id = $param['id'];
            if(empty($id)){
                return alert_json(0,'文章不存在！');
            }
            $map = ['id'=>$id];
            $articleModel=Db::name('article');
            $info = $articleModel->where($map)->find();

            exit(json_encode($info));
            $this->assign('article_info',$info);
        }

        return view();
    }

    public function message(){
        return view();
    }

    public function role_admin(){
        return view();
    }

    public function role_purchasing(){
        return view();
    }

    public function menu(){
        return view();
    }
}