layui.use(['table','form'], function(){
    var table = layui.table;
    var form = layui.form;
    layui.laytpl.toDateString = function(d, format){
          var date = new Date(d || new Date())
          ,ymd = [
            this.digit(date.getFullYear(), 4)
            ,this.digit(date.getMonth() + 1)
            ,this.digit(date.getDate())
          ]
          ,hms = [
            this.digit(date.getHours())
            ,this.digit(date.getMinutes())
            ,this.digit(date.getSeconds())
          ];

          format = format || 'yyyy-MM-dd';

          return format.replace(/yyyy/g, ymd[0])
          .replace(/MM/g, ymd[1])
          .replace(/dd/g, ymd[2])
        };
        //数字前置补零
        layui.laytpl.digit = function(num, length, end){
          var str = '';
          num = String(num);
          length = length || 2;
          for(var i = num.length; i < length; i++){
            str += '0';
          }
          return num < Math.pow(10, length) ? str + (num|0) : num;
        };
    table.render({
        elem: '#talentShow'
        ,url:'http://'+changeUrl.address+'/manager/items/get_item_list.do?searchKey='
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,page:true
        ,height:'full-100'
        ,request: { pageName: 'pageNum' ,limitName: 'pageSize'}
        ,limit:20
        ,id: 'renderReload'
        ,cols: [[
             {type:'checkbox',fixed:'left'}
            ,{field:'name', width:260, title: '项目名称',align:'center',fixed:'left'}
            ,{field:'principal', width:140,title: '项目负责人',align:'center'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'status', width:120, title: '项目状态',templet:'#titleTpl', align:'center'}
            ,{field:'customerUnit', width:180, title: '客户单位',align:'center'}
            ,{field:'customerName',width:120, title: '客户姓名',align:'center'}
            ,{field:'customerPhone',width:180, title: '客户电话',align:'center'}
            ,{field:'customerLocaltion' ,width:140,title: '客户所在地', align:'center'}
            ,{field:'customerPrincipal', width:120, title: '客户对接人', align:'center'}
            ,{field:'estimatedTime', width:137, title: '预计结款时间',templet: '<div>{{ layui.laytpl.toDateString(d.estimatedTime) }}</div>',align:'center'}
            ,{field:'estimatedTime', width:137, title: '项目结束时间',templet: '<div>{{ layui.laytpl.toDateString(d.endTime) }}</div>',align:'center'}
            ,{field:'possibility', width:140, title: '项目可能性', sort: true,align:'center'}
            ,{field:'actualAmount', width:140, title: '实际金额', sort: true,align:'center'}
            ,{field:'projectBrief', width:150, title: '项目简介', align:'center'}
            ,{field:'visitPeople', width:150, title: '回访人',align:'center'}
            ,{field:'visitTime', width:200, title: '回访时间',templet: '<div>{{ layui.laytpl.toDateString(d.visitTime) }}</div>', sort: true,align:'center'}
            ,{field:'interviewResults', width:180, title: '回访结果', align:'center'}
            ,{field:'creator', width:210, title: '录入人', align:'center'}
            ,{field:'createTime', width:120, title: '创建时间',templet: '<div>{{ layui.laytpl.toDateString(d.createTime) }}</div>', sort: true,align:'center'}
            ,{field:'updateTime', width:120, title: '修改时间',templet: '<div>{{ layui.laytpl.toDateString(d.updateTime) }}</div>', sort: true,align:'center'}
            ,{field:'id', width:80, title: 'ID', sort: true,align:'center'}
            ,{fixed: 'right',title:'操作', width:200, align:'center', toolbar: '#barTalent'} //这里的toolbar值是模板元素的选择器
        ]]
    });
    //监听表格复选框选择
    // table.on('checkbox(card)', function(obj){
    //     console.log(obj)
    // });
    //监听工具条
    table.on('tool(talent)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            layer.open({
                type: 2,
                title: '咨询项目库-修改',
                shadeClose: false,
                maxmin: true, //开启最大化最小化按钮
                area: [$(window).width()*0.7+'px', $(window).height()*0.7+'px'],
                content: './data-consultProrevise.html',
                success: function(layero, index){
                    layer.full(index)
                    var body = layer.getChildFrame('body', index);
                    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                    // console.log(body.html()) //得到iframe页的body内容
                    body.find('#parent_PeopleId').val(data.id)
                    iframeWin.getInitData();
                }
            });
        } else if(obj.event === 'del'){
                layer.confirm('真的删除本条数据吗',{icon: 3, title:'系统提示'}, function(index){
                    $.ajax({
                        type: "get",
                        async: true,
                        url: 'http://' + changeUrl.address + '/manager/items/delete.do?itemId='+data.id+'',
                        contentType: 'application/json;charset=UTF-8',
                        dataType: "json",//数据类型为json  
                        success: function (msg) {
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
        }else if(obj.event === 'edit'){
            layer.open({
                type: 2,
                title: '咨询项目库-查看',
                shadeClose: false,
                maxmin: true, //开启最大化最小化按钮
                area: [$(window).width()*0.7+'px', $(window).height()*0.7+'px'],
                content: './data-consultProInfor.html',
                success: function(layero, index){
                    layer.full(index)
                    var body = layer.getChildFrame('body', index);
                    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                    // console.log(body.html()) //得到iframe页的body内容
                    body.find('#parent_PeopleId').val(data.id)
                    iframeWin.getInitData();
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
        //（执行搜索）数据重载
        ,reload: function(){
        var resumeReload = $('#resumeReload');
        console.log(11)
        //执行重载
        table.reload('renderReload', {
            url: 'http://' + changeUrl.address + '/manager/items/get_item_list.do',
            page: {
                curr: 1 //重新从第 1 页开始
            }
            ,where: {
                searchKey: resumeReload.val(),
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
                url:  'http://' + changeUrl.address + '/manager/items/get_item_list.do',
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                ,where: {
                    searchKey: resumeReload.val(),
                }//需要传递的参数

            });
        }
    })

});


