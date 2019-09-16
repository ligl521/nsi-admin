// getShopCarData()
function getShopCarData() {
    var initData = JSON.parse($('#initialData').text())
    layui.use('table', function(){
        var table = layui.table;
        // console.log(initData)
        //展示已知数据
        table.render({
            elem: '#demo'
            ,cols: [[ //标题栏
                {type:'checkbox', fixed: 'left',rowspan:2}
                ,{field:'schoolName',width:200, align:'center',fixed: true,title:'中文名',rowspan:2}
                ,{field: 'id',width: 80, sort: true,align:'center',title: 'ID',rowspan:2}
                ,{field:'schoolEnglishname', width:200, align:'center',title:'英文名',rowspan:2}
                ,{align:'center',title:'基本信息',colspan:3 }
                ,{align:'center',title:'课程&认证',colspan:3 }
                ,{align:'center',title:'地址',colspan:3 }
                ,{align:'center',title:'时间',colspan:2}
                ,{align:'center',title:'学费',colspan:4}
                ,{align:'center',title:'学生数',colspan:7}
                ,{align:'center',title:'师资（人数）',colspan:5}
                ,{align:'center',title:'国籍',colspan:2}
                ,{align:'center',title:'投入/年',colspan:3}
                ,{align:'center',title:'基建&投资',colspan:5}
                ,{align:'center',title:'联系方式',colspan:2}
                 ,{align:'center',title:'资格认证',colspan:4}
                ,{fixed: 'right', width:80, align:'center', title:'操作',toolbar: '#barDemo'}
            ], [
                {field:'schoolProperties', width:100,sort:true,align:'center',title:'类型'}
                ,{field:'operationstate', width:120,sort:true,align:'center',title:'运营状态'}
                ,{field:'schoolSystem', width:145, sort: true,align:'center',title:'学制'}

                ,{field:'course', width:140, sort: true,align:'center',title:'国际课程'}
                ,{field:'courseEvaluation', width:160, sort: true,align:'center',title:'外部考试与评估'}
                ,{field:'authentication', width:120, sort: true,align:'center',title:'认证'}

                ,{field:'areas', sort: true,width:100,align:'center',title:'省'}
                ,{field:'areas02', width:100,align:'center',title:'市'}
                ,{field:'areas03', width:300,align:'center',title:'详细地址'}

                ,{field:'foundedTime', width:120, sort: true,align:'center',title:'建校'}
                ,{field:'interCourseFoundedTime', width:140, sort: true,align:'center',title:'国际课程认证'}

                ,{field:'tuition01', width:100, sort: true, align:'center',title:'幼儿园'}
                ,{field:'tuition02', width:100, sort: true, align:'center',title:'小学'}
                ,{field:'tuition03', width:100, sort: true, align:'center',title:'初中'}
                ,{field:'tuition04', width:100, sort: true, align:'center',title:'高中'}

                ,{field:'studentNum01', width:100, sort: true, align:'center',title:'幼儿园'}
                ,{field:'studentNum02', width:100, sort: true, align:'center',title:'小学'}
                ,{field:'studentNum03', width:100, sort: true, align:'center',title:'初中'}
                ,{field:'studentNum04', width:100, sort: true, align:'center',title:'高中'}
                ,{field:'graduatedStuNum', width:160, sort: true,align:'center',title:'毕业班（国际部）'}
                ,{field:'studentNumAll', width:170, sort: true, align:'center',title:'总在校生（国际部）'}
                ,{field:'studentCapacity', width:160, sort: true, align:'center',title:'总容量（国际部）'}

                ,{field:'staffNum', width:100, sort: true,align:'center',title:'总员工'}
                ,{field:'teacherNum', width:100, sort: true, align:'center',title:'总教师'}
                ,{field:'foreignTeacherNum', width:100, sort: true, align:'center',title:'外籍教师'}
                ,{field:'teacherStuRatio', width:100, sort: true, align:'center',title:'师生比'}
                ,{field:'teacherRetention', width:120, sort: true, align:'center',title:'教师流失率'}
                ,{field:'stuDominantNationality', width:120, sort: true,align:'center',title:'学生'}
                ,{field:'presidentCountry', width:140, sort: true,align:'center',title:'校长/国际部主任'}

                ,{field:'clubNum', width:120, sort: true,align:'center',title:'俱乐部数量'}
                ,{field:'stuYearInvestment', width:120, sort: true,align:'center',title:'学生投入'}
                ,{field:'teacherYearInvestment', width:120, sort: true,align:'center',title:'教师培训投入'}

                ,{field:'coveredArea', width:140, sort: true,align:'center',title:'占地面积（亩）'}
                ,{field:'builtArea', width:166, sort: true,align:'center',title:'建筑面积（平方米）'}
                ,{field:'hardware', width:140, align:'center',title:'硬件设施'}
                ,{field:'investment', width:140, align:'center',title:'投资信息'}
                ,{field:'remark', width:140,align:'center',title:'备注'}

                ,{field:'website', width:140,align:'center',title:'官网'}
                ,{field:'telephone', width:140,align:'center',title:'电话'}

                ,{field:'certificateAuthority', width:140,align:'center',title:'主流学术保障认证机构'}
                ,{field:'studentEvaluation', width:140,align:'center',title:'学生评测'}
                ,{field:'thirdOrganizations', width:140,align:'center',title:'第三方组织机构'}
                ,{field:'courseAuthority', width:140,align:'center',title:'课程'}

            ]]
            ,data:initData
            // ,skin: 'line' //表格风格
            // ,even: true
            ,page: true //是否显示分页
            //,limits: [5, 7, 10]
            //,limit: 5 //每页默认显示的数量
        });

        //监听工具条
        table.on('tool(demo)', function(obj){
            var data = obj.data;
            if(obj.event === 'detail'){
                layer.msg('ID：'+ data.id + ' 的查看操作');
            } else if(obj.event === 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del();
                    layer.close(index);
                });
            } else if(obj.event === 'edit'){
                layer.alert('编辑行：<br>'+ JSON.stringify(data))
            }
        });

        var $ = layui.$, active = {
            getCheckData: function(){ //获取选中数据
                var checkStatus = table.checkStatus('demo')
                    ,data = checkStatus.data;
                layer.alert(JSON.stringify(data));
                // layer.alert(JSON.stringify(data));
                //导出数据
                var initData = JSON.stringify(data)
                // console.log(initData)
                if(initData == '[]'){
                    layer.alert('请先选择数据',{icon:5})
                }else{
                    layer.confirm('确定要导出数据吗？',{
                        icon: 3,
                        btn: ['确定','取消'], //按钮
                        title:'系统提示'
                    }, function(){
                        layer.alert('导出成功', {icon: 6 ,title:'系统提示'});
                        var newData =initData.replace(/schoolName/g,"学校中文名").replace(/schoolEnglishname/g,"学校英文名").replace(/schoolProperties/g,"类型")
                        .replace(/areas/g,"省").replace(/省02/g,"市").replace(/省03/g,"详细地址").replace(/foundedTime/g,"成立时间").replace(/operationstate/g,"运营状态")
                        .replace(/schoolSystem/g,"学制").replace(/tuition01/g,"幼儿园学费").replace(/tuition02/g,"小学学费").replace(/tuition03/g,"初中学费").replace(/tuition04/g,"高中学费")
                        .replace(/website/g,"官网").replace(/telephone/g,"电话").replace(/interCourseFoundedTime/g,"国际课程认证时间")
                        .replace(/course/g,"国际课程").replace(/authentication/g,"认证").replace(/courseEvaluation/g,"外部考试与评估").replace(/studentNumAll/g,"总在校生（国际部）")
                        .replace(/studentNum01/g,"幼儿园学生数").replace(/studentNum02/g,"小学学生数").replace(/studentNum03/g,"初中学生数").replace(/studentNum04/g,"高中学生数")
                        .replace(/studentCapacity/g,"总容量（国际部").replace(/graduatedStuNum/g,"毕业班人数（国际部）").replace(/stuDominantNationality/g,"学生主要国籍")
                        .replace(/stuYearInvestment/g,"生均年投入").replace(/clubNum/g,"俱乐部数量").replace(/staffNum/g,"总员工数量").replace(/presidentCountry/g,"校长/国际部主任国籍").replace(/presidentCountry/g,"校长/国际部主任国籍")
                        .replace(/teacherNum/g,"总教师数量").replace(/foreignTeacherNum/g,"外籍教师数量").replace(/teacherYearInvestment/g,"师均年培训投入").replace(/teacherRetention/g,"教师流失率")
                        .replace(/teacherSalary/g,"教师薪酬（三年经验）").replace(/teacherStuRatio/g,"师生比").replace(/coveredArea/g,"占地面积（亩）").replace(/builtArea/g,"建筑面积")
                        .replace(/hardware/g,"硬件设施").replace(/investment/g,"投资信息").replace(/remark/g,"备注").replace(/loadPeople/g,"提交人").replace(/loadTime/g,"提交时间")
                        .replace(/certificateAuthority/g,"主流学术保障认证机构").replace(/studentEvaluation/g,"学生评测").replace(/thirdOrganizations/g,"第三方组织机构").replace(/loadPeople/g,"课程")
                        console.log(JSON.parse(newData))
                        downloadExl(JSON.parse(newData))
                    }, function(){
                        layer.msg('您取消了导出', {
                            time:3000, //20s后自动关闭
                            // btn: ['确定']
                        });
                    });
                }
            }
            ,getCheckLength: function(){ //获取选中数目
                var checkStatus = table.checkStatus('demo')
                    ,data = checkStatus.data;
                layer.msg('选中了：'+ data.length + ' 个');
            }
            ,isAll: function(){ //验证是否全选
                var checkStatus = table.checkStatus('demo');
                layer.msg(checkStatus.isAll ? '全选': '未全选')
            }
        };

        $('.demoTable .layui-btn').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });


    });
}

function appendZero(n) {
    return n >= 0 && n < 10 ? "0" + n : "" + n
}

// 导出excel表格start
function downloadExl(data, type) {

    var  oDate = new Date()
    var  year = oDate.getFullYear() //获取年份
    var  month = oDate.getMonth()+1 // 获取月份
    var  day = oDate.getDate() //获取日期
    var  hour = oDate.getHours() //获取小时
    var  minute = oDate.getMinutes() // 获取分
    var str = year +'-'+appendZero(month)+'-'+appendZero(day)+' ' +appendZero(hour) + ':' + appendZero(minute)
    console.log(str)

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
        content[item.position] = { v: item.value };
    });

    //设置区域,比如表格从A1到D10,SheetNames:标题，
    var coordinate = Object.keys(content);
    var workBook = {
        SheetNames: ["helloSheet"],
        Sheets: {
            "helloSheet": Object.assign({}, content, { "!ref": coordinate[0] + ":" + coordinate[coordinate.length - 1] }),
        }
    };
    //这里的数据是用来定义导出的格式类型
    var excelData = XLSX.write(workBook, { bookType: "xlsx", bookSST: false, type: "binary" });
    var blob = new Blob([string2ArrayBuffer(excelData)], { type: "" });
    saveAs(blob, "nsi-school-data-"+ str +".xlsx");
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













