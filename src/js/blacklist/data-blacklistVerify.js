$(function () {

    layui.use('layer',function () {
        var layer = layui.layer
        $.ajax({
            type:'get',
            url:'http://' + changeUrl.address + '/manager/foreign/get_review_list.do',
            success:function (msg) {
                console.log(msg)
                var storage = window.localStorage
                //没有学校数据需要审核
                if(msg.SchoolData == 0 ){
                   storage.setItem('schoolData',0)
                }
                //没有机构数据需要审核
                if(msg.InstitutionData == 0){
                  storage.setItem('instiData',0)
                }
                if(msg.TalentData == 0){
                  storage.setItem('TalentData',0)
                }
                //全部通过审核
                if(msg.SchoolData == 0 && msg.InstitutionData == 0&& msg.TalentData == 0){
                  storage.setItem('allData',0)
                }
            },
            error:function () {
                layer.msg('获取系统消息失败！')
            }
        })
    })


    //数据渲染
    layui.use('table', function(){
        var table = layui.table;
        //新增数据
        table.render({
            elem: '#addInfoShow'
            ,url:'http://' + changeUrl.address + '/manager/foreign/get_review_list.do'
            ,cols:[[ //标题栏
            {type:'checkbox', fixed: 'left',rowspan:2}
            ,{field:'teacherName',width:200, align:'center',fixed: true,title:'教师姓名',rowspan:2}
            ,{field: 'id',width: 80, sort: true,align:'center',title: 'ID',rowspan:2}
            ,{field:'imgAdder', width:160,sort:true,align:'center',title:'头像',rowspan:2}
            ,{field:'teacherNationality', width:140,sort:true,align:'center',title:'教师国籍',rowspan:2}
            ,{field:'idCard', width:100,sort:true,align:'center',title:'证件号',rowspan:2}
            ,{field:'story', width:200,align:'center',title:'事迹',rowspan:2}
            ,{align:'center',title:'举报人信息',colspan:4}
            ,{field:'Load_people', width:160,align:'center',sort:true,title:'提交人',rowspan:2}
            ,{field:'Load_time', width:200,align:'center',sort:true,title:'提交时间',rowspan:2}
            ,{fixed: 'right', width:120, align:'center', title:'操作',toolbar: '#addVerifyBar'}
        ], [
            {field:'informant', sort: true,width:160,align:'center',title:'举报人'}
            ,{field:'phone', width:160,align:'center',title:'举报人电话'}
            ,{field:'email', width:180,align:'center',title:'举报人邮箱'}
            ,{field:'reportingUnit', width:250,align:'center',title:'举报人单位'}
        ]]
    });
            

        //监听工具条
        table.on('tool(addInfoShow)', function(obj){
            var data = obj.data;
            if(obj.event === 'detail'){
                // layer.msg('ID：'+ data.id + ' 的查看操作');
            } else if(obj.event === 'del'){
                layer.confirm('确定要拒绝吗？',{icon:3,title:'系统消息'}, function(index){
                    $.ajax({
                        type:'get',
                        url:'http://' + changeUrl.address + '/manager/foreign/delete.do',
                        data:{
                            foreignId:data.id
                        },
                        success:function (msg) {
                            console.log(msg)
                            layer.msg('已拒绝入库')
                            setTimeout(function () {
                                window.location.reload()
                            },1500)
                        },
                        error:function () {
                            layer.msg('服务器繁忙，请稍后再试！')
                        }
                    })
                });
            } else if(obj.event === 'edit'){
                console.log(data);
                //通过
                layer.confirm('确定要通过吗？',{icon:3,title:'系统消息'},function (index) {
                    var index =  layer.msg('系统审核中...', {
                        icon: 16
                        ,time: 200000 //2秒关闭（如果不配置，默认是3秒）
                        ,shade: [0.8,'#000']
                    });
                    $.ajax({
                        type:'get',
                        data:{
                            id:data.id,
                            enableStatus:1
                        },
                        url:'http://' + changeUrl.address + '/manager/foreign/update_foreign.do',
                        success:function (msg) {
                            console.log(msg.msg)

                            layer.open({
                                type:1,
                                skin: 'layui-layer-rim', //加上边框
                                title:false,
                                closeBtn:0,
                                area: ['360px', '200px'], //宽高
                                content: $('#addScores')
                            })
                        },
                        error:function () {
                            layer.msg('服务器繁忙，请稍后再试！')
                        }
                    })

                })
            }
        });

        //修改数据
        table.render({
            elem: '#reviseInfoShow'
            ,url:'http://' + changeUrl.address + '/manager/foreign/get_review_list.do'
            ,cols: [[ //标题栏
                {type:'checkbox', fixed: 'left',rowspan:2}
            ,{field:'teacherName',width:200, align:'center',fixed: true,title:'教师姓名',rowspan:2}
            ,{field: 'id',width: 80, sort: true,align:'center',title: 'ID',rowspan:2}
            ,{field:'imgAdder', width:160,sort:true,align:'center',title:'头像',rowspan:2}
            ,{field:'teacherNationality', width:140,sort:true,align:'center',title:'教师国籍',rowspan:2}
            ,{field:'idCard', width:100,sort:true,align:'center',title:'证件号',rowspan:2}
            ,{field:'story', width:200,align:'center',title:'事迹',rowspan:2}
            ,{align:'center',title:'举报人信息',colspan:4}
            ,{field:'Load_people', width:160,align:'center',sort:true,title:'提交人',rowspan:2}
            ,{field:'Load_time', width:200,align:'center',sort:true,title:'提交时间',rowspan:2}
            ,{fixed: 'right', width:140, align:'center', title:'操作',toolbar: '#reviseVerifyBar'}
        ], [
            {field:'informant', sort: true,width:160,align:'center',title:'举报人'}
            ,{field:'phone', width:160,align:'center',title:'举报人电话'}
            ,{field:'email', width:180,align:'center',title:'举报人邮箱'}
            ,{field:'reportingUnit', width:250,align:'center',title:'举报人单位'}
            ]]
        });

        //监听工具条
        table.on('tool(reviseInfoShow)', function(obj){
            var data = obj.data;
            if(obj.event === 'detail'){
                // layer.msg('ID：'+ data.id + ' 的查看操作');
            } else if(obj.event === 'del'){
                //拒绝
                layer.confirm('确定要拒绝吗？',{icon:3,title:'系统消息'}, function(index){
                    $.ajax({
                        type:'get',
                        url:'http://' + changeUrl.address + '/manager/foreign/delete.do',
                        data:{
                            id:data.id
                        },
                        success:function (msg) {
                            console.log(msg)
                            layer.msg('已拒绝修改')
                            setTimeout(function () {
                                window.location.reload()
                            },1500)
                        },
                        error:function () {
                            layer.msg('服务器繁忙，请稍后再试！')
                        }
                    })
                });
            } else if(obj.event === 'edit'){
                // 通过
                layer.confirm('确定要通过吗',{icon:3,title:'系统消息'},function (index) {
                    var index =  layer.msg('系统审核中...', {
                        icon: 16
                        ,time: 200000 //2秒关闭（如果不配置，默认是3秒）
                        ,shade: [0.8,'#000']
                    });
                    $.ajax({
                        type:'get',
                        data:{
                            id:data.id,
                            enableStatus:1
                        },
                        url:'http://' + changeUrl.address + '/manager/foreign/update_foreign.do',
                        success:function (msg) {
                            console.log(msg)
                            layer.open({
                                type:1,
                                skin: 'layui-layer-rim', //加上边框
                                title:false,
                                closeBtn:0,
                                area: ['360px', '200px'], //宽高
                                content: $('#addScores')
                            })
                        },
                        error:function () {
                            layer.msg('服务器繁忙，请稍后再试！')
                        }
                    })

                })
            }
        });
    });

    // 加分
    $('#addScores .layui-btn').on('click',function () {
        var patt = new RegExp(/\d+/)
        var scores = String($(this).text().match(patt))
        $.ajax({
            type:'post',
            url:'http://' + changeUrl.address + '/user/Score.do',
            data:{
                UserMail:$.cookie('username'),
                ScoreNum:scores
            },
            success:function (msg) {
                console.log(msg)
                layer.msg('已添加'+scores+'分',{icon:6})
                setTimeout(function () {
                    window.location.reload()
                },1500)
            },
            error:function () {
                layer.msg('网络繁忙，请稍后再试！')
            }
        })
    })




})
