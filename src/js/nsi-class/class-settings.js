function autoAddNotes( str ) {
    return str =='' ? '无备注': str;
}

// 用户权限
layui.use('table', function(){
    var table = layui.table;
    table.render({
        elem: '#userCourseRights'
        ,url:'http://'+changeUrl.address+'/Class_Course_api?whereFrom=AdminSearch_Course_User'
        ,page:true
        // ,height:'full-100'
        ,width:'780'
        ,request: { pageName: 'pageNum' ,limitName: 'OnePageNum'}
        ,limit:20
        ,id: 'renderReload'
        ,cols: [[
             {field:'Id', width:'100', title: 'ID',align:'center'}
            ,{field:'ClassId', width:'150', title: '课程ID', align:'center'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'UserMail', width:'424', title: '用户邮箱', align:'center'}
            ,{title:'操作', width:'100', align:'center', toolbar: '#userCourseBar'} //这里的toolbar值是模板元素的选择器
        ]]
    });

    //监听工具条
    table.on('tool(userCourseFilter)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            layer.msg('ID：'+ data.Id + ' 的查看操作');
        } else if(obj.event === 'del'){

        } else if(obj.event === 'edit'){
            // layer.alert('编辑行：<br>'+ JSON.stringify(data))
            $.ajax({
                type:'get',
                url:'http://'+changeUrl.address+'/Class_User_api?whereFrom=Course_UserInfo',
                data:{
                    UserMail:data.UserMail,
                    ClassId:data.ClassId
                },
                success:function (msg){
                    // console.log(msg)
                    var trueName = msg.data =='' ? '暂无数据' :msg.data[0].User_TureName
                    layer.open({
                        type: 1,
                        shadeClose: false,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['420px','240px'],
                        content: '<div style="margin-top: 30px;margin-left: 30px;">' +
                        '<p style="font-size: 18px;line-height: 1.5;">   &nbsp;<span style="font-weight: bold;">课程ID：</span> <span style="font-size: 16px;">'+data.ClassId+'</span></p>' +
                        '<p style="font-size: 18px;line-height: 1.5">  &nbsp;<span style="font-weight: bold;">课程名：</span> <span style="font-size: 16px;">'+msg.data02[0].CourseName+'</span></p>' +
                        '<p style="font-size: 18px;line-height: 1.5" > &nbsp;<span style="font-weight: bold;">邮箱：</span> <span style="font-size: 16px;">'+data.UserMail+'</span> </p>' +
                        '<p style="font-size: 18px;line-height: 1.5" > &nbsp;<span style="font-weight: bold;">姓名：</span> <span style="font-size: 16px;">'+trueName +'</span></p>' +
                        '</div>',
                    });
                },
                error:function () {
                    layer.msg('系统繁忙，请稍后再试~')
                }
            })

        }
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
            var courseReload = $('#courseReload').val();
            var emailReload = $('#emailReload').val()
            //执行重载
            table.reload('renderReload', {
                url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=AdminSearch_Course_User',
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                ,where: {
                    UserMail:emailReload,
                    ClassId: courseReload
                }//需要传递的参数

            });
        }
    };

    $('.course_user_table .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //添加回车事件
    $('#courseReload ,#emailReload').keydown(function (e) {
        var curKey = e.which; //兼容火狐
        var courseReload = $('#courseReload').val();
        var emailReload = $('#emailReload').val()
        if(curKey == 13){
            //执行重载
            table.reload('renderReload', {
                url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=AdminSearch_Course_User',
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                ,where: {
                    UserMail:emailReload,
                    ClassId: courseReload
                }//需要传递的参数

            });
        }
    })

});
// 临时账户
layui.use('table', function(){
    var table = layui.table;
    table.render({
        elem: '#flagaccount'
        ,url:'http://'+changeUrl.address+'/manager/user/get_test_account.do'
        ,limit:10
        ,id: 'flagaccount'
        ,cols: [[
             {field:'username', width:'300', title: '账号',align:'center'}
            ,{field:'password', width:'150', title: '密码', align:'center'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
        ]]
    });
});
$('#changeflagaccount').click(function(e){
    e.preventDefault()
    $.ajax({
        type:'get',
        url: 'http://' + changeUrl.address + '/manager/user/modify_test_account.do',
        
        dataType:'json',
        
        success:function (msg) {
                layer.alert('修改成功',{icon:6},function () {
                    window.location.reload()
                })
        },
        error:function () {
            layer.alert('服务器发生错误，请稍后再试',{icon:2})
        }
    })
})
// 直播配置
layui.use('form',function () {
    var form = layui.form
    //监听提交
    form.on('submit(demo1)', function(data){
        $.ajax({
            type:'get',
            url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=stickyInformation',
            async:true,
            dataType:'json',
            contentType:'application/json;charset=UTF-8',
            data:{
                TeacherId:$('#TeacherId').val(),
                CourseId:$('#CourseId').val()
            },
            success:function (msg) {
                console.log(msg)
                if(msg.code == -2 ){
                    layer.alert(msg.message,{icon:2})
                }else if(msg.code ==1){
                    layer.alert('提交成功',{icon:6},function () {
                        window.location.reload()
                    })
                }
            },
            error:function () {
                layer.alert('服务器发生错误，请稍后再试',{icon:2})
            }
        })
        return false;
    });

})

//当前直播
layui.use('layer',function () {
    var layer = layui.layer
    $.ajax({
        type:'get',
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=showInformation',
        async:true,
        dataType:'json',
        contentType:'application/json;charset=UTF-8',
        success:function (msg) {
            console.log(msg)
            $('#CourseName').text(msg.data1[0].CourseName)
            $('#TeacherName').text(msg.data2[0].TeacherName)
        },
        error:function () {
            layer.alert('服务器发生错误，请稍后再试',{icon:2})
        }
    })
})

//生成邀请码
layui.use(['form','laytpl'],function () {
    var form = layui.form
    var laytpl = layui.laytpl
    //监听提交
    form.on('submit(demo2)', function(data){
        $.ajax({
            type:'get',
            url: 'http://' + changeUrl.address + '/Class_ActivationCode?whereFrom=activationCode',
            async:true,
            dataType:'json',
            contentType:'application/json;charset=UTF-8',
            data:{
                CourseId:$('#inviteCourseId').val(),
                Number:$('#Number').val(),
                Text:autoAddNotes($('#Text').val())
            },
            success:function (msg) {
                console.log(msg)
                if(msg.code == -2){
                    layer.alert(msg.message,{icon:2})
                }else if(msg.code == 0)
                {
                    var data = msg
                    var getTpl = demo.innerHTML
                        ,view = document.getElementById('view');
                    laytpl(getTpl).render(data, function(html){
                        view.innerHTML = html;
                    });

                    //复制全部
                    $('#copyAll').removeClass('hide')
                    var copyData = msg.data
                    var newData = '';
                    for(var i=0;i<copyData.length;i++){
                        newData += copyData[i] +"\r\n"
                    }
                    var copyAll = document.getElementById('copyAll')
                    copyAll.dataset.clipboardText = newData
                }

            },
            error:function () {
                layer.alert('服务器发生错误，请稍后再试',{icon:2})
            }
        })
        return false;
    });

})


//邀请码展示
layui.use('laytpl',function () {
    var laytpl = layui.laytpl
    $.ajax({
        type:'get',
        url: 'http://' + changeUrl.address + '/Class_ActivationCode?whereFrom=SearchCourseCode',
        dataType:'json',
        success:function (data) {
            console.log(data)
            var getTpl = ivCodeDemo.innerHTML
                ,view = document.getElementById('inviteCodeview');
            laytpl(getTpl).render(data, function(html){
                view.innerHTML = html;
            });
        },
        error:function () {
            layer.alert('服务器发生错误，请稍后再试',{icon:2})
        }
    })

})

// 用户观看权限配置
layui.use(['form','layer'],function () {
    var form = layui.form
    var layer = layui.layer
    //单节权限
    form.on('submit(watchRights)', function(data){
        layer.confirm('确定要添加用户吗？',{icon: 3, title:'系统提示'},function () {
            $.ajax({
                type:'get',
                url: 'http://' + changeUrl.address + '/ClassUser/Course_User_Insert.do',
                async:true,
                dataType:'json',
                contentType:'application/json;charset=UTF-8',
                data:{
                    ClassId:$('#courseRightsId').val(),
                    UserMail:$('#emailRightsId').val()
                },
                success:function (msg) {
                    console.log(msg)
                    if(msg.msg == -1 ){
                        layer.msg('该用户已拥有该课程~',{icon:5})
                    }else if(msg.msg =='插入成功'){
                        layer.alert('设置成功',{icon:6},function () {
                            window.location.reload()
                        })
                    }
                },
                error:function () {
                    layer.alert('服务器发生错误，请稍后再试',{icon:2})
                }
            })
        },
            function () {
            layer.msg('用户取消')
        })

        return false;
    });

    //新开课程
    form.on('submit(watchRights02)', function(data){
        layer.confirm('确定要新开课程吗？',{icon: 3, title:'系统提示'},function () {
                $.ajax({
                    type:'get',
                    url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=Course_User_BatchInsert',
                    async:true,
                    dataType:'json',
                    contentType:'application/json;charset=UTF-8',
                    data:{
                        ClassId:$('#courseRightsId02').val()
                    },
                    success:function (msg) {
                        console.log(msg)
                        if(msg.msg == -1 ){
                            layer.msg('该用户已拥有该课程~',{icon:5})
                        }else if(msg.msg ==1){
                            layer.alert('设置成功',{icon:6},function () {
                                window.location.reload()
                            })
                        }
                    },
                    error:function () {
                        layer.alert('服务器发生错误，请稍后再试',{icon:2})
                    }
                })
            },
            function () {
                layer.msg('用户取消')
            })

        return false;
    });


})









