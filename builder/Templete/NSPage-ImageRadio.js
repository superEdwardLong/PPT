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
        STR_HTML += '<ol id="imageOptionRect">';
        for(var i=0; i< 4;i++) {
            STR_HTML += '<li>';
            STR_HTML += '<table width="100%" cellpadding="0" cellspacing="0">';
            STR_HTML += '<tr>';
            STR_HTML += '<td>';
            STR_HTML += '<div class="editorImageRect">';
            STR_HTML += '<div class="editorImageRectInner">';
            STR_HTML += '</div>';
            STR_HTML += '<a href="javascript:void(0)"  data-type="button" data-theme="green" >图片上传 </a>';
            STR_HTML += '</div>';
            STR_HTML += '</td>';
            STR_HTML += '<td>';
            STR_HTML += '<input type="text"  value="" class="ui-textfield"  placeholder="图片描述" name="imageDetail"/>';
            STR_HTML += '</td>';
            STR_HTML += '<td>';
            STR_HTML += '<a href="javascript:void(0)" data-type="button" data-theme="green" >配音 </a> <br/><br/>';

            STR_HTML += '</td>';
            STR_HTML += '</tr>';
            STR_HTML += '</table>';
            STR_HTML += '</li>';
        }
        STR_HTML += '</ol>';

        STR_HTML += '</div>';
        STR_HTML += '<div class="editorBoxFooter">';
        STR_HTML += '<label>√ 正确答案 <input type="text" value="" class="ui-textfield" placeholder="答案" name="answer"/></label>';
        STR_HTML += '<a href="javascript:void(0)" data-type="button" data-theme="green">配音 </a>';

        STR_HTML += '</div>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    _ImageRadioPage.setValue = function(pageData){
        if(pageData){

        }
    }
    _ImageRadioPage.setEditValue = function(pageData){
        var _super = this;
        if(pageData){
            //配音
            if(pageData.pageOptions.sounds instanceof Array && pageData.pageOptions.sounds.length > 0){
                var STR_HTML = '';
                for(var i=0; i< pageData.pageOptions.sounds.length; i++){
                    STR_HTML += "<li>"+_super.get_HTML_SoundItem(pageData.pageOptions.sounds[i])+"</li>";
                }
                $(".editorSoundList").append(STR_HTML);
            }
            //图片选项
            if(pageData.pageOptions.images instanceof Array && pageData.pageOptions.images.length > 0){
                var editItem;
                for(var i=0; i< pageData.pageOptions.images.length; i++){
                    editItem = $("#imageOptionRect li").eq(pageData.pageOptions.images[i].imageSort);
                    editItem.find("input[name=imageDetail]").val(pageData.pageOptions.images[i].imageDetail);
                    editItem.find(".editorImageRectInner").css("background-image","url("+pageData.pageOptions.images[i].imagePath+")");
                    if(pageData.pageOptions.images[i].imageBackgroundSound){
                        var Sound_HTML = _super.get_HTML_SoundItem(pageData.pageOptions.images[i].imageBackgroundSound);
                        editItem.find("a:last").after(Sound_HTML);
                    }
                }
            }
            //答案
            if(pageData.pageAnswer.answer){
                $("input[name=answer]").val(pageData.pageAnswer.answer);
                if(pageData.pageAnswer.sounds instanceof Array && pageData.pageAnswer.sounds.length > 0){
                    var Sound_HTML ="";
                    for(var i=0; i< pageData.pageAnswer.sounds.length; i++){
                        Sound_HTML += _super.get_HTML_SoundItem(pageData.pageAnswer.sounds[i]);
                    }
                    $(".editorBoxFooter a:last").after(Sound_HTML);
                }
            }

        }
    }
    return _ImageRadioPage;
}