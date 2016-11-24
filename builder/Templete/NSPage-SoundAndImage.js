/**
 * Created by BOT01 on 16/10/20.
 */
/**
 * Created by BOT01 on 16/10/20.
 * 语音 + 图片
 * 图片作为背景
 */
var PageSoundAndImage = function(){
    var _SoundAndImage =  new NSPPTPage();
    _SoundAndImage.name = "PageSoundAndImage";
    _SoundAndImage.editorMiddleItem = function(){
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-image"></span><span>图片编辑</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<table width="100%" cellpadding="0" cellspacing="0">';
        STR_HTML += '<tr>';
        STR_HTML += '<td width="15%" align="center">图片</td>';
        STR_HTML += '<td><div class = "dashedRect"></div></td>';
        STR_HTML += '<td width="15">';
        STR_HTML += '<a href="javascript:UploadFile('+UploadMediaTypeEnum.backgroundImage+')" data-type="button"  data-theme="gray" >上传图片</a>';
        STR_HTML += '</td>';
        STR_HTML += '</tr>';
        STR_HTML += '</table>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    _SoundAndImage.editorBottomItem = function(){
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-text"></span><span>题目文字</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<textarea placeholder="10字以内" name="subjectText"></textarea>';
        STR_HTML += '</div>';

        ///试色器
        STR_HTML += this.getColorPickerHTML();

        STR_HTML += '</div>';
        return STR_HTML;

    };
    _SoundAndImage.setEditValue = function(pageData){
        var _super = this;
        if(pageData){
            //配音
            if(pageData.pageBackgroundSound instanceof Array && pageData.pageBackgroundSound.length > 0){
                var STR_HTML = '';
                for(var i=0; i< pageData.pageBackgroundSound.length; i++){
                    STR_HTML += "<li data-id='"+pageData.pageBackgroundSound[i].UniqueID+"'>"+_super.get_HTML_SoundItem(pageData.pageBackgroundSound[i].Path)+"</li>";
                }
                $(".editorSoundList").append(STR_HTML);
            }
            //背景图
            if(pageData.pageBackgroundImage){
                $(".dashedRect").append("<div class='imgRect' style='background-image: url("+pageData.pageBackgroundImage.Path+")'></div>");
            }
            //文字
            if(pageData.pageText){
                $("textarea").val(pageData.pageText.textContent);
                //默认背景色
                if(pageData.pageText.textBackgroundColor instanceof Array){
                    var _selectedInList = false;
                    var _colorCode = pageData.pageText.textBackgroundColor[0] +
                        pageData.pageText.textBackgroundColor[1] +
                        pageData.pageText.textBackgroundColor[2];

                    $(".color_picker_list span").each(function(index,element){
                       if(element.attr("data-code") ==  _colorCode){
                           _selectedInList = true;
                           element.trigger("click");
                           return false;
                       }
                    });

                    //如果选中的颜色不在推荐列表中
                    if(_selectedInList == false){
                        $(".color_picker_slider input").each(function(index,element){
                            if(index == 0){
                                element.val(pageData.pageText.textBackgroundColor[3]*100);
                            }else{
                                element.val(pageData.pageText.textBackgroundColor[index-1]);
                            }
                        });
                    }
                }
            }

        }
    };

    return _SoundAndImage;
}