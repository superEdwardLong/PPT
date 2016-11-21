/**
 * Created by BOT01 on 16/10/20.
 */
var PageFillBlank = function(){
    var _FillBlanPage = PageTextRadio();
    _FillBlanPage.name = "PageFillBlank";
    _FillBlanPage.editorMiddleItem = function(){
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxInner fillBlankBox">';
        STR_HTML += '<div><input type="text" value="" placeholder="请输入问题前部分" class="ui-textfield" name="subjectText"/></div>';
        STR_HTML += '<div><span>填空区</span></div>';
        STR_HTML += '<div><input type="text" value="" placeholder="请输入问题后部分" class="ui-textfield" name="subjectText"/></div>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    _FillBlanPage.setEditSubject = function(pageData){
        if(pageData.pageText && typeof pageData.pageText == "string"){
            var textItems = pageData.pageText.split(",");
            $("input[name=subjectText]").each(function(i,element){
               $(element).val(textItems[i]);
            });
        }
    };

    return _FillBlanPage;
}