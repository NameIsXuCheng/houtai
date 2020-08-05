<?php
/**
 * Created by PhpStorm.
 * User: matao
 * Date: 2020/7/27
 * Time: 17:27
 */
namespace app\admin\controller;
use think\Controller;
use think\Request;

class Index extends Controller {
    public function index(){
        return view();
    }

    public function check(){
        header("Content-Type:text/html;charset='utf-8'");
        $param = $_POST;
        saveLog('system_pay_get_param_back',$param);
        return json(['code'=>1,'msg'=>'success']);
    }

    public function index_test(Request $request){
        $data = $request->param();
        if($data['type'] == 'sign'){
            foreach ($data as $k=>$value){
                if(in_array($k,['vads_site_id','key','vads_ctx_mode','vads_trans_id','vads_trans_date','vads_amount',
                    'vads_currency','vads_payment_config'])){
                    if(empty($value)){
                        echo json_encode(['code'=>0,'sign'=>"缺少【{$k}】的值"]);
                        exit();
                    }
                }
            }
            $config = array(
                'key'=> $data['key'],
            );
            $request = new SystemPay($config);
            $sign = $request->getSignature_sha256($data);
            if($sign){
                echo json_encode(['code'=>1,'sign'=>$sign]);
                exit();
            }else{
                echo json_encode(['code'=>0,'sign'=>'生成sign失败']);
                exit();
            }
        }else if($data['type'] == 'time'){
            $time = date('YmdHis',time());
            echo json_encode(['code'=>1,'sign'=>$time]);
            exit();
        }else{
            echo json_encode(['code'=>0,'sign'=>'生成日期失败']);
            exit();
        }

    }
}