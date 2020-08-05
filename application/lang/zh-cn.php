<?php
/**
 * Created by PhpStorm.
 * User: 江桥
 * Date: 2017/9/28
 * Time: 15:02
 */
$L=[];
$L['Sys_name']='天众供应链';
$L['Sys_super_name']='天众门店管理系统';
$L['Sys_admin_name']='天众门店系统';
///权限相关
$L['Admins']['index']='管理员管理';
$L['Admins']['getDatas']='管理员查看';
$L['Admins']['add,add_do']='管理员添加';
$L['Admins']['edit,edit_do']='管理员修改';
$L['Admins']['del']='管理员删除';
$L['Admins']['remark_edit']='备注修改';
$L['Admins']['reset_password']='重置密码';

$L['Send']['index']='派件管理';
$L['Send']['getDatas']='快件查看';
$L['Send']['add,add_do']='快件添加';
$L['Send']['edit,edit_do']='快件修改';
$L['Send']['del']='快件删除';
$L['Send']['remark_edit']='备注修改';
$L['Send']['status_edit']='状态修改';
$L['Send']['status_edit,set_index_status']='批量设置状态';

$L['Recipient']['index']='揽件管理';
$L['Recipient']['getDatas']='快件查看';
$L['Recipient']['add,add_do,getMember,setRecTime']='快件添加';
$L['Recipient']['edit,edit_do']='快件修改';
$L['Recipient']['del']='快件删除';
$L['Recipient']['remark_edit']='备注修改';
$L['Recipient']['status_edit']='状态修改';
$L['Recipient']['package']='代购包裹管理';//
$L['Recipient']['getPackageDatas']='包裹查看';
$L['Recipient']['order_details']='包裹详情';
$L['Recipient']['set_status']='状态设置';
$L['Recipient']['status_edit,set_index_status']='批量设置状态';

$L['User']['index']='客户信息管理';
$L['User']['del']='客户信息删除';
$L['User']['delAllLevel']='等级删除';
$L['User']['remark_edit']='备注修改';
$L['User']['reset_member']='设置会员';
$L['User']['level_index']='用户级别';
$L['User']['add,add_do']='客户信息添加';
$L['User']['level_add,level_add_do']='等级添加';
$L['User']['edit,edit_do']='客户信息修改';
$L['User']['level_edit,level_edit_do']='等级修改';
$L['User']['getDatas,getLevelDatas']='客户信息查看';


$L['Notice']['index']='通知管理';
$L['Notice']['getDatas']='通知查看';

$L['System']['index']='系统管理';
$L['System']['getExpressNum,expressNumUpdate']='订单号生成管理';
$L['System']['resetFrom,unsetFrom']='快件默认来源设置';
$L['System']['lang_index,lang_set,lang_download']='语言设置';
$L['Store']['index']='门店管理';
$L['Store']['getDatas']='门店查看';
$L['Store']['add,add_do']='门店添加';
$L['Store']['edit,edit_do']='门店修改';
$L['Store']['del']='门店信息删除';
$L['Store']['store_admin_add,store_admin_add_do']='门店删除';
$L['Store']['store_admin_edit,store_admin_edit_do']='门店删除';
$L['Store']['remark_edit']='门店备注修改';
$L['Store']['is_use']='门店设置';
$L['Store']['level_index']='门店等级管理';
$L['Store']['level_getDatas']='门店等级查看';
$L['Store']['level_edit,level_edit_do']='门店等级编辑';
$L['Store']['store_inviting']='下级门店';
$L['Store']['edit_children_store_profit']='设置店铺是否可控下级店铺利润';
$L['Store']['profit_set']='利润率设置【门店端需要门店主后台开启方可生效】';
$L['Store']['inviting,getDatas']='下级门店';
$L['Store']['child_store_profit_statistics,getStoreProfitAccount']='门店收益';

$L['Dline']['index']='专线管理';
$L['Dline']['getDatas']='专线查看';
$L['Dline']['add,add_do']='专线添加';
$L['Dline']['edit,edit_do']='专线修改';
$L['Dline']['del']='专线删除';
$L['Dline']['file_index']='专线程序管理';
$L['Dline']['file_index_edit_do']='专线程序修改';

$L['Notice']['del']='消息删除';
$L['Nav']['index']='导航管理';
$L['Nav']['getDatas']='导航查看';
$L['Nav']['add,add_do']='导航添加';
$L['Nav']['edit,edit_do']='导航编辑';
$L['Nav']['del']='导航删除';

$L['Nav']['actions']='action管理';
$L['Nav']['getActionsDatas']='action查看';
$L['Nav']['actions_add,actions_add_do']='action添加';
$L['Nav']['actions_edit,actions_edit_do']='action编辑';
$L['Nav']['actions_del']='action删除';

//$L['Purchasing']['del']='专线删除';
//代购
//$L['Purchasing']['news_index,tutorial_index,adv_index,system_setting_index,cate_index,advice_index']='代购管理';
//$L['Purchasing']['product_dline_choose_index']='产品专线选择';
//$L['Purchasing']['post_type_save']='配送方式设置';
//$L['Purchasing']['lang_index']='语言设置';
//$L['Purchasing']['news_index,tutorial_index,adv_index,system_setting_index,cate_index,advice_index, product_dline_choose_index'] = '代购管理';
//$L['Purchasing']['getNewsDatas'] = '获取新闻信息';
//$L['Purchasing']['news_add,news_add_do'] = '新闻添加';
//$L['Purchasing']['news_edit,news_edit_do'] = '新闻编辑';
//$L['Purchasing']['getTutorialDatas'] = '获取教程信息';
//$L['Purchasing']['tutorial_add,tutorial_add_do'] = '教程添加';
//$L['Purchasing']['tutorial_edit,tutorial_edit_do'] = '教程编辑';
//$L['Purchasing']['adv_edit,adv_edit_do'] = '广告编辑';
//$L['Purchasing']['qq_add_do'] = '客服添加';
//$L['Purchasing']['email_config_save'] = '邮件服务器设置';
//$L['Purchasing']['test_send_email'] = '发送测试邮件';
//$L['Purchasing']['edit_email_content'] = '注册邮件格式设置';
//$L['Purchasing']['get_email_content'] = '获取邮件信息';
//$L['Purchasing']['getCateDatas'] = '获取类目信息';
//$L['Purchasing']['cate_add,cate_add_do'] = '类目添加';
//$L['Purchasing']['cate_edit,cate_edit_do'] = '类目编辑';
//$L['Purchasing']['getAdviceDatas'] = '获取投诉信息';
//$L['Purchasing']['deleteAdviceById,delAllAdvice,delAllNews,delAllCate'] = '批量删除';
//$L['Purchasing']['qrcode_save'] = '二维码内容设置';
//$L['Purchasing']['getProductDlineChooseDatas'] = '产品专线选择';
//$L['Purchasing']['get_all_deline'] = '获取所有专线';
//$L['Purchasing']['choose_dline'] = '选择专线';
//$L['Purchasing']['lang_index,lang_set,lang_download']='语言设置';

$L['Purchasing']['index']='代购管理';
$L['Purchasing']['product_dline_choose_index,getProductDlineChooseDatas,get_all_deline,choose_dline']='产品专线选择';
$L['Purchasing']['lang_index,lang_set,lang_download']='语言设置';
$L['Purchasing']['news_index,news_add,news_add_do,getNewsDatas,news_edit,news_edit_do,delAllNews']='新闻管理';
$L['Purchasing']['tutorial_index,getTutorialDatas,tutorial_add,tutorial_add_do,tutorial_edit,tutorial_edit_do']='新手教程管理';
$L['Purchasing']['cate_index,getCateDatas,cate_add,cate_add_do,cate_edit,cate_edit_do']='类目管理';
$L['Purchasing']['adv_edit,adv_edit_do,adv_index']='广告管理';
$L['Purchasing']['system_setting_index,qq_add_do,post_type_save,email_config_save,test_send_email,get_email_content,email_config_save,qrcode_save']='系统设置';
$L['Purchasing']['advice_index,getAdviceDatas,delAllAdvice']='投诉建议管理';
$L['Purchasing']['order,getOrderDatas']='订单管理';
$L['Purchasing']['getOrderInfo']='订单详情';
$L['Purchasing']['userIndex,getUserDatas']='ERP账号管理';
$L['Purchasing']['user_privilege_set']='用户权限设置';
$L['Purchasing']['set_privilege']='设置权限';
$L['Purchasing']['delivery_del']='路由删除';

$L['Purchasing']['delivery_edit,delivery_edit_do']='路由更新';
$L['Purchasing']['delivery_add,delivery_add_do']='路由添加';
$L['Purchasing']['delivery_model,getDeliveryDatas']='路由信息';


////导航相关
$L['Recipient_manager']='揽件管理';
$L['Send_manager']='派件管理';
$L['User_manager']='客户信息管理';
$L['Admins_manager']='管理员管理';
$L['Notice_manager']='通知管理';
$L['System_manager']='系统管理';
$L['Store_manager']='门店管理';
$L['Recipient_express']='快件管理';
$L['Send_express']='快件管理';
$L['Dedicated_line_manager']="专线管理";
$L['Nav_manager']='系统导航管理';
$L['child_store_profit_statistics']='门店收益';
//专线相关
$L['dline_list']='专线列表';

//导航相关
$L['nav_list']='导航列表';
$L['Sys_action']='控制器管理';

$L['User_list_y']='会员用户';
$L['User_list_n']='非会员用户';
$L['Level_manager']='等级管理';
$L['Admins_list']='管理员列表';
$L['Notice_list']='通知列表';
$L['System_set']='系统设置';
$L['Store_set']='门店设置';
$L['store_inviting']='下级门店';
$L['store_level_name']='级别名称';
$L['store_level']='级别';
$L['store_profit']='利润';
$L['store_level_profit']='利润率';
$L['store_profit_zero']='设置为0，则利润率默认为等级利润率';
$L['store_has_privilege_edit_profit']='控制下级门店利润';
$L['store_profit_must_between_zero_and_one']='利润率取值必须是0-1之间';
$L['store_level_profit_instruction']='利润说明';

$L['store_level_profit_detail']='利润=商品价格*利润率';
$L['store_level_parent_profit']='父级利润率';
$L['store_parent_name']='父级门店名称';
$L['the_store_has_children_store']='该门店含有上下级门店，级别不允许修改！';
$L['store_update_level']='修改级别';
$L['store_level_index']='门店等级管理';

$L['System_lang']='语言设置';
$L['lang_download']='请下载语言模板之后，上传！';
$L['lang_notice']='模板中，将每一行的中文翻译为其他语言，写入对应的行以及对应的列（C列）,如下图：';
//代购管理
$L['Purchasing_package'] = '代购包裹';
$L['Purchasing_order'] = '订单管理';
$L['Purchasing_manager'] = '代购管理';
$L['Category_manager'] = '分类管理';
$L['News_manager'] = '新闻管理';
$L['Tutorial_manager'] = '新手教程管理';
$L['Purchasing_user_index']='ERP账号列表';
$L['Adv_manager'] = '广告管理';
$L['System_setting'] = '系统设置';
$L['Cate_manager'] = '类目管理';
$L['Advice_manager'] = '投诉建议管理';
$L['field_status']='状态';
$L['field_status_all']='全部状态';
$L['field_status_1']='待门店收件';
$L['field_status_2']='门店已收件';
$L['field_status_3']='待门店发出';
$L['field_status_4']='门店已发出';
$L['field_status_5']='已完成';
$L['field_reserve_name'] = '预留姓名';
$L['field_reserve_phone'] = '预留电话';
$L['Product_dline_choose'] = '产品专线选择';

$L['Lang_setting'] = '语言设置';
//通知列表
$L['field_store'] = '门店';
$L['field_all_store'] = '所有门店';
$L['field_no_messages'] = '暂无消息';
$L['field_is_read']= '已读';
$L['field_is_not_read']= '未读';
$L['field_from_message'] = '您的来自';
$L['field_your'] = '您';
$L['field_s_message'] = '的消息';
//
$L['order_sn'] = '订单号';
$L['buyer_name']='购买人';
$L['goods_number'] = '商品数量';
$L['total_account'] = '总金额';
$L['line'] = '专线';
$L['consignee'] = '收件人';
$L['order_status']='订单状态';
$L['total_account']='订单金额';
$L['dline']='物流专线';
$L['taxes']='订单税费';
$L['province_city_area'] = '省市区';
$L['province'] = '省';
$L['express_route_add']='物流路径添加';
$L['express_route_update']='物流路径修改';
$L['city']='市';
$L['area']='区/县';
$L['order_wait_declare']='待申报';
$L['order_has_declare']='已申报';
$L['order_wait_pay']='待付款';
$L['order_has_pay']='已付款';
$L['order_declare_fail']='申报失败';

////页面提示相关
$L['add_success']='添加成功';
$L['add_error']='添加失败';
$L['update_success']='修改成功';
$L['update_error']='修改失败';
$L['delete_success']='删除成功';
$L['delete_error']='删除失败';
$L['has_no_root']='没有权限';
$L['operate']='操作';
$L['set_success']='设置成功';
$L['set_error']='设置失败';
$L['operate_has_error']='操作有误';
$L['no_login']='没有登录';
$L['send_email_success']='邮件发送成功';
$L['edit']='编辑';
$L['qq_is_not_null']='QQ不能为空';
$L['qq_length_is_not_right'] = 'QQ长度不合法';
$L['qq_is_must_be_digit'] = 'QQ只能为数字';
$L['test_email_is_not_null'] = '测试邮箱不能为空';
$L['email_format_is_not_right'] = '邮箱格式不正确';
$L['cate_name_is_exist'] = '该类目已经存在';
$L['please_select_one_privilege']='请至少选择一个权限';
////控制器
$L['Admins_username_exist']='用户名已经存在';
$L['Admins_not_delete_yourself']='不能删除自己';
$L['Admins_not_delete_super_admin']='不能删除超级管理员';
$L['Admins_remark_not_empty']='备注不能为空';
$L['Admins_not_promiss_edit_super_admin']='超级管理员不允许编辑';
$L['Admins_reset_password']='重置密码';
$L['Admins_reset_password_detail']='你确定重置密码为“123456”吗？';

$L['Base_old_password_error']='原密码错误';
$L['Base_twice_password_not_equal']='两次密码输入不相同';
$L['Base_verify_error']='验证码错误';
$L['Base_username_or_password_error']='用户名或者密码错误';
$L['Base_login_success']='登录成功';

$L['Recipent_expree_number_made_error']='快递单号生成失败';
$L['Recipent_idcard_has_error']='证件号有误';
$L['Recipent_not_greater_current_time']='时间不能大于当前时间';
$L['Recipent_idcard_type_has_error']='证件类型有误';



$L['Store_name_exist']='门店名称重复';
$L['Store_username_exist']='门店管理员名称重复';
$L['Store_level_name_exist']='门店级别名称重复';
$L['Store_level_name']='店铺级别';
$L['store_account']='总费用';
$L['profit_is_lager']='利润太大【各级门店总利润不得高于50%】';

$L['System_configuration_file_not_exist']='系统配置文件不存在';

////视图上面的view
$L['view_not_empty']='不能为空';
$L['view_root_not_empty']='权限不能为空';

/////页面操作相关  按钮之类的
$L['btn_search']='搜索';
$L['btn_order_info']='订单详情';
$L['btn_set_delivery_model']='设置运费模板';
$L['btn_upload']='上传';
$L['btn_add']='添加';
$L['btn_add2']='新增';
$L['btn_update']='修改';
$L['btn_delete_all']='批量删除';
$L['btn_search']='搜索';
$L['btn_set_member']='设置为会员';
$L['btn_set_common_user']='设置为普通用户';
$L['btn_edit_admin']='修改管理员';
$L['btn_is_use']='已启用';
$L['btn_is_not_use']='未启用';
$L['btn_set_password']='设置密码';
$L['btn_login']='登&nbsp;&nbsp;&nbsp;&nbsp;录';
$L['btn_login_cancel']='取&nbsp;&nbsp;&nbsp;&nbsp;消';
$L['btn_refresh']='看不清？点击刷新';
$L['btn_dline_setting']='专线设置';
$L['privilege_edit']='权限设置';

$L['btn_test']='测试一下';
$L['btn_set_empty']='置空';
$L['btn_yes']='确定';
$L['btn_cancel']='取消';
$L['btn_has_open']='已开启';
$L['btn_has_close']='已关闭';
$L['set']='设置';
////////页面内容相关   页面表格列内容等等
$L['field_verify']='验证码';
$L['field_username']='用户名';
$L['field_password']='密码';
$L['field_old_password']='原密码';
$L['field_new_password']='新密码';
$L['field_repeat_password']='重复密码';
$L['field_name']='姓名';
$L['field_mobile']='手机号';
$L['field_remark']='备注';
$L['field_root']='权限';
$L['field_email']='E-mail';
/////////news_index.html
$L['btn_index_add_recipient']='添加揽件';
$L['btn_index_add_send']='添加派件';
$L['btn_index_add_user']='添加客户';
$L['index_personal_message']='个人信息';
$L['index_edit_password']='修改密码';
$L['index_exit']='退出系统';
$L['index_message']='退出系统';
$L['index_change_color']='颜色';
$L['index_desktop']='我的桌面';
$L['index_close_current']='关闭当前';
$L['index_close_all']='关闭全部';

///welcome
$L['w_welcome_use']='欢迎使用';
$L['w_login_count']='登录次数';
$L['w_last_login_ip']='上次登录IP';
$L['w_last_login_time']='上次登录时间';
$L['w_server_message']='服务器信息';
$L['w_system_path']='系统路径';
$L['w_http_protocol_version']='HTTP协议版本';
$L['w_current_ip']='当前IP地址';
$L['w_web_port']='站点端口';
$L['w_browser']='浏览器';
$L['w_server']='服务器';
$L['w_php_max_request']='PHP最大请求数';
$L['w_request_path']='请求路径';
$L['w_admin_email']='管理员邮箱';
$L['w_web_ip']='站点IP地址';
$L['w_recieve_code']='接收编码';
$L['w_software_version']='ThinkPHP版本';
$L['w_request_time']='请求时间';

//recipient
$L['field_from']='来源';
$L['field_from_all']='全部来源';
$L['field_from_1']='上门';
$L['field_from_2']='电话';
$L['field_from_3']='网络';
$L['field_from_4']='其他';
$L['field_from_5']='电商';
$L['field_store']='门店';
$L['field_please_select']='请选择';
$L['field_express_code']='快递单号';
$L['field_auto_made']='自动生成';
$L['field_sender_name']='寄件人';
$L['field_idcard_type']='证件类型';
$L['field_sender_idcard']='寄件人证件号';
$L['field_sender_company']='寄件人单位';
$L['field_sender_phone']='寄件人电话';
$L['field_sender_address']='寄件人地址';
$L['field_volume']='体积/CM^<sup>3</sup>';
$L['field_weight']='重量/KG';
$L['field_addr_name']='收件人';
$L['field_addr_phone']='收件人电话';
$L['field_addr_company']='收件人单位';
$L['field_addr_address']='收件人地址';
$L['field_address']='地址';
$L['field_address_all']='详细地址';
$L['field_company']='单位';
$L['field_phone']='电话';
$L['field_idcard']='证件号';
$L['field_date_range']='日期范围';
$L['field_discount']='享受折扣';

$L['remark_explain']='“备注/状态”双击可修改';

$L['field_sender_message']='寄件人信息';
$L['field_addr_message']='收件人信息';
$L['field_buyer_message'] = '购买人信息';
$L['field_goods_message'] = '产品信息';

$L['recipient_state_1']='待收件';
$L['recipient_state_2']='(揽件点)已收件';
$L['recipient_state_3']='已打包';
$L['recipient_state_4']='已发出';
$L['recipient_state_5']='已完成';

$L['recipient_state_1_title']='等待接收物品！';
$L['recipient_state_2_title']='准备对物品打包！';
$L['recipient_state_3_title']='包裹准备发出！';
$L['recipient_state_4_title']='包裹已经发出！';
$L['recipient_state_5_title']='包裹已被签收！';

$L['recipient_add_express']='添加快件';
$L['recipient_update_express']='修改快件';
$L['send_notice']='通知';
$L['send_unit']='次';
$L['add_remark']='添加备注';
$L['set_state']='设置状态';
//recipient => purchasing_package
$L['field_package_order_num'] = '订单数';
$L['field_package_pickup_mode'] = '取件方式';
$L['field_package_reserved_name'] = '预留姓名';
$L['field_package_reserved_phone'] = '预留电话';
$L['field_package_store_name'] = '门店';
$L['field_package_pickup_mode_1'] = '快递员上门';
$L['field_package_pickup_mode_2'] = '自己送货';
$L['field_package_pickup_mode_3'] = '自己邮寄';
$L['field_package_status_1'] = '待门店收件';
$L['field_package_status_2'] = '门店已收件';
$L['field_package_status_3'] = '待门店发出';
$L['field_package_status_4'] = '门店已发出';
$L['field_package_status_5'] = '已完成';
$L['field_package_show_order_detail'] = '详情';
$L['field_content'] = '内容';

$L['set_status_0'] = '状态设置';
$L['set_status_2'] = '状态设置为已收货';
$L['set_status_4'] = '状态设置为已发货';
$L['set_status_5'] = '状态设置为已完成';

///store//
$L['store_name']='门店名称';
$L['store_manager']='门店经理';
$L['store_admin']='门店管理员';
$L['store_state']='门店状态';
$L['store_create_admin']='创建管理员';
$L['store_update_admin']='修改管理员';
$L['store_manager_phone']='经理电话';
$L['store_is_use']='是否启用';
$L['store_admin_add']='添加门店管理员';
$L['store_use_title']='启用之后，门店系统才能使用。点击可切换状态';
$L['store_success']='成功';
$L['store_fail']='失败';
$L['store_common']='一般';
$L['store_purchasing']='代购';
///system
$L['system_express_made_rule']='快递单号生成规则';
$L['system_rule']='规则';
$L['system_input_rule']='输入规则';
$L['system_express_made_rule_explain_1']='“#n”代表可变数字，“#s”代表可变字母，“#S”代表可变大写字母。如需生成Ac121这种格式的，则输入“#S#s#n{3}”';
$L['system_express_made_rule_explain_2']='如果快递单都包含一段固定的数字（也可以是字母或者数字+字母），如“8989123123”，这时需要这么写：“8989#s{6}”';
$L['system_express_made_rule_explain_3']='特别注意，为了防止重复，设置的内容，至少含有一个#n{k}，其中k大于等于9为佳！';
$L['system_express_default_from_set']='快递默认来源设置';
$L['system_express_default_from_set_explain']='设置后，添加“揽件”时，来源的默认值将为该设置的值';
$L['system_express_index_big_image_adv'] = '首页大图广告：展示在首页最上方的长图广告';
$L['system_express_index_sm_image_adv'] = '首页小图广告：展示在首页最右方的长图广告';
//代购系统首页QQ
$L['system_express_customer_service_qq'] = '客服QQ';
$L['system_express_qq_setting'] = 'QQ设置';
$L['system_express_qq_description'] = '要求：多个QQ使用@符号分割，最多2个QQ';
$L['system_input_qq']='输入QQ';
$L['system_express_email_config'] = '邮箱配置';
$L['system_express_email_account_error'] = '服务器用户名格式不正确';
$L['system_express_email_account_detail']="此账号用于用户注册时发送邮件";
$L['system_express_test_email'] = "测试邮箱";
$L['system_express_test_send_email'] = "测试发送";
$L['system_express_set_send_email_content'] = "设置注册时内容";
$L['system_express_email_content_format'] = "邮件内容格式";
$L['system_express_email_content_is_not_null'] = "邮件内容格式不能为空";

$L['system_smtp_server_email'] = 'SMTP服务器';
$L['system_smtp_grant_pwd'] = '授权密码';
$L['system_smtp_protocal'] = '协议';
$L['system_smtp_server'] = 'SMTP服务器邮箱';
$L['system_smtp_server_port'] = 'SMTP服务器端口';
$L['system_smtp_server_name_is_not_null'] = 'SMTP服务器邮箱账号不能为空';
$L['system_smtp_grant_pwd_is_not_null'] = 'SMTP服务器邮箱账号密码不能为空';
$L['system_smtp_protocal_is_not_null'] = '协议不能为空';
$L['system_smtp_server_is_not_null'] = 'SMTP服务器不能为空';
$L['system_smtp_server_port_is_not_null'] = 'SMTP服务器端口不能为空';

//二维码
$L['system_qrcode_setting'] = '二维码设置';
$L['system_qrcode_content_setting'] = '内容设置';
$L['system_qrcode_setting_description'] = '要求：内容为url网址';
$L['system_qrcode_content_is_not_null'] = '二维码内容不能为空';

//发送方式
$L['system_post_type_setting'] = '配送方式设置';
$L['system_select_all'] = '全选';
$L['system_sendway_1'] = "快递员上门";
$L['system_sendway_2'] = "自己送货到门店";
$L['system_sendway_3'] = "自己邮寄到门店";
$L['system_at_least_choose_one'] = '至少选择一种配送方式';

//等级
$L['system_level_name_is_not_null'] = '等级名称不能为空';
$L['system_level_discount_is_not_null'] = '享受折扣不能为空';
$L['system_level_discount_is_error'] = '享受折扣不合理';

//专线
$L['system_at_least_choose_one_dline'] = '至少选择一种专线';

//新闻类目
$L['update_cate']='类目修改';
///user
$L['user_update_user']='修改用户';
$L['user_add_user']='添加用户';
$L['user_add_level']='添加等级';
$L['user_update_level']='修改等级';
$L['user_from_1']='揽件信息';
$L['user_from_2']='派件信息';
$L['user_from_3']='手动添加';
$L['user_show_time']='出现频率';
////table
$L['t_id']='ID';
$L['t_level']='等级';
$L['update_remark']='修改备注';
$L['t_state']='状态';
$L['t_recieve_time']='收件日期';
$L['t_created_time']='创建时间';
$L['t_select_delete']='请选择要删除的项';
$L['t_select_update']='请选择要修改的项';
$L['t_select_info']='请选择要查询的项';
$L['t_select_set']='请选择要设置的项';
$L['t_max_select']='最多只能选择一项';
$L['t_none']='无';
$L['class_a']='一级';
$L['class_b']='二级';
$L['Sys_index']='主页';
$L['Sys_index_refresh']='刷新';
$L['selected_status_is_defferent'] = '所选状态不一致';
/**
 * 代购管理
 */
///新闻管理index 列表
//$L['t_title'] = '标题';
$L['t_news_center'] = '新闻';
$L['t_tutorial'] = '新手教程';
$L['t_news_cate_id'] = '分类';
$L['t_all_cate'] = '全部分类';
$L['t_content'] = '内容';
$L['h_title'] = '标题';
$L['n_title'] = '添加新闻';
$L['t_title'] = '添加教程';
$L['h_adv_title'] = '广告修改';
$L['t_is_closed'] = '已关闭';
$L['t_is_opening'] = '已开启';
$L['news_title_is_not_null'] = '新闻标题不能为空';
$L['news_cate_is_not_null'] = '新闻分类不能为空';
$L['news_content_is_not_null'] = '新闻内容不能为空';
$L['tutorial_title_is_not_null'] = '教程标题不能为空';
$L['tutorial_cate_is_not_null'] = '教程分类不能为空';
$L['tutorial_content_is_not_null'] = '教程内容不能为空';
$L['t_save'] = '保存';
$L['t_cancel'] = '取消';
//产品专线选择
$L['t_product_name'] = '产品名称';
$L['t_hs_code'] = 'hscode';
$L['t_number'] = '数量';
$L['t_weight'] = '重量';
$L['t_unit'] = '单位';
$L['t_goods_barcode'] = '条码';
$L['t_cate_name'] = '类别';
$L['t_price'] = '单价';
$L['t_examined'] = '状态';
$L['t_cate_status'] = '类型';
$L['t_enable_choose_dline'] = '可选专线';
$L['field_deline_choose'] = '专线选择';
//广告管理
$L['l_adv_name'] = '名称';
$L['l_adv_img'] = '缩略图';
$L['l_adv_size'] = '尺寸';
$L['l_adv_img_width'] = '宽度';
$L['l_adv_img_heigth'] = '高度';
$L['l_adv_url'] = '链接';
$L['field_cover'] = '封面';
$L['field_pic_name'] = '图片名称';
$L['field_position'] = '位置';
$L['field_link'] = '链接';
$L['field_update_time'] = '更新时间';
$L['field_publish_state'] = '发布状态';
//等级
$L['field_level_name'] = '等级名称';
$L['field_level_discount'] = '享受折扣';
//类目管理
$L['t_cate_name'] = '类目名称';
$L['t_category'] = '类别';
$L['cate_name_is_not_null'] = '类目名称不能为空';
$L['t_cate'] = '所属栏目';
$L['t_cate_is_not_null'] = '所属栏目不能为空';
$L['t_cate_add'] = '添加类目';
//投诉建议管理
$L['t_target'] = '对象';
$L['t_delete'] = '删除';
$L['is_packaged']='是否打包';
$L['yes']='是';
$L['no']='否';
$L['route_exist']='物流线路已经存在';

//专线模块
$L['dline_name']="专线名称";
$L['dline_route']="路由";
$L['dline_type']="专线类型";
$L['dline_detail']="详情";
$L['dline_is_open']="是否开启";
$L['dline_open_status']="开启状态";
$L['dline_open']="已开启";
$L['dline_close']="已关闭";
$L['dline_select']="请选择";
$L['dline_route']="路由";
$L['dline_fillin']="请填写完整";
$L['dline_name_exist']='专线名称已经存在';
$L['dline_file_index']="专线程序";
$L['dline_self_line'] = "自有专线";
$L['dline_post_office'] = "邮政";
$L['pg_china_express']='国内快递';
///admin模块--门店系统端
$L['admin_store_end_use']='门店禁止使用';

$L['lang']='语言切换';
$L['lang_en']='English';
$L['lang_cn']='中文';
//$L['dedicated_line_manager']['index'] = '专线管理';

//登录界面的语言
$L['login_page_adminLogin']='管理员登录';
$L['login_page_customerTele']='客服电话';
$L['login_page_verify']='验证码';
$L['login_page_verifyNotice']='看不清？点击刷新';
$L['login_page_username']='用户名';
$L['login_page_password']='密码';
$L['login_page_login']='登录';

//快递费用设置
$L['province_must']='省-必须';
$L['province_error']='省-错误';
$L['first_weight']='起重/KG';
$L['step_weight']='续重/KG';
$L['first_price']='起始价/元';
$L['step_price']='续重价/元';
//权限相关
$L['Account']='账户管理';
$L['account']='账户中心';
$L['account_edit']='账户修改';
$L['account_advice']='投诉建议';
$L['account_token']='Token查看';
$L['account_message']='我的消息';
$L['account_psw_edit']='密码修改';
$L['account_child']='子账户列表';
$L['account_child_create']='子账号创建';
$L['account_child_delete']='子账号删除';
$L['account_child_update']='子账号更新';
$L['account_delete']='消息删除';

$L['Finance']='财务管理';
$L['finance']='财务明细';
$L['finance_payment_record_delete']='财务明细删除';
$L['finance_recharge']='充值明细';
$L['finance_recharge_record_delete']='充值记录删除';
$L['finance_online_recharge']='在线充值';
$L['finance_charge_description']='收费说明';

$L['Order']='订单管理';
$L['order']='订单列表';
$L['order_create']='新建订单';
$L['order_delete']='订单删除';
$L['order_edit']='订单修改';
$L['order_pay']='订单支付';
$L['order_import']='订单导入';
$L['order_export']='订单导出';
$L['order_ajax_printbatBS']='面单打印';
$L['order_declare']='订单申报';

$L['order_package_index']='取件列表';
$L['order_package_create']='新建取件';
$L['order_package_express_address']='快递点查询';
$L['order_package_dline']='专线查询';

$L['Product']='产品管理';
$L['product']='产品备案列表';
$L['product_create']='新增产品备案';
$L['product_update']='产品更新';
$L['Product-update_save']='产品修改';
$L['product_delete']='产品删除';
$L['product_import']='产品导入';
$L['product_cate_create']='创建产品类目';
$L['product_cate_list']='产品类目列表';
$L['product_cate_update']='产品排序修改';
$L['product_cate_delete']='产品类目删除';
$L['product_declare']='产品申报';

$L['Puser']='客户管理';
$L['puser']='客户列表';
$L['user']='客户列表';
$L['user_create']='新建客户';
$L['user_update']='客户信息更新';
$L['user_delete']='客户删除';
$L['user_list_rank']='等级列表';
$L['user_rank_update']='等级更新';
$L['user_rank_create']='客户等级创建';
$L['user_rank_delete']='客户等级删除';

$L['Warehouse']='仓库管理';
$L['warehouse']='仓库产品列表';
$L['Books']='账册管理';
$L['books']='账册列表';
$L['warehouse_create']='新建产品';
$L['warehouse_update']='产品保存';
$L['warehouse_book_create']='新建账册';
$L['warehouse_book_list']='账册列表';
$L['warehouse_book_delete']='账册删除';
$L['warehouse_book_update']='账册更新';
$L['warehouse_order']='仓库订单列表';

$L['allocation_order']='调拨管理';
$L['create_allocation_order']='新建调拨单';
$L['warehouse_allot_product_delete']='调拨单产品删除';
$L['warehouse_allot_product_add']='调拨单产品添加';
$L['warehouse_allot_order_save']='调拨单保存';
$L['warehouse_get_allot_detail']='调拨单详情';
$L['purchase_order']='采购单列表';
$L['purchase_order_create']='采购单创建';
$L['purchase_order_edit']='采购单修改';
$L['purchase_order_delete']='采购单删除';
$L['order_statement']='对账单管理';
$L['statement_order_index']='对账单订单';
$L['statement_order_info']='对账单订单详情';
$L['statement_del_all']='对账单删除';
$L['distribution_manager']='分销商管理';
$L['distributior_create']='分销商创建';
$L['distributor_update']='分销商更新';
$L['distributor_delete']='分销商删除';
$L['distributior_product']='分销商产品管理';
$L['warehouse_book_declare']='账册申报';
$L['warehouse_import']='产品导入';
$L['warehouse_import_do']='产品导入添加';
$L['warehouse_product_model']='产品导入模板';
$L['abnormal_order_index']='异常订单';
$L['order_model_create']='新建订单模板';
$L['order_model_list']='订单模板列表';
$L['order_model_edit']='订单模板修改';
$L['warehouse_purchase_declares']='采购单申报';
$L['purchase_last_confirm']='采购单最终确认';
$L['abnormal_order_declares']='异常订单申报';
$L['product_get_category_info']='产品类目详情';
$L['finance_other_fee']='其他费用';
$L['finance_read_seen']='其他费用状态';
$L['finance_other_fee_set_status']='其他费用状态设置';
$L['warehouse_allot_get_examined'] = '调拨审核';
$L['warehouse_allot_examined_status'] = '调拨审核状态';
$L['warehouse_allot_push'] = '调拨推送';
$L['finance_count_money'] = 'ERP对账单';
$L['product_get_stock'] = '库存获取';
$L['warehouse_get_stock'] = '查看库存';
$L['get_product_warning'] = '查看预警时间';
$L['set_product_warning'] = '预警设置';
$L['order_declares_all'] = '定时推送订单';
$L['warehouse_book_detail'] = '账册信息';
$L['finance_get_count_detail'] = '对账单详情';
$L['finance_erp_sure'] = '对账单确认';
$L['save_product_warning'] = '预警设置保存';
$L['order_del_order_list'] = '删单列表';
$L['warehouse_get_outgoing'] = '出入库查询';
$L['warehouse_inventory'] = '盘库单列表';
$L['warehouse_inventory_create'] = '盘库单创建';
$L['warehouse_inventory_add'] = '盘库单保存';
$L['account_distribution_money'] = '金额分配';