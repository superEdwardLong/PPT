/**
 * Created by BOT01 on 16/9/14.
 * 文件上传基类
 */
function Upload(formId){
    //var el = $("#"+formId);
    //var updateId = el.attr("data-id");

    var el = formId;
    var updateId = 1;

    this.sender = {
        updateId:updateId,
        el:el,
        interface:null
    }

    this.didUpload = function(Result){
        console.log("上传完成");

    };      //上传完成后 回调
    this.willUpload = function(){
        console.log("开始上传");

    };    //上传文件前 回调
    this.submit = function(){
        if(this.willUpload){
            this.willUpload.call(this);
        }



        if(this.didUpload){
            this.didUpload.call(this);
        }

    }
}

/*
图片上传类
*/
function ImageUpload(formId){
    var _upload = new Upload(formId);
    _upload.sender.interface = "";
    _upload.didUpload = function(Result){
        alert("图片上传完成")
    }
    _upload.submit();
}


/*
视频上传类
 */
function VideoUpload(formId){
    var _upload = new Upload(formId);
    _upload.sender.interface = "";
    _upload.didUpload = function(Result){
        alert("视频上传完成")
    }
    _upload.submit();

}


/*
声音上传类
 */
function SoundUpload(formId){
    var _upload = new Upload(formId);
    _upload.sender.interface = "";
    _upload.didUpload = function(Result){
        alert("配音上传完成")
    }
    _upload.submit();

}

//激活上传表单
function CallUploadForm(elementId){
    $("#"+elementId).trigger('click');
}

//播放声音
function PlaySoundWithElement(element){
    var el = $(element)[0];
    var path = el.attr("data-path");
    if(path && path.length > 0){
        var audio  = document.getElementById("editor_audio");
        audio.setAttribute("src",path);
        audio.play();
    }
}