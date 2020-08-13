<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件
function L($name)
{
//    if (cookie('lang') == '') {
    if (cookie('think_var') == '') {
        include(APP_PATH . 'lang/zh-cn.php');
    } else {
        try {
//            include(APP_PATH . 'lang\\' . cookie('lang') . '.php');
            include(APP_PATH . 'lang/' . cookie('think_var') . '.php');
        } catch (Exception $e) {
            include(APP_PATH . 'lang\zh-cn.php');
        }
    }
    if (isset($L[$name])) {
        return $L[$name];
    }
    return $name;
}

function T($name){
    return substr($name,0,10);
}

function getEmailConfigInfo()
{
    $email_config = \think\Db::name("data_config") -> where(['name' => ['in',['smtp_protocal','smtp_servrer', 'smtp_port', 'smtp_username', 'smtp_password']]]) -> column('value',"name");
//    $email_config[] = \think\Db::name("data_config") -> where(['name' => 'smtp_servrer']) -> value('value');
//    $email_config[] = \think\Db::name("data_config") -> where(['name' => 'smtp_port']) -> value('value');
//    $email_config[] = \think\Db::name("data_config") -> where(['name' => 'smtp_username']) -> value('value');
//    $email_config[] = \think\Db::name("data_config") -> where(['name' => 'smtp_password']) -> value('value');
    return $email_config;
}

function send_mail($tomail, $name, $subject = '', $body = '', $attachment = null)
{
    $config=getEmailConfigInfo();
//    list($smtp_protocal, $smtp_servrer, $smtp_port, $smtp_username, $smtp_password) = getEmailConfigInfo();
    $mail = new \PHPMailer\PHPMailer\PHPMailer();
    $mail->Host = $config['smtp_servrer']; //getEmailConfigServer();  // Specify main and backup SMTP servers
    if ($config['smtp_protocal']) {
        $mail->SMTPSecure = $config['smtp_protocal']; //'ssl';          // 使用安全协议
    }
    $mail->CharSet = 'UTF-8';           //设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置，否则乱码
    $mail->IsSMTP();                    // 设定使用SMTP服务
    $mail->SMTPDebug = 0;               // SMTP调试功能 0=关闭 1 = 错误和消息 2 = 消息
    $mail->SMTPAuth = true;             // 启用 SMTP 验证功能
//    if(!getEmailConfigProtocal()){
//        $mail->SMTPSecure = getEmailConfigProtocal(); //'ssl';          // 使用安全协议
//    }
    if (is_array($attachment)) { // 添加附件
        foreach ($attachment as $file) {
            is_file($file) && $mail->AddAttachment($file);
        }
    }
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = $config['smtp_username'];                 // SMTP username
    $mail->Password = $config['smtp_password'];                           // SMTP password
    $mail->Port = $config['smtp_port'];                                 // TCP port to connect to
    $mail->From = $config['smtp_username'];
    $mail->FromName = '天众云仓';
    $mail->addAddress($tomail);
    $mail->isHTML(true);
    $mail->Subject =$subject;
    $mail->Body = $body;
    if (!$mail->send()) {
        return false;
    } else {
        return true;
    }
}


//阿里云企业邮箱发送邮件
function send_mail_tmp($tomail, $name, $subject = '', $body = '', $attachment = null)
{
    $mail = new \PHPMailer\PHPMailer\PHPMailer();
    $mail->SMTPDebug = 0;                               // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.mxhichina.com';  // Specify main and backup SMTP servers
    //$mail->SMTPSecure = "ssl";
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'postmaster@iliked.cn';                 // SMTP username
    $mail->Password = 'JQaihr,2017';                           // SMTP password
    //  $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 25;                                    // TCP port to connect to
    $mail->From = 'postmaster@iliked.cn';
    $mail->FromName = 'postmaster@iliked.cn';
    $mail->addAddress($tomail);
    $mail->isHTML(true);
    $mail->Subject = 'Here is the subject';
    $mail->Body = 'This is the HTML message body <b>in bold!</b>';
    if (!$mail->send()) {
        return false;
    } else {
        return true;
    }
}
function alert_message($flag,$tip,$data=[])
{
    $arr = array("flag"=>$flag,"tip"=>$tip,'data'=>$data);
    echo json_encode($arr);die;
}
//function getEmailConfigProtocal()
//{
//    return \think\Db::name("data_config")->where(['name' => 'smtp_protocal'])->value('value');
//}
//
//function getEmailConfigServer()
//{
//    return \think\Db::name("data_config")->where(['name' => 'smtp_servrer'])->value('value');
//}
//
//function getEmailConfigPort()
//{
//    return \think\Db::name("data_config")->where(['name' => 'smtp_port'])->value('value');
//}
//
//function getEmailConfigAccount()
//{
//    return \think\Db::name("data_config")->where(['name' => 'smtp_username'])->value('value');
//}
//
//function getEmailConfigPwd()
//{
//    return \think\Db::name("data_config")->where(['name' => 'smtp_password'])->value('value');
//}

//filename文件名
//dir目录名
function savelog($filename,$data,$dir=''){
    $file = ROOT_PATH.'runtime/log/'.date('Ym',time());
    if(!is_dir($file)){
        mkdir($file,0777,true);
    }

    file_put_contents($file.'/'.$filename.'.log',date('Y-m-d H:i:s').var_export($data,true).PHP_EOL,FILE_APPEND);
}

function print_t_new($info,$exit=true){
    echo '<pre>';
    print_r($info);
    echo '<pre>';
    if($exit){
        exit();
    }
}

function alert_json($code=0,$msg='',$data=''){
    return json(
        [
            'code'=>$code,
            'msg'=>$msg,
            'data'=>$data
        ]);
}
function article_category($cate=0){
    $name = '';
    switch ($cate){
        case '1':
            $name = '欧洲铁路小包';
            break;
        case '2':
            $name = '欧美特快专线';
            break;
        case '3':
            $name = '欧美专线';
            break;
        default:
            $name = '无类目';
            break;
    }
    return $name;
}
