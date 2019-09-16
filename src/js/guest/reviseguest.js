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
	console.log($('#parent_PeopleId').val())
    $.ajax({
        type:'get',
        url:'http://' + changeUrl.address + '/manager/guest/get_guest_info.do',
        data:{
            guestId:$('#parent_PeopleId').val()
        },
        success:function (msg) {
        	console.log(msg)

            
            layui.use(['form','laydate'],function () {
                var laydate=layui.laydate
                var data=msg.data.guestBirthday
                let flagStr
                if(data==''){
                     flagStr=''
                }else{
                    let dataArr=data.split('-')
                    let newArr=dataArr.map(function(datedata){
                        console.log(datedata)
                        return datedata<10?'0'+datedata:datedata
                        
                    })
                    flagStr=newArr.join('-')
                   
                }
                
                laydate.render({
                  elem: '#dateGuest', //指定元素
                  value: flagStr
                });
                var form = layui.form
                form.render()
                $('#image').attr('src',msg.data.imgAddr)
                $('#guestName').val(msg.data.guestName)
                $('#guestPhone').val(msg.data.guestPhone)
                $('#guestPost').val(msg.data.guestPost)
                $('#guestCompany').val(msg.data.guestCompany)
                $('#guestEmail').val(msg.data.guestEmail)
                $('#guestProfile').val(msg.data.guestProfile)
                $('#participants').val(msg.data.participants)
                $('#idCard').val(msg.data.idCard)
                $('#cardNumber').val(msg.data.cardNumber)
                $('#banks').val(msg.data.banks)
                form.render()
            })
        },
        error:function () {
            layer.msg('请求数据出错')
        }
    })

}


layui.use(['form','laydate','layer','laydate'],function () {
    var form = layui.form
        ,laydate = layui.laydate
        ,layer = layui.layer
    // laydate.render({
    //     elem:"#People_dueTime"
    // })
    $('.updateData').click(function(e){
    	console.log($.cookie('username'))
    	e.preventDefault()
        if($('#guestName').val()==''||$('#participants').val()==''){
            layer.msg('必填项不能为空！')
            return
        }
       let str=$('#dateGuest').val()
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
			'guestId':$('#parent_PeopleId').val(),
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
            url:'http://' + changeUrl.address + '/manager/guest/modify.do',
            data:insertData,
            success:function (msg) {
               console.log(msg)
                if(msg.msg =='修改成功'){
                    layer.alert('修改成功，请刷新页面显示',{icon:1},function () {
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