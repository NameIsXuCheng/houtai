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
                    $confignames[] = $item['name'];
                }
                $confignames = implode(',',$confignames);
                $data = $this->request->only($confignames);
                foreach ($data as $key => $value) {
                    Db::name('setting')->where(['name'=>$key])->update(['value'=>$value]);
                }
            }catch (\Exception $e){
                Db::rollback();
                return alert_json(0,'修改失败！');
            }
            Db::commit();
            return alert_json(1,'修改成功！');
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