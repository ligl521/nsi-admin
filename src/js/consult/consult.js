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
         var dates2=zhuanDate(msg[i].updateTime)
         var dates3=zhuanDate(msg[i].withTime)
        $("#result").append(
            `<div style="position:relative;" class="talent-list row">
                <div class="col-md-8 ">
                    <div class="talent-list_left01">
                    <span style="color:#000;font-size:22px;padding-rignt:30px;">${msg[i].name}</span>
                    </div>
                    <div class="clearfix talent-list_left02">
                            <p style="font-size:20px;">项目总金额：<span>${msg[i].itemAmount}</span></p>
                            <p style="font-size:20px;">收款总计： <span>${msg[i].receivingTotal}</span></p>
                            <p style="font-size:20px;">余额：<span>${msg[i].balance}</span></p>
                    </div>
                    <div style="margin-top:60px;color:#999;"><span>最后修改人：${msg[i].creator}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>创建时间：${dates}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>最后修改时间：${dates2}</span></div>
                </div>
                <div class="col-md-4 clearfix">
                    <div style="overflow:hidden;margin:0px 0 -45px 0;">
                        <button style="float:right;margin-left:15px;" class="layui-btn deleteguest layui-btn-danger" data="${msg[i].id}">删除</button>
                        <button style="float:right;background:#215089;" class="layui-btn bianjiguest layui-btn-normal" data="${msg[i].id}">编辑</button>
                    </div>
                    <h3 style="text-indent:20px;" class="tale nt-list_workTitle">简介：</h3>
                    <p style="padding-left:20px;max-height:50px;margin-bottom:40px;margin-top:20px;overflow-y:scroll;" class="talent-list_workExperience">${msg[i].text}</p>
                    <div class="addmore" data="${msg[i].id}" style="position:absolute;bottom:3px;right:70px;">
                        <i style="cursor:pointer;font-size:25px;color:#215089;" class="layui-icon layui-icon-add-1">&#xe654;</i> 
                    </div>
                    <div status="off" data="${msg[i].id}" class="shoumore showmore${msg[i].id}" style="position:absolute;bottom:3px;right:10px;">
                        <i style="cursor:pointer;font-size:25px;color:#215089;" class="icon1 layui-icon">&#xe61a;</i>
                        <i style="cursor:pointer;font-size:25px;color:#215089;display:none;" class="icon2 layui-icon">&#xe619;</i>
                        <span style="color:#F00" class="hotmore${msg[i].id}"></span>
                    </div>
                    </div>

                </div>
                
                    <div style="display:none;padding:0 0px;margin:0 15px 15px 15px;background:#f1f1f1;" id="showmore${msg[i].id}"></div>`
        )
    layer.close(layuiIndex)
    }
    for (var i = 0; i < msg.length; i++) {
        $.ajax({
            type:'get',
            url:'http://' + changeUrl.address + '/manager/item/get_item_cat_list.do',
            async:false,
            data:{
                pageNum:1,
                pageSize:1000,
                parentId:msg[i].id
            },
            success:function (msg1) {
                if(msg1.data.list.length>0){
                    $('.showmore'+msg[i].id+' .layui-icon').css('color','#F00')
                    $('.hotmore'+msg[i].id+'').html(msg1.data.list.length)
                }
            },
            error:function () {
                layer.msg('请检查嘉宾库是否存在该人员')
            }
        })
    };
    //添加评论
    $('#addguest').click(function(e){
        e.preventDefault()
        addDatas(0,'add','fu')  
    })
    $('.addmore').click(function(e){
        e.preventDefault()
        console.log($(this).attr('data'))
        addDatas($(this).attr('data'),'add','zi')
    })
    function addDatas(xiangmunum,urlStaus,fuziSattus,fuOrZiId,msgData,zideFuId){
        var flagxonsultStr=''
        if(fuziSattus=='fu'){
            flagxonsultStr=`<div class="myshuju"><div class="layui-form-item">
                                    <label class="layui-form-label">名称：</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" placeholder="" lay-verify="required" autocomplete="off" class="layui-input" id="name">
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">项目总金额：</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" placeholder="" lay-verify="required" autocomplete="off" class="layui-input" id="itemAmount">
                                    </div>
                                </div>
                                
                                <div class="layui-form-item">
                                <label class="layui-form-label">简介：</label>
                                <div class="layui-input-inline">
                                    <textarea type="text" name="" placeholder="" lay-verify="required" autocomplete="off" class="layui-input" id="text"></textarea>
                                </div>
                            </div></div>`
        }else{
            flagxonsultStr=`<div class="myshuju">
                                <div class="layui-form-item">
                                    <label class="layui-form-label">回款金额：</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" placeholder="" lay-verify="required" autocomplete="off" class="layui-input" id="amountCased">
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">发票号：</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" placeholder="" lay-verify="required" autocomplete="off" class="layui-input" id="invoiceNum">
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                    <label class="layui-form-label">回款时间：</label>
                                    <div class="layui-input-inline">
                                        <input type="text" name="" placeholder="" lay-verify="required" autocomplete="off" class="layui-input" id="withTime">
                                    </div>
                                </div>
                                <div class="layui-form-item">
                                <label class="layui-form-label">备注：</label>
                                <div class="layui-input-inline">
                                    <textarea type="text" name="" placeholder="" lay-verify="required" autocomplete="off" class="layui-input" id="text"></textarea>
                                </div>
                            </div></div>`
        }
        let myurl=''
        if(urlStaus=='add'){
            myurl='/manager/item/add_item_cat.do'
        }else{
            myurl='/manager/item/modify.do'
        }
        layer.open({
            title:'提交项目',
            type: 1,
            area:['600px', '550px'],
            btn: ['确定', '取消'],
            content: flagxonsultStr,
            yes:function(indexdata){
                var objData
                if(urlStaus=='add'){
                    if(xiangmunum==0){
                        objData={
                            'creator':$.cookie('username'),
                            'parentId':xiangmunum,
                            'name':$('#name').val(),
                            'itemAmount':$('#itemAmount').val(),
                            'text':$('#text').val(),
                        }
                    }else{
                        objData={
                            'creator':$.cookie('username'),
                            'parentId':xiangmunum,
                            'name':$('#name').val(),
                            'itemAmount':0,
                            'amountCased':$('#amountCased').val(),
                            'invoiceNum':$('#invoiceNum').val(),
                            'withTime':$('#withTime').val(),
                            'text':$('#text').val(),
                        }
                    }
                    
                }else{
                    if(fuziSattus=='fu'){
                        objData={
                            'id':fuOrZiId,
                            'creator':$.cookie('username'),
                            'name':$('#name').val(),
                            'itemAmount':$('#itemAmount').val(),
                            'amountCased':0,
                            'invoiceNum':'',
                            'withTime':$('#withTime').val(),
                            "receivingTotal":0,
                            "balance":0,
                            'text':$('#text').val(),
                        }
                    }else{
                        objData={
                            'id':fuOrZiId,
                            'creator':$.cookie('username'),
                            'name':$('#name').val(),
                            'itemAmount':0,
                            'amountCased':$('#amountCased').val(),
                            'invoiceNum':$('#invoiceNum').val(),
                            'withTime':$('#withTime').val(),
                            'text':$('#text').val(),
                        }
                    }
                }
                $.ajax({
                    type:'post',
                    url:'http://' + changeUrl.address +myurl,
                    data:objData,
                    success:function (msg1) {
                        if(msg1.code==0){
                            var dataStr='添加成功'
                            if(urlStaus=='edit'){
                                dataStr='修改成功'
                            }
                            layer.alert(dataStr,{icon:1},function (indexdata2) {
                                
                                if(xiangmunum!=0||urlStaus=='edit'){
                                    let itemId
                                    if(urlStaus=='edit'){
                                        if(fuziSattus=='fu'){
                                            itemId=fuOrZiId
                                        }else{
                                            itemId=zideFuId
                                        }
                                        
                                    }else{
                                        itemId=xiangmunum
                                    }
                                    $.ajax({
                                        type:'post',
                                        url:'http://' + changeUrl.address + '/manager/item/modify_item_cat.do',
                                        data:{
                                            itemId:itemId
                                        },
                                        success:function (msg1) {
                                            layer.close(indexdata)
                                            layer.close(indexdata2)
                                            window.location.reload()
                                        },
                                        error:function () {
                                            layer.msg('请检查嘉宾库是否存在该人员')
                                        }
                                    })
                                }else{
                                    layer.close(indexdata)
                                    layer.close(indexdata2)
                                    window.location.reload()
                                }
                               
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

        layui.use(['laydate'],function () {
            var laydate = layui.laydate
            laydate.render({
                    elem: '#withTime', //指定元素
                    value: ''
                    });
            })
        if(urlStaus=='edit'){
            let flagObjData
            for (let index = 0; index < msgData.length; index++) {
                if(msgData[index].id==fuOrZiId){
                    flagObjData=msgData[index]
                }
            }
            if(fuziSattus=='fu'){
                $('#name').val(flagObjData.name)
                $('#itemAmount').val(flagObjData.itemAmount)
                $('#amountCased').val(flagObjData.amountCased)
                $('#invoiceNum').val(flagObjData.invoiceNum)
                var flagdates=zhuanDate(flagObjData.withTime)
                console.log(flagdates)
                $('#withTime').val(flagdates)
                $('#text').val(flagObjData.text)
            }else{
                $('#name').val(flagObjData.name)
                $('#amountCased').val(flagObjData.amountCased)
                var flagdates=zhuanDate(flagObjData.withTime)
                console.log(flagdates)
                $('#withTime').val(flagdates)
                $('#invoiceNum').val(flagObjData.invoiceNum)
                $('#text').val(flagObjData.text)
            }
        }
    }
    //展示评论
    $('.shoumore').click(function(){
        let guestId=$(this).attr('data')
        console.log(guestId)
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
            //console.log($('#showmore'+guestId+'').html())
            
            $('#showmore'+guestId+'').empty()
            $.ajax({
                type:'get',
                url:'http://' + changeUrl.address + '/manager/item/get_item_cat_list.do',
                data:{
                    pageNum:1,
                    pageSize:1000,
                    parentId:guestId
                },
                success:function (msg) {
                    console.log(msg)
                    let arr=msg.data.list
                    if(arr.length==0){
                        str+='<div class="bottomLine">该项目没有子项目</div>'
                    }
                    
                    for (var i = 0; i < arr.length; i++) {
                        var dates=zhuanDate(arr[i].createTime)
                        var dates2=zhuanDate(arr[i].updateTime)
                        var dates3=zhuanDate(arr[i].withTime)
                        str+=`<div class="bottomLine">
                                <div style="display:flex;flex-direction:row;">
                                    <div class="col-md-8 zixiangmu">
                                        <p style="margin:10px 0;">回款时间：<span>${dates}</span></p>
                                        <p style="margin:10px 0">回款金额：<span>${arr[i].amountCased}</span></p>
                                        <p style="margin:10px 0">发票号：<span>${arr[i].invoiceNum}</span></p>
                                    </div>
                                    <div class="col-md-8" style="position:relative;">
                                        <div style="position:absolute;right:0;top:0;">
                                            <button style="float:right;margin-left:15px;" class="layui-btn layui-btn-xs  deleteguest2 layui-btn-danger" data="${arr[i].id}">删除</button>
                                            <button style="float:right;background:#215089;" data2="${arr[i].parentId}" data="${arr[i].id}" class="layui-btn layui-btn-xs bianjiguest2 layui-btn-normal">编辑</button>
                                        </div>
                                        <p style="padding-left:40px;margin:10px 0 ">备注:${arr[i].text}</p>
                                    </div>
                                </div>
                                <div style="text-align:right;color:#999;height:30px;margin-top:10px;">
                                    <span>最后修改人：${arr[i].creator}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>最后修改时间：${dates2}</span>
                                </div>
                            </div>`
                        
                    };
                    layer.close(layuiIndex)
                   //console.log(msg)
                    $('#showmore'+guestId+'').show()
                    $('#showmore'+guestId+'').append(str)
                    $('.bianjiguest2').click(function(e){
                        e.preventDefault()
                        addDatas(0,'edit','zi',$(this).attr('data'),arr,$(this).attr('data2'))
                    })
                    $('.deleteguest2').click(function(){
                        let guestid=$(this).attr('data')
                         layer.confirm('真的删除本条数据吗',{icon: 3, title:'系统提示'}, function(index1){
                            $.ajax({
                                type:'get',
                                url:'http://' + changeUrl.address + '/manager/item/delete.do?itemCatId='+guestid,
                                
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
                url:'http://' + changeUrl.address + '/manager/item/delete.do',
                data:{
                    itemCatId:guestid,
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
    $('.bianjiguest').click(function(e){
        e.preventDefault()
        addDatas(0,'edit','fu',$(this).attr('data'),msg)
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
    return y+'-'+add0(m)+'-'+add0(d);
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
            'parentId': 0,
            'pageNum': 1,
            'pageSize': 10
        }, //提交的参数
        url:"http://"+changeUrl.address + "/manager/item/get_item_cat_list.do", //获取搜索的总条数
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
            'parentId': 0,
            'pageNum': pagenum,
            'pageSize': 10
        }, //提交的参数
        url:"http://"+changeUrl.address + "/manager/item/get_item_cat_list.do", //获取搜索的总条数
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
            'parentId': 0,
            'pageNum': 1,
            'pageSize': 10
        }
        myAjax(data02, "http://"+changeUrl.address + '/manager/item/get_item_cat_list.do', fn)
    // } else {
    //     var datailSchool = decodeURIComponent(args['whereFrom'])
    //     var data01 = {
    //         'searchKey': datailSchool,
    //         'pageNum': 1,
    //         'pageSize': 10
    //     }
    //     $('#searchKey').val(datailSchool)
    //     $('#result').html('')
    //     myAjax(data01, "http://"+changeUrl.address + '/manager/item/get_item_cat_list.do', fn)
    // }
}
//初始数据加载
$(function() {
    initLoad(generalSearch)
    $(".visBorderBottom05").css('border-bottom','0')
})
