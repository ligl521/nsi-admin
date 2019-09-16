
//课程信息
layui.use('table', function(){
    var table = layui.table;

    table.render({
        elem: '#test'
        ,url:'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Admin_Search_Course'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
             {field:'CourseName', width:200, title: '课程名' ,align:'center',fixed:"left"}
            ,{field:'Id', width:100, title: 'ID', sort: true ,align:'center'}
            ,{field:'ChannelNumber', width:100, title: '频道号',align:'center'}
            ,{field:'ChannelName', width:100, title: '频道名',align:'center'}
            ,{field:'Secretkey', width:100, title: '授权密匙',align:'center'}
            ,{field:'TeacherId', width: 100,title: '讲师Id', align:'center'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'CourseSubject',  width: 150,title: '课程主题', align:'center'}
            ,{field:'CourseState',  width: 150,title: '课程状态', align:'center'}
            ,{field:'CourseDescription', width: 200,title: '课程介绍',align:'center'}
            ,{field:'ClassBegins', width: 120,title: '开课时间',sort: true,align:'center'}
            ,{field:'CoursePraise', width:200, title: '课程评价', align:'center'}
            ,{field:'CoursePrice', width:100, title: '课程单价', sort: true,align:'center'}
            ,{field:'CourseRelease', width:130, title: '课程发布时间', sort: true,align:'center'}
            ,{field:'CoursePeople', width:120, title: '课程发布人', align:'center'}
            ,{field:'CoverImage', width:150, title: '封面图片', align:'center'}
            ,{field:'CourseImage', width:150, title: '课程图片', align:'center'}
            ,{fixed: 'right', width:120, title: '操作',align:'center', toolbar: '#courseBar'}
        ]]
        ,page: true
    });


    //监听工具条
    table.on('tool(courseInfo)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            layer.msg('ID：'+ data.id + ' 的查看操作');
        } else if(obj.event === 'del'){
            // layer.confirm('真的删除行么', function(index){
            //     obj.del();
            //     layer.close(index);
            // });
            layer.confirm('真的删除本条数据吗',{icon: 3, title:'系统提示'}, function(index){
                $.ajax({
                    type: "get",
                    async: true,
                    data: {
                        "Id":data.Id
                    },//提交的参数
                    url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Delete_Course',
                    contentType: 'application/json;charset=UTF-8',
                    dataType: "json",//数据类型为json  
                    success: function (msg) {
                        console.log(msg)
                        if(msg.msg == 1){
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

        } else if(obj.event === 'edit'){
            // layer.alert('编辑行：<br>'+ JSON.stringify(data))

            layer.confirm('请选择要编辑的内容？', {
                icon:3,
                btn: ['基本信息','详细信息'] //按钮
            }, function(){
                layer.closeAll(); //疯狂模式，关闭所有层
                layer.open({
                    type: 2,
                    title: data.CourseName+'-基本信息修改',
                    shadeClose: false,
//                        shade: true,
                    maxmin: true, //开启最大化最小化按钮
                    area: [$(window).width()*0.7+'px', $(window).height()*0.7+'px'],
                    content: ['./class-courseRevise.html'],
                    success: function(layero, index){
                        layer.full(index)
                        // console.log(layero, index);
                        var body = layer.getChildFrame('body', index);
                        var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                        body.find('#courseId').val(data.Id)    //传输得到学校Id
                        iframeWin.getInitData()
                        // console.log(body.html()) //得到iframe页的body内容
                    }
                });
            }, function(){

                layer.open({
                    type: 2,
                    title: data.CourseName+'-详细信息修改',
                    shadeClose: false,
//                        shade: true,
                    maxmin: true, //开启最大化最小化按钮
                    area: [$(window).width()*0.7+'px', $(window).height()*0.7+'px'],
                    content: ['./class-detailRevise.html'],
                    success: function(layero, index){
                        layer.full(index)
                        // console.log(layero, index);
                        var body = layer.getChildFrame('body', index);
                        var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                        body.find('#courseId').val(data.Id)    //传输得到学校Id
                        iframeWin.getInitData()
                        // console.log(body.html()) //得到iframe页的body内容
                    }
                });

            });


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
    };

    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});

//讲师信息
layui.use('table', function(){
    var table = layui.table;

    var tableIns = table.render({
        elem: '#teacherInfo'
        ,url:'http://' + changeUrl.address + '/Class_Teacher_api?whereFrom=search'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,cols: [[
            {field:'TeacherName', width:120, title: '教师名' ,align:'center',fixed:"left"}
            ,{field:'Id', width:100, title: '讲师ID', sort: true ,align:'center'}
            ,{field:'TeacherDescription', width:400, title: '教师简介',align:'center'}
            ,{field:'TeacherCourse', width:400, title: '主讲课程',align:'center'}
            ,{field:'TeacherImage', width:150, title: '教师头像',align:'center'}
            ,{field:'Html01', width: 150,title: '讲师详细介绍', align:'center'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'Load_people',  width: 120,title: '提交人', align:'center'}
            ,{field:'Load_time',  width: 200,title: '提交时间', align:'center'}
            ,{fixed: 'right', width:120, title: '操作',align:'center', toolbar: '#TeacherBar'}
        ]]
        ,page: true
    });

    console.log(tableIns)

    //监听工具条
    table.on('tool(teacherInfo)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            layer.msg('ID：'+ data.id + ' 的查看操作');
        } else if(obj.event === 'del'){

            layer.confirm('真的删除本条数据吗',{icon: 3, title:'系统提示'}, function(index){
                $.ajax({
                    type: "get",
                    async: false,
                    data: {
                        "Id":data.Id
                    },//提交的参数
                    url: 'http://' + changeUrl.address + '/Class_Teacher_api?whereFrom=delete',
                    contentType: 'application/json;charset=UTF-8',
                    dataType: "json",//数据类型为json  
                    success: function (msg) {
                        console.log(msg)
                        if(msg.msg == 1){
                            layer.msg('删除成功')
                            obj.del();
                            layer.close(index);
                        }
                    },
                    error: function () {
                        layer.alert('网络繁忙，请稍后再试！');
                    }
                });
            });

        }else if(obj.event === 'edit'){
            // layer.alert('编辑行：<br>'+ JSON.stringify(data))
            layer.open({
                type: 2,
                title: data.TeacherName+'-基本信息修改',
                shadeClose: false,
//                        shade: true,
                maxmin: true, //开启最大化最小化按钮
                area: [$(window).width()*0.7+'px', $(window).height()*0.7+'px'],
                content: ['./class-teacherRevise.html'],
                success: function(layero, index){
                    layer.full(index)
                    // console.log(layero, index);
                    var body = layer.getChildFrame('body', index);
                    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                    body.find('#TeacherId').val(data.Id)    //传输得到学校Id
                    iframeWin.getInitData()
                    // console.log(body.html()) //得到iframe页的body内容
                }
            });
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
    };

    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});






