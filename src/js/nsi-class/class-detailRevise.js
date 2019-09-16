    var E = window.wangEditor
    var editor1 = new E('#editor1')
    var editor2 = new E('#editor2')
    var editor3 = new E('#editor3')
    var editor4 = new E('#editor4')

    // 关闭粘贴样式的过滤
    editor1.customConfig.pasteFilterStyle = false
    editor2.customConfig.pasteFilterStyle = false
    editor1.customConfig.pasteFilterStyle = false
    editor3.customConfig.pasteFilterStyle = false

    editor1.customConfig.uploadImgServer = 'http://data.xinxueshuo.cn:80/nsi-1.0/Admin_api?whereFrom=EditorUpImg' // 上传图片到服务器
    editor2.customConfig.uploadImgServer = 'http://data.xinxueshuo.cn:80/nsi-1.0/Admin_api?whereFrom=EditorUpImg' // 上传图片到服务器
    editor3.customConfig.uploadImgServer = 'http://data.xinxueshuo.cn:80/nsi-1.0/Admin_api?whereFrom=EditorUpImg' // 上传图片到服务器
    editor4.customConfig.uploadImgServer = 'http://data.xinxueshuo.cn:80/nsi-1.0/Admin_api?whereFrom=EditorUpImg' // 上传图片到服务器

   editor1.customConfig.debug = true
   editor2.customConfig.debug = true
   editor3.customConfig.debug = true
   editor4.customConfig.debug = true

   editor1.create()
   editor2.create()
   editor3.create()
   editor4.create()



    function getInitData() {
        console.log($('#courseId').val())
        $.ajax({
            type:"get",
            data:{
                Id:$('#courseId').val()
            },
            url:'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Course_GetHtml',
            dataType:"json",
            contentType:"application/json;charset=UTF-8",
            async:true,
            success:function (res) {
                console.log(res)
                if(res.data[0].Html01 == undefined || res.data[0].Html02 == undefined || res.data[0].Html02 == undefined || res.data[0].Html02 == undefined){
                    layer.alert('您还没有填写课程详细信息',{icon:2,shade: [0.5,'#000']},function () {
                        //当你在iframe页面关闭自身时
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index); //再执行关闭
                    })
                }else {
                    editor1.txt.html(res.data[0].Html01)
                    editor2.txt.html(res.data[0].Html02)
                    editor3.txt.html(res.data[0].Html03)
                    editor4.txt.html(res.data[0].Html04)
                }
            },
            error:function () {
                layer.alert('服务器繁忙，请稍后再试')
            }
        })
    }



layui.use(['form','layer'],function () {
    var form = layui.form
    var layer = layui.layer
    
    form.on('submit(demo1)',function () {
        // console.log("editor1:" + editor1.txt.html() + ";editor2:" + editor2.txt.html() + ";editor3:" + editor3.txt.html() + ";editor4:" + editor4.txt.html())

        var index =  layer.msg('上传中...', {
            icon: 16
            ,time: 200000 //2秒关闭（如果不配置，默认是3秒）
            ,shade: [0.8,'#000']
        });

        var data = {
            "object01": $('#courseId').val(),
            "object02": editor1.txt.html(),
            "object03": editor2.txt.html(),
            "object04": editor3.txt.html(),
            "object05": editor4.txt.html(),
        }

        $.ajax({
            type: 'post',
            dataType: 'json', //表示返回值的数据类型
            contentType: 'application/json;charset=UTF-8', //内容类型
            traditional: true,
            async: true,
            data: JSON.stringify(data),
            processData: false,
            // contentType: false,
            url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Course_InsertHtml',
            // url: 'http://192.168.0.170:8080/nsi-0.9/Class_Course_api',
            success: function(msg) {
                layer.alert('修改成功,可在课程概览页面修改，请勿重复提交',function () {
                    //当你在iframe页面关闭自身时
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭
                })
                console.log(msg)
            },
            error:function () {
                layer.alert('网络繁忙，请稍后再试')
            }

        })
      return false;
    })
})





