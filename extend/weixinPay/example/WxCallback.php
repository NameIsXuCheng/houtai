<?php
/**
 * Created by PhpStorm.
 * User: 江桥
 * Date: 2017/11/29
 * Time: 16:18
 */
require_once EXTEND_PATH."weixinPay/lib/WxPay.Api.php";
require_once EXTEND_PATH.'weixinPay/lib/WxPay.Notify.php';
class PayNotifyCallBack extends WxPayNotify
{
    //查询订单
    public function Queryorder($out_trade_no)
    {
        $input = new WxPayOrderQuery();
        $input->SetOut_trade_no($out_trade_no);
        $result = WxPayApi::orderQuery($input);
        if(array_key_exists("return_code", $result)
            && array_key_exists("result_code", $result)
            && $result["return_code"] == "SUCCESS"
            && $result["result_code"] == "SUCCESS")
        {
            return true;
        }
        return false;
    }

    //重写回调处理函数
    public function NotifyProcess($data, &$msg)
    {
        $notfiyOutput = array();

        if(!array_key_exists("out_trade_no", $data)){
            $msg = "输入参数不正确";
            return false;
        }
        //查询订单，判断订单真实性
        if(!$this->Queryorder($data["out_trade_no"])){
            $msg = "订单查询失败";
            return false;
        }
        //成功之后执行的方法
        $Db=\think\Db::name("p_recharge_record");
        $Dbs=\think\Db::name("user_message");
        if($data['trade_state']=="SUCCESS"){
            $Db->where(["order_sn"=>$data['out_trade_no']])->update(['status'=>1]);
            if($user=$Db->where(['order_sn'=>$data['out_trade_no'],'status'=>1])->column("money","p_user_id")){
                if(!$Dbs->where(['id'=>key($user)])->setInc("account",$user[key($user)])){
                    \Think\log::log("order_sn为：".$data['out_trade_no']."充值的金额没有进入到用户的账户");
                }
            }
            return true;
        }elseif($data['trade_state']!="NOTPAY"){
            $Db->where(["order_sn"=>$data['out_trade_no']])->update(['status'=>2]);
            return true;
        }else{
            return false;
        }
        return true;
    }
}