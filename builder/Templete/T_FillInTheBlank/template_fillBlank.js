/**
 * Created by BOT01 on 16/9/29.
 * 填空
 */
var FillBlankPage = function(){
    var _FillBlank = new NSPPTPage();
    _FillBlank.show = function(){
        //页面基础布局架构
        alert("show FillBlank page");
    },
        _FillBlank.setValue = function(value,isEdit){
            //填充页面数据

        },
        _FillBlank.getValue = function(){
            //提取页面数据
        },

        _FillBlank.editor = function(superView){
            //编辑器
            var STR_HTML = "<audio id='editor_audio' class='editor_audio'> </audio>";
            //配音部分
            STR_HTML += "<div class='editItemRect'>";
            STR_HTML += "<ol>";
            STR_HTML += "<li>  <div id='ui_sound_1' class='ui-sound' date-state='selected' onclick='PlaySoundWithElement(this)'> <span>0'00''</span></div> </li>";
            STR_HTML += "<li>  <div id='ui_sound_2' class='ui-sound' date-state='normal' onclick='PlaySoundWithElement(this)'> <span>0'00''</span></div> </li>";
            STR_HTML += "</ol>";
            STR_HTML += "<div> <input type='button' value='配音' onclick='CallUploadForm(&quot;file_sound&quot;)'/> " +
                "<select><option value='0'>添加空声音</option>" +
                "<option value='3'>3s</option>" +
                "<option value='5'>5s</option>" +
                "<option value='7'>7s</option>" +
                "<option value='9'>9s</option></select></div>";
            STR_HTML += "<form class='editItemFormRect' method='post' enctype='multipart/form-data'>" +
                "<input type='file' value='' accept='.mp3' id='file_sound' onchange='SoundUpload(this);'/>";
            STR_HTML += "</form>";
            STR_HTML += "</div>";

            //问题
            STR_HTML += "<div class='editItemRect'>";
            STR_HTML += "<table><tr>" +
                "<td><input type='text' value='' /></td>" +
                "<td></td>" +
                "<td><input type='text' value='' /></td>" +
                "</tr></table>";
            STR_HTML += "</div>";

            //选项
            STR_HTML += "<div class='editItemRect'>";
            STR_HTML += "<ol>";
            STR_HTML += "<li><input type='text' value='' />  </li>";
            STR_HTML += "<li><input type='text' value='' />  </li>";
            STR_HTML += "<li><input type='text' value='' />  </li>";
            STR_HTML += "<li><input type='text' value='' />  </li>";
            STR_HTML += "</ol>";
            STR_HTML += "</div>";

            //答案
            STR_HTML += "<div class='editItemRect'>";
            STR_HTML += "<input type='button' value='配音' onclick='CallUploadForm(&quot;file_sound2&quot;)'/>";
            STR_HTML += "<form class='editItemFormRect' method='post' enctype='multipart/form-data'>" +
                "<input type='file' value='' accept='.mp3' id='file_sound2' onchange='SoundUpload(this);'/>";
            STR_HTML += "</form>";
            STR_HTML += "</div>";

            superView.html(STR_HTML);

        },

        _FillBlank.save = function(){
            //保存数据

        }
    return _FillBlank;
}