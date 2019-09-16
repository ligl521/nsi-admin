var E = window.wangEditor
    var editor1 = new E('#listDescription')
    // 关闭粘贴样式的过滤
    editor1.customConfig.pasteFilterStyle = false
    editor1.customConfig.uploadImgServer = 'http://data.xinxueshuo.cn:80/nsi-1.0/Admin_api?whereFrom=EditorUpImg' // 上传图片到服务器
   editor1.customConfig.debug = true
   editor1.create()



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
        url:'http://' + changeUrl.address + '/manager/courseList/detail.do',
        data:{
            courseListId:$('#parent_PeopleId').val()
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
                if(msg[0].listType=='直播课'){
                    $("input[name=listType]").eq(1).attr('checked','checked')
                }else if(msg[0].listType=='线下课'){
                    $("input[name=listType]").eq(2).attr('checked','checked')
                }else{
                    $("input[name=listType]").eq(0).attr('checked','checked')
                }
                $('#listImg').attr('src',msg[0].listImg)
                $('#listTitle').val(msg[0].listTitle)
                $('#listPrice').val(msg[0].listPrice)
                $('#listTheme').val(msg[0].listTheme)
                $('#lecturer').val(msg[0].lecturer)
                $('#syllabus').val(msg[0].syllabus)
                editor1.txt.html(msg[0].listDescription)
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
    form.on('submit(demo1)',function (data) {
        //layer.msg(JSON.stringify(data.field));
        var insertData = {
			'listId':$('#parent_PeopleId').val(),
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
            url:'http://' + changeUrl.address + '/manager/courseList/modify.do',
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