/**
 * Created by BOT01 on 16/10/20.
 *
 *
 *
 * 语句选择模板
 */
var PageTextRadio = function(){
    var _TextRadioPage =  new NSPPTPage();
    _TextRadioPage.name = "PageTextRadio";
    _TextRadioPage.numberOfAnswer = 4;
    _TextRadioPage.scrollDirection = scrollDirectionEnum.vertically;
    _TextRadioPage.editorBottomItem = function(){
        var STR_HTML = '';
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-text"></span><span>题目答案</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<ol class="editorTextQuestionList" >';
        //答案选项
        for(var i=0; i< this.numberOfAnswer;i++){
            STR_HTML += '<li data-id="0"> <input type="text" value="" class="ui-textfield" placeholder="请输入答案" name="optionText"/> ' +
                '<a href="javascript:UploadFile('+UploadMediaTypeEnum.optionSound+','+i+')" data-type="button" data-theme="green" >配音 </a> ' +
                '</li>';
        };
        STR_HTML += '</ol>';
        STR_HTML += '</div>';
        STR_HTML += '<div class="editorBoxFooter">';
        STR_HTML += '<label>√ 正确答案 <input type="text" value="" class="ui-textfield" placeholder="答案" name="anwserText"/></label>';
        STR_HTML += '<a href="javascript:UploadFile('+UploadMediaTypeEnum.answerSound+')" data-type="button" data-theme="green" >配音 </a>';
        //STR_HTML += '<a class="soundItem" href="javascript:void(0)" data-type="button"  data-theme="green"><span class="ui-icon ui-icon-soundWave "></span>58s</a>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };

    _TextRadioPage.editorMiddleItem = function(){
        var STR_HTML = '';
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-text"></span><span>题目文字</span></div>';
        STR_HTML += '<div class="editorBoxInner" data-id="0">';
        STR_HTML += '<textarea placeholder="10字以内" name="subjectText"></textarea>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };

    _TextRadioPage.setEditSubject = function(pageData){
        if(pageData.pageText && typeof pageData.pageText == "string"){
            $("textarea").val(pageData.pageText);
        }
    };

    _TextRadioPage.setEditValue = function(pageData){
        var _super = this;
        if(pageData){
            //问题
            if(typeof _super.setEditSubject == "function"){
                _super.setEditSubject(pageData);
            }

            //配音
            if(pageData.pageOptions.sounds instanceof Array && pageData.pageOptions.sounds.length > 0){
                var STR_HTML = '';
                for(var i=0; i< pageData.pageOptions.sounds.length; i++){
                    STR_HTML += "<li>"+_super.get_HTML_SoundItem(pageData.pageOptions.sounds[i])+"</li>";
                }
                $(".editorSoundList").append(STR_HTML);
            }


            //选项
            if(pageData.pageOptions.texts instanceof Array && pageData.pageOptions.texts.length > 0){
                var editItem;
                for(var i=0; i< pageData.pageOptions.texts.length; i++){
                    editItem = $(".editorTextQuestionList li").eq(pageData.pageOptions.texts[i].textSort);
                    editItem.find("input[name=optionText]").val(pageData.pageOptions.texts[i].textContent);
                    if(pageData.pageOptions.texts[i].textBackgroundSound){
                        var Sound_HTML = _super.get_HTML_SoundItem(pageData.pageOptions.texts[i].textBackgroundSound);
                        editItem.find("a:last").after(Sound_HTML);
                    }
                }
            }

            //答案
            if(pageData.pageAnswer.answer){
                $("input[name=answerText]").val(pageData.pageAnswer.answer);
                if(pageData.pageAnswer.sounds instanceof Array && pageData.pageAnswer.sounds.length > 0){
                    var Sound_HTML ="";
                    for(var i=0; i< pageData.pageAnswer.sounds.length; i++){
                        Sound_HTML += _super.get_HTML_SoundItem(pageData.pageAnswer.sounds[i]);
                    }
                    $(".editorBoxFooter a:last").after(Sound_HTML);
                }
            }

        }
    };

    return _TextRadioPage;
}