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
    $.ajax({
        url:'http://' + changeUrl.address + '/manager/category/get_course_item.do',
        type: "Post",
        dataType: "json",
        success: function (result) {
            $('.fukecheng').empty()
            for (let index = 0; index < result.data.length; index++) {
                $('.fukecheng').append('<option value="'+result.data[index].listId+'">'+result.data[index].listTitle+'</option>')
            }
            form.render()
        },
    })
     form.on('submit(demo1)',function (data) {
        //layer.msg(JSON.stringify(data.field));
        var insertData = {
            'courseId':$('#courseId').val(),
            'listId':$('.fukecheng').val(),
            'courseName':$('#courseName').val(),
            'courseTitle':$('#courseTitle').val(),
            'price':$('#price').val(),
            'duration':$('#duration').val(),
            'courseInstructor':$('#courseInstructor').val(),
            'courseAddress':$('#courseAddress').val(),
            'status': $("input[name='status']:checked").val(),
            'pattern': $("input[name='pattern']:checked").val(),
        }
        $.ajax({
            type:'post',
            url:'http://' + changeUrl.address + '/manager/category/add.do',
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