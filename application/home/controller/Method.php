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

    /*
     * 查价格
     * */
    public function get_price(){

        if($this->request->isPost()){

            $url="http://wmsp.t-cang.com/index.php/openapi/WxApi/get_product";//正式地址

            $post = $this->request->param();
            //发送数据
            $tiem = time();
            $push_data = array(
                'time' => $tiem,
                'type' => 1,
                'weight' => $post['weight'],
                'country_from' => $post['c_country'],
                'country_to' => $post['m_country'],
                'long' => $post['length'],
                'height' => $post['height'],
                'with' => $post['width'],
                'sign' => md5('HZTZWEIXIN'.$tiem),
                'vol_weight' => 0,
                'size' => $post['length'] * $post['width'] * $post['height'],
//        'shipper_from' => [
//            'country' => $post['c_country'],
//            'state' => $post['c_state'],
//            'city' => $post['c_city'],
//            'area' => $post['c_area'],
//        ],
                'shipper_to' => [
                    'country' => $post['m_country'
                    ],
//            'state' => $post['m_state'],
//            'city' => $post['m_city'],
//            'area' => $post['m_area'],
                    'post_code' => $post['post_code'],
                    'address' => $post['m_address'],
                ],
//        'user_country' => 'CN',
//        'amount' => $post['amount'],
//        'sku' => $post['sku'],
            );
//    echo  json_encode($push_data);exit;
            $push_data = json_encode($push_data);

            $res=$this->send($url,$push_data);

            echo($res);
        } else{
                echo '非法提交';
        }
    }

    /*
     * 查物流信息
     * */
    public function get_track(){
        if($this->request->isAjax()){

            $post = $this->request->param();

            $app_key = 'GW2019S102T3M001';
            $app_secret = 'GW0512S027Q9K681';
            $timestamp = time();

            //$url = 'http://exporttest.mttlm.com/openapi/package/packageStatus';
            $url="http://wmsp.t-cang.com/index.php/OpenApi/Package/PackageStatus";//正式地址

            $data = [
                'appkey'=>$app_key,

                'timestamp'=>$timestamp,
                'param'=>[
                    'package_no'=>$post['package_no'],
    //        'test'=>'xc',
    //        'warehouse_code'=>''
                ]
            ];
            $new_str = $this->genVerify($data['param']);
            $sign = md5($app_secret.'appkey'.$app_key.'param'.$new_str.'timestamp'.$timestamp.$app_secret);

            $data['sign'] = $sign;

            $push_data = json_encode($data);

            $res=$this->send($url,$push_data);

            echo($res);
        }else{
            echo '非法提交';
        }
    }

    /*
     *  验证函数
     * */
    function genVerify($data) {
//    $new_data = allVerify($data);
        ksort($data);
        $items = array();
        foreach ($data as $key => $value) {
            if(is_array($value)){
                $items[] = genVerify($value);
            }else{
                $items[] = $key.$value;
            }
        }
        return join('',$items);
    }

    /*
     * curl提交
     * */
    function send($url,$data,$charset="utf-8"){
//        $header = array(
//            "Content-Type:application/x-www-form-urlencoded;charset=".$charset,
//            'User-Agent: Mozilla/4.0 (compatible; MSIE .0; Windows NT 6.1; Trident/4.0; SLCC2;)');
        $ch = curl_init();
        curl_setopt ($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt ($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
//        curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
        $result = curl_exec ($ch);
        curl_close($ch);

        if($result == NULL)
        {
            return 0;
        }

        return $result;
    }

}