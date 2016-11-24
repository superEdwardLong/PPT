/**
 * Created by BOT01 on 16/10/20.
 */
var PageImageRadio = function(){
    var _ImageRadioPage =  new NSPPTPage();
    _ImageRadioPage.name = "PageImageRadio";
    _ImageRadioPage.editorMiddleItem = function(){
        var STR_HTML = '';
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-image"></span><span>图片题目</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<ol id="imageOptionRect" name="group_opts">';
        for(var i=0; i< 4;i++) {
            STR_HTML += '<li data-id="0">';
            STR_HTML += '<table width="100%" cellpadding="0" cellspacing="0">';
            STR_HTML += '<tr>';
            STR_HTML += '<td>';
            STR_HTML += '<div class="editorImageRect">';
            STR_HTML += '<div class="editorImageRectInner">';
            STR_HTML += '</div>';
            STR_HTML += '<a href="javascript:UploadFile('+UploadMediaTypeEnum.optionImage+','+i+')"  data-type="button" data-theme="green" >图片上传 </a>';
            STR_HTML += '</div>';
            STR_HTML += '</td>';
            STR_HTML += '<td>';
            STR_HTML += '<input type="text"  value="" class="ui-textfield"  placeholder="图片描述" name="optionText"/>';
            STR_HTML += '</td>';
            STR_HTML += '<td>';
            STR_HTML += '<a href="javascript:UploadFile('+UploadMediaTypeEnum.optionSound+','+i+')" data-type="button" data-theme="green">配音 </a> <br/><br/>';
            STR_HTML += '<span class="soundPlaceholder"></span>';
            STR_HTML += '</td>';
            STR_HTML += '</tr>';
            STR_HTML += '</table>';
            STR_HTML += '</li>';
        }
        STR_HTML += '</ol>';

        STR_HTML += '</div>';
        STR_HTML += '<div class="editorBoxFooter">';
        STR_HTML += '<label>√ 正确答案 <input type="text" value="" class="ui-textfield" placeholder="答案" name="answerText"/></label>';
        STR_HTML += '<a href="javascript:UploadFile('+UploadMediaTypeEnum.answerSound+')" data-type="button" data-theme="green" >配音 </a>';
        STR_HTML += '<span class="soundPlaceholder"></span>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    _ImageRadioPage.setEditValue = function(){
        var _super = this;
        var pageData = _super.dataSource;
        if(pageData){
            //配音
            if(pageData.pageBackgroundSound instanceof Array && pageData.pageBackgroundSound.length > 0){
                var STR_HTML = '';
                for(var i=0; i< pageData.pageBackgroundSound.length; i++){
                    STR_HTML += "<li data-id='"+pageData.pageBackgroundSound[i].UniqueID+"'>"+_super.get_HTML_SoundItem(pageData.pageBackgroundSound[i].Path)+"</li>";
                }
                $(".editorSoundList").append(STR_HTML);
            }
            //图片选项
            if(pageData.pageOptions.images instanceof Array && pageData.pageOptions.images.length > 0){
                var editItem;
                for(var i=0; i< pageData.pageOptions.images.length; i++){
                    editItem = $("#imageOptionRect li").eq(pageData.pageOptions.images[i].imageSort);
                    editItem.attr("data-id",pageData.pageOptions.images[i].imageId);
                    editItem.find("input[name=optionText]").val(pageData.pageOptions.images[i].imageDetail);
                    editItem.find(".editorImageRectInner").css("background-image","url("+pageData.pageOptions.images[i].imagePath+")");
                    if(pageData.pageOptions.images[i].imageBackgroundSound){
                        var Sound_HTML = _super.get_HTML_SoundItem(pageData.pageOptions.images[i].imageBackgroundSound);
                        editItem.find(".soundPlaceholder").append(Sound_HTML);
                    }
                }
            }
            //答案
            if(pageData.pageAnswer.answer){
                $("input[name=answerText]").val(pageData.pageAnswer.answer);
                if(pageData.pageAnswer.sounds instanceof Array && pageData.pageAnswer.sounds.length > 0){
                    var Sound_HTML ="";
                    for(var i=0; i< pageData.pageAnswer.sounds.length; i++){
                        Sound_HTML += _super.get_HTML_SoundItem(pageData.pageAnswer.sounds[i].Path);
                    }
                    $(".editorBoxFooter .soundPlaceholder").append(Sound_HTML);
                }
            }

        }
    };

    return _ImageRadioPage;
}