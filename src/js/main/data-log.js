
//邀请码展示
function getLogData(para) {
    layui.use(['laytpl','layer'],function () {
        var laytpl = layui.laytpl
        var layer = layui.layer
        $.ajax({
            type:'get',
            url: 'http://' + changeUrl.address + '/Admin_api?whereFrom=GetLog',
            dataType:'json',
            data:{
                type:para
            },
            success:function (data) {
                console.log(data)
                var temData = JSON.parse('{ "list":'+JSON.stringify(data)+'}')
                var getTpl = logDemo.innerHTML
                    ,view = document.getElementById('logView');
                laytpl(getTpl).render(temData, function(html){
                    view.innerHTML = html;
                });
            },
            error:function () {
                layer.alert('服务器发生错误，请稍后再试',{icon:2})
            }
        })
    })

}
$(function () {
    getLogData('')
    $('#searchLog').on('click',function () {
        var val = $('#searchLogVal').val()
        getLogData(val)
    })
})

