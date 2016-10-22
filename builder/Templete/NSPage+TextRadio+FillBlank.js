/**
 * Created by BOT01 on 16/10/20.
 */
var PageFillBlank = function(){
    var _FillBlanPage = PageTextRadio();
    _FillBlanPage.editorMiddleItem = function(){
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxInner fillBlankBox">';
        STR_HTML += '<div><input type="text" value="" placeholder="请输入问题前部分" class="ui-textfield"/></div>';
        STR_HTML += '<div><span>填空区</span></div>';
        STR_HTML += '<div><input type="text" value="" placeholder="请输入问题后部分" class="ui-textfield"/></div>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    return _FillBlanPage;
}