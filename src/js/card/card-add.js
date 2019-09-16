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

layui.use(['form','laydate','layer'],function () {
    var form = layui.form
        ,laydate = layui.laydate
        ,layer = layui.layer

    laydate.render({
        elem:"#People_dueTime"
    })
    form.on('submit(card-submit)',function (data) {
        // layer.msg(JSON.stringify(data.field));
        var insertData = {
            'peopleName': $('#People_name').val(),
            'peopleMember': $('#People_member').val(),
            'peopleDuetime': $('#People_dueTime').val(),
            'peopleWork': $('#People_work').val(),
            'peoplePosition': $('#People_position').val(),
            'peoplePhone': $('#People_phone').val(),
            'peopleTag':$('#peopleTag').val(),
            'peopleMail': $('#People_mail').val(),
            'peopleTelephone': $('#People_telephone').val(),
            'peopleWechat': $('#People_wechat').val(),

            'peopleAddress': $('#People_address').val(),
            'peopleIntroduction': $('#People_introduction').val(),
            'peopleRemark': $('#People_remark').val(),
            'peopleLoadpeople': $.cookie('User_TureName'),   //课程发布人
        }
        $.ajax({
            type:'post',
            url:'http://' + changeUrl.address + '/manager/people/add.do',
            data:insertData,
            success:function (msg) {
               console.log(msg)
                layer.alert('提交成功',{icon:1},function () {
                    var index = parent.layer.getFrameIndex(window.name)
                    parent.layer.close(index)
                })
            },
            error:function () {
                layer.msg('网络繁忙，请稍后再试！')
            }
        })
        return false;
    })
    function panduanAjax(type1,domid){
        if($('#'+domid+'').val()==''){
            return
        }
        $.ajax({
            type: "post",
            data:{
                str:$('#'+domid+'').val(),
                type:type1
            },
            url: 'http://' + changeUrl.address + '/manager/people/check_valid.do',
            success: function (msg) {
                
                $('.'+domid+'Str').html(msg.msg)
            },
            error: function () {
                alert('网络繁忙，请稍后再试！');
            }
        });
    }
    $('#People_name').blur(function(){
        
        panduanAjax('username','People_name')
        
    })
    $('#People_phone').blur(function(){
        panduanAjax('phone','People_phone')
        
    })
    $('#People_mail').blur(function(){
        panduanAjax('email','People_mail')
        
    })
})












