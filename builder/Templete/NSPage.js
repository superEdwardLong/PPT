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

    },
    adapter:function(dataSource){
    },
    reverseAdapter:function(){
    }
};


///// 课件页面
var NSPPTPage = function(){
    this.name = null;
    this.dataSource = null; //数据源
    this.backgroundColor = null; //背景颜色
    this.subjectTitle = null;//题目主题
    this.answer = null; //答案
    this.answerSound = null;//答案配音
    this.imageUpload = ImageUpload;
    this.soundUpload = SoundUpload;
    this.videoUpload = VideoUpload;
    this.getColorPickerHTML = function(IsNeedHighLight){
        ///试色器
        var STR_HTML ="";
        STR_HTML += '<div class="color_picker_rect">';
            STR_HTML += '<div class="color_picker_option"> ' +
                '<span><a href="javascript:void(0)" data-type="button" data-theme="green">背景色</a><i></i></span> ' +
                '<span><a href="javascript:void(0)" data-type="button" data-theme="gray">文字色</a><i></i></span>';
                    if(IsNeedHighLight){
                        STR_HTML +='<span><a href="javascript:void(0)" data-type="button" data-theme="gray">高显色</a><i></i></span>'
                    }
            STR_HTML +='</div>';

            STR_HTML += '<div class="color_picker_slider">' +
                '<label><strong>透明度</strong><input type="range" min="0" max="100" name="color_alpha"/> <i>0%</i></label>' +
                '<label><strong>红</strong><input type="range" min="0" max="255" name="color_r"/> </label>' +
                '<label><strong>绿</strong><input type="range" min="0" max="255" name="color_g"/> </label>' +
                '<label><strong>蓝</strong><input type="range" min="0" max="255" name="color_b"/> </label>' +
                '</div>';

            STR_HTML += '<div class="color_picker_list">';
            for(var i=0; i< this.colors.length; i++){
                STR_HTML +='<span style="background-color:rgba('+this.colors[i].r+','+this.colors[i].g+','+this.colors[i].b+','+this.colors[i].alpha+')"> </span>';
            }
            STR_HTML +='</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    this.colors  = [
        {r:255,g:255,b:255,alpha:1},
        {r:255,g:204,b:0,alpha:1},
        {r:255,g:153,b:0,alpha:1},
        {r:255,g:102,b:0,alpha:1},
        {r:255,g:51,b:0,alpha:1},
        {r:255,g:255,b:102,alpha:1},
        {r:255,g:204,b:102,alpha:1},
        {r:255,g:102,b:102,alpha:1},
        {r:255,g:51,b:102,alpha:1},
        {r:0,g:255,b:0,alpha:1},
        {r:0,g:204,b:0,alpha:1},
        {r:0,g:153,b:0,alpha:1},
        {r:0,g:102,b:0,alpha:1},
        {r:0,g:51,b:0,alpha:1},
        {r:0,g:255,b:204,alpha:1},
        {r:0,g:204,b:204,alpha:1},
        {r:0,g:153,b:204,alpha:1},
        {r:0,g:102,b:204,alpha:1},
        {r:0,g:51,b:204,alpha:1},
        {r:0,g:0,b:0,alpha:1}
    ];
    this.thumbnail = {
        addAtPageIndex:function(pageIndex,pageData,superView){
            var _now = (new Date()).getTime();
            var _canvasId = "Canvas_"+_now;
            var _item ='<li> <canvas id="'+_canvasId+'" width="300" height="168"> </canvas> </li>';
            var _currentItem = superView.find("li").eq(pageIndex);

            if(_currentItem.size() == 0){
                superView.append(_item);
            }else{
                _currentItem.before(_item);
            }

            /*绘制预览图*/
            this.draw(pageData,_canvasId);

        },
        list:function (arr,superView){
            for(var i=0; i< arr.length;i++){
                this.addAtPageIndex(i,arr[i],superView);
            }
        },
        draw:function(pageData,canvasId){
            if(pageData && canvasId){
                console.log("== 绘制缩略图 ==");
            }
        }
    };
    this.editorTopItem = function(){
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
    this.editorMiddleItem = function(){
        var STR_HTML = "";
        return STR_HTML;
    };
    this.editorBottomItem = function(){
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



/*==================================
* 幻灯片类
*
*
*
*================================== */
var SlidePage = function(){
    var _SlidePage = new NSPPTPage();
    _SlidePage.name = "SlidePage";
    _SlidePage.editorTopItem = function(){
        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<!-- 画布工作区-->';
        STR_HTML += '<div class="editorBoxInner"><canvas id="canvas_workspace" width="720" height="405"> </canvas></div>';
        STR_HTML += '<!-- 自定义操作区-->';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<ul class="tab_bar"> <li>贴图</li> <li>文字</li> </ul>';
        STR_HTML += '<ul class="tab_content"> <li>贴图</li> <li>文字</li> </ul>';
        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    _SlidePage.thumbnail.draw = function(pageData,canvasId){

    }
    return _SlidePage;
}