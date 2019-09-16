var E = window.wangEditor
var editor1 = new E('#editor1')

// 关闭粘贴样式的过滤
editor1.customConfig.pasteFilterStyle = false
editor1.customConfig.uploadImgServer = 'http://data.xinxueshuo.cn:80/nsi-1.0/Admin_api?whereFrom=EditorUpImg' // 上传图片到服务器
editor1.create()

layui.use(['form', 'laydate'], function(){
    var form = layui.form
        ,laydate = layui.laydate;

    //日期
    laydate.render({
        elem: '#Load_time'
    })

    //各种基于事件的操作，下面会有进一步介绍
    //监听提交
    form.on('submit(demo1)', function(rs){

        var index =  layer.msg('上传中...', {
            icon: 16
            ,time: 200000 //2秒关闭（如果不配置，默认是3秒）
            ,shade: [0.8,'#000']
        });

        var insertData = {
            'object01': $('#TeacherName').val(),
            'object02': $('#TeacherDescription').val(),
            'object03': $('#TeacherCourse').val(),
            'object04':editor1.txt.html(),
            'object05': $('#TeacherImage').val(),
            'object06': $.cookie('User_TureName')
        }
        $.ajax({
            type: "post",
            async: true,
            data: JSON.stringify(insertData),//提交的参数
            url: 'http://' + changeUrl.address + '/Class_Teacher_api?whereFrom=insert',
            dataType: "json",//数据类型为jsonp
            contentType:"application/json;charset=UTF-8",
            processData: false,  
            success: function (msg) {
                console.log(msg)
                if(msg.msg ==1){
                    layer.alert('发布成功,可在概览页面修改，请勿重复提交',{icon:1},function () {
                        window.location.reload()
                    })
                }
            },
            error: function () {
                layer.alert('网络繁忙，请稍后再试！');
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

});




// Import image  (图片展示)
function previewImg(image,inputImage) {
    var $image = $(image)
    var $inputImage = $(inputImage);
    var URL = window.URL || window.webkitURL;
    var blobURL;

    if (URL) {
        $inputImage.change(function() {
            var files = this.files;
            var file;

            if (!$image.data('cropper')) {
                return;
            }

            if (files && files.length) {
                file = files[0];
                if (/^image\/\w+$/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    $image.one('built.cropper', function() {
                        URL.revokeObjectURL(blobURL);
                    }).cropper('reset').cropper('replace', blobURL);
                    $inputImage.val('');
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        });
    } else {
        $inputImage.prop('disabled', true).parent().addClass('disabled');
    }
}


//封面图片
previewImg('#image','#inputImage')
var dataurl = null;
var $img = $('#image')
$img.cropper({
    // aspectRatio: 16/9,
    // cropBoxResizable:false,//是否通过拖动来调整剪裁框的大小。
    dragMode:'move',  //禁止重新绘制一个裁剪框
    crop: function(e) {
        $('#cropWidth').text(Math.round(e.width))
        $('#cropHeight').text(Math.round(e.height))
        var $imgData = $img.cropper('getCroppedCanvas', {
            fillColor:"#fff", //图片宽高不足时候，显示为白色
            // width: outputWidth,
            // height: outputHeight
        })
        var temdataurl = $imgData.toDataURL('image/jpeg', 0.8); //当用户上传的图片是png的，转成jpg,  0.5表示压缩质量
        $('#preview').attr("src", temdataurl);
        dataurl = temdataurl
        return temdataurl
    }
})
console.log(dataurl)


//  第一步，将base64转换成二进制图片（Blob）
function dataURItoBlob(base64Data) {
    var byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);  //atob() 函数能够解码通过base-64编码的字符串数据
    else
        byteString = decodeURI(base64Data.split(',')[1]);
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
}


function submitImg(getData,fn) {
    // var index = layer.load(0,{shade:[0.8,'#ccc'],content: '图片上传中...'});
    var index =  layer.msg('图片上传中...', {
        icon: 16
        ,time: 200000 //2秒关闭（如果不配置，默认是3秒）
        ,shade: [0.8,'#000']
    });

    var blob = dataURItoBlob(getData); // 上一步中的函数
    console.log(blob)
    var canvas = document.createElement('canvas');

    var fd = new FormData(document.forms[0]);
    fd.append("Base64", blob, 'image.png');

    //第三步，使用AJAX提交
    $.ajax({
        url: 'http://data.xinxueshuo.cn:80/nsi-1.0/Admin_api?whereFrom=EditorUpImg',
        method: 'POST',
        processData: false, //  不会将 data 参数序列化字符串
        contentType: false, //  根据表单 input 提交的数据使用其默认的 contentType
        data: fd,
        success:function(data) {
            layer.alert('图片上传成功',{icon: 1})
            console.log(data);
            console.log(data.data[0])
            fn(data)
        },
        error:function () {
            layer.alert('上传失败',{icon: 5})
        }
    });
}

//教师头像图片上传
$('#startUp01').on('click',function () {
    if(dataurl == null){
        layer.alert('请先选择图片',{icon: 5})
    }else{
        submitImg(dataurl,getTeacherImg)
    }
})

function getTeacherImg(data) {
    $('#TeacherImage').val(data.data[0])
}


