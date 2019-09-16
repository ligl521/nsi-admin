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
        url:'http://' + changeUrl.address + '/manager/institution/detail.do',
        data:{
            institutionId:$('#parent_PeopleId').val()
        },
        success:function (msg1) {
            let msg=[]
            msg.push(msg1.data)
            
            layui.use('form',function () {
                var form = layui.form
                form.render()
                $('#image').attr('src',msg[0].institutionLogo)
                $('#name').val(msg[0].name)
                $('#label').val(msg[0].label)
                $('#type').val(msg[0].type)
                $('#foundedTime').val(msg[0].foundedTime)
                $('#website').val(msg[0].website)

                $('#service').val(msg[0].service)
                $('#introduction').val(msg[0].introduction)
                $('#investment').val(msg[0].investment)
                $('#servedschool').val(msg[0].servedschool)
                $('#remark').val(msg[0].remark)

                $('#areas').val(msg[0].areas)
                $('#areas02').val(msg[0].areas02)
                $('#areas03').val(msg[0].areas03)
               	$('#contactname').val(msg[0].contactname)
                $('#contactphone').val(msg[0].contactphone)
                $('#contactmail').val(msg[0].contactmail)
                $('#contactposition').val(msg[0].contactposition)
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
    $('.updateData').click(function(e){
    	e.preventDefault()
    // })
    // form.on('submit(lay-submit)',function (data) {
        //layer.msg(JSON.stringify(data.field));
        var insertData = {
			'id':$('#parent_PeopleId').val(),
			'institutionLogo':$('#image').attr('src'),
            'name':$('#name').val(),
            'label': $("#label").val(),
            'type': $('#type').val(),
            'foundedTime': $('#foundedTime').val(),
            'website':$('#website').val(),

            'service': $('#service').val(),
            'introduction':$('#introduction').val(),
            'investment': $('#investment').val(),
            'servedschool': $('#servedschool').val(),
            'remark': $('#remark').val(),
            'areas': $('#areas').val(),
            'areas02':$('#areas02').val(),
            'areas03': $('#areas03').val(),
            'contactname': $('#contactname').val(),
            'contactphone':$('#contactphone').val(),
            'contactmail': $("#contactmail").val(),
            'contactposition': $("#contactposition").val(),   //课程发布人
            'institutionShow':'',
            'img02':'',
            'img03':'',
            'img04':'',
            'img05':'',
            'recentModifier':$.cookie('username'),
        }
        $.ajax({
            type:'post',
            url:'http://' + changeUrl.address + '/manager/institution/update.do',
            data:insertData,
            success:function (msg) {
               console.log(msg)
                if(msg.msg =='修改成功'){
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