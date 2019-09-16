layui.use(['table','form'], function(){
    var table = layui.table;
    var form = layui.form;

    table.render({
        elem: '#talentShow'
        ,url:'http://'+changeUrl.address+'/Comment/Admin_list.do'
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,page:true
        ,height:'full'
        ,request: { pageName: 'pageNum' ,limitName: 'pageSize'}
        ,limit:20
        ,id: 'renderReload'
        ,cols: [[
             {type:'checkbox',fixed:'left'}
            ,{field:'commentatorname', width:140, title: '评论人名称',align:'center',fixed:'left'}
            ,{field:'commentatormail', width:140,title: '评论人邮箱', sort:true,align:'center'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'classify',width:180, title: '课程',align:'center'}
            ,{field:'content', title: '评论内容',align:'center'}
            ,{fixed: 'right',title:'操作', width:200, align:'center', toolbar: '#barTalent'} //这里的toolbar值是模板元素的选择器
        ]]
    });
    //监听表格复选框选择
    table.on('checkbox(card)', function(obj){
        console.log(obj)
    });
    //监听工具条
    table.on('tool(talent)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            layer.confirm('通过此条评论', {
              btn: ['确定','取消'] //按钮
            }, function(){
              $.ajax({
                    type:'get',
                    url:'http://'+changeUrl.address+'/Comment/CommentVerify.do',
                    data:{
                       CommentId: data.id
                    },
                    success:function (msg) {
                       layer.closeAll()
                       if(msg.msg=='success'){
                            layer.alert('通过',{icon:1})
                            window.location.reload()
                       }
                    },
                    error:function () {
                        alert('请求失败')
                    }
                })
            }, function(){
             layer.closeAll()
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
        //（执行搜索）数据重载
        ,reload: function(){
        var resumeReload = $('#resumeReload');
        console.log(11)
        //执行重载
        table.reload('renderReload', {
            url: 'http://' + changeUrl.address + '/manager/talent/list.do',
            page: {
                curr: 1 //重新从第 1 页开始
            }
            ,where: {
                talent_searchKey: resumeReload.val(),
            }//需要传递的参数

        });
    }
    };

    $('.resumeTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //添加回车事件
    $('#resumeReload').keydown(function (e) {
        var curKey = e.which; //兼容火狐
        var resumeReload = $('#resumeReload');
        if(curKey == 13){
            //执行重载
            table.reload('renderReload', {
                url:  'http://' + changeUrl.address + '/manager/talent/list.do',
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                ,where: {
                    talent_searchKey: resumeReload.val(),
                }//需要传递的参数

            });
        }
    })

});


