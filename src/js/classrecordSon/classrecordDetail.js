//chrome动态加载JS 代码：
//@ sourceURL=dynamicScript.js
var setPos=function(o){
    if(o.setSelectionRange){//W3C
        setTimeout(function(){
            o.setSelectionRange(o.value.length,o.value.length);
            o.focus();
        },0);
    }else if(o.createTextRange){//IE
        var textRange=o.createTextRange();
        textRange.moveStart("character",o.value.length);
        textRange.moveEnd("character",0);
        textRange.select();
    }
};

//学制点击按钮输入
function Insert(str,objId) {
    var obj = document.getElementById(objId);
    setPos(obj);
    if(document.selection) {
        obj.focus();
        var sel=document.selection.createRange();
        document.selection.empty();
        sel.text = str;
    } else {
        var prefix, main, suffix;
        prefix = obj.value.substring(0, obj.selectionStart);
        main = obj.value.substring(obj.selectionStart, obj.selectionEnd);
        suffix = obj.value.substring(obj.selectionEnd);
        obj.value = prefix + str + suffix;
    }
    obj.focus();
}

function getInitData() {
    $.ajax({
        type:'get',
        url:'http://' + changeUrl.address + '/manager/category/detail.do',
        data:{
            courseId:$('#parent_PeopleId').val()
        },
        success:function (msg1) {
            let msg=[]
            msg.push(msg1.data)
            
            layui.use('form',function () {
                var form = layui.form
                form.render()
                if(msg[0].status=='0'){
                	$("input[name=status]").eq(0).attr('checked','checked')
                }else{
                	$("input[name=status]").eq(1).attr('checked','checked')
                }
                if(msg[0].pattern=='0'){
                	$("input[name=pattern]").eq(0).attr('checked','checked')
                }else{
                	$("input[name=pattern]").eq(1).attr('checked','checked')
                }
                $('.fukecheng').val(msg[0].listId)
                $('#courseName').val(msg[0].courseName)
                $('#courseTitle').val(msg[0].courseTitle)
                $('#price').val(msg[0].price)
                $('#duration').val(msg[0].duration)
                $('#courseInstructor').val(msg[0].courseInstructor)
                $('#courseAddress').val(msg[0].courseAddress)
                $('#courseId').val(msg[0].courseId)
                form.render()
            })
        },
        error:function () {
            layer.msg('请求数据出错')
        }
    })

}

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
            'id':$('#parent_PeopleId').val(),
			'courseId': $('#courseId').val(),
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
            url:'http://' + changeUrl.address + '/manager/category/modify.do',
            data:insertData,
            success:function (msg) {
               console.log(msg)
                if(msg.data =='修改成功'){
                    layer.alert('修改成功',{icon:1},function () {
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