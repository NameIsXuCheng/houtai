<?php
/**
 * Created by PhpStorm.
 * User: matao
 * Date: 2020/7/27
 * Time: 17:27
 */
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Request;

class System extends Basic {
    public function index()
    {
        $config = Db::name('system_config')->select();
        if($this->request->isAjax())
        {
            Db::startTrans();
            try {
                $confignames = [];
                foreach($config as $item)
                {
                    $confignames[] = $item['config_name'];
                }
                $confignames = implode(',',$confignames);
                $data = $this->request->only($confignames);
                foreach ($data as $key => $value) {
                    Db::name('system_config')->where(['config_name'=>$key])->update(['config_value'=>$value]);
                }
            }catch (\Exception $e){
                Db::rollback();
                $this->error(lang('OperationFailed'),'',$data);
            }
            Db::commit();
            $this->success(lang('OperationSuccess'),'',$data);
        }
        $this->assign('config',$config);
        return view();
    }

    public function role_admin(){
        return view();
    }

    public function role_purchasing(){
        return view();
    }


}