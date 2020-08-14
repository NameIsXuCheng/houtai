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
       return view();
    }

    public function setting(){
        $config = Db::name('setting')->select();
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
                    Db::name('setting')->where(['config_name'=>$key])->update(['config_value'=>$value]);
                }
            }catch (\Exception $e){
                Db::rollback();
                $this->error('修改失败','',$data);
            }
            Db::commit();
            $this->success('修改成功','',$data);
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