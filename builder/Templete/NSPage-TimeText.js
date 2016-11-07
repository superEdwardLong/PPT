/**
 * Created by John on 2016/10/21.
 */
var PageTimeText = function(){
    var _TimeTextPage = new NSPPTPage();
    _TimeTextPage.name = "PageTimeText";
    _TimeTextPage.editorMiddleItem = function(){
        var fonts = ['超大字号','大字号','中字号','小字号','微小字号'];
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxToolbar">' +
            '<input type="radio" name="editModelGroup" value="0" id="OnlyTextRadio"/><label for="OnlyTextRadio">  <i class="ui-icon-smalltext"></i> 纯文字</label>' +
            '<input type="radio" name="editModelGroup" value="1" id="TimeTextRadio"/><label for="TimeTextRadio"> <i class="ui-icon-time"></i>   时间点</label> ' +
            '</div>';
            STR_HTML += '<div class="editorBoxInner">';
            STR_HTML += '<textarea placeholder="10字以内"></textarea>';
            STR_HTML += '</div>';
        STR_HTML += '</div>';


        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxToolbar">'
        for(var i=0; i< fonts.length; i++){
            STR_HTML += '<a href="javascript:void(0)" class="font-options-item"> '+fonts[i]+' </a>';
        }
        STR_HTML +='</div>';
        ///试色器
        STR_HTML += this.getColorPickerHTML(true);
        STR_HTML +='</div>';

        return  STR_HTML;
    }
    return _TimeTextPage;
}