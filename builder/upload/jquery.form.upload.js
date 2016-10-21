/**
 * Created by BOT01 on 16/9/14.
 * 文件上传基类
 */
var ImageTypeEnum = {
    background:0,
    option:1,
    icon:2
}

function Upload(){
    this.formId = "PageUploadForm";
    this.uploadId = 0;              //新增:0   修改: >0

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
function ImageUpload(){
    var _upload = new Upload();
    _upload.interface = "";
    _upload.imageType = ImageTypeEnum.background;
    _upload.didUpload = function(Result){
        alert("图片上传完成")
        switch (this.imageType){
            case ImageTypeEnum.background :{

            }break;
            case ImageTypeEnum.option:{

            }break;
            case ImageTypeEnum.icon:{

            }break;
        }

    }
    return _upload;
}


/*
视频上传类
 */
function VideoUpload(){
    var _upload = new Upload();
    _upload.interface = "";
    _upload.didUpload = function(Result){
        alert("视频上传完成")
    }
    return _upload;

}


/*
声音上传类
 */
function SoundUpload(){
    var _upload = new Upload();
    _upload.interface = "";
    _upload.didUpload = function(Result){
        alert("配音上传完成")
    }
    return _upload;
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