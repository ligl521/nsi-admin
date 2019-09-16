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

    // laydate.render({
    //     elem:"#People_dueTime"
    // })
    $('.addData').click(function(e){
    	//e.preventDefault()
    // form.on('submit(lay-submit)',function (e) {
    	e.preventDefault()
        var havaTalent
        if($('.fujianattr').attr('data')==''){
            havaTalent=0
        }else{
            havaTalent=$('.fujianattr').attr('data')
        }
        // layer.msg(JSON.stringify(data.field));
        var insertData = {
			'image':$('#image').attr('src'),
            'name':$('#name').val(),
            'sex': $("input[name='sex']:checked").val(),
            'phone': $('#phone').val(),
            'mail': $('#mail').val(),
            'education':$('#education').val(),
            'major': $('#major').val(),
            'workPlace':$('#workPlace').val(),
            'workYear': $('#workYear').val(),
            'expectWorkPlace': $('#expectWorkPlace').val(),
            'expectWorkPosition': $('#expectWorkPosition').val(),
            'expectSalary': $('#expectSalary').val(),
            'entryTime':$('#entryTime').val(),
            'workExperience': $('#workExperience').val(),
            'educationBackground': $('#educationBackground').val(),
            'trainingBackground':$('#trainingBackground').val(),
            'isPublic': $("input[name='public']:checked").val(),
            'userMail': $.cookie('username'),   //课程发布人
            'havaTalent':havaTalent,
            'other': $('#other').val(),
        }
        $.ajax({
            type:'post',
            url:'http://' + changeUrl.address + '/manager/talents/add.do',
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












