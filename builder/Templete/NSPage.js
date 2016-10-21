/**
 * Created by BOT01 on 16/10/20.
 */
var scrollDirectionEnum = {
    horizontally:0,
    vertically:1
}

var NSObject = function(){};
NSObject.prototype = {
    id : null,
    backgroundSound : null,//背景音乐
    index:0,
    show : function(){
        //页面基础布局架构
    },
    setValue : function(value,isEdit){
        //填充页面数据

    },
    getValue : function(){
        //提取页面数据
    },

    editor : function(superView){
        //编辑器
    },
    didShowEnding : function(superClass){
        //展示结束
        if(superClass && superClass.hasOwnProperty("next")){
            superClass.next();
        }
    },
    save : function(){
        //保存数据到 indexedDB

    },
    add:function(){

    },
    remove:function(){

    },
    copy:function(){

    }
};


///// 课件页面
var NSPPTPage = function(){
    this.backgroundColor = null; //背景颜色
    this.subjectTitle = null;//题目主题
    this.answer = null; //答案
    this.answerSound = null;//答案配音
    this.imageUpload = ImageUpload;
    this.soundUpload = SoundUpload;
    this.videoUpload = VideoUpload;
    this.editoTopItem = function(){
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-sound"></span><span>语音编辑</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<table width="100%" cellpadding="0" cellspacing="0">';
        STR_HTML += '<tr>';
        STR_HTML += '<td width="15%" align="center">语音</td>';
        STR_HTML += '<td>';
        STR_HTML += '<ol class="editorSoundList">';
        STR_HTML += '<li> <a class="soundItem" href="javascript:void(0)" data-type="button"  data-theme="green"><span class="ui-icon ui-icon-soundWave "></span>58s</a> </li>';
        STR_HTML += '<li> <a class="soundItem" href="javascript:void(0)" data-type="button"  data-theme="gray"><span class="ui-icon ui-icon-soundWave "></span> 1m30s</a> </li>';
        STR_HTML += '</ol>';
        STR_HTML += '</td>';
        STR_HTML += '</tr>';
        STR_HTML += '<tr>';
        STR_HTML += '<td>&nbsp;</td>';
        STR_HTML += '<td>';
        STR_HTML += '<a href="javascript:void(0)" data-type="button"  data-theme="green">上传声音</a><span>添加<select>';
        STR_HTML += '<option value="3">3秒</option>';
        STR_HTML += '<option value="5">5秒</option>';
        STR_HTML += '<option value="7">7秒</option>';
        STR_HTML += '<option value="9">9秒</option>';
        STR_HTML += '</select>空声音</span><a href="javascript:void(0)" data-type="button"  data-theme="gray">确认添加</a>';
        STR_HTML += '</td> </tr> </table>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    this.editoMiddleItem = function(){
        var STR_HTML = "";
        return STR_HTML;
    };
    this.editoBottomItem = function(){
        var STR_HTML = "";
        return STR_HTML;
    };
    this.editor = function(superView){
        var STR_HTML = "<audio id='editor_audio' class='editor_audio'> </audio><form name='PageUploadForm' id='PageUploadForm' method='post' enctype='multipart/form-data'> <input type='file' value=''  /> </form>";
        if(this.editorTopItem && typeof (this.editorTopItem) == "function"){
            STR_HTML += this.editorTopItem();
        }
        if(this.editorMiddleItem && typeof (this.editorMiddleItem) == "function"){
            STR_HTML += this.editorMiddleItem();
        }
        if(this.editorBottomItem && typeof (this.editorBottomItem) == "function"){
            STR_HTML += this.editorBottomItem();
        }
        superView.html(STR_HTML);
    }
}
NSPPTPage.prototype = new NSObject();