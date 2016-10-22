/**
 * Created by BOT01 on 16/10/20.
 */
var PageWordRadio = function(){
    var _WordRadioPage = new NSPPTPage();
    _WordRadioPage.scrollDirection = scrollDirectionEnum.horizontally;
    _WordRadioPage.editorMiddleItem = function(){
        ///// 颜色编辑器
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxToolbar">' +
            '<input type="radio" name="editModelGroup" value="0" id="layoutTopBottomRadio"/>' +
            '<label for="layoutTopBottomRadio">  <i class="ui-layout-topBottom"></i>上下</label>' +
            '<input type="radio" name="editModelGroup" value="1" id="layoutLeftRightRadio"/>' +
            '<label for="layoutLeftRightRadio"> <i class="ui-layout-leftRight"></i>左右</label> ' +
            '</div>';

        for(var i=0; i<2; i++){
            STR_HTML += '<div class="editorBox" >';
            STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-text"></span><span>答案'+(i+1)+'</span></div>';
            STR_HTML += '<div class="editorBoxInner">';
            STR_HTML += '<textarea placeholder="10字以内"></textarea>';
            STR_HTML += '</div>';

            ///试色器
            STR_HTML += this.getColorPickerHTML();

            STR_HTML += '</div>';
        }
        STR_HTML += '</div>';
        return  STR_HTML;
    };
return _WordRadioPage;
}