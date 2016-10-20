/**
 * Created by BOT01 on 16/9/29.
 */
/**
 * Created by BOT01 on 16/9/14.
 * 图像四选一
 */

var ImageRadioPage = function(){
    var _ImageRadioPage = new NSPPTPage();
    _ImageRadioPage.show = function(){
        //页面基础布局架构

    },
        _ImageRadioPage.setValue = function(value,isEdit){

            //填充页面数据
            if(isEdit){
                //如果是编辑
            }else{
                //如果是展示
            }

        },
        _ImageRadioPage.getValue = function(){
            //提取页面数据
        },

        _ImageRadioPage.editor = function(superView){
            //编辑器
            var STR_HTML = "<audio id='editor_audio' class='editor_audio'> </audio>";
            STR_HTML +="<table>"
            for(var i=1;i<5;i++){
                STR_HTML += "<tr><td width='16'>"+i+".</td>" +
                    "<td><img src='' /></td><td><input type='text' value='' /></td>" +
                    "<td><div class='ui-sound' date-state='selected' id='el_sound_"+i+"' onclick='PlaySoundWithElement(this)'> <span>0'00''</span></div></td>" +
                    "<td><input type='button' value='配音' onclick='CallUploadForm(&quot;file_sound&quot;)'/></td></tr>";
            }
            STR_HTML += "</table>";

            STR_HTML += "<form class='editItemFormRect' method='post' enctype='multipart/form-data'>" +
                "<input type='file' value='' accept='.png,.jpg,.gif' id='file_image' onchange='ImageUpload(this);'/>";
            STR_HTML += "</form>";

            STR_HTML += "<form class='editItemFormRect' method='post' enctype='multipart/form-data'>" +
                "<input type='file' value='' accept='.mp4' id='file_sound' onchange='SoundUpload(this);'/>";
            STR_HTML += "</form>";


            superView.html(STR_HTML);

        },

        _ImageRadioPage.save = function(){
            //保存数据

        }
    return _ImageRadioPage;
}

