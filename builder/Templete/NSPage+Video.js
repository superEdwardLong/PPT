/**
 * Created by BOT01 on 16/10/20.
 */
var PageVideo = function(){
    var _VideoPage = new NSPPTPage();
    _VideoPage.editorMiddleItem = function(){
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<div class="editorBoxHeader"><span class="ui-icon ui-icon-video"></span><span>视频编辑</span></div>';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<table width="100%" cellpadding="0" cellspacing="0">';
        STR_HTML += '<tr>';
        STR_HTML += '<td width="15%" align="center">';
        STR_HTML += '视频';
        STR_HTML += '</td>';
        STR_HTML += '<td>';
        STR_HTML += '<div class = "blackRect">';

        STR_HTML += '</div>';
        STR_HTML += '</td>';
        STR_HTML += '<td width="15">';
        STR_HTML += '<a href="javascript:void(0)" data-type="button"  data-theme="gray">上传视频</a>';

        STR_HTML += '</td>';
        STR_HTML += '</tr>';
        STR_HTML += '</table>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
    };
    _VideoPage.editor = function(superView){
        var STR_HTML = "<audio id='editor_audio' class='editor_audio'> </audio><form name='PageUploadForm' id='PageUploadForm' method='post' enctype='multipart/form-data'> <input type='file' value=''  /> </form>";
        if(this.editorMiddleItem && typeof (this.editorMiddleItem) == "function"){
            STR_HTML += this.editorMiddleItem();
        }

        if(this.editorTopItem && typeof (this.editorTopItem) == "function"){
            STR_HTML += this.editorTopItem();
        }

        if(this.editorBottomItem && typeof (this.editorBottomItem) == "function"){
            STR_HTML += this.editorBottomItem();
        }

        superView.html(STR_HTML);
    };
    return _VideoPage;

}