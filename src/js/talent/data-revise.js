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
        url:'http://' + changeUrl.address + '/manager/talent/detail.do',
        data:{
            talentId:$('#parent_PeopleId').val()
        },
        success:function (msg1) {
            let msg=[]
            msg.push(msg1.data)
            
            layui.use('form',function () {
                var form = layui.form
                form.render()
                $('#image').attr('src',msg[0].image)
                $('#name').val(msg[0].name)

                if(msg[0].sex==='男'){
                	$("input[name=sex]").eq(0).attr('checked','checked')
                }else{
                	$("input[name=sex]").eq(1).attr('checked','checked')
                }
                $('#phone').val(msg[0].phone)
                $('#mail').val(msg[0].mail)

                $('#education').val(msg[0].education)
                $('#major').val(msg[0].major)
                $('#workPlace').val(msg[0].workPlace)
                $('#workYear').val(msg[0].workYear)
                $('#entryTime').val(msg[0].entryTime)
                $('#expectWorkPlace').val(msg[0].expectWorkPlace)
                $('#expectWorkPosition').val(msg[0].expectWorkPosition)
                $('#expectSalary').val(msg[0].expectSalary)
                $('#other').val(msg[0].other)
               	$('#workExperience').val(msg[0].workExperience)
                $('#educationBackground').val(msg[0].educationBackground)
                $('#trainingBackground').val(msg[0].trainingBackground)
                if(msg[0].public=='0'){
                	$("input[name=public]").eq(1).attr('checked','checked')
                }else{
                	$("input[name=public]").eq(0).attr('checked','checked')
                }
                $('#fujian').attr('data',msg[0].havaTalent)
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
            'havaTalent':$('#fujian').attr('data'),
            'other': $('#other').val(),
            
        }
        $.ajax({
            type:'post',
            url:'http://' + changeUrl.address + '/manager/talent/update.do',
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