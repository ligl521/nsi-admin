//判断是否有新消息
$(function () {
    layui.use('layer',function () {
        var layer = layui.layer
        $.ajax({
            type:'get',
            url:'http://' + changeUrl.address + '/manager/verify/verify_notification.do',
            success:function (msg) {
               console.log(msg)
                var storage = window.localStorage
                //没有学校数据需要审核
                if(msg.SchoolData == 0 ){
                   storage.setItem('schoolData',0)
                }else{
                    storage.setItem('schoolData',1)
                }
                //没有机构数据需要审核
                if(msg.InstitutionData == 0){
                  storage.setItem('instiData',0)
                }else{
                    storage.setItem('instiData',1)
                }
               if(msg.TalentData == 0){
                  storage.setItem('TalentData',0)
                }else{
                    storage.setItem('TalentData',1)
                }
                //全部通过审核
                if(msg.SchoolData == 0 && msg.InstitutionData == 0&& msg.TalentData == 0){
                  storage.setItem('allData',0)
                }else{
                   storage.setItem('allData',1) 
                }
            },
            error:function () {
                layer.msg('获取系统消息失败！')
            }
        })
    })
})


//数据渲染
layui.use('table', function(){
    var table = layui.table;
    //新增数据
    table.render({
        elem: '#addInfoShow'
        ,url:'http://' + changeUrl.address + '/manager/verify/verify_In_search.do'
        ,height:'full-100'
        ,page:true
        ,request: { pageName: 'pageNum' ,limitName: 'pageSize'}
        ,cols: [[ //标题栏
            {type:'checkbox', fixed: 'left',rowspan:2}
            ,{field:'name',width:200, align:'center',fixed: true,title:'机构名',rowspan:2}
            ,{field: 'id',width: 80, sort: true,align:'center',title: 'ID',rowspan:2}
            ,{field:'label', width:160,sort:true,align:'center',title:'标签',rowspan:2}
            ,{field:'type', width:140,sort:true,align:'center',title:'类型',rowspan:2}
            ,{field:'foundedTime', width:100,sort:true,align:'center',title:'成立时间',rowspan:2}

            ,{align:'center',title:'地址',colspan:3 }
            ,{field:'website', width:200,sort:true,align:'center',title:'官网',rowspan:2}
            ,{field:'service', width:240,align:'center',title:'服务简介',rowspan:2}

            ,{align:'center',title:'联系方式',colspan:4}
            ,{field:'introduction', width:200,align:'center',title:'详细介绍',rowspan:2}
            ,{field:'investment', width:200,align:'center',title:'投资信息',rowspan:2}
            ,{field:'servedschool', width:200,align:'center',title:'过往服务学校',rowspan:2}
            ,{field:'remark', width:200,align:'center',title:'备注',rowspan:2}

            ,{align:'center',title:'图片地址',colspan:2}
            ,{field:'loadPeople', width:160,align:'center',sort:true,title:'提交人',rowspan:2}
            ,{field:'loadTime', width:200,align:'center',sort:true,title:'提交时间',rowspan:2}
            ,{fixed: 'right', width:120, align:'center', title:'操作',toolbar: '#addVerifyBar'}
        ], [

            {field:'areas', sort: true,width:100,align:'center',title:'省'}
            ,{field:'areas02', width:100,align:'center',title:'市'}
            ,{field:'areas03', width:300,align:'center',title:'详细地址'}

            ,{field:'contactname', sort: true,width:160,align:'center',title:'联系人'}
            ,{field:'contactphone', width:160,align:'center',title:'联系电话'}
            ,{field:'contactmail', width:180,align:'center',title:'联系邮箱'}
            ,{field:'contactposition', width:250,align:'center',title:'职位'}

            ,{field:'institutionLogo', width:200,align:'center',title:'Logo图片'}
            ,{field:'institutionShow', width:200,align:'center',title:'展示图片'}

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
                    url:'http://' + changeUrl.address + '/manager/verify/verify_failed.do',
                    data:{
                        institutionId:data.id
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
                        institutionId:data.id
                    },
                    url:'http://' + changeUrl.address + '/manager/verify/verify_pass.do',
                    success:function (msg) {
                        // console.log(msg)
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
        type:'get',
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



