var E = window.wangEditor
    var editor1 = new E('#listDescription')
    // 关闭粘贴样式的过滤
    editor1.customConfig.pasteFilterStyle = false
    editor1.customConfig.uploadImgServer = 'http://data.xinxueshuo.cn:80/nsi-1.0/Admin_api?whereFrom=EditorUpImg' // 上传图片到服务器
   editor1.customConfig.debug = true
   editor1.create()
layui.use(['form','laydate','layer'],function () {
    var form = layui.form
        ,laydate = layui.laydate
        ,layer = layui.layer
    // laydate.render({
    //     elem:"#People_dueTime"
    // })
    // $('.updateData').click(function(e){
    // 	e.preventDefault()
    // })
     form.on('submit(demo1)',function (data) {
        //layer.msg(JSON.stringify(data.field));
        var insertData = {
            'listImg':$('#listImg').attr('src'),
            'listTitle':$('#listTitle').val(),
            'listPrice':$('#listPrice').val(),
            'listTheme':$('#listTheme').val(),
            'lecturer':$('#lecturer').val(),
            'syllabus':$('#syllabus').val(),
            'listDescription':editor1.txt.html(),
            'status': $("input[name='status']:checked").val(),
            'pattern': $("input[name='pattern']:checked").val(),
            'listType': $("input[name='listType']:checked").val(),
        }
        $.ajax({
            type:'post',
            url:'http://' + changeUrl.address + '/manager/courseList/add.do',
            data:insertData,
            success:function (msg) {
               console.log(msg)
                if(msg.code =='0'){
                    layer.alert('添加成功',{icon:1},function () {
                        var index = parent.layer.getFrameIndex(window.name)
                        parent.layer.close(index)
                    })
                }else {
                    layer.msg('网络繁忙，请稍后再试！')
                }
            },
            error:function () {
                layer.msg('网络繁忙，请稍后再试！')
            }
        })
        return false;
    })
})