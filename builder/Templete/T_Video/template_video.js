/**
 * Created by BOT01 on 16/9/14.
 * 视频
 */

var VideoPage = function(){
    var _VideoPage = new NSPPTPage();
    _VideoPage.show = function(){
        //页面基础布局架构

    },
    _VideoPage.setValue = function(value,isEdit){

        //填充页面数据
        if(isEdit){
            //如果是编辑
        }else{
            //如果是展示
        }

    },
    _VideoPage.getValue = function(){
        //提取页面数据
    },

    _VideoPage.editor = function(superView){
        //编辑器
        var STR_HTML = "";
        STR_HTML += "<div class='editItemRect'>";
        STR_HTML += "<table align='center' class='editItemVideoRect'><tr>" +
            "<td width='65%'><video id='editVideo'   autoplay='autoplay' controls='controls' width='480' height='270'></video></td>" +
            "<td>" +
            "<input type='button' value='上传视频' onclick='CallUploadForm(&quot;file_video&quot;);'/> <br/>" +
            "<input type='button' value='视频截图' onclick='CopyScreen();'/></td>" +
            "</tr></table>";
        STR_HTML += "<form class='editItemFormRect' method='post' enctype='multipart/form-data'>" +
            "<input type='file' value='' accept='.mp4' id='file_video' onchange='VideoUpload(this);'/>";
        STR_HTML += "</form>";
        STR_HTML += "</div>";


        superView.html(STR_HTML);

    },

    _VideoPage.save = function(){
        //保存数据

    }
    return _VideoPage;
}

function CopyScreen(){

}