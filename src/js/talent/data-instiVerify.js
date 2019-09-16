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
     table.render({
        elem: '#addInfoShow'
        ,url:'http://'+changeUrl.address+'/manager/talents/get_list.do'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,page:true
        ,height:'full-150'
        ,request: { pageName: 'pageNum' ,limitName: 'pageSize'}
        ,limit:10
        ,id: 'renderReload'
        ,cols: [[
             {type:'checkbox',fixed:'left'}
            ,{field:'image', width:140, title: '头像',align:'center',fixed:'left',templet:'#titleTpl'}
            ,{field:'name', width:140, title: '姓名',align:'center',fixed:'left'}
            ,{field:'sex', width:80,title: '性别', sort:true,align:'center'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'phone',width:180, title: '电话',align:'center'}
            ,{field:'mail',width:180, title: '邮箱',align:'center'}
            ,{field:'education', width:120, title: '最高学历',align:'center'}
            ,{field:'major' ,width:140,title: '专业', align:'center'}
            ,{field:'workPlace', width:180, title: '现工作地点', align:'center'}
            ,{field:'workYear', width:137, title: '工作经验（年）', align:'center'}
            ,{field:'entryTime', width:137, title: '工作时间（年）', align:'center'}
            ,{field:'expectWorkPlace', width:150, title: '期望工作地点', align:'center'}
            ,{field:'expectWorkPosition', width:150, title: '期望工作职位', align:'center'}
            ,{field:'expectSalary', width:140, title: '期望年薪', sort: true,align:'center'}
            ,{field:'other', width:150, title: '其他要求',align:'center'}
            ,{field:'workExperience', width:200, title: '工作经历', sort: true,align:'center'}
            ,{field:'educationBackground', width:180, title: '教育背景', align:'center'}
            ,{field:'trainingBackground', width:180, title: '培训经历', align:'center'}
            ,{field:'isPublic', width:120, title: '是否公开简历', sort: true,align:'center'}
            ,{field:'havaTalent', width:120, title: '是否上传附件', sort: true,align:'center'}
            ,{field:'userMail', width:180, title: '提交人邮箱', align:'center'}
            ,{field:'createTime', width:160, title: '提交时间', sort: true, align:'center'}
            ,{field:'id', width:80, title: 'ID', sort: true,align:'center'}
            ,{fixed: 'right',title:'操作', width:200, align:'center', toolbar: '#addVerifyBar'} //这里的toolbar值是模板元素的选择器
        ]]
    });
   

    //监听工具条
    table.on('tool(addInfoShow)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            // layer.msg('ID：'+ data.id + ' 的查看操作');
        } else if(obj.event === 'del'){
            layer.confirm('确定要拒绝吗？拒绝会删除该条信息，无法恢复',{icon:3,title:'系统消息'}, function(index){
                $.ajax({
                    type:'get',
                    url:'http://' + changeUrl.address + '/manager/talent/delete.do',
                    data:{
                        talentId:data.id
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
                        id:data.id,
                        verifySign:1,
                        name:data.name
                    },
                    url:'http://' + changeUrl.address + '/manager/talent/update.do',
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



