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
                  elem: '#dateGuest', //指定元素
                  value: ''
                });
    $('.updateData').click(function(e){
    	console.log($.cookie('username'))
    	e.preventDefault()
        if($('#guestName').val()==''||$('#participants').val()==''){
            layer.msg('必填项不能为空！')
            return
        }
        let str=$('#dateGuest').val()
        console.log(str)
       let birthdayStr
       if(str==0){
            birthdayStr=''
       }else{
            let dateArr=str.split('-')
           let newArr=dateArr.map(function(item,index){
                return Number(item)
           })
           birthdayStr=newArr.join('-')
       }
       

        var insertData = {
            'imgAddr':$('#image').attr('src'),
            'guestName':$('#guestName').val(),
            'guestPhone':$('#guestPhone').val(),
            'guestPost':$('#guestPost').val(),
            'guestCompany':$('#guestCompany').val(),
            'guestEmail':$('#guestEmail').val(),
            'guestProfile':$('#guestProfile').val(),
            'participants':$('#participants').val(),
            'submitter':$.cookie('username'),
            'guestBirthday':birthdayStr,
            'idCard':$('#idCard').val(),
            'cardNumber':$('#cardNumber').val(),
            'banks':$('#banks').val()
        }
        $.ajax({
            type:'post',
            url:'http://' + changeUrl.address + '/manager/guest/add.do',
            data:insertData,
            success:function (msg) {
               console.log(msg)
                if(msg.msg =='添加成功'){
                    layer.alert('添加成功,刷新页面显示',{icon:1},function () {
                        var index = parent.layer.getFrameIndex(window.name)
                        parent.layer.close(index)
                        
                    })
                }else {
                    layer.msg('网络繁忙，请稍后再试！')
                }
            },
            error:function () {
                layer.msg('请检查嘉宾库是否存在该人员')
            }
        })
        return false;
    })
})