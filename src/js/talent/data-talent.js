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
        ,url:'http://'+changeUrl.address+'/manager/talents/get_list.do?verifySign=1&talent_searchKey='
        ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        ,page:true
        ,height:'full-100'
        ,request: { pageName: 'pageNum' ,limitName: 'pageSize'}
        ,limit:20
        ,id: 'renderReload'
        ,cols: [[
             {type:'checkbox',fixed:'left'}
            ,{field:'image', width:100, title: '头像',align:'center',fixed:'left',templet:'#titleTpl'}
            ,{field:'name', width:100, title: '姓名',align:'center',fixed:'left'}
            ,{field:'sex', width:60,title: '性别', sort:true,align:'center'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            ,{field:'createTime', width:140, title: '提交时间',templet: '<div>{{ layui.laytpl.toDateString(d.createTime) }}</div>', sort: true, align:'center'}
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
            
            ,{field:'id', width:80, title: 'ID', sort: true,align:'center'}
            ,{fixed: 'right',title:'操作', width:240, align:'center', toolbar: '#barTalent'} //这里的toolbar值是模板元素的选择器
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
            layer.open({
                type: 2,
                title: '人才库-修改',
                shadeClose: false,
                maxmin: true, //开启最大化最小化按钮
                area: [$(window).width()*0.7+'px', $(window).height()*0.7+'px'],
                content: './data-talent-revise.html',
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
                        url: 'http://' + changeUrl.address + '/manager/talent/delete.do?talentId='+data.id+'',
                        contentType: 'application/json;charset=UTF-8',
                        dataType: "json",//数据类型为json  
                        success: function (msg) {
                            if(msg.code == '0'){
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
            if(data.havaTalent == 0||data.havaTalent == ''||data.havaTalent == null){
                layer.msg('用户没有上传附件')
            }else {
                console.log(data.havaTalent)
               //var href = 'http://data.xinxueshuo.cn/upFile/talent/'+data.UserMail+data.Name+'.'+data.HavaTalent
               var href=data.havaTalent
               $('#resumeHref').attr("href",href)
                document.getElementById("resumeHref").click()
            }
        }else if(obj.event === 'pinglun'){
            let guestId=data.id
            layer.open({
                title:'提交评论',
                type: 1,
                area:['420px', '240px'],
                btn: ['确定', '取消'],
                content: '<textarea data="no" style="resize:none;height:135px;" placeholder="" class="layui-textarea"  lay-verify="required"  id="guestProfile"></textarea>',
                yes:function(indexdata){
                    
                    console.log($('#guestProfile').val())
                    if($('#guestProfile').attr('data')=='no'){
                        $.ajax({
                            type:'post',
                            url:'http://' + changeUrl.address + '/manager/comments/add.do',
                            data:{
                                'commentName':$.cookie('username'),
                                'commentType':'人才评论',
                                'commentText':$('#guestProfile').val(),
                                'guestId':guestId,
                            },
                            success:function (msg1) {
                                if(msg1.code==0){
                                    layer.alert('添加成功',{icon:1},function (indexdata2) {
                                        layer.close(indexdata)
                                        layer.close(indexdata2)
                                    })
                                }else{
                                    layer.msg('请稍后再试')
                                }
                            },
                            error:function () {
                                layer.msg('')
                            }
                        })
                    }else{
                        $.ajax({
                            type:'post',
                            url:'http://' + changeUrl.address + '/manager/comments/modify.do',
                            data:{
                                'id':$('#guestProfile').attr('data'),
                                'commentName':$.cookie('username'),
                                'commentType':'人才评论',
                                'commentText':$('#guestProfile').val(),
                            },
                            success:function (msg1) {
                                if(msg1.code==0){
                                    layer.alert('修改成功',{icon:1},function (indexdata2) {
                                        layer.close(indexdata)
                                        layer.close(indexdata2)
                                    })
                                }else{
                                    layer.msg('请稍后再试')
                                }
                            },
                            error:function () {
                                layer.msg('')
                            }
                        })
                    }
                }
            });
            $.ajax({
                type:'post',
                url:'http://' + changeUrl.address + '/manager/comments/get_comments_list.do',
                data:{
                    'guestId':guestId,
                    'type':'人才评论',
                },
                success:function (msg1) {
                    $('#guestProfile').val(msg1.data[0].commentText)
                    $('#guestProfile').attr('data',msg1.data[0].id)
                    console.log(msg1)
                },
                error:function () {
                    layer.msg('')
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
        var resumeReload = $('#resumeReload');
        console.log(11)
        //执行重载
        table.reload('renderReload', {
            url: 'http://' + changeUrl.address + '/manager/talents/get_list.do?verifySign=1',
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
                url:  'http://' + changeUrl.address + '/manager/talents/get_list.do?verifySign=1',
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


