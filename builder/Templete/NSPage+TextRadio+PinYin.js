/**
 * Created by BOT01 on 16/10/20.
 */
var PinYinPage = function(){
    var _PinYinPage = TextRadioPage();
    _PinYinPage.editoMiddleItem = function(){
        var fonts = ['超大字号','大字号','中字号','小字号','微小字号'];
        var STR_HTML = '';
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-text"></span><span>题目文字</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<div class="editorBoxToolbar">';
        for(var i=0; i< fonts.length; i++){
            STR_HTML += '<a href="javascript:void(0)"> '+fonts[i]+' </a>';
        }
        STR_HTML += '</div>';
        STR_HTML += '<textarea placeholder="请输入题目文字"></textarea>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    _PinYinPage.numberOfAnswer = 2;
}