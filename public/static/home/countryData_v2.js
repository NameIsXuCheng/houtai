var country_data = [
// {code:"CN",name:"中国"},
// {code:"AF",name:"阿富汗"},
// {code:"BH",name:"巴林"},
// {code:"BD",name:"孟加拉国"},
// {code:"BT",name:"不丹"},
// {code:"BN",name:"文莱"},
// {code:"MM",name:"缅甸"},
// {code:"KH",name:"柬埔寨"},
// {code:"CY",name:"塞浦路斯"},
// {code:"KP",name:"朝鲜"},
{code:"HK",name:"中国香港"},
// {code:"IN",name:"印度"},
{code:"ID",name:"印度尼西亚"},
// {code:"IR",name:"伊朗"},
// {code:"IQ",name:"伊拉克"},
{code:"IL",name:"以色列"},
{code:"JP",name:"日本"},
// {code:"JO",name:"约旦"},
// {code:"KW",name:"科威特"},
// {code:"LA",name:"老挝"},
// {code:"LB",name:"黎巴嫩"},
// {code:"MO",name:"中国澳门"},
{code:"MY",name:"马来西亚"},
// {code:"MV",name:"马尔代夫"},
// {code:"MN",name:"蒙古"},
// {code:"NP",name:"尼泊尔"},
// {code:"OM",name:"阿曼"},
// {code:"PK",name:"巴基斯坦"},
// {code:"PS",name:"巴勒斯坦"},
// {code:"PH",name:"菲律宾"},
// {code:"QA",name:"卡塔尔"},
// {code:"SA",name:"沙特阿拉伯"},
{code:"SG",name:"新加坡"},
{code:"KR",name:"韩国"},
// {code:"LK",name:"斯里兰卡"},
// {code:"SY",name:"叙利亚"},
{code:"TH",name:"泰国"},
{code:"TR",name:"土耳其"},
// {code:"AE",name:"阿联酋"},
// {code:"YE",name:"也门共和国"},
{code:"VN",name:"越南"},
//
// {code:"TL",name:"东帝汶"},
{code:"KZ",name:"哈萨克斯坦"},
// {code:"KG",name:"吉尔吉斯斯坦"},
// {code:"TJ",name:"塔吉克斯坦"},
// {code:"TM",name:"土库曼斯坦"},
// {code:"UZ",name:"乌兹别克斯坦"},
// {code:"FZ",name:"非洲"},
// {code:"DZ",name:"阿尔及利亚"},
// {code:"AO",name:"安哥拉"},
// {code:"BJ",name:"贝宁"},
// {code:"BW",name:"博茨瓦纳"},
// {code:"BI",name:"布隆迪"},
// {code:"CM",name:"喀麦隆"},
// {code:"IC",name:"加那利群岛"},
// {code:"CV",name:"佛得角"},
// {code:"CF",name:"中非共和国"},
// {code:"TD",name:"乍得"},
// {code:"KM",name:"科摩罗"},
// {code:"CG",name:"刚果(布)"},
// {code:"DJ",name:"吉布提"},
// {code:"EG",name:"埃及"},
// {code:"GQ",name:"赤道几内亚"},
// {code:"ET",name:"埃塞俄比亚"},
// {code:"GA",name:"加蓬"},
// {code:"GM",name:"冈比亚"},
// {code:"GH",name:"加纳"},
// {code:"GN",name:"几内亚"},
// {code:"GW",name:"几内亚(比绍)"},
// {code:"CI",name:"科特迪瓦"},
// {code:"KE",name:"肯尼亚"},
// {code:"LR",name:"利比里亚"},
// {code:"LY",name:"利比亚"},
// {code:"MG",name:"马达加斯加"},
// {code:"MW",name:"马拉维"},
// {code:"ML",name:"马里"},
// {code:"MR",name:"毛里塔尼亚"},
// {code:"MU",name:"毛里求斯"},
// {code:"MA",name:"摩洛哥"},
// {code:"MZ",name:"莫桑比克"},
// {code:"NA",name:"纳米比亚"},
// {code:"NE",name:"尼日尔"},
// {code:"NG",name:"尼日利亚"},
// {code:"RE",name:"留尼汪"},
// {code:"RW",name:"卢旺达"},
// {code:"ST",name:"圣多美和普林西比"},
// {code:"SN",name:"塞内加尔"},
// {code:"SC",name:"塞舌尔"},
// {code:"SL",name:"塞拉利昂"},
// {code:"SO",name:"索马里"},
// {code:"ZA",name:"南非"},
// {code:"EH",name:"西撒哈拉"},
// {code:"SD",name:"苏丹"},
// {code:"TZ",name:"坦桑尼亚"},
// {code:"TG",name:"多哥"},
// {code:"TN",name:"突尼斯"},
// {code:"UG",name:"乌干达"},
// {code:"BF",name:"布基纳法索"},
// {code:"CD",name:"刚果(金)"},
// {code:"ZM",name:"赞比亚"},
// {code:"ZW",name:"津巴布韦"},
// {code:"LS",name:"莱索托"},
// {code:"SZ",name:"斯威士兰"},
// {code:"ER",name:"厄立特里亚"},
// {code:"YT",name:"马约特岛"},
// {code:"EU",name:"欧洲"},
{code:"BE",name:"比利时"},
{code:"DK",name:"丹麦"},
{code:"GB",name:"英国"},
{code:"DE",name:"德国"},
{code:"FR",name:"法国"},
{code:"IE",name:"爱尔兰"},
{code:"IT",name:"意大利"},
{code:"LU",name:"卢森堡"},
{code:"NL",name:"荷兰"},
{code:"GR",name:"希腊"},
{code:"PT",name:"葡萄牙"},
{code:"ES",name:"西班牙"},
// {code:"AL",name:"阿尔巴尼亚"},
// {code:"AD",name:"安道尔"},
{code:"AT",name:"奥地利"},
// {code:"BG",name:"保加利亚"},
{code:"FI",name:"芬兰"},
// {code:"GI",name:"直布罗陀"},
{code:"HU",name:"匈牙利"},
// {code:"IS",name:"冰岛"},
// {code:"LI",name:"列支敦士登"},
// {code:"MT",name:"马耳他"},
// {code:"MC",name:"摩纳哥"},
{code:"NO",name:"挪威"},
{code:"PL",name:"波兰"},
// {code:"RO",name:"罗马尼亚"},
// {code:"SM",name:"圣马力诺"},
{code:"SE",name:"瑞典"},
{code:"CH",name:"瑞士"},
// {code:"EE",name:"爱沙尼亚"},
// {code:"LV",name:"拉脱维亚"},
// {code:"LT",name:"立陶宛"},
// {code:"GE",name:"格鲁吉亚"},
// {code:"AM",name:"亚美尼亚"},
// {code:"AZ",name:"阿塞拜疆"},
// {code:"BY",name:"白俄罗斯"},
// {code:"MD",name:"摩尔多瓦"},
{code:"RU",name:"俄罗斯"},
{code:"UA",name:"乌克兰"},
// {code:"ME",name:"黑山"},
// {code:"SI",name:"斯洛文尼亚"},
// {code:"HR",name:"克罗地亚"},
// {code:"CZ",name:"捷克共和国"},
// {code:"SK",name:"斯洛伐克"},
// {code:"MK",name:"马其顿"},
// {code:"BA",name:"波黑"},
// {code:"VA",name:"梵蒂冈"},
// {code:"AG",name:"安提瓜和巴布达"},
// {code:"AR",name:"阿根廷"},
// {code:"AW",name:"阿鲁巴岛"},
// {code:"BS",name:"巴哈马"},
// {code:"BB",name:"巴巴多斯"},
// {code:"BZ",name:"伯利兹"},
// {code:"BO",name:"玻利维亚"},
// {code:"BR",name:"巴西"},
// {code:"KY",name:"开曼群岛"},
// {code:"CL",name:"智利"},
// {code:"CO",name:"哥伦比亚"},
// {code:"DM",name:"多米尼克共和国"},
// {code:"CR",name:"哥斯达黎加"},
// {code:"CU",name:"古巴"},
// {code:"DO",name:"多米尼加共和国"},
// {code:"EC",name:"厄瓜多尔"},
// {code:"GF",name:"法属圭亚那"},
// {code:"GD",name:"格林纳达"},
// {code:"GP",name:"瓜德罗普"},
// {code:"GT",name:"危地马拉"},
// {code:"GY",name:"圭亚那"},
// {code:"HT",name:"海地"},
// {code:"HN",name:"洪都拉斯"},
// {code:"JM",name:"牙买加"},
// {code:"MQ",name:"马提尼克"},
{code:"MX",name:"墨西哥"},
// {code:"MS",name:"蒙特塞拉特"},
// {code:"NI",name:"尼加拉瓜"},
// {code:"PA",name:"巴拿马"},
// {code:"PY",name:"巴拉圭"},
// {code:"PE",name:"秘鲁"},
// {code:"PR",name:"波多黎各"},
// {code:"LC",name:"圣卢西亚"},
// {code:"VC",name:"圣文森特和格林纳丁斯"},
// {code:"SV",name:"萨尔瓦多"},
// {code:"SR",name:"苏里南"},
// {code:"TT",name:"特立尼达和多巴哥"},
// {code:"TC",name:"特克斯和凯科斯群岛"},
// {code:"UY",name:"乌拉圭"},
// {code:"VE",name:"委内瑞拉"},
// {code:"VG",name:"英属维尔京群岛"},
// {code:"PM",name:"圣皮埃尔和密克隆"},
// {code:"AN",name:"荷属安地列斯群岛"},
// {code:"HA",name:"北美洲"},
{code:"CA",name:"加拿大"},
{code:"US",name:"美国"},
// {code:"GL",name:"格陵兰"},
// {code:"BM",name:"百慕大"},
// {code:"OA",name:"大洋洲"},
{code:"AU",name:"澳大利亚"},
// {code:"CK",name:"库克群岛"},
// {code:"FJ",name:"斐济"},
// {code:"NR",name:"瑙鲁"},
// {code:"NC",name:"新喀里多尼亚"},
// {code:"VU",name:"瓦努阿图"},
{code:"NZ",name:"新西兰"},
// {code:"NF",name:"诺福克岛"},
// {code:"PG",name:"巴布亚新几内亚"},
// {code:"SB",name:"所罗门群岛"},
// {code:"TO",name:"汤加"},
// {code:"AS",name:"美属萨摩亚"},
// {code:"KI",name:"基里巴斯"},
// {code:"TV",name:"图瓦卢"},
// {code:"FM",name:"密克罗尼西亚联邦"},
// {code:"MH",name:"马绍尔群岛"},
// {code:"PW",name:"帕劳共和国"},
// {code:"PF",name:"法属波利尼西亚"},
// {code:"WF",name:"瓦利斯和富图纳"},
// {code:"VD",name:"国(地)别不详的"},
// {code:"TW",name:"中国台湾"},
// {code:"CX",name:"圣诞岛"},
// {code:"CC",name:"科科斯群岛"},
// {code:"KN",name:"圣基茨和尼维斯"},
// {code:"BL",name:"圣巴泰勒米岛"},
// {code:"AI",name:"安圭拉"},
// {code:"CW",name:"库拉索"},
// {code:"MF",name:"法属圣马丁"},
// {code:"UM",name:"美国本土外小岛屿"},
// {code:"VI",name:"美属维京群岛"},
// {code:"SX",name:"荷属圣马丁"},
// {code:"GS",name:"南乔治亚岛和南桑威奇群岛"},
// {code:"NM",name:"南美洲"},
// {code:"FK",name:"马尔维纳斯群岛(福克兰)"},
// {code:"GU",name:"关岛"},
// {code:"MP",name:"北马里亚纳群岛"},
// {code:"TK",name:"托克劳"},
// {code:"PN",name:"皮特凯恩群岛"},
// {code:"NU",name:"纽埃"},
// {code:"WS",name:"萨摩亚"},
// {code:"RS",name:"塞尔维亚"},
// {code:"AX",name:"奥兰群岛"},
// {code:"GG",name:"根西岛"},
// {code:"FO",name:"法罗群岛"},
// {code:"JE",name:"泽西岛"},
// {code:"IM",name:"马恩岛"},
// {code:"SH",name:"圣赫勒拿"}
];