/**
 * Created by BOT01 on 16/10/20.
 * 语音 +大文字
 * 图片为小图标
 */
var PageSoundAndText = function(){
    var _SoundAndTextPage = new NSPPTPage();
    _SoundAndTextPage.name ="PageSoundAndText";
    _SoundAndTextPage.editorMiddleItem = function(){
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-text"></span><span>题目文字</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<textarea placeholder="10字以内" name="subjectText"></textarea>';
        STR_HTML += '</div>';

        ///试色器
        STR_HTML += this.getColorPickerHTML();

        STR_HTML += '</div>';
        return STR_HTML;
    };
    _SoundAndTextPage.editorBottomItem = function(){
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-image"></span><span>图片编辑</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<table width="100%" cellpadding="0" cellspacing="0">';
        STR_HTML += '<tr>';
        STR_HTML += '<td width="15%" align="center">图片</td>';
        STR_HTML += '<td><div class = "dashedRect"></div></td>';
        STR_HTML += '<td width="15">';
        STR_HTML += '<a href="javascript:UploadFile('+UploadMediaTypeEnum.iconImage+')" data-type="button"  data-theme="gray" >上传图片</a>';
        STR_HTML += '</td>';
        STR_HTML += '</tr>';
        STR_HTML += '</table>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    _SoundAndTextPage.setEditValue = function(pageData){
        var _super = this;
        if(pageData){
            if(pageData.pageBackgroundSound instanceof Array && pageData.pageBackgroundSound.length > 0){
                var STR_HTML = '';
                for(var i=0; i< pageData.pageBackgroundSound.length; i++){
                    STR_HTML += "<li data-id='"+pageData.pageBackgroundSound[i].UniqueID+"'>"+_super.get_HTML_SoundItem(pageData.pageBackgroundSound[i].Path)+"</li>";
                }
                $(".editorSoundList").append(STR_HTML);
            }
            //页面图标
            if(pageData.pageIcon){
                $(".dashedRect").append("<div class='imgRect' style='background-image: url("+pageData.pageIcon.Path+")'></div>");
            }

            //文字
            if(pageData.pageText){
                $("textarea").val(pageData.pageText.textContent);
                _super.setColorPickerValue($(".color_picker_rect"),pageData.pageText);
            }
        }
    }
    return _SoundAndTextPage;
}