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
        elem:"#estimatedTime"
    })
    laydate.render({
        elem:"#visitTime"
    })
    laydate.render({
        elem:"#endTime"
    })
    //$('.addData').click(function(e){
    	//e.preventDefault()
     form.on('submit(demo1)',function (e) {
    	//e.preventDefault()
        var havaTalent
        if($('.fujianattr').attr('data')==''){
            havaTalent=0
        }else{
            havaTalent=$('.fujianattr').attr('data')
        }
        // layer.msg(JSON.stringify(data.field));
        var insertData = {
            "name": $('#name').val(),
            "principal": $('#principal').val(),
            "customerName": $('#customerName').val(),
            "customerPhone": $('#customerPhone').val(),
            "customerUnit": $('#customerUnit').val(),
            "customerLocaltion": $('#customerLocaltion').val(),
            "customerPrincipal": $('#customerPrincipal').val(),
            "estimatedAmount":0,
            "estimatedTime": $('#estimatedTime').val(),
            "projectBrief": $('#projectBrief').val(),
            "actualAmount": $('#actualAmount').val(),
            "visitPeople": $('#visitPeople').val(),
            "visitTime":$('#visitTime').val(),
            "interviewResults": $('#interviewResults').val(),
            "creator": $.cookie('username'),
            "endTime":$('#endTime').val(),
            "possibility":$('#possibility').val(),
        }
        $.ajax({
            type:'post',
            url:'http://' + changeUrl.address + '/manager/items/add_item.do',
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
})












