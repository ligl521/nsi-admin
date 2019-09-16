//图片上传
$(function () {
    // 图片预览
    previewImg('#image','#inputImage')

    //logo图片上传
    $('#upLogo').click(function () {
        //初始数据
        initCrop(1/1,200,200,0.8,"#preview",'#getData')
        $('#startUpLogo').removeClass('hide')
        $('#startUpShow').addClass('hide')
        //开始上传
        $('#startUpLogo').click(function() {
            submitImg('SchoolLogo','#getData', window.parent.$('#alter_old_School_id').val())
        })
    })
    //展示图片上传
    $('#upShow').click(function () {
        //初始数据
        initCrop(16/9,360,180,1,"#preview",'#getData')
        $('#startUpShow').removeClass('hide')
        $('#startUpLogo').addClass('hide')
        //开始上传
        $('#startUpShow').click(function() {
            submitImg('SchoolShow','#getData', $('#alter_old_School_id').val())
        })
    })

    //关闭重新刷新页面，获取初始裁剪框数据
    $('#closeUpImg').click(function () {
        window.location.reload()
        $('html,body').animate({scroolTop:0},0)
    })
})
