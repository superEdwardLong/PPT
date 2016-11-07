/**
 * Created by BOT01 on 16/10/20.
 */
var PageImageRadio = function(){
    var _ImageRadioPage =  new NSPPTPage();
    _ImageRadioPage.name = "PageImageRadio";
    _ImageRadioPage.editorMiddleItem = function(){
        var STR_HTML = '';
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-video"></span><span>图片题目</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<ol>';
        for(var i=0; i< 4;i++) {
            STR_HTML += '<li>';
            STR_HTML += '<table width="100%" cellpadding="0" cellspacing="0">';
            STR_HTML += '<tr>';
            STR_HTML += '<td>';
            STR_HTML += '<div class="editorImageRect">';
            STR_HTML += '<div class="editorImageInner">';
            STR_HTML += '</div>';
            STR_HTML += '<a href="javascript:void(0)"  data-type="button" data-theme="green">图片上传 </a>';
            STR_HTML += '</div>';
            STR_HTML += '</td>';
            STR_HTML += '<td>';
            STR_HTML += '<input type="text"  value="" class="ui-textfield"  placeholder="图片描述"/>';
            STR_HTML += '</td>';
            STR_HTML += '<td>';
            STR_HTML += '<a href="javascript:void(0)" data-type="button" data-theme="green">配音 </a> <br/><br/>';
            STR_HTML += '<a class="soundItem" href="javascript:void(0)" data-type="button"  data-theme="gray"><span class="ui-icon ui-icon-soundWave "></span>58</a>'
            STR_HTML += '</td>';
            STR_HTML += '</tr>';
            STR_HTML += '</table>';
            STR_HTML += '</li>';
        }
        STR_HTML += '</ol>';

        STR_HTML += '</div>';
        STR_HTML += '<div class="editorBoxFooter">';
        STR_HTML += '<label>√ 正确答案 <input type="text" value="" class="ui-textfield" placeholder="答案"/></label>';
        STR_HTML += '<a href="javascript:void(0)" data-type="button" data-theme="green">配音 </a>';
        STR_HTML += '<a class="soundItem" href="javascript:void(0)" data-type="button"  data-theme="green"><span class="ui-icon ui-icon-soundWave "></span>58s</a>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    }
    return _ImageRadioPage;
}