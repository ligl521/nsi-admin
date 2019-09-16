layui.use(['table','form'], function(){
    var table = layui.table;
    table.render({
        elem: '#instiShow'
        ,url:'http://'+changeUrl.address+'/manager/assignment/query_student_assignment.do?validCode=0'
        ,page:true
         ,height:'full'
        ,request: { pageName: 'pageNum' ,limitName: 'pageSize'}
        ,limit:10
        
        ,cols: [[
             {field:'courseId', title: '课程ID',align:'center',fixed: 'left',}
            ,{field:'usermail', title: '用户', align:'center'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'assignmentContent', title: '内容', align:'center',toolbar: '#barInsti3'}//assignmentContent
            ,{fixed: 'right',title:'操作', width:'200', align:'center', toolbar: '#barInsti'} //这里的toolbar值是模板元素的选择器
        ]]
    });
    table.on('tool(instiShow)', function(obj){
        console.log(obj)
        var data = obj.data;
        if(obj.event === 'detail'){
            layer.confirm('通过审核?',{icon: 3, title:'系统提示'}, function(index){
                    $.ajax({
                        type: "get",
                        async: true,
                        data: {
                            "assignmentId":data.id
                        },//提交的参数
                        url: 'http://' + changeUrl.address + '/manager/assignment/set_assignment_status.do',
                        contentType: 'application/json;charset=UTF-8',
                        dataType: "json",//数据类型为json  
                        success: function (msg) {
                            console.log(msg)
                            if(msg.msg == '修改状态成功'){
                                layer.msg('审核通过')
                                window.location.reload()
                            }
                        },
                        error: function () {
                            alert('网络繁忙，请稍后再试！');
                        }
                    });
                });
           
        } else if(obj.event === 'del'){
                layer.confirm('真的删除本条数据吗',{icon: 3, title:'系统提示'}, function(index){
                    //删除作业
                    $.ajax({
                        type: "get",
                        async: true,
                        data: {
                            "assignmentId":data.id
                        },//提交的参数
                        url: 'http://' + changeUrl.address + '/manager/assignment/remove_assignment.do',
                        contentType: 'application/json;charset=UTF-8',
                        dataType: "json",//数据类型为json  
                        success: function (msg) {
                            console.log(msg)
                            if(msg.msg == '删除成功'){
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
            console.log(data)
            layer.open({
              type: 1,
               maxmin: true,
              area: ['500px', '400px'],
              content: data.assignmentContent //这里content是一个普通的String
            });
        }
    });
    table.render({
        elem: '#instiShow2'
        ,url:'http://'+changeUrl.address+'/manager/assignment/query_student_assignment.do?validCode=1'
        ,page:true
         ,height:'full'
        ,request: { pageName: 'pageNum' ,limitName: 'pageSize'}
        ,limit:10
        ,cols: [[
             {field:'courseId', width:'100', title: '课程ID',align:'center',fixed: 'left',}
            ,{field:'usermail', width:'250', title: '用户', align:'center'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'assignmentContent', width:'700', title: '内容',align:'center',toolbar: '#barInsti4'}
            ,{fixed: 'right',title:'操作', width:'100', align:'center', toolbar: '#barInsti2'} //这里的toolbar值是模板元素的选择器
        ]]
    });
    //监听工具条
    table.on('tool(instiShow2)', function(obj){
        console.log(obj)
        var data = obj.data;
        if(obj.event === 'del'){
                layer.confirm('真的删除本条数据吗',{icon: 3, title:'系统提示'}, function(index){
                    //删除作业
                    $.ajax({
                        type: "get",
                        async: true,
                        data: {
                            "assignmentId":data.id
                        },//提交的参数
                        url: 'http://' + changeUrl.address + '/manager/assignment/remove_assignment.do',
                        contentType: 'application/json;charset=UTF-8',
                        dataType: "json",//数据类型为json  
                        success: function (msg) {
                            console.log(msg)
                            if(msg.msg == '删除成功'){
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
            console.log(data)
            layer.open({
              type: 1,
               maxmin: true,
              area: ['500px', '400px'],
              content: data.assignmentContent //这里content是一个普通的String
            });
        }
    });
});