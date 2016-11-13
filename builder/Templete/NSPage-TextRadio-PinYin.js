/**
 * Created by BOT01 on 16/10/20.
 */
var PagePinYin = function(){
    var _PinYinPage = PageTextRadio();
    _PinYinPage.name = "PagePinYin";
    _PinYinPage.editorMiddleItem = function(){

        var STR_HTML = '';
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-text"></span><span>题目文字</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<div class="editorBoxToolbar">';
        for(var i=0; i< this.fontOptions.length; i++){
            STR_HTML += '<a href="javascript:void(0)" data-size="'+this.fontOptions[i].fontSize+'"> '+this.fontOptions[i].fontName+' </a>';
        }
        STR_HTML += '</div>';
        STR_HTML += '<textarea placeholder="请输入题目文字"></textarea>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    _PinYinPage.numberOfAnswer = 2;
    _PinYinPage.setEditSubject = function(pageData){
        if(pageData.pageText && typeof pageData.pageText == "object"){
            $("textarea").val(pageData.pageText.textContent).css("font-size",pageData.pageText.textFontSize);
            $(".editorBoxToolbar a").each(function(index,element){
               if( parseInt(element.attr("data-size")) == pageData.pageText.textFontSize){
                   element.attr("data-size","selected").siblings('a').removeAttr('data-size');
                   return false;
               }
            });
        }
    }
    return _PinYinPage;
}