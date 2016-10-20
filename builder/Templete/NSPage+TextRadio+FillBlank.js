/**
 * Created by BOT01 on 16/10/20.
 */
var FillBlankPage = function(){
    var _FillBlanPage = TextRadioPage();
    _FillBlanPage.editorMiddleItem = function(){
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<div><input type="text" value="" placeholder="请输入问题前部分"/></div>';
        STR_HTML += '<div>填空区域</div>';
        STR_HTML += '<div><input type="text" value="" placeholder="请输入问题后部分"/></div>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    return _FillBlanPage;
}