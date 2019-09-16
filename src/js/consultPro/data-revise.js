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
        url:'http://' + changeUrl.address + '/manager/items/get_item.do',
        data:{
            itemId:$('#parent_PeopleId').val()
        },
        success:function (msg1) {
            console.log(msg1)
            let msg=[]
            msg.push(msg1.data)
            
            layui.use('form',function () {
                var form = layui.form
                form.render()
                let date1=zhuanDate(msg[0].estimatedTime)
                let date2=zhuanDate(msg[0].visitTime)
                if(msg[0].status===0){
                    $("input[name=sex]").eq(0).attr('checked','checked')
                }else if(msg[0].status===1){
                    $("input[name=sex]").eq(1).attr('checked','checked')
                }else if(msg[0].status===2){
                    $("input[name=sex]").eq(2).attr('checked','checked')
                }
                $('#name').val(msg[0].name)
                $('#principal').val(msg[0].principal)
                $('#customerName').val(msg[0].customerName)
                $('#customerPhone').val(msg[0].customerPhone)
                $('#customerUnit').val(msg[0].customerUnit)
                $('#customerLocaltion').val(msg[0].customerLocaltion)
                $('#customerPrincipal').val(msg[0].customerPrincipal)
               // $('#estimatedAmount').val(msg[0].estimatedAmount)
                $('#estimatedTime').val(date1)
                $('#projectBrief').val(msg[0].projectBrief)
                $('#actualAmount').val(msg[0].actualAmount)
                $('#visitPeople').val(msg[0].visitPeople)
                $('#visitTime').val(date2)
                $('#interviewResults').val(msg[0].interviewResults)
                $('#endTime').val(msg[0].endTime)
                $('#possibility').val(msg[0].possibility)
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
    laydate.render({
            elem:"#estimatedTime"
        })
    laydate.render({
            elem:"#visitTime"
        })
        laydate.render({
            elem:"#endTime"
        })
    // laydate.render({
    //     elem:"#People_dueTime"
    // })
    // $('.updateData').click(function(e){
    // 	e.preventDefault()
    // })
     form.on('submit(demo1)',function (data) {
        //layer.msg(JSON.stringify(data.field));
        
        var insertData = {
            
			'id':$('#parent_PeopleId').val(),
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
            "status":$("input[name='sex']:checked").val(),
            "endTime":$('#endTime').val(),
            "possibility":$('#possibility').val(),
        }
        $.ajax({
            type:'post',
            url:'http://' + changeUrl.address + '/manager/items/modify.do',
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
function add0(data){
    return data>9?data:'0'+data
}
function zhuanDate(data){
    var shijianchuo=data
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)
}
var flagxonsultStr=`<div>
    <textarea class="layui-textarea addHuiFangEdit"></textarea>
</div>`
$('.addHuiFang').click(function(e){
    e.preventDefault()
    layer.open({
            title:'提交回访',
            type: 1,
            area:['600px', '220px'],
            btn: ['确定', '取消'],
            content: flagxonsultStr,
            yes:function(indexdata){
                var myDate = new Date();
                let date=myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()
                let flagData=$('#interviewResults').val()+date+' '+$.cookie('User_TureName')+'：'+$('.addHuiFangEdit').val()+'\r\n'
                $('#interviewResults').text(flagData)
                $('#interviewResults').val($('#interviewResults').text())
                layer.close(indexdata)
            }
        });
})