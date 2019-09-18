//<!-- 省市联动 -->
//定义数组，存储省份信息
var province = ["", "北京", "上海", "天津", "重庆", "浙江", "江苏", "广东", "福建", "湖南", "湖北", "辽宁",
    "吉林", "黑龙江", "河北", "河南", "山东", "陕西", "甘肃", "新疆", "青海", "山西", "四川",
    "贵州", "安徽", "江西", "云南", "内蒙古", "西藏", "广西", "宁夏", "海南", "香港", "澳门", "台湾", "其他"
];

//定义数组,存储城市信息
var empty = []
var beijing = ["", "东城区", "西城区", "海淀区", "朝阳区", "丰台区", "石景山区", "通州区", "顺义区", "房山区", "大兴区", "昌平区", "怀柔区", "平谷区", "门头沟区", "延庆县", "密云县"];
var shanghai = ["", "浦东新区", "徐汇区", "长宁区", "普陀区", "闸北区", "虹口区", "杨浦区", "黄浦区", "卢湾区", "静安区", "宝山区", "闵行区", "嘉定区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县"];
var tianjing = ["", "河东", "南开", "河西", "河北", "和平", "红桥", "东丽", "津南", "西青", "北辰", "塘沽", "汉沽", "大港", "蓟县", "宝坻", "宁河", "静海", "武清", "滨海新区"];
var chongqing = ["", "渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "万盛区", "双桥区", "渝北区", "巴南区", "万州区", "涪陵区", "黔江区", "长寿区", "江津区", "合川区", "永川区", "南川区", "铜梁区"];
var jiangsu = ["", "南京", "无锡", "常州", "徐州", "苏州", "南通", "连云港", "淮安", "扬州", "盐城", "镇江", "泰州", "宿迁"];
var zhejiang = ["", "杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "利水", "诸暨"];
var guangdong = ["", "广州", "韶关", "深圳", "珠海", "汕头", "佛山", "江门", "湛江", "茂名", "肇庆", "惠州", "梅州", "汕尾", "河源", "阳江", "清远", "东莞", "中山", "潮州", "揭阳"];
var fujiang = ["", "福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德"];
var hunan = ["", "长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州", "怀化", "娄底", "湘西土家苗族自治区"];
var hubei = ["", "武汉", "襄阳", "黄石", "十堰", "宜昌", "鄂州", "荆门", "孝感", "荆州", "黄冈", "咸宁", "随州", "恩施土家族苗族自治州", "潜江市", "天门市", "仙桃市"];
var liaoning = ["", "沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"];
var jilin = ["", "长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边朝鲜族自治区"];
var heilongjiang = ["", "哈尔滨", "齐齐哈尔", "鸡西", "牡丹江", "佳木斯", "大庆", "伊春", "黑河", "大兴安岭"];
var hebei = ["", "石家庄", "保定", "唐山", "邯郸", "承德", "廊坊", "衡水", "秦皇岛", "张家口"];
var henan = ["", "郑州", "洛阳", "商丘", "安阳", "南阳", "开封", "平顶山", "焦作", "新乡", "鹤壁", "许昌", "漯河", "三门峡", "信阳", "周口", "驻马店", "济源"];
var shandong = ["", "济南", "青岛", "菏泽", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "滨州", "德州", "聊城", "临沂"];
var shangxi = ["", "西安", "宝鸡", "咸阳", "渭南", "铜川", "延安", "榆林", "汉中", "安康", "商洛"];
var gansu = ["", "兰州", "嘉峪关", "金昌", "金川", "白银", "天水", "武威", "张掖", "酒泉", "平凉", "庆阳", "定西", "陇南", "临夏", "合作"];
var qinghai = ["", "西宁", "海东地区", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"];
var xinjiang = ["", "乌鲁木齐", "奎屯", "石河子", "昌吉", "吐鲁番", "库尔勒", "阿克苏", "喀什", "伊宁", "克拉玛依", "塔城", "哈密", "和田", "阿勒泰", "阿图什", "博乐"];
var shanxi = ["", "太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"];
var sichuan = ["", "成都", "自贡", "攀枝花", "泸州", "德阳", "绵阳", "广元", "遂宁", "内江", "乐山", "南充", "眉山", "宜宾", "广安", "达州", "雅安", "巴中", "资阳", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"];
var guizhou = ["", "贵阳", "六盘水", "遵义", "安顺", "黔南布依族苗族自治州", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "铜仁", "毕节"];
var anhui = ["", "合肥", "芜湖", "安庆", "马鞍山", "阜阳", "六安", "滁州", "宿州", "蚌埠", "巢湖", "淮南", "宣城", "亳州", "淮北", "铜陵", "黄山", "池州"];
var jiangxi = ["", "南昌", "九江", "景德镇", "萍乡", "新余", "鹰潭", "赣州", "宜春", "上饶", "吉安", "抚州"];
var yunnan = ["", "昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "楚雄彝族自治州", "大理白族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州"];
var neimenggu = ["", "呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "兴安", "阿拉善", "锡林郭勒", "满洲里", "二连浩特"];
var guangxi = ["", "南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州", "河池", "崇左"];
var xizang = ["", "拉萨", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "那曲地区", "阿里地区"];
var ningxia = ["", "银川", "石嘴山", "吴忠", "固原", "中卫"];
var hainan = ["", "海口", "三亚"];
var xianggang = ["", "中西区", "湾仔区", "东区", "南区", "九龙城区", "油尖旺区", "观塘区", "黄大仙区", "深水埗区", "北区", "大埔区", "沙田区", "西贡区", "元朗区", "屯门区", "荃湾区", "葵青区", "离岛区"];
var taiwan = ["", "台北", "高雄", "基隆", "台中", "台南", "新竹", "嘉义"];
var aomeng = ["", "澳门半岛", "氹仔岛", "路环岛"];
var qita = ["", "其他"]

//页面加载方法
$(function () {
    //设置省份数据
    setProvince();
    //设置背景颜色
    setBgColor();
});
//设置省份数据
function setProvince() {
    //给省份下拉列表赋值
    var option, modelVal;
    var $sel = $("#selProvince");
    //获取对应省份城市
    for (var i = 0, len = province.length; i < len; i++) {
        modelVal = province[i];
        option = "<option value='" + modelVal + "'>" + modelVal + "</option>";
        //添加到 select 元素中
        $sel.append(option);
    }
    //调用change事件，初始城市信息
    provinceChange();
}

//根据选中的省份获取对应的城市
function setCity(provinec) {
    var $city = $("#selCity");
    var proCity, option, modelVal;
    //通过省份名称，获取省份对应城市的数组名
    switch (provinec) {
        case "":
            proCity = empty;
            break;
        case "北京":
            proCity = beijing;
            break;
        case "上海":
            proCity = shanghai;
            break;
        case "天津":
            proCity = tianjing;
            break;
        case "重庆":
            proCity = chongqing;
            break;
        case "浙江":
            proCity = zhejiang;
            break;
        case "江苏":
            proCity = jiangsu;
            break;
        case "广东":
            proCity = guangdong;
            break;
        case "福建":
            proCity = fujiang;
            break;
        case "湖南":
            proCity = hunan;
            break;
        case "湖北":
            proCity = hubei;
            break;
        case "辽宁":
            proCity = liaoning;
            break;
        case "吉林":
            proCity = jilin;
            break;
        case "黑龙江":
            proCity = heilongjiang;
            break;
        case "河北":
            proCity = hebei;
            break;
        case "河南":
            proCity = henan;
            break;
        case "山东":
            proCity = shandong;
            break;
        case "陕西":
            proCity = shangxi;
            break;
        case "甘肃":
            proCity = gansu;
            break;
        case "新疆":
            proCity = xinjiang;
            break;
        case "青海":
            proCity = qinghai;
            break;
        case "山西":
            proCity = shanxi;
            break;
        case "四川":
            proCity = sichuan;
            break;
        case "贵州":
            proCity = guizhou;
            break;
        case "安徽":
            proCity = anhui;
            break;
        case "江西":
            proCity = jiangxi;
            break;
        case "云南":
            proCity = yunnan;
            break;
        case "内蒙古":
            proCity = neimenggu;
            break;
        case "西藏":
            proCity = xizang;
            break;
        case "广西":
            proCity = guangxi;
            break;
        case "宁夏":
            proCity = ningxia;
            break;
        case "海南":
            proCity = hainan;
            break;
        case "香港":
            proCity = xianggang;
            break;
        case "澳门":
            proCity = aomeng;
            break;
        case "台湾":
            proCity = taiwan;
            break;
        case "其他":
            proCity = qita;
            break;
    }

    //先清空之前绑定的值
    $city.empty();
    //设置对应省份的城市
    for (var i = 0, len = proCity.length; i < len; i++) {
        modelVal = proCity[i];
        option = "<option value='" + modelVal + "'>" + modelVal + "</option>";
        //添加
        $city.append(option);
    }

    //设置背景
    setBgColor();
}

//设置下拉列表间隔背景样色
function setBgColor() {
    var $option = $("select option:odd");
    $option.css({
        "background-color": "#DEDEDE"
    });
}

//省份选中事件
function provinceChange() {
    var $pro = $("#selProvince");
    console.log($pro.val())
    setCity($pro.val());
}

////////////////////////////////////////////////////////

// 地点修改
//设置省份数据
function setProvinceEdit() {
    //给省份下拉列表赋值
    var option, modelVal;
    var $sel = $("#selProvince-edit");
    //获取对应省份城市
    for (var i = 0, len = province.length; i < len; i++) {
        modelVal = province[i];
        option = "<option value='" + modelVal + "'>" + modelVal + "</option>";
        //添加到 select 元素中
        $sel.append(option);
    }
    //调用change事件，初始城市信息
    provinceChangeEdit();
}

//根据选中的省份获取对应的城市
function setCityEdit(provinec) {
    var $city = $("#selCity-edit");
    var proCity, option, modelVal;
    //通过省份名称，获取省份对应城市的数组名
    console.log(provinec)
    switch (provinec) {
        case "":
            proCity = empty;
            break;
        case "北京":
            proCity = beijing;
            break;
        case "上海":
            proCity = shanghai;
            break;
        case "天津":
            proCity = tianjing;
            break;
        case "重庆":
            proCity = chongqing;
            break;
        case "浙江":
            proCity = zhejiang;
            break;
        case "江苏":
            proCity = jiangsu;
            break;
        case "广东":
            proCity = guangdong;
            break;
        case "福建":
            proCity = fujiang;
            break;
        case "湖南":
            proCity = hunan;
            break;
        case "湖北":
            proCity = hubei;
            break;
        case "辽宁":
            proCity = liaoning;
            break;
        case "吉林":
            proCity = jilin;
            break;
        case "黑龙江":
            proCity = heilongjiang;
            break;
        case "河北":
            proCity = hebei;
            break;
        case "河南":
            proCity = henan;
            break;
        case "山东":
            proCity = shandong;
            break;
        case "陕西":
            proCity = shangxi;
            break;
        case "甘肃":
            proCity = gansu;
            break;
        case "新疆":
            proCity = xinjiang;
            break;
        case "青海":
            proCity = qinghai;
            break;
        case "山西":
            proCity = shanxi;
            break;
        case "四川":
            proCity = sichuan;
            break;
        case "贵州":
            proCity = guizhou;
            break;
        case "安徽":
            proCity = anhui;
            break;
        case "江西":
            proCity = jiangxi;
            break;
        case "云南":
            proCity = yunnan;
            break;
        case "内蒙古":
            proCity = neimenggu;
            break;
        case "西藏":
            proCity = xizang;
            break;
        case "广西":
            proCity = guangxi;
            break;
        case "宁夏":
            proCity = ningxia;
            break;
        case "海南":
            proCity = hainan;
            break;
        case "香港":
            proCity = xianggang;
            break;
        case "澳门":
            proCity = aomeng;
            break;
        case "台湾":
            proCity = taiwan;
            break;
        case "其他":
            proCity = qita;
            break;
        default:
            proCity = empty;
            break;
    }

    //先清空之前绑定的值
    $city.empty();
    //设置对应省份的城市
    for (var i = 0, len = proCity.length; i < len; i++) {
        modelVal = proCity[i];
        option = "<option value='" + modelVal + "'>" + modelVal + "</option>";
        //添加
        $city.append(option);
    }

    //设置背景
    setBgColor();
}

//省份选中事件
function provinceChangeEdit() {
    var $pro = $("#selProvince-edit");
    console.log($pro.val())
    setCityEdit($pro.val());
}

//过滤函数（如果为空，自动补零）
function autoAddZero(str) {
    var strFilter = null;
    return strFilter = (str == '') ? 0 : str;
}
//过滤函数（如果为零，变为空）
function autoDeleteZero(str) {
    var strFilter = null;
    return strFilter = (str == 0) ? '' : str;
}
//
// 购物车
var shopData = '';
var shopNum = 0;
$('#shopCar').on('click', function () {
    // console.log(shopData)
    var shopData02 = '[' + shopData.slice(0, shopData.length - 1) + ']'
    // console.log(shopData02)
    if (shopNum == 0) {
        layer.alert('购物车为空', {
            icon: 5
        })
    } else {
        layer.open({
            type: 2,
            title: '我的购物车',
            shadeClose: false,
            // shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['900px', '700px'],
            content: 'class-shopCar.html',
            success: function (layero, index) {
                layer.full(index)
                // console.log(layero, index);
                var body = layer.getChildFrame('body', index);
                var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                // console.log(body.html()) //得到iframe页的body内容
                body.find('#initialData').text(shopData02) //传输得到购物数据
                iframeWin.getShopCarData() //调用数据
            }
        });
    }
})

//数据导出等
layui.use('table', function () {
    var table = layui.table;
    //监听表格复选框选择
    table.on('checkbox(demo)', function (obj) {
        console.log(obj)
    });

    //监听工具条
    table.on('tool(demo)', function (obj) {
        // console.log(obj)
        var data = obj.data;
        if (obj.event === 'detail') {
            // layer.alert('编辑行：<br>'+ JSON.stringify(data))
            shopData = shopData + JSON.stringify(data) + ','
            // console.log(shopData)
            shopNum++;
            $('#shopNum').text(shopNum)
            // console.log(shopNum)
            layer.msg('添加成功', {
                icon: 6,
                shade: [0.3, '#000'],
                time: 1000
            });

        } else if (obj.event === 'del') {
            layer.confirm('真的删除本条数据吗', {
                icon: 3,
                title: '系统提示'
            }, function (index) {
                $.ajax({
                    type: "get",
                    async: false,
                    data: {
                        "schoolId": data.id
                    }, //提交的参数
                    url: 'http://' + changeUrl.address + '/manager/school/delete.do',
                    contentType: 'application/json;charset=UTF-8',
                    dataType: "json", //数据类型为jsonp  
                    success: function (msg) {
                        console.log(msg)
                        if (msg.msg == '删除学校信息成功') {
                            layer.msg('删除成功')
                            obj.del();
                            layer.close(index);
                        }
                    },
                    error: function () {
                        alert('网络繁忙，请稍后再试！');
                    }
                });
            });
        } else if (obj.event === 'edit') {
            console.log(data.id)
            $('#alter_old_School_id').val(data.id)
            //数据修改
            // layer.alert('编辑行：<br>'+ JSON.stringify(data))
            var msg = obj.data
            layer.open({
                type: 1,
                title: msg.School_name + '-信息修改',
                shadeClose: false,
                //                        shade: true,
                maxmin: true, //开启最大化最小化按钮
                area: [$(window).width() * 0.7 + 'px', $(window).height() * 0.7 + 'px'],
                content: $('#formEdit'),
                success: function (layereo, index) {
                        layer.full(index)
                    }
                    //,btn: ['上传学校logo图片', '上传学校展示图片']
                    ,
                yes: function (index, layero) {
                    //按钮【按钮一】的回调
                    //                         layer.open({
                    //                             type: 2,
                    //                             title: msg.School_name+'-logo上传',
                    //                             shadeClose: false,
                    // //                        shade: true,
                    //                             maxmin: true, //开启最大化最小化按钮
                    //                             area: ['900px', '600px'],
                    //                             content: ['./up-school.html','no'],
                    //                             success: function(layero, index){
                    //                                 // console.log(layero, index);
                    //                                 var body = layer.getChildFrame('body', index);
                    //                                 var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                    //                                 iframeWin.autoClick()
                    //                                 // console.log(body.html()) //得到iframe页的body内容
                    //                                 body.find('#alter_old_School_id').val(msg.Id)    //传输得到学校Id
                    //                             }
                    //                         });
                },
                btn2: function (index, layero) {
                    //按钮【按钮二】的回调
                    //                         layer.open({
                    //                             type: 2,
                    //                             title:  msg.School_name+'-展示图片上传',
                    //                             shadeClose: true,
                    // //                        shade: true,
                    //                             maxmin: true, //开启最大化最小化按钮
                    //                             area: ['900px','600px'],
                    //                             content: ['./up-school.html','no'],
                    //                             success: function(layero, index){
                    //                                 // console.log(layero, index);
                    //                                 var body = layer.getChildFrame('body', index);
                    //                                 var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                    //                                 iframeWin.autoShowClick()
                    //                                 // console.log(body.html()) //得到iframe页的body内容
                    //                                 body.find('#alter_old_School_id').val(msg.Id)    //传输得到学校Id
                    //                             }

                    //                         });
                    //                         return false  //开启该代码可禁止点击该按钮关闭
                }
            });

            // 数据渲染
            layui.use('form', function () {

                console.log(msg)
                console.log('-------------------------------')
                var form = layui.form
                form.render();
                //数据赋值
                setProvinceEdit() //先设置省份数据
                // console.log(msg.Areas)
                setCityEdit(autoDeleteZero(msg.areas)) //设置地区数据      
                $('#School_name-edit').val(autoDeleteZero(msg.schoolName)),
                $('#School_EnglishName-edit').val(autoDeleteZero(msg.schoolEnglishname)),
                $('#School_properties-edit').val(autoDeleteZero(msg.schoolProperties)),
                $("#selProvince-edit option[value='" + autoDeleteZero(msg.areas) + "']").attr("selected", true),
                $("#selCity-edit option[value='" + autoDeleteZero(msg.areas02) + "']").attr("selected", true),
                $('#Areas03-edit').val(autoDeleteZero(msg.areas03)),
                $('#Founded_time-edit').val(autoDeleteZero(msg.foundedTime)),
                $('#OperationState-edit').val(autoDeleteZero(msg.operationstate)),
                $('#School_system-edit').val(autoDeleteZero(msg.schoolSystem)),

                $('#Tuition01-edit').val(autoDeleteZero(msg.tuition01)),
                $('#Tuition02-edit').val(autoDeleteZero(msg.tuition02)),
                $('#Tuition03-edit').val(autoDeleteZero(msg.tuition03)),
                $('#Tuition04-edit').val(autoDeleteZero(msg.tuition04)),

                $('#TuitionHigh-edit').val(autoDeleteZero(msg.TuitionHigh)),
                $('#Website-edit').val(autoDeleteZero(msg.website)),
                $('#Telephone-edit').val(autoDeleteZero(msg.telephone)),
                $('#Inter_Course_Founded_time-edit').val(autoDeleteZero(msg.interCourseFoundedTime)),
                $('#Course-edit').val(autoDeleteZero(msg.course)),
                $('#Authentication-edit').val(autoDeleteZero(msg.authentication)),
                $('#Course_evaluation-edit').val(autoDeleteZero(msg.courseEvaluation)),

                $('#Student_Num01-edit').val(autoDeleteZero(msg.studentNum01)),
                $('#Student_Num02-edit').val(autoDeleteZero(msg.studentNum02)),
                $('#Student_Num03-edit').val(autoDeleteZero(msg.studentNum03)),
                $('#Student_Num04-edit').val(autoDeleteZero(msg.studentNum04)),

                $('#Student_Num_All-edit').val(autoDeleteZero(msg.studentNumAll)),
                $('#Student_Capacity-edit').val(autoDeleteZero(msg.studentCapacity)),
                $('#Graduated_Stu_Num-edit').val(autoDeleteZero(msg.graduatedStuNum)),
                $('#Stu_Dominant_nationality-edit').val(autoDeleteZero(msg.stuDominantNationality)),
                $('#Stu_Year_Investment-edit').val(autoDeleteZero(msg.stuYearInvestment)),
                $('#Club_Num-edit').val(autoDeleteZero(msg.clubNum)),
                $('#President_Country-edit').val(autoDeleteZero(msg.presidentCountry)),
                $('#Staff_Num-edit').val(autoDeleteZero(msg.staffNum)),
                $('#Teacher_Num-edit').val(autoDeleteZero(msg.teacherNum)),
                $('#Foreign_Teacher_num-edit').val(autoDeleteZero(msg.foreignTeacherNum)),
                $('#Teacher_Year_Investment-edit').val(autoDeleteZero(msg.teacherYearInvestment)),
                $('#Teacher_Retention-edit').val(autoDeleteZero(msg.teacherRetention)),
                $('#Teacher_Salary-edit').val(autoDeleteZero(msg.teacherSalary)),
                $('#Teacher_Stu_ratio-edit').val(autoDeleteZero(msg.teacherStuRatio)),
                $('#Covered_Area-edit').val(autoDeleteZero(msg.coveredArea)),
                $('#Built_Area-edit').val(autoDeleteZero(msg.builtArea)),
                $('#Hardware-edit').val(autoDeleteZero(msg.hardware)),
                $('#Investment-edit').val(autoDeleteZero(msg.investment)),
                $('#Remark-edit').val(autoDeleteZero(msg.remark)),
                $('#Recent_Modifier-edit').val(autoDeleteZero(msg.recentModifier)),
                $('#Load_People-edit').val(autoDeleteZero(msg.loadPeople)),
                $('#Load_Time-edit').val(autoDeleteZero(msg.loadTime)),

                $('#certificate_authority-edit').val(autoDeleteZero(msg.certificateAuthority)),
                $('#student_evaluation-edit').val(autoDeleteZero(msg.studentEvaluation)),
                $('#third_organizations-edit').val(autoDeleteZero(msg.thirdOrganizations)),
                $('#course_authority-edit').val(autoDeleteZero(msg.courseAuthority)),

                $('#alter_old_School_id-edit').val(msg.id)
                $('#uploadSchoolLogoImgSrc').attr('src', 'https://data.xinxueshuo.cn' + msg.schoolLogo)
                $('#uploadSchoolLogoImgSrc').attr('data', msg.schoolLogo)

                $('#schoolShowSrc1').attr('src', msg.schoolShow)
                $('#schoolShowSrc021').attr('src', msg.img02)
                $('#schoolShowSrc031').attr('src', msg.img03)
                $('#schoolShowSrc041').attr('src', msg.img04)
                $('#schoolShowSrc051').attr('src', msg.img05)
                form.render();
                //监听一级菜单选中
                form.on('select(myselect-edit)', function (data) {
                    console.log(data);
                    provinceChangeEdit()
                    //重要！重新渲染一次，否则二级菜单出不来
                    form.render();
                });

                form.on('submit(school-revise)', function (res) {
                    //验证官网 前缀 和 最后一个字符
                    let SumWebsite = $('#Website-edit').val();
                    if (/(https):\/\/([\w.]+\/?)\S*/.test(SumWebsite)) {
                        SumWebsite = SumWebsite.substring(8)
                    } else {
                        if (/(http):\/\/([\w.]+\/?)\S*/.test(SumWebsite)) {
                            SumWebsite = SumWebsite.substring(7)
                        }
                    }
                    if (SumWebsite.charAt(SumWebsite.length - 1) == "/") {
                        SumWebsite = SumWebsite.substring(0, SumWebsite.length - 1)
                    }
                    console.log(SumWebsite)
                    //提交form表单
                    var insertData = {
                        'schoolName': autoAddZero($('#School_name-edit').val()),
                        'schoolEnglishname': autoAddZero($('#School_EnglishName-edit').val()),
                        'schoolProperties': autoAddZero($('#School_properties-edit').val()),
                        'areas': autoAddZero($('#selProvince-edit').val()),
                        'areas02': autoAddZero($('#selCity-edit').val()),
                        'areas03': autoAddZero($('#Areas03-edit').val()),
                        'foundedTime': autoAddZero($('#Founded_time-edit').val()),
                        'operationstate': autoAddZero($('#OperationState-edit').val()),
                        'schoolSystem': autoAddZero($('#School_system-edit').val()),
                        'tuitionhigh': autoAddZero($('#TuitionHigh-edit').val()),

                        'tuition01': autoAddZero($('#Tuition01-edit').val()),
                        'tuition02': autoAddZero($('#Tuition02-edit').val()),
                        'tuition03': autoAddZero($('#Tuition03-edit').val()),
                        'tuition04': autoAddZero($('#Tuition04-edit').val()),


                        'website': autoAddZero(SumWebsite),
                        'telephone': autoAddZero($('#Telephone-edit').val()),
                        'interCourseFoundedTime': autoAddZero($('#Inter_Course_Founded_time-edit').val()),
                        'course': autoAddZero($('#Course-edit').val()) == "" ? "无" : autoAddZero($('#Course-edit').val()),
                        'authentication': autoAddZero($('#Authentication-edit').val()),
                        'courseEvaluation': autoAddZero($('#Course_evaluation-edit').val()),
                        'studentNumAll': autoAddZero($('#Student_Num_All-edit').val()),

                        'studentNum01': autoAddZero($('#Student_Num01-edit').val()),
                        'studentNum02': autoAddZero($('#Student_Num02-edit').val()),
                        'studentNum03': autoAddZero($('#Student_Num03-edit').val()),
                        'studentNum04': autoAddZero($('#Student_Num04-edit').val()),

                        'studentCapacity': autoAddZero($('#Student_Capacity-edit').val()),
                        'graduatedStuNum': autoAddZero($('#Graduated_Stu_Num-edit').val()),
                        'stuDominantNationality': autoAddZero($('#Stu_Dominant_nationality-edit').val()),
                        'stuYearInvestment': autoAddZero($('#Stu_Year_Investment-edit').val()),
                        'clubNum': autoAddZero($('#Club_Num-edit').val()),
                        'presidentCountry': autoAddZero($('#President_Country-edit').val()),
                        'staffNum': autoAddZero($('#Staff_Num-edit').val()),
                        'teacherNum': autoAddZero($('#Teacher_Num-edit').val()),
                        'foreignTeacherNum': autoAddZero($('#Foreign_Teacher_num-edit').val()),
                        'teacherYearInvestment': autoAddZero($('#Teacher_Year_Investment-edit').val()),
                        'teacherRetention': autoAddZero($('#Teacher_Retention-edit').val()),
                        'teacherSalary': autoAddZero($('#Teacher_Salary-edit').val()),
                        'teacherStuRatio': autoAddZero($('#Teacher_Stu_ratio-edit').val()),
                        'coveredArea': autoAddZero($('#Covered_Area-edit').val()),
                        'builtArea': autoAddZero($('#Built_Area-edit').val()),
                        'hardware': autoAddZero($('#Hardware-edit').val()),
                        'investment': autoAddZero($('#Investment-edit').val()),
                        'remark': autoAddZero($('#Remark-edit').val()),

                        "loadPeople": $.cookie('username'),
                        "certificateAuthority": autoAddZero($('#certificate_authority-edit').val()) == "" ? "无" : autoAddZero($('#certificate_authority-edit').val()),
                        "studentEvaluation": autoAddZero($('#student_evaluation-edit').val()) == "" ? "无" : autoAddZero($('#student_evaluation-edit').val()),
                        "thirdOrganizations": autoAddZero($('#third_organizations-edit').val()) == "" ? "无" : autoAddZero($('#third_organizations-edit').val()),
                        "courseAuthority": autoAddZero($('#course_authority-edit').val()) == "" ? "无" : autoAddZero($('#course_authority-edit').val()),
                        "id": msg.id,
                        "schoolLogo": $('#uploadSchoolLogoImgSrc').attr('data'),
                        "schoolShow": $('#schoolShowSrc1').attr('src'),
                        "img02": $('#schoolShowSrc021').attr('src'),
                        "img03": $('#schoolShowSrc031').attr('src'),
                        "img04": $('#schoolShowSrc041').attr('src'),
                        "img05": $('#schoolShowSrc051').attr('src'),
                    }
                    $.ajax({
                        type: "post",
                        async: false,
                        traditional: true,
                        data: insertData, //提交的参数
                        url: 'http://' + changeUrl.address + '/manager/school/modify_school.do',
                        success: function (msg) {
                            console.log(insertData)
                            if (msg.msg == '修改学校信息成功') {
                                layer.alert('修改成功', function () {
                                    window.location.reload()
                                })
                            }
                        },
                        error: function () {
                            layer.alert('网络繁忙，请稍后再试！');
                        }
                    });
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                })
            })


        }
    });

    var $ = layui.$,
        active = {
            getCheckData: function () { //获取选中数据
                var checkStatus = table.checkStatus('idTest'),
                    data = checkStatus.data;
                // layer.alert(JSON.stringify(data));
                var initData = JSON.stringify(data)
                // console.log(initData)
                if (initData == '[]') {
                    layer.alert('请先选择数据', {
                        icon: 5
                    })
                } else {
                    layer.confirm('确定要导出数据吗？', {
                        icon: 3,
                        btn: ['确定', '取消'], //按钮
                        title: '系统提示'
                    }, function () {
                        layer.alert('导出成功', {
                            icon: 6,
                            title: '系统提示'
                        });
                        var newData = initData.replace(/schoolName/g, "学校中文名").replace(/schoolEnglishname/g, "学校英文名").replace(/schoolProperties/g, "类型")
                            .replace(/areas/g, "省").replace(/省02/g, "市").replace(/省03/g, "详细地址").replace(/foundedTime/g, "成立时间").replace(/operationstate/g, "运营状态")
                            .replace(/schoolSystem/g, "学制").replace(/tuition01/g, "幼儿园学费").replace(/tuition02/g, "小学学费").replace(/tuition03/g, "初中学费").replace(/tuition04/g, "高中学费")
                            .replace(/website/g, "官网").replace(/telephone/g, "电话").replace(/interCourseFoundedTime/g, "国际课程认证时间")
                            .replace(/course/g, "国际课程").replace(/authentication/g, "认证").replace(/courseEvaluation/g, "外部考试与评估").replace(/studentNumAll/g, "总在校生（国际部）")
                            .replace(/studentNum01/g, "幼儿园学生数").replace(/studentNum02/g, "小学学生数").replace(/studentNum03/g, "初中学生数").replace(/studentNum04/g, "高中学生数")
                            .replace(/studentCapacity/g, "总容量（国际部").replace(/graduatedStuNum/g, "毕业班人数（国际部）").replace(/stuDominantNationality/g, "学生主要国籍")
                            .replace(/stuYearInvestment/g, "生均年投入").replace(/clubNum/g, "俱乐部数量").replace(/staffNum/g, "总员工数量").replace(/presidentCountry/g, "校长/国际部主任国籍").replace(/presidentCountry/g, "校长/国际部主任国籍")
                            .replace(/teacherNum/g, "总教师数量").replace(/foreignTeacherNum/g, "外籍教师数量").replace(/teacherYearInvestment/g, "师均年培训投入").replace(/teacherRetention/g, "教师流失率")
                            .replace(/teacherSalary/g, "教师薪酬（三年经验）").replace(/teacherStuRatio/g, "师生比").replace(/coveredArea/g, "占地面积（亩）").replace(/builtArea/g, "建筑面积")
                            .replace(/hardware/g, "硬件设施").replace(/investment/g, "投资信息").replace(/remark/g, "备注").replace(/loadPeople/g, "提交人").replace(/loadTime/g, "提交时间")
                            .replace(/certificateAuthority/g, "主流学术保障认证机构").replace(/studentEvaluation/g, "学生评测").replace(/thirdOrganizations/g, "第三方组织机构").replace(/loadPeople/g, "课程")
                        console.log(JSON.parse(newData))
                        downloadExl(JSON.parse(newData))
                    }, function () {
                        layer.msg('您取消了导出', {
                            time: 3000, //20s后自动关闭
                            // btn: ['确定']
                        });
                    });
                }

            },
            getCheckLength: function () { //获取选中数目
                var checkStatus = table.checkStatus('idTest'),
                    data = checkStatus.data;
                layer.msg('选中了：' + data.length + ' 个');
            },
            isAll: function () { //验证是否全选
                    var checkStatus = table.checkStatus('idTest');
                    layer.msg(checkStatus.isAll ? '全选' : '未全选')
                }
                //（执行搜索）数据重载
                ,
            reload: function () {
                var schoolSearchType = $('#schoolSearch');
                var schoolSearchValue = $('#schoolSearchValue')
                console.log(schoolSearchType.val())
                //执行重载
                table.reload('idTest', {
                    url: 'http://' + changeUrl.address + '/manager/school/list.do',
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        type: schoolSearchType.val(),
                        searchKey: schoolSearchValue.val(),
                        verifyCode: '1'
                    } //需要传递的参数

                });
            }
        };

    $('.demoTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //搜素添加回车事件
    $('#schoolSearchValue').keydown(function (e) {
        var curKey = e.which
        var schoolSearchType = $('#schoolSearch');
        var schoolSearchValue = $('#schoolSearchValue');
        if (curKey == 13) {
            //执行重载
            table.reload('idTest', {
                url: 'http://' + changeUrl.address + '/manager/school/list.do',
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    type: schoolSearchType.val(),
                    searchKey: schoolSearchValue.val(),
                    verifyCode: '1'
                } //需要传递的参数
            });
        }
    })

    //////////////////////////////////////////////////////////

});

//新增学校信息
layui.use('form', function () {
    var form = layui.form
    //自定义验证规则
    form.verify({
        foundTime: [/^$|^\d{4}$/, '必须为四位整数'],
        checkFloat: [/^$|^(-?\d+)(\.\d+)?$/, '必须为数字'],
        checkInt: [/^$|^[1-9]\d*$/, '必须为整数']
    });

    //监听一级菜单选中
    form.on('select(myselect01)', function (data) {
        console.log(data);
        provinceChange()
        //重要！重新渲染一次，否则二级菜单出不来
        form.render();
    });

    //监听提交
    form.on('submit(demo1)', function (res) {
        console.log("---------")
        // console.log(res)
        // console.log(autoAddZero);
        //验证官网 前缀 和 最后一个字符
        let SumWebsite = $('#Website').val();
        if (/(https):\/\/([\w.]+\/?)\S*/.test(SumWebsite)){
            SumWebsite = SumWebsite.substring(8)
        }else{
            if (/(http):\/\/([\w.]+\/?)\S*/.test(SumWebsite)){
                SumWebsite = SumWebsite.substring(7) 
            }
        }
        if(SumWebsite.charAt(SumWebsite.length-1) == "/"){
            SumWebsite = SumWebsite.substring(0,SumWebsite.length-1) 
        }
        // layer.alert(JSON.stringify(res.field), {
        //     title: '最终的提交信息'
        // })
        //提交form 表单
        var insertData = {
            'schoolName': autoAddZero($('#School_name').val()),
            'schoolEnglishname': autoAddZero($('#School_EnglishName').val()),
            'schoolProperties': autoAddZero($('#School_properties').val()),
            'areas': autoAddZero($('#selProvince').val()),
            'areas02': autoAddZero($('#selCity').val()),
            'areas03': autoAddZero($('#Areas03').val()),
            'foundedTime': autoAddZero($('#Founded_time').val()),
            'operationstate': autoAddZero($('#OperationState').val()),
            'schoolSystem': autoAddZero($('#School_system').val()),

            'tuition01': autoAddZero($('#Tuition01').val()),
            'tuition02': autoAddZero($('#Tuition02').val()),
            'tuition03': autoAddZero($('#Tuition03').val()),
            'tuition04': autoAddZero($('#Tuition04').val()),

            'tuitionhigh': autoAddZero($('#TuitionHigh').val()),
            'website': autoAddZero(SumWebsite),
            'telephone': autoAddZero($('#Telephone').val()),
            'interCourseFoundedTime': autoAddZero($('#Inter_Course_Founded_time').val()),
            'course': autoAddZero($('#Course').val()) == "" ? "无" : autoAddZero($('#Course').val()),
            'authentication': autoAddZero($('#Authentication').val()),
            'courseEvaluation': autoAddZero($('#Course_evaluation').val()),

            'studentNum01': autoAddZero($('#Student_Num01').val()),
            'studentNum02': autoAddZero($('#Student_Num02').val()),
            'studentNum03': autoAddZero($('#Student_Num03').val()),
            'studentNum04': autoAddZero($('#Student_Num04').val()),

            'studentNumAll': autoAddZero($('#Student_Num_All').val()),
            'studentCapacity': autoAddZero($('#Student_Capacity').val()),
            'graduatedStuNum': autoAddZero($('#Graduated_Stu_Num').val()),
            'stuDominantNationality': autoAddZero($('#Stu_Dominant_nationality').val()),
            'stuYearInvestment': autoAddZero($('#Stu_Year_Investment').val()),
            'clubNum': autoAddZero($('#Club_Num').val()),
            'presidentCountry': autoAddZero($('#President_Country').val()),
            'staffNum': autoAddZero($('#Staff_Num').val()),
            'teacherNum': autoAddZero($('#Teacher_Num').val()),
            'foreignTeacherNum': autoAddZero($('#Foreign_Teacher_num').val()),
            'teacherYearInvestment': autoAddZero($('#Teacher_Year_Investment').val()),
            'teacherRetention': autoAddZero($('#Teacher_Retention').val()),
            'teacherSalary': autoAddZero($('#Teacher_Salary').val()),
            'teacherStuRatio': autoAddZero($('#Teacher_Stu_ratio').val()),
            'coveredArea': autoAddZero($('#Covered_Area').val()),
            'builtArea': autoAddZero($('#Built_Area').val()),
            'hardware': autoAddZero($('#Hardware').val()),
            'investment': autoAddZero($('#Investment').val()),
            'remark': autoAddZero($('#Remark').val()),
            "certificateAuthority": autoAddZero($('#certificate_authority').val()) == "" ? "无" : autoAddZero($('#certificate_authority').val()),
            "studentEvaluation": autoAddZero($('#student_evaluation').val()) == "" ? "无" : autoAddZero($('#student_evaluation').val()),
            "thirdOrganizations": autoAddZero($('#third_organizations').val()) == "" ? "无" : autoAddZero($('#third_organizations').val()),
            "courseAuthority": autoAddZero($('#course_authority').val()) == "" ? "无" : autoAddZero($('#course_authority').val()),
            "loadPeople": $.cookie('username'),

            //"member_sign":$.cookie('usertitle')
        }
        // console.log(insertData)
          $.ajax({
              type: "post",
              async: false,
              traditional: true,
              data: insertData,//提交的参数
              url: 'http://' + changeUrl.address + '/manager/school/addSchool.do',

              success: function (msg) {
                  console.log(msg)
                  if(msg.msg =='添加学校信息成功'){
                      layer.alert('提交成功',function () {
                          window.location.reload()
                      })
                  }
              },
              error: function () {
                  alert('网络繁忙，请稍后再试！');
              }
          });
         return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

})
//新增学校信息（弹窗）
$('#addSchool').on('click', function () {
    layui.use('layer', function () {
        layer.open({
            type: 1,
            title: '学校库-新增',
            shadeClose: false,
            maxmin: true, //开启最大化最小化按钮
            area: [$(window).width() * 0.7 + 'px', $(window).height() * 0.7 + 'px'],
            content: $('#layerForm'),
            success: function (layereo, index) {
                layer.full(index)
            }
        });
    });

})


//chrome动态加载JS 代码：
//@ sourceURL=dynamicScript.js
var setPos = function (o) {
    if (o.setSelectionRange) { //W3C
        setTimeout(function () {
            o.setSelectionRange(o.value.length, o.value.length);
            o.focus();
        }, 0);
    } else if (o.createTextRange) { //IE
        var textRange = o.createTextRange();
        textRange.moveStart("character", o.value.length);
        textRange.moveEnd("character", 0);
        textRange.select();
    }
};

//学制点击按钮输入
function Insert(str, objId) {
    var obj = document.getElementById(objId);
    setPos(obj);
    if (document.selection) {
        obj.focus();
        var sel = document.selection.createRange();
        document.selection.empty();
        sel.text = str;
    } else {
        var prefix, main, suffix;
        prefix = obj.value.substring(0, obj.selectionStart);
        main = obj.value.substring(obj.selectionStart, obj.selectionEnd);
        suffix = obj.value.substring(obj.selectionEnd);
        obj.value = prefix + str + suffix;
    }
    obj.focus();
}

function appendZero(n) {
    return n >= 0 && n < 10 ? "0" + n : "" + n
}

// 导出excel表格start
function downloadExl(data, type) {

    var oDate = new Date()
    var year = oDate.getFullYear() //获取年份
    var month = oDate.getMonth() + 1 // 获取月份
    var day = oDate.getDate() //获取日期
    var hour = oDate.getHours() //获取小时
    var minute = oDate.getMinutes() // 获取分
    var str = year + '-' + appendZero(month) + '-' + appendZero(day) + ' ' + appendZero(hour) + ':' + appendZero(minute)
    console.log(str)

    var prefix = 'nsi-school-'
    if ($('#provinceChoose').val() !== '') {
        prefix = 'nsi-school-' + $('#provinceChoose').val() + '-'
    }

    var keys = Object.keys(data[0]);
    var firstRow = {};
    keys.forEach(function (item) {
        firstRow[item] = item;
    });
    data.unshift(firstRow);
    var content = {};

    // 把json格式的数据转为excel的行列形式
    var sheetsData = data.map(function (item, rowIndex) {
        return keys.map(function (key, columnIndex) {
            return Object.assign({}, {
                value: item[key],
                position: (columnIndex > 25 ? getCharCol(columnIndex) : String.fromCharCode(65 + columnIndex)) + (rowIndex + 1),
            });
        });
    }).reduce(function (prev, next) {
        return prev.concat(next);
    });

    sheetsData.forEach(function (item, index) {
        content[item.position] = {
            v: item.value
        };
    });

    //设置区域,比如表格从A1到D10,SheetNames:标题，
    var coordinate = Object.keys(content);
    var workBook = {
        SheetNames: ["helloSheet"],
        Sheets: {
            "helloSheet": Object.assign({}, content, {
                "!ref": coordinate[0] + ":" + coordinate[coordinate.length - 1]
            }),
        }
    };
    //这里的数据是用来定义导出的格式类型
    var excelData = XLSX.write(workBook, {
        bookType: "xlsx",
        bookSST: false,
        type: "binary"
    });
    var blob = new Blob([string2ArrayBuffer(excelData)], {
        type: ""
    });
    saveAs(blob, prefix + str + ".xlsx");
}
//字符串转字符流
function string2ArrayBuffer(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
    // let temCol = "",
    var temCol = "",
        s = "",
        m = 0
    while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
    }
    return s
}
// 导出excel表格end

//导出全部数据
$('#uploadAllData').on("click", function () {

    layer.confirm('确定要导出全部数据吗？', {
        icon: 3,
        btn: ['确定', '取消'], //按钮
        title: '系统提示'
    }, function () {
        var index = layer.msg('数据导出中,请稍后...', {
            icon: 16,
            time: 200000 //2秒关闭（如果不配置，默认是3秒）
                ,
            shade: [0.8, '#000']
        });

        $.ajax({
            type: 'get',
            async: true,
            url: 'http://' + changeUrl.address + '/manager/school/list.do',
            dataType: "json",
            data: {
                type: 0,
                verifyCode: '1',
                searchKey: '',
                pageNum: 1,
                pageSize: 1300
            },
            success: function (res) {
                console.log(res)
                var initData = JSON.stringify(res.data)
                var newData = initData.replace(/schoolName/g, "学校中文名").replace(/schoolEnglishname/g, "学校英文名").replace(/schoolProperties/g, "类型")
                    .replace(/areas/g, "省").replace(/省02/g, "市").replace(/省03/g, "详细地址").replace(/foundedTime/g, "成立时间").replace(/operationstate/g, "运营状态")
                    .replace(/schoolSystem/g, "学制").replace(/tuition01/g, "幼儿园学费").replace(/tuition02/g, "小学学费").replace(/tuition03/g, "初中学费").replace(/tuition04/g, "高中学费")
                    .replace(/website/g, "官网").replace(/telephone/g, "电话").replace(/interCourseFoundedTime/g, "国际课程认证时间")
                    .replace(/course/g, "国际课程").replace(/authentication/g, "认证").replace(/courseEvaluation/g, "外部考试与评估").replace(/studentNumAll/g, "总在校生（国际部）")
                    .replace(/studentNum01/g, "幼儿园学生数").replace(/studentNum02/g, "小学学生数").replace(/studentNum03/g, "初中学生数").replace(/studentNum04/g, "高中学生数")
                    .replace(/studentCapacity/g, "总容量（国际部").replace(/graduatedStuNum/g, "毕业班人数（国际部）").replace(/stuDominantNationality/g, "学生主要国籍")
                    .replace(/stuYearInvestment/g, "生均年投入").replace(/clubNum/g, "俱乐部数量").replace(/staffNum/g, "总员工数量").replace(/presidentCountry/g, "校长/国际部主任国籍").replace(/presidentCountry/g, "校长/国际部主任国籍")
                    .replace(/teacherNum/g, "总教师数量").replace(/foreignTeacherNum/g, "外籍教师数量").replace(/teacherYearInvestment/g, "师均年培训投入").replace(/teacherRetention/g, "教师流失率")
                    .replace(/teacherSalary/g, "教师薪酬（三年经验）").replace(/teacherStuRatio/g, "师生比").replace(/coveredArea/g, "占地面积（亩）").replace(/builtArea/g, "建筑面积")
                    .replace(/hardware/g, "硬件设施").replace(/investment/g, "投资信息").replace(/remark/g, "备注").replace(/loadPeople/g, "提交人").replace(/loadTime/g, "提交时间")
                    .replace(/certificateAuthority/g, "主流学术保障认证机构").replace(/studentEvaluation/g, "学生评测").replace(/thirdOrganizations/g, "第三方组织机构").replace(/loadPeople/g, "课程")
                console.log(JSON.parse(newData))
                downloadExl(JSON.parse(newData))
                layer.alert('导出成功', {
                    icon: 6,
                    skin: 'layui-layer-molv',
                    title: '系统提示',
                    closeBtn: 0
                })
            },
            error: function () {
                layer.alert('服务器繁忙，请稍后再试')
            }
        })
    }, function () {
        layer.msg('您取消了导出', {
            time: 3000
        })
    })

})

//省份导出数据弹窗
$('#provinceData').on('click', function () {
    layui.use('layer', function () {
        var layer = layui.layer
        layer.open({
            type: 1,
            skin: 'layui-layer-rim',
            area: ['380px', '240px'],
            content: $('#provinceAlertShow')
        })
    })
})
//获取省份真实数据
function getProvinceData() {
    layui.use('layer', function () {
        var layer = layui.layer
        var provinceVal = $('#provinceChoose').val()
        if (provinceVal == '') {
            layer.msg('请输入省份')
        } else {
            $.ajax({
                type: 'get',
                url: 'http://' + changeUrl.address + '/manager/school/list.do',
                data: {
                    type: 1,
                    searchKey: provinceVal,
                    pageNum: 1,
                    pageSize: 500
                },
                success: function (data) {
                    console.log(data)
                    if (data.count == 0) {
                        layer.msg('无数据，请确保输入的省份正确~')
                    } else {
                        layer.confirm('共' + data.count + '条数据，确定导出？', {
                                icon: 3
                            },
                            function () {
                                var initData = JSON.stringify(data.data)
                                var newData = initData.replace(/schoolName/g, "学校中文名").replace(/schoolEnglishname/g, "学校英文名").replace(/schoolProperties/g, "类型")
                                    .replace(/areas/g, "省").replace(/省02/g, "市").replace(/省03/g, "详细地址").replace(/foundedTime/g, "成立时间").replace(/operationstate/g, "运营状态")
                                    .replace(/schoolSystem/g, "学制").replace(/tuition01/g, "幼儿园学费").replace(/tuition02/g, "小学学费").replace(/tuition03/g, "初中学费").replace(/tuition04/g, "高中学费")
                                    .replace(/website/g, "官网").replace(/telephone/g, "电话").replace(/interCourseFoundedTime/g, "国际课程认证时间")
                                    .replace(/course/g, "国际课程").replace(/authentication/g, "认证").replace(/courseEvaluation/g, "外部考试与评估").replace(/studentNumAll/g, "总在校生（国际部）")
                                    .replace(/studentNum01/g, "幼儿园学生数").replace(/studentNum02/g, "小学学生数").replace(/studentNum03/g, "初中学生数").replace(/studentNum04/g, "高中学生数")
                                    .replace(/studentCapacity/g, "总容量（国际部").replace(/graduatedStuNum/g, "毕业班人数（国际部）").replace(/stuDominantNationality/g, "学生主要国籍")
                                    .replace(/stuYearInvestment/g, "生均年投入").replace(/clubNum/g, "俱乐部数量").replace(/staffNum/g, "总员工数量").replace(/presidentCountry/g, "校长/国际部主任国籍").replace(/presidentCountry/g, "校长/国际部主任国籍")
                                    .replace(/teacherNum/g, "总教师数量").replace(/foreignTeacherNum/g, "外籍教师数量").replace(/teacherYearInvestment/g, "师均年培训投入").replace(/teacherRetention/g, "教师流失率")
                                    .replace(/teacherSalary/g, "教师薪酬（三年经验）").replace(/teacherStuRatio/g, "师生比").replace(/coveredArea/g, "占地面积（亩）").replace(/builtArea/g, "建筑面积")
                                    .replace(/hardware/g, "硬件设施").replace(/investment/g, "投资信息").replace(/remark/g, "备注").replace(/loadPeople/g, "提交人").replace(/loadTime/g, "提交时间")
                                    .replace(/certificateAuthority/g, "主流学术保障认证机构").replace(/studentEvaluation/g, "学生评测").replace(/thirdOrganizations/g, "第三方组织机构").replace(/loadPeople/g, "课程")
                                console.log(JSON.parse(newData))
                                downloadExl(JSON.parse(newData))
                                layer.alert('导出成功', {
                                    icon: 6,
                                    skin: 'layui-layer-molv',
                                    title: '系统提示',
                                    closeBtn: 0
                                }, function () {
                                    layer.closeAll()
                                })
                            },
                            function () {
                                layer.msg('用户取消')
                            }
                        )
                    }
                },
                error: function () {
                    alert('网络繁忙，请稍后再试~')
                }
            })
        }
    })

}
$('#getProvinceData').on('click', function () {
    getProvinceData()
})
$('#provinceChoose').keydown(function (e) {
    var curKey = e.which;
    if (curKey == 13) {
        getProvinceData()
    }
})
