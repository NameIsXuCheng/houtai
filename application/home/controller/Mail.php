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
use phpmailer\PHPMailer;
use phpmailer\SMTP;

class Mail extends Controller {


    public function index(){
        return false;
    }

    //发送邮件 正文
    public function send($send_data){

            /* $send_data = [
                   'title'=>,
                   'user'=>,
                   'email'=>
                   'content'=>
            ]*/
            set_time_limit(0);

            if(empty($send_data['content'])) return json(['code'=>0,'msg'=>'请输入内容']);
            if(empty($send_data['title'])) return json(['code'=>0,'msg'=>'请输入邮件标题']);

            //过滤发送内容
            //$content = $this->preg_content($data['content']);

            $pattern = '/^[a-z0-9]+([._-][a-z0-9]+)*@([0-9a-z]+\.[a-z]{2,14}(\.[a-z]{2})?)$/i';
            //检测是否合法邮箱
            if(!preg_match($pattern,$send_data['email'])){
                return json(['code'=>0,'msg'=>'邮箱不合法：'.$send_data['email']]);
            }

            $result = $this->sendMail($send_data['user'],$send_data['content'],$send_data['title']);

            return $result;
    }

    function sendMail($user,$content,$title){

        //获取系统配置
        $config = Db::name('setting')->select();

        foreach ($config as $item){
            if($item['name'] == 'send_mail'){
                $send_email = $item['value'];
            }
            if($item['name'] == 'service_mail'){
                $receive_mail = $item['value'];
            }
            if($item['name'] == 'email_host'){
                $email_host = $item['value'];
            }
            if($item['name'] == 'email_password'){
                $email_password = $item['value'];
            }

             $email_user = $user;

        }

        if(empty($send_email) || empty($email_host) || empty($email_password) || empty($email_user)|| empty($receive_mail)){
            return 0;
        }

        //开始发送邮件
        $mail = new PHPMailer();
        $mail->isSMTP();        // 使用SMTP服务
        $mail->CharSet = "utf8";// 编码格式为utf8，不设置编码的话，中文会出现乱码
        $mail->Host = $email_host;// 发送方的SMTP服务器地址
        $mail->SMTPAuth = true;// 是否使用身份验证
        $mail->Username = $send_email;// 发送方的163邮箱用户名，就是你申请163的SMTP服务使用的163邮箱</span><span style="color:#333333;">
        $mail->isHTML(true);
        $mail->Password = $email_password;// 发送方的邮箱密码，注意用163邮箱这里填写的是“客户端授权密码”而不是邮箱的登录密码！</span><span style="color:#333333;">
        $mail->SMTPSecure = "ssl";// 使用ssl协议方式</span><span style="color:#333333;">
        $mail->Port = 465;// 163邮箱的ssl协议方式端口号是465/994
        $mail->setFrom($send_email,$email_user);// 设置发件人信息，如邮件格式说明中的发件人，这里会显示为Mailer(xxxx@163.com），Mailer是当做名字显示
        $mail->addAddress($receive_mail,'');// 设置收件人信息，如邮件格式说明中的收件人，这里会显示为Liang(yyyy@163.com)
        //$mail->addReplyTo("pe_zhubin@163.com","Reply");// 设置回复人信息，指的是收件人收到邮件后，如果要回复，回复邮件将发送到的邮箱地址
        //$mail->addCC("xxx@163.com");// 设置邮件抄送人，可以只写地址，上述的设置也可以只写地址(这个人也能收到邮件)
        //$mail->addBCC("xxx@163.com");// 设置秘密抄送人(这个人也能收到邮件)
        //$mail->addAttachment("bug0.jpg");// 添加附件
        $mail->Subject = $title;// 邮件标题
        $mail->Body = $content;// 邮件正文

        $res=$mail->Send();
        if (!$res) {
            $cl = new \PHPMailer\PHPMailer\Exception();
            $err=$cl->errorMessage();
            //var_dump(html_entity_decode($err));
            //die;

            return ['code'=>0,'msg'=>$err];
        } else {
            return ['code'=>1,'msg'=>'邮件发送成功'];
        }


    }



}