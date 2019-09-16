let layuiIndex
//封装ajax
function myAjax(data, url, success) {
    $.ajax({
        type: "get",
        async: true,
        data: data, //提交的参数
        url: url,
        success : function(msg) {
        	//console.log(msg)
            success(msg.data.list);
            $('#loadgif').hide()
            $('#floatLayer').hide() //遮罩层
            $("html,body").animate({ scrollTop: 0 }, 0);
        },
        error: function() {
            alert('数据请求失败，请稍后再试！！');
        }
    });
}

function filterFn(para) {
    return para == 0 ? '未填写' : para
}

function closeChangeStyle(obj) {
    if(obj.substring(0,3)=="<p>"){
        var reg = new RegExp('</p><p>', 'g')
        var newObj = obj.replace(reg, '\n')
        return newObj.slice(3, newObj.length - 4)
    }else {
        return obj
    }
}
$('#addguest').click(function(e){
	e.preventDefault()
	layer.open({
            type: 2,
            title: '嘉宾库-增加',
            shadeClose: false,
            maxmin: true, //开启最大化最小化按钮
            area: [$(window).width()*0.7+'px', $(window).height()*0.7+'px'],
            content: './addguest.html',
            success: function(layero, index){
                layer.full(index)
                var body = layer.getChildFrame('body', index);
                var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                // console.log(body.html()) //得到iframe页的body内容
          
            }
    });
})
// 解析url
function getQueryStringArgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : "");
    var args = {};
    var items = qs.length ? qs.split("&") : [];
    var item = null;
    var name = null;
    var value = null;
    len = items.length;
    for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

//创建列表
function createList(msg) {
	

    for (var i = 0; i < msg.length; i++) {
         var sex = 'icon-nan'
         var dates=zhuanDate(msg[i].createTime)
        $("#result").append(
            '<div style="position:relative;" class="talent-list row"><div class="col-md-8 "><div class="talent-list_left01"><span>最后修改人：'+msg[i].submitter+'</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>最后修改时间：'+dates+'</span></div><div class="clearfix talent-list_left02"><div class="pull-left text-center talent-list_left02Bottom"><img src="' + msg[i].imgAddr + '?x-oss-process=image/resize,p_30" alt="" class="talent-list_logo"><p class=" text-center"> <span class="expect-salary">'+msg[i].guestName+'<span></span></span></p></div><div class="pull-left talent-list_left02Right"><p>公司：<span>'+msg[i].guestCompany+'</span></p><p>职位：<span>'+msg[i].guestPost+'</span></p><p>电话：<span>'+msg[i].guestPhone+'</span></p><p>邮箱：<span>'+msg[i].guestEmail+'</span></p><p class="talent-nowWorkplace">关系： <span>'+msg[i].participants+' </span></p></div><div class="pull-left talent-list_left02Right"><p>生日：<span>'+msg[i].guestBirthday+'</span></p><p>身份证号：<span>'+msg[i].idCard+'</span></p><p>银行卡号：<span>'+msg[i].cardNumber+'</span></p><p>开户行：<span>'+msg[i].banks+'</span></p></div></div></div><div class="col-md-4 clearfix"><div style="overflow:hidden;margin:0px 0 -45px 0;"><button style="float:right;margin-left:15px;" class="layui-btn deleteguest layui-btn-danger" data="'+msg[i].guestId+'">删除</button><button style="float:right;background:#215089;" class="layui-btn bianjiguest layui-btn-normal" data="'+msg[i].guestId+'">编辑</button><button style="float:right;background:#5FB878;" class="layui-btn downloadImg" data="'+msg[i].imgAddr+'">下载头像原图</button></div></div><h3 style="text-indent:20px;" class="tale nt-list_workTitle">简介：</h3><p style="padding-left:20px;max-height:150px;margin-bottom:40px;margin-top:10px;overflow-y:scroll;" class="talent-list_workExperience">'+msg[i].guestProfile+'</p>'+'<div data="'+msg[i].guestId+'" class="addmore" style="position:absolute;bottom:3px;right:50px;"><i style="cursor:pointer;font-size:25px;color:#999;margin-right:30px" class="layui-icon">&#xe63a;</i></div><div status="off" data="'+msg[i].guestId+'" class="showmore'+msg[i].guestId+' shoumore" style="position:absolute;bottom:3px;right:10px;"><i style="cursor:pointer;font-size:25px;color:#215089;" class="icon1 layui-icon">&#xe61a;</i><i style="cursor:pointer;font-size:25px;color:#215089;display:none;" class="icon2 layui-icon">&#xe619;</i><span style="display:none" class="hotmore'+msg[i].guestId+' layui-badge-dot"></span></div></div><div style="display:none;padding:0 50px;margin:0 15px 15px 15px;background:#f1f1f1;" id="showmore'+msg[i].guestId+'"></div>'
        )
    layer.close(layuiIndex)
    }
    $('.downloadImg').click(function(){
        window.open($(this).attr('data'))
    })
    for (var i = 0; i < msg.length; i++) {
        $.ajax({
            type:'get',
            url:'http://' + changeUrl.address + '/manager/comments/list.do',
            async:false,
            data:{
                guestId:msg[i].guestId,
            },
            success:function (msg1) {
                console.log(msg[i].guestId)
                if(msg1.data.length>0){
                    $('.hotmore'+msg[i].guestId+'').show()
                }
            },
            error:function () {
                layer.msg('请检查嘉宾库是否存在该人员')
            }
        })
    };
    //添加评论
    $('.addmore').click(function(){
        let guestId=$(this).attr('data')
        layer.open({
            title:'提交评论',
            type: 1,
            area:['420px', '240px'],
            btn: ['确定', '取消'],
            content: '<textarea style="resize:none;height:135px;" placeholder="" class="layui-textarea"  lay-verify="required"  id="guestProfile"></textarea>',
            yes:function(indexdata){
                
                console.log($('#guestProfile').val())
                $.ajax({
                    type:'post',
                    url:'http://' + changeUrl.address + '/manager/comments/add.do',
                    data:{
                        'commentName':$.cookie('username'),
                        'commentText':$('#guestProfile').val(),
                        'guestId':guestId,
                    },
                    success:function (msg1) {
                        if(msg1.code==0){
                            layer.alert('添加成功',{icon:1},function (indexdata2) {
                                layer.close(indexdata)
                                layer.close(indexdata2)
                            })
                        }else{
                            layer.msg('请稍后再试')
                        }
                        
                    },
                    error:function () {
                        layer.msg('请检查嘉宾库是否存在该人员')
                    }
                })
            }
        });
    })
    
    //展示评论
    $('.shoumore').click(function(){
    	let guestId=$(this).attr('data')
        layui.use("layer",function(){
            layuiIndex=layer.load(1,{
                offset:['50%','50%']
            })
        })
        if($(this).attr('status')=='off'){
            $(this).attr('status','on')
            $('.showmore'+guestId+' .icon2').show()
            $('.showmore'+guestId+' .icon1').hide()
            let str=''
            console.log($('#showmore'+guestId+'').html())
            
            $('#showmore'+guestId+'').empty()
            $.ajax({
                type:'get',
                url:'http://' + changeUrl.address + '/manager/comments/list.do',
                data:{
                    guestId:guestId,
                },
                success:function (msg) {
                    let arr=msg.data
                    if(msg.data.length==0){
                        str+='<div class="bottomLine">该嘉宾暂时没有评论</div>'
                    }
                    for (var i = 0; i < arr.length; i++) {
                        var dates=zhuanDate(arr[i].createTime)
                        str+='<div class="bottomLine"><div style="display:flex;flex-direction:row;"><div style="margin:6px 15px;"><img class="userHeadPic" src="https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-class/image/default.png" alt="" width="40"></div><div><p><span class="stuName">'+arr[i].commentName+'</span></p><p class="stuAnswerContent">'+arr[i].commentText+'</p></div></div><div><p class="text-right stuAnswerTime" style="padding-right:20px"><span class="iconfont icon-huifu reply"></span>'+dates+'</p></div></div>'
                    };
                    layer.close(layuiIndex)
                   //console.log(msg)
                    $('#showmore'+guestId+'').show()
                    $('#showmore'+guestId+'').append(str)
                },
                error:function () {
                    layer.msg('请检查嘉宾库是否存在该人员')
                }
            })
        }else{
            layer.close(layuiIndex)
            $(this).attr('status','off')
            $('.showmore'+guestId+' .icon1').show()
            $('.showmore'+guestId+' .icon2').hide()
            $('#showmore'+guestId+'').hide()
        }
    })
    $('.deleteguest').click(function(){
    	let guestid=$(this).attr('data')
         layer.confirm('真的删除本条数据吗',{icon: 3, title:'系统提示'}, function(index1){
            $.ajax({
                type:'post',
                url:'http://' + changeUrl.address + '/manager/guest/remove.do',
                data:{
                    guestId:guestid,
                },
                success:function (msg) {
                   console.log(msg)
                    if(msg.msg =='删除成功'){
                        layer.close(index1)
                        layer.alert('删除成功',{icon:1},function () {
                            window.location.reload()
                        })
                    }else {
                        layer.msg('网络繁忙，请稍后再试！')
                    }
                },
                error:function () {
                    layer.msg('请检查嘉宾库是否存在该人员')
                }
            })
         })
    	
    })
    $('.bianjiguest').click(function(){
    	let guestid=$(this).attr('data')
    	layer.open({
                type: 2,
                title: '嘉宾库-修改',
                shadeClose: false,
                maxmin: true, //开启最大化最小化按钮
                area: [$(window).width()*0.7+'px', $(window).height()*0.7+'px'],
                content: './guestrevise.html',
                success: function(layero, index){
                    layer.full(index)
                    var body = layer.getChildFrame('body', index);
                    var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                    // console.log(body.html()) //得到iframe页的body内容
                    body.find('#parent_PeopleId').val(guestid)
                    iframeWin.getInitData();
                }
        });
    })
}

$("#search").on("click", function() {
    generalSearch()
})
$("#searchKey").keydown(function(e) {
    var curKey = e.which;
    if (curKey === 13) {
        generalSearch();
        return false;
    }
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
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
//搜索20条
function generalSearch(obj) {
	layui.use("layer",function(){
        layuiIndex=layer.load(1,{
                offset:['50%','50%']
            })
    })
    var passVal = $('#searchKey').val()
        console.log(passVal);
    $.ajax({
        type: "get",
        data: {
            'searchKey': passVal,
            'pageNum': 1,
            'pageSize': 10
        }, //提交的参数
        url:"http://"+changeUrl.address + "/manager/guest/get_list.do", //获取搜索的总条数
        success:function(dataObj) {

        	console.log(dataObj)
        	//console.log(data)
            var totalPages = dataObj.data.total
            console.log(totalPages)
            //分页
            layui.use(['layer', 'laypage', 'element'], function() {
                var layer = layui.layer,
                    laypage = layui.laypage
                    element = layui.element;
                laypage.render({
                    elem: 'pageDemo01', 
                    count: totalPages, 
                   
                    jump: function(obj, first) {
                        $('#result').html('')
                        $('#loadgif').show()
                        $('#floatLayer').show() //遮罩层
                        $('#loadgif').hide()
                        $('#floatLayer').hide() //遮罩层
                        $("html,body").animate({ scrollTop: 0 }, 0);
                        if (totalPages != 0) {
                        	fenye(obj.curr,passVal)
                        } else {
                            layer.close(layuiIndex)
                            $('#loadgif').hide()
                            $('#floatLayer').hide() //遮罩层
                        }
                    }
                });
            })
            $('.gengeralSearchNum').text(totalPages)
        },
        error: function() {
            // alert('请求数据失败-01！');
        }
    });
}
function fenye(pagenum,passVal){
 $.ajax({
        type: "get",
        data: {
            'searchKey': passVal,
            'pageNum': pagenum,
            'pageSize': 10
        }, //提交的参数
        url:"http://"+changeUrl.address + "/manager/guest/get_list.do", //获取搜索的总条数
        success:function(dataObj) {
            createList(dataObj.data.list)
        },
        error: function() {
            // alert('请求数据失败-01！');
        }
    });
}

//外部页面跳转过来，如果为空，执行空搜，否则执行一次带参数的搜索
function initLoad(fn) {
    // var args = getQueryStringArgs();
    // if (jQuery.isEmptyObject(args)) {
        var data02 = {
            'searchKey': '',
            'pageNum': 1,
            'pageSize': 10
        }
        myAjax(data02, "http://"+changeUrl.address + '/manager/guest/get_list.do', fn)
    // } else {
    //     var datailSchool = decodeURIComponent(args['whereFrom'])
    //     var data01 = {
    //         'searchKey': datailSchool,
    //         'pageNum': 1,
    //         'pageSize': 10
    //     }
    //     $('#searchKey').val(datailSchool)
    //     $('#result').html('')
    //     myAjax(data01, "http://"+changeUrl.address + '/manager/guest/get_list.do', fn)
    // }
}
//初始数据加载
$(function() {
    initLoad(generalSearch)
    $(".visBorderBottom05").css('border-bottom','0')
})
