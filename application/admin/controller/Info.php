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
use app\home\controller\Method;

class Info extends Basic {
    public function index(){
        return view();
    }

    public function article(){

        $articleModel=Db::name('article');

        $article_info = $articleModel->alias('a')
            ->field('a.*,c.country_name')
            ->join('__COUNTRY__ c','a.country = c.country_code','left')->order('created_at DESC')->select();
        $this->assign('article_info',$article_info);
        return view();
    }

    public function article_add(){

        if($this->request->isPost()){
            $param = $this->request->param();
            $articleModel=Db::name('article');

            $data = [
                'title'=>$param['title'],
                'type'=>$param['type'],
                'category'=>$param['category'],
                'country'=>$param['country'],
                'thumbnail'=>$param['thumbnail'],
                'content'=>$param['content'],
                'aging'=>$param['aging'],
                'is_show'=>$param['is_show'],
                'created_at'=>date('Y-m-d H:i:s')
            ];
            $ret = $articleModel->insert($data);
            if($ret===false){
                return alert_json(0,'添加失败！');
            }
            return alert_json(0,'添加成功！');
        }else{
            $countryModel = Db::name('country');
            $country = $countryModel ->select();
            $this->assign('country',$country);
            return view();
        }
    }

    public function article_edt(){
        $param = $this->request->param();
        $id = $param['id'];
        if(empty($id)){
            return alert_json(0,'文章不存在！');
        }
        $articleModel=Db::name('article');
        $countryModel = Db::name('country');

        if($this->request->isGet()){
            $map = ['id'=>$id];

            $info = $articleModel->where($map)->find();

            $country = $countryModel ->select();
            $this->assign('country',$country);
            $this->assign('article_info',$info);
            return view();
        }
        if($this->request->isPost()){
            $map = ['id'=>$id];
            $info = $articleModel->where($map)->find();
            if(empty($info)){
                return alert_json(0,'文章记录不存在！');
            }
            $data = [
                'title'=>$param['title'],
                'type'=>$param['type'],
                'category'=>$param['category'],
                'country'=>$param['country'],
                'aging'=>$param['aging'],
                'thumbnail'=>$param['thumbnail'],
                'content'=>$param['content'],
                'is_show'=>$param['is_show'],
                'updated_at'=>date('Y-m-d H:i:s')
            ];
            $ret = $articleModel->where($map)->update($data);
            if($ret===false){
                return alert_json(0,'修改失败！');
            }
            return alert_json(0,'修改成功！');
        }
    }

    //文章删除
    public function article_del(){

        if($this->request->isPost()) {
            $param = $this->request->param();
            $id = $param['id'];
            if(empty($id)){
                return alert_json(0,'文章不存在！');
            }
            $articleModel=Db::name('article');
            $map = ['id' => $id];
            $ret = $articleModel->where($map)->delete();
            if($ret === false){
                return alert_json(0,'删除失败！');
            }
            return alert_json(0,'删除成功！');

        }

    }

    //图片上传
    public function pic_upload()
    {
        try {
            //code...
            $file = request()->file('file');
            // 移动到框架应用根目录/public/uploads/ 目录下
            $info = $file->validate(['ext'=>'jpg,png,jpeg,bmp','size'=>2048000])->move(ROOT_PATH . 'public/uploads/article');
            $returninfo = array();  //定义一个返回的数组
            if($info){
                $returninfo['code']= 1;
                $getSaveName=str_replace("\\","/",$info->getSaveName());
                $returninfo['savename'] = "/uploads/article/".$getSaveName;
                $fileinfo = $info->getInfo();
                $returninfo['filename'] = $fileinfo['name'];
            }else{
                // 上传失败获取错误信息
                $returninfo['code']= 0;
                $returninfo['err'] = $file->getError();
            }
            return $returninfo;
        } catch (\Throwable $e) {
            //throw $th;
            return ['code'=>0,'error'=>$e->getMessage()];
        }
    }

    public function message(){

        $messageModel=Db::name('message');

        $message_info = $messageModel->alias('m')
            //->field('a.*,c.country_name')
            //->join('__COUNTRY__ c','a.country = c.country_code','left')
           ->order('id desc')->select();
        $this->assign('message_info',$message_info);
        return view();
    }

    public function message_repush(){

        if($this->request->isPost()) {
            $param = $this->request->param();
            $id = $param['id'];
            if(empty($id)){
                return alert_json(0,'留言不存在！');
            }
            $messageModel=Db::name('message');
            $map = ['id' => $id];
            $message = $messageModel->where($map)->find();
            if(empty($message)){
                return alert_json(0,'留言不存在！');
            }

            //邮件发送
            $method = new Method();
            $ret = $method->push_message($message);
            if(!$ret['code']){
                return alert_json(0,'重推失败：推送失败！');
            }
            $data = [
                'is_send'=>1,
                'updated_at'=>date('Y-m-d H:i:s')
            ];
            $ret = $messageModel->where($map)->update($data);
            if($ret === false ){
                return alert_json(0,'重推失败：更新失败！');
            }
            return alert_json(1,'重推成功！');

            }

    }


    public function menu(){
        return view();
    }
}