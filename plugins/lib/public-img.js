
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

//初始裁剪参数
function initCrop(aspectRatio,outputWidth,outputHeight,imgQuility,preview,getData) {
    var $img = $('#image')
    $img.cropper({
        aspectRatio: aspectRatio,
        cropBoxResizable:false,//是否通过拖动来调整剪裁框的大小。
        dragMode:'move',  //禁止重新绘制一个裁剪框
        crop: function(data) {
            // console.log(data)
            var $imgData = $img.cropper('getCroppedCanvas', {
                fillColor:"#fff", //图片宽高不足时候，显示为白色
                width: outputWidth,
                height: outputHeight
            })
            var dataurl = $imgData.toDataURL('image/jpeg', imgQuility); //当用户上传的图片是png的，转成jpg,  0.5表示压缩质量
            $(preview).attr("src", dataurl);
            $(getData).val(dataurl)
        }
    })
}

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

function submitImg(UserPortrait,getData,publicId) {
    console.log(publicId)
    var UserMail = $.cookie('username')
    var User_TureName = $.cookie('User_TureName')
    //  第二步，构建formData
    
    var dataurl = $(getData).val()
    console.log(dataurl)
    // // console.log(dataurl)
    // var blob = dataURItoBlob(dataurl); // 上一步中的函数
    // console.log(blob)
    // var canvas = document.createElement('canvas');
    // var dataURL = canvas.toDataURL('image/jpeg');
    // console.log(dataURL)
    var uploadImgSrc=dataurl.slice(23,)
    var fd = new FormData(document.forms[0]);
    fd.append("strImage", uploadImgSrc)
    fd.append("schoolId", publicId)

    //第三步，使用AJAX提交
    $.ajax({
        url: 'http://'+changeUrl.address+'/manager/school/uplogo.do',
        method: 'POST',
        processData: false, //  不会将 data 参数序列化字符串
        contentType: false, //  根据表单 input 提交的数据使用其默认的 contentType
        data: fd,
        success:function(data) {
           
            layui.use('layer',function () {
                var layer = layui.layer;
                layer.alert('图片上传成功',function () {
                    
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭
                    window.parent.$('#uploadSchoolLogoImgSrc').attr('src','https://data.xinxueshuo.cn'+data.data.url)
                    window.parent.$('#uploadSchoolLogoImgSrc').attr('data',data.data.url)
                })
            })

           
        },
        error:function () {
            alert('上传失败')
        }
    });
}

