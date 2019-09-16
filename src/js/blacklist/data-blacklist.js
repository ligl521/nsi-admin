layui.use(['table','form'], function(){
    var table = layui.table;
    var form = layui.form;

    table.render({
        elem: '#blacklistShow'
        // ,url:'http://'+changeUrl.address+'/192.168.0.19:8080/nsi-1.0/blacklist/add_school_black_list.do'
        ,url:'http://'+changeUrl.address+'/manager/foreign/get_list.do'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,page:true
        ,height:'full-150'
        // ,request: { pageName: 'pageNum' ,limitName: 'OnePageNum'}
        ,request: { pageName: 'pageNum' ,limitName: 'pageSize'}
        ,limit:30
        ,id: 'renderReload'
        ,cols:[[ //标题栏
            {type:'checkbox', fixed: 'left',rowspan:2}
            ,{field: 'id',width: 80, sort: true,align:'center',fixed: true,title: 'ID',rowspan:2}
            ,{field:'teacherName',width:180, align:'center',title:'教师姓名',style:'cursor: pointer;',rowspan:2}

            ,{toolbar: '#imgAddrbar', title: '头像',width:210, align:'center',event:'setimgAddr', rowspan:2}
             
            // ,{field:'imgAddr', width:160,sort:true,align:'center',title:'头像',event: 'setimgAddr', style:'cursor: pointer;',rowspan:2}
            ,{field:'teacherNationality', width:140,sort:true,align:'center',title:'教师国籍',rowspan:2}
            ,{field:'idCard', width:100,sort:true,align:'center',title:'证件号',rowspan:2}
            ,{field:'story', width:200,align:'center',title:'事迹',rowspan:2}
            ,{align:'center',title:'举报人信息',colspan:4}
            ,{field:'Load_people', width:160,align:'center',sort:true,title:'提交人',rowspan:2}
            ,{field:'Load_time', width:200,align:'center',sort:true,title:'提交时间',rowspan:2}
            ,{fixed: 'right', width:140, align:'center', title:'操作',toolbar: '#barBlacklist'}
        ], [
            {field:'informant', sort: true,width:160,align:'center',title:'举报人'}
            ,{field:'phone', width:160,align:'center',title:'举报人电话'}
            ,{field:'email', width:180,align:'center',title:'举报人邮箱'}
            ,{field:'reportingUnit', width:250,align:'center',title:'举报人单位'}
        ]]
    });
    //监听表格复选框选择
    table.on('checkbox(card)', function(obj){
        console.log(obj)
    });
    //监听工具条
    table.on('tool(blacklist)', function(obj){
        var data = obj.data;
        console.log(data);
        // layer.alert('<img src="'+data.imgAdder+'"/>');

        if(obj.event === 'setimgAddr'){
            console.log(data.imgAddr);
            layer.alert('<span class="Qrtitle">'+'黑外教：'+data.teacherName+'</span>' + '<img class="qrcode" src="'+data.imgAddr+'"/>');
        }else if(obj.event === 'detail'){
            layer.msg('黑外教：'+ data.teacherName);
        } else if(obj.event === 'del'){
                layer.confirm('真的删除本条数据吗',{icon: 3, title:'系统提示'}, function(index){
                    $.ajax({
                        type: "get",
                        async: true,
                        data: {
                            foreignId:data.id
                        },//提交的参数
                        url:'http://'+changeUrl.address + '/manager/foreign/delete.do',
                        dataType: "json",//数据类型为json  
                        success: function (msg) {
                            console.log(msg)
                            if(msg.code == 0){
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
            if(data.HavaTalent == 0){
                layer.msg('用户没有上传附件')
            }else {
               var href = 'http://data.xinxueshuo.cn/upFile/talent/'+data.UserMail+data.Name+'.'+data.HavaTalent
               $('#resumeHref').attr("href",href)
                document.getElementById("resumeHref").click()
            }
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
            var blacklistReload = $('#blacklistReload');
            //执行重载
                table.reload('renderReload', {
                    // url: 'http://'+changeUrl.address+'/blacklist/get_black_list.do?pageNum=1&pageSize=10_search',
                    url:'http://'+changeUrl.address+'/manager/foreign/get_foreign_info.do'
                    ,page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                        // foreignId: 
                        foreignId: blacklistReload.val(),
                    }//需要传递的参数

                });
        }
    };

    $('.blacklistTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //添加回车事件
    $('#blacklistReload').keydown(function (e) {
        var curKey = e.which; //兼容火狐
        var blacklistReload = $('#blacklistReload');
        if(curKey == 13){
            //执行重载
            table.reload('renderReload', {
                url:'http://'+changeUrl.address+'/manager/foreign/get_foreign_info.do'
                ,page: {
                    curr: 1 //重新从第 1 页开始
                }
                ,where: {
                    foreignId: blacklistReload.val(),
                }//需要传递的参数

            });
        }
    })

});