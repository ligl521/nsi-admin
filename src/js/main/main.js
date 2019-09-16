
layui.use('table', function(){
    var table = layui.table;
    table.render({
        elem: '#registerUser'
        ,url:'http://'+changeUrl.address+'/user/Admin_UserList.do?search_Key='
        ,id: 'renderReload'
        ,cols: [[
            {field:'username',  title: '用户名（邮箱）',width:200, align:'center'}
            ,{field:'memberSign', title: '用户等级',sort:true,align:'center'}
            ,{field:'userTurename', title: '真实姓名',align:'center'}
            ,{field:'userOrganization',  title: '机构',align:'center'}
            ,{field:'userPosition',  title: '职位', align:'center'}
            ,{field:'userPhone',  title: '手机号码',align:'center'}
            ,{field:'userScore', title: '积分',align:'center'}
            ,{field:'loadTime',  title: '注册时间', align:'center'}
            ,{field:'classify',  title: '状态',align:'center',toolbar: '#barDemo'}
        ]]

    });

    var $ = layui.$, active = {
        getCheckData: function(){ //获取选中数据
            var checkStatus = table.checkStatus('idTest')
                ,data = checkStatus.data;
            layer.alert(JSON.stringify(data));
        }
        ,getCheckLength: function(){ //获取选中数目
            var checkStatus = table.checkStatus('idTest')
                ,data = checkStatus.data;
            layer.msg('选中了：'+ data.length + ' 个');
        }
        ,isAll: function(){ //验证是否全选
            var checkStatus = table.checkStatus('idTest');
            layer.msg(checkStatus.isAll ? '全选': '未全选')
        }
        //（执行搜索）数据重载
        ,reload: function(){
            var registerReload = $('#registerReload');
            //执行重载
            table.reload('renderReload', {
                url: 'http://' + changeUrl.address + '/user/Admin_UserList.do',
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                ,where: {
                    search_Key: registerReload.val(),
                }//需要传递的参数

            });
        }
    };


    $('.registerTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //添加回车事件
    $('#registerReload').keydown(function (e) {
        var curKey = e.which; //兼容火狐
        var registerReload = $('#registerReload');
        if(curKey == 13){
            //执行重载
            table.reload('renderReload', {
                url:  'http://' + changeUrl.address + '/user/Admin_UserList.do',
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                ,where: {
                    search_Key: registerReload.val(),
                }//需要传递的参数

            });
        }
    })



});

// 概览信息
$.ajax({
    type: "get",
    async: true,
    contentType:'application/json;charset=UTF-8',
    dataType: "json",//数据类型为json
    url: 'http://'+changeUrl.address+'/Admin_api?whereFrom=registerUserCount',
    success: function (msg) {
        // console.log(msg)
        $('#lastWeekCount').text(msg.lastWeekCount)
        $('#onWeekCount').text(msg.onWeekCount)
        $('#pageCount').text(msg.pageCount)
    },
    error: function () {
        alert('网络繁忙，请稍后再试！');
    }
});


//官网数据统计
$('#getWebsiteData').on('click',function () {
    //iframe窗
    layer.open({
        type: 2,
        title: '新学说官网访问百度统计',
        shadeClose: true,
//                        shade: true,
        maxmin: true, //开启最大化最小化按钮
        area: ['893px', '600px'],
        content: 'https://tongji.baidu.com/web/welcome/ico?s=e898a1b6e73616a0c84313f55a47efd6'
    });
})
//操作历史
$('#getLogData').on('click',function () {
    //iframe窗
    layer.open({
        type: 2,
        title: '数据库操作历史记录',
        shadeClose: true,
//                        shade: true,
        maxmin: true, //开启最大化最小化按钮
        area: ['893px', '600px'],
        content: './data-log.html'
    });
})


// 添加划过动画
$('#info-box01,#info-box02,#info-box03,#info-box04,#info-box05').hover(function () {
    $(this).find('.rotate').addClass('layui-anim-rotate')
},function () {
    $(this).find('.rotate').removeClass('layui-anim-rotate')
})


console.log('2018-03-26 10:50')

