/**
 * Created by BOT01 on 16/10/20.
 *
 *
 *
 * 语句选择模板
 */
var TextRadioPage = function(){
    var _TextRadioPage =  new NSPPTPage();
    _TextRadioPage.numberOfAnswer = 4;
    _TextRadioPage.scrollDirection = scrollDirectionEnum.vertically;

    _TextRadioPage.editoBottomItem = function(){
        var STR_HTML = '';
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-text"></span><span>题目答案</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<ol class="editorTextQuestionList" >';
        //答案选项
        for(var i=0; i< this.numberOfAnswer;i++){
            STR_HTML += '<li> <input type="text" value="" class="ui-textfield" placeholder="请输入答案"/> ' +
                '<a href="javascript:void(0)" data-type="button" data-theme="green">配音 </a> ' +
                '<a class="soundItem" href="javascript:void(0)" data-type="button"  data-theme="green">' +
                '<span class="ui-icon ui-icon-soundWave "></span>58s</a> ' +
                '</li>';
        };
        STR_HTML += '</ol>';
        STR_HTML += '</div>';
        STR_HTML += '<div class="editorBoxFooter">';
        STR_HTML += '<label>√ 正确答案 <input type="text" value="" class="ui-textfield" placeholder="答案"/></label>';
        STR_HTML += '<a href="javascript:void(0)" data-type="button" data-theme="green">配音 </a>';
        STR_HTML += '<a class="soundItem" href="javascript:void(0)" data-type="button"  data-theme="green"><span class="ui-icon ui-icon-soundWave "></span>58s</a>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };

    _TextRadioPage.editorMiddleItem = function(){
        var STR_HTML = '';
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-text"></span><span>题目文字</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<textarea placeholder="10字以内"></textarea>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    }
    return _TextRadioPage;
}