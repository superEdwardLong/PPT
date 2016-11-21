/**
 * Created by BOT01 on 16/10/20.
 * 图文选择模版
 * 图片为题目，做背景
 */
var PageTextRadioImage = function(){
    var _TextRadioImagePage = PageTextRadio();
    _TextRadioImagePage.name = "PageTextRadioImage";
    _TextRadioImagePage.scrollDirection = scrollDirectionEnum.horizontally;
    _TextRadioImagePage.editorMiddleItem = function(){
        var STR_HTML = "";

        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-image"></span><span>图片编辑</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<table width="100%" cellpadding="0" cellspacing="0">';
        STR_HTML += '<tr>';
        STR_HTML += '<td width="15%" align="center">图片</td>';
        STR_HTML += '<td><div class = "dashedRect"></div></td>';
        STR_HTML += '<td width="15">';
        STR_HTML += '<a href="javascript:UploadFile('+UploadMediaTypeEnum.backgroundImage+')" data-type="button"  data-theme="gray" >上传图片</a>';
        STR_HTML += '</td>';
        STR_HTML += '</tr>';
        STR_HTML += '</table>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;

    };
    _TextRadioImagePage.setEditSubject = function(pageData){
        if(pageData.pageBackgroundImage){
            $(".dashedRect").append("<div class='imgRect' style='background-image: url("+pageData.pageBackgroundImage+")'></div>");
        }
    }

    return _TextRadioImagePage;
}