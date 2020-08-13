<?php
/**
 * Created by PhpStorm.
 * User: matao
 * Date: 2020/8/5
 * Time: 17:41
 */

namespace app\home\controller;

use think\Controller;
use think\Db;
use think\Session;
use app\home\controller\Mail;

class Method extends Controller {


    public function index(){
        return false;
    }

    //提交留言
    public function get_message(){

        if($this->request->isAjax()){
            $param = $this->request->param();

            $name = trim($param['name']);
            $email = trim($param['email']);
            $tel = trim($param['tel']);
            $fax = trim($param['fax']);
            $content = trim($param['content']);

            $messageModel = Db::name('message');
            $data = [
                'name'=>$name,
                'email'=>$email,
                'tel'=>$tel,
                'fax'=>$fax,
                'content'=>$content,
                'created_at'=>date('Y-m-d H:i:s'),
                'ip'=>$this->request->ip(),
                'is_send'=>1,
            ];

            $ret = $this->push_message($param);
            if(!$ret['code']){
                $data['is_send'] = 2;
            }

            $messageModel->insert($data);
            return alert_json(1,'留言成功，请等待客服回复！');
        }else{
            return alert_json(0,'非法请求！');
        }
    }
    public function push_message($data){
        $name = trim($data['name']);
        $email = trim($data['email']);
        $tel = trim($data['tel']);
        $fax = trim($data['fax']);
        $content = trim($data['content']);

        $send_content = '客户信息：<br>姓名：'
            .$name."<br> 邮箱："
            .$email.'<br>手机：'
            .$tel.'<br>传真：'
            .(empty($fax)?'无':$fax).'<br>内容：'
            .$content;


        $send_data = [
            'title'=>$data['email'].'留言',
            'user'=>$data['name'],//姓名
            'email'=>$data['email'],
            'content'=>$send_content,
        ];

        //邮件发送
        $mail = new Mail();
        $ret = $mail->send($send_data);
        return $ret;

    }

    //欧美专线,type=3
    public function exit_two_xq(){
        $type = 3;
        if($this->request->isGet()){
            $param = $this->request->param();
            $id = $param['id'];
            if(empty($id)){
                return alert_json(0,'文章不存在！');
            }
            $articleModel=Db::name('article');
            $article = $articleModel->where(['id'=>$id])->find();
            if(empty($article)){
                return alert_json(0,'文章不存在！');
            }
            $article_info = $this->get_article_category($type);
            $this->assign('now_id',$id);
            $this->assign('article',$article);
            $this->assign('article_info',$article_info[$type]);
        }
        return view();
    }

    /*
     * 获取文章单个类目下的所有文章基本信息，默认全部
     * return $info[category][]
    */
    private function get_article_category($category_id=''){
        $map = [
            'a.type'=>1,//产品文章
            'a.is_show'=>1,
        ];
        $flag = true;
        if(!empty($category_id)){
            $flag = false;
            $map['a.category'] = $category_id;
        }
        $articleModel = Db::name('article');
        $article = $articleModel->alias('a')
            ->field('a.id,a.category,a.title,c.country_name')
            ->join('__COUNTRY__ c','a.country = c.country_code','left')
            ->where($map)
            ->order('.a.id desc')->select();

        $info = [];
        foreach ($article as $k=>$v){
            if($flag){
                $info[$v['category']][] = $v;
            }else{
                if($v['category'] == $category_id){
                    $info[$category_id][] = $v;
                }
            }
        }

        return $info;
    }



}