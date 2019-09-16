
//过滤函数（如果为空，自动补零）
function autoAddZero( str ) {
    var strFilter = null;
    return strFilter = (str == '')? 0 : str;
}

layui.use(['form', 'laydate'], function(){
    var form = layui.form
   ,laydate = layui.laydate;

    //日期
    laydate.render({
        elem: '#ClassBegins'
    })
    laydate.render({
        elem: '#CourseRelease'
    })
    //各种基于事件的操作，下面会有进一步介绍
    //监听提交
    form.on('submit(demo1)', function(rs){
        var insertData = {
            'ChannelNumber': autoAddZero($('#ChannelNumber').val()),
            'ChannelName': autoAddZero($('#ChannelName').val()),
            'Secretkey': autoAddZero($('#Secretkey').val()),
            'TeacherId': autoAddZero($('#TeacherId').val()),
            'CourseSubject': autoAddZero($('#CourseSubject').val()),
            'CourseName': autoAddZero($('#CourseName').val()),
            'CourseState':$('#CourseState input:radio[name="CourseState"]:checked').val(),
            'CourseDescription': autoAddZero($('#CourseDescription').val()),
            'ClassBegins': autoAddZero($('#ClassBegins').val()),
            'CoursePraise': autoAddZero($('#CoursePraise').val()),

            'CoursePrice': autoAddZero($('#CoursePrice').val()),
            // 'CourseRelease': autoAddZero($('#CourseRelease').val()),
            // 'CoursePeople': autoAddZero($('#CoursePeople').val()),
            'CoursePeople': $.cookie('User_TureName'),   //课程发布人
            'CoverImage': autoAddZero($('#CoverImage').val()),
            'CourseImage': autoAddZero($('#CourseImage').val()),
        }
        $.ajax({
            type: "get",
            async: true,
            data: insertData,//提交的参数
            url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Insert_Course',
            dataType: "json",//数据类型为json  
            success: function (msg) {
                console.log(msg)
                if(msg.msg ==1){
                    layer.alert('提交成功',{icon:1},function () {
                        window.location.reload()
                    })
                }
            },
            error: function () {
                alert('网络繁忙，请稍后再试！');
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
            // width: 280,
            // height: 169
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

//封面图片上传
$('#startUp01').on('click',function () {
    if(dataurl == null){
        layer.alert('请先选择图片',{icon: 5})
    }else{
        submitImg(dataurl,getCoverImg)
    }
})



function getCoverImg(data) {
    $('#CoverImage').val(data.data[0])
}
function getCourseImg(data) {
    $('#CourseImage').val(data.data[0])
}

//课程图片
previewImg('#image02','#inputImage02')
var $img02 = $('#image02')
var dataurl02 = null;
$img02.cropper({
    // aspectRatio: 16/9,
    // cropBoxResizable:false,//是否通过拖动来调整剪裁框的大小。
    dragMode:'move',  //禁止重新绘制一个裁剪框
    crop: function(e) {
        $('#cropWidth02').text(Math.round(e.width))
        $('#cropHeight02').text(Math.round(e.height))
        var $imgData02 = $img02.cropper('getCroppedCanvas', {
            fillColor:"#fff", //图片宽高不足时候，显示为白色
            // width: outputWidth,
            // height: outputHeight
        })
        var temdataurl02 = $imgData02.toDataURL('image/jpeg', 1); //当用户上传的图片是png的，转成jpg,  0.5表示压缩质量
        $('#preview02').attr("src", temdataurl02);
        dataurl02 = temdataurl02;
        return temdataurl02;
    }
})

//课程图片上传
$('#startUp02').on('click',function () {
    if(dataurl02 == null){
        layer.alert('请先选择图片',{icon:5})
    }else{
        submitImg(dataurl02,getCourseImg)
    }
})





