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

class Test extends Controller {


    public function index(){

        $article_info = $this->get_article_category(0,0,6);
        $this->assign('article_info',$article_info);
        return view();
    }
    public function express(){
        return view();
    }
    public function bonded(){
        return view();
    }
    public function channel(){
        return view();
    }
    public function channel_xq(){
        return view();
    }
    public function cloud(){
        return view();
    }
    public function email(){
        return view('e-mail');
    }
    public function ems(){
        return view();
    }
    public function exitC(){

        //产品文章数据
        $info = $this->get_article_category();

        $this->assign('article',$info);
        return view('exit');
    }
    //欧美特快专线,type=2
    public function exit_xq(){
        $type = 2;
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
     * 获取文章单个类目下的所有文章基本信息，默认全部 -- 仅限产品
     * return $info[category][]
    */
    private function get_article_category($category_id='',$is_class='1',$number='all'){
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
            ->field('a.id,a.category,a.title,a.thumbnail,a.aging,c.country_name,a.index_pic')
            ->join('__COUNTRY__ c','a.country = c.country_code','left')
            ->where($map)->limit(($number=='all')?false:$number)
            ->order('a.order_all desc,a.order desc,a.id desc')->select();

        $info = $article;
        //如果分类需要
        if($is_class){
            $info = ['1'=>[],'2'=>[],'3'=>[]];
            foreach ($article as $k=>$v){
                if($flag){
                    $info[$v['category']][] = $v;
                }else{
                    if($v['category'] == $category_id){
                        $info[$category_id][] = $v;
                    }
                }
            }
        }

        return $info;
    }

    //欧美特快专线 type=2
    public function exit_one(){
        $type = 2;
        $article_info = $this->get_article_category($type);
        $this->assign('article_info',$article_info[$type]);

        return view();
    }
    //欧美专线 type=3
    public function exit_two(){
        $type = 3;
        $article_info = $this->get_article_category($type);
        $this->assign('article_info',$article_info[$type]);

        return view();
    }
    //欧美小包专线 type=3
    public function exit_three(){
        $type = 1;
        $article_info = $this->get_article_category($type);
        $this->assign('article_info',$article_info[$type]);

        return view();
    }


    public function contact(){
        return view();
    }
    public function login(){
        return view();
    }
    public function mail(){
        return view();
    }
    public function news_xq(){
        return view();
    }
    public function news_xq_2(){
        return view();
    }
    public function newslist(){
        return view();
    }
    public function newslist_2(){
        return view();
    }
    public function pfcexpress(){
        return view();
    }
    public function pfcexpress_xq(){
        return view();
    }
    public function price(){
        return view();
    }
	public function getWxCountry(){
		$url="http://wmsp.t-cang.com/openapi/WxApi/getWxCountry";
		$time=time();
		$param=[
			"time"=>$time,
			"sign"=>md5("HZTZWEIXIN".$time),
			"country_name"=>"",
		];

		$param=json_encode($param);
		$data=$this->data_curl($url,$param);
		// $data=json_decode($data,true);
		// $data=echo$data["data"];
		dump($data);
		
	}
	public function data_curl($url,$post_data){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
		$output = curl_exec($ch);
		curl_close($ch);
		return $output;
	}
    public function price_pingbi(){
        return view('price-pingbi');
    }
    public function pricequery(){
        $param = [
            'TargetCountry'=>"''",
            'TargetAddress'=>'',
            'chang'=>'',
            'kuan'=>'',
            'gao'=>'',
            'weight'=>'',
            'post_code'=>'',
        ];
        if($this->request->isPost()){
            $param = $this->request->param();
            $param['TargetCountry'] = "'".$param['TargetCountry']."'";

        }
        $this->assign('param',$param);
        return view();
    }
    public function query(){
        return view();
    }
    public function query_bak(){
        return view();
    }
    public function register(){
        return view();
    }
    public function select(){
        return view();
    }
    public function service(){
        return view();
    }
    public function special_xq(){
        return view();
    }
    public function e_special_xq(){
        return view('e-special_xq');
    }
    public function track(){
        return view();
    }
	
	public function track2(){
        return view();
    }

}