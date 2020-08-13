<?php

	
    function genVerify($data) {
        ksort($data);
        $items = array();
        foreach ($data as $key => $value) {
            if(is_array($value)){
                $items[] = $this->genVerify($value);
            }else{
                $items[] = $key.$value;
            }
        }
        return join('',$items);
    }
	
	function send($url,$data,$charset="utf-8"){
        $header = array(
            "Content-Type:application/x-www-form-urlencoded;charset=".$charset,
            'User-Agent: Mozilla/4.0 (compatible; MSIE .0; Windows NT 6.1; Trident/4.0; SLCC2;)');
        $ch = curl_init();
        $res= curl_setopt ($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt ($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
        $result = curl_exec ($ch);
        curl_close($ch);

        if($result == NULL)
        {
            return 0;
        }

        return $result;
    }
	

//    $url="http://exporttest.mttlm.com/index.php/OpenApi/Package/PackageStatus";//测试地址
    $url="http://wmsp.t-cang.com/index.php/OpenApi/Package/PackageStatus";//正式地址
    $time=time();
       $package_no=$_POST["package_no"];
       $type=$_POST["type"];

//        $type="en";
//    $package_no="500910841604";
       if(empty($package_no)){
           $return=[
               "flag"=>0,
               "tip"=>"请输入查询单号"
           ];
       }

    $appkey="GW2019S102T3M001";
    $appsecret="GW0512S027Q9K681";
    $data=[
		"appkey"=>$appkey,
		"timestamp"=>$time,
		"param"=>[
			"package_no"=>$package_no,
            "type"=>$type
		]
    ];

   $param=$data["param"];
   $new_str = genVerify($param);
   $data['sign'] = md5($appsecret.'appkey'.$data['appkey'].'param'.$new_str.'timestamp'.$time.$appsecret);
   $data=json_encode($data);
	
   $res=send($url,$data);
	echo($res);


