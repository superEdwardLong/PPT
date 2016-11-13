/**
 * Created by BOT01 on 16/10/20.
 */
//页面数据结构
var PageDataStructure = {
    pageId:0,               //页面ID
    pageBackgroundColor:null,  //页面背景色
    pageBackgroundImage:null,  //页面背景图，权重大于背景色
    pageBackgroundSound:null,  //页面背景音乐
    pageIcon:null,             //页面图标
    pageText:null,           //页面题目,string || object
    pageVideo:null,          //视频地址
    pageOptions:{
        sounds:[],    //配音选项
        images:[],   //图片选项
        texts:[]    //文本选项
    },
    pageAnswer:{
        answer:null,
        sounds:[]
    }
}

//配音选项数据结构
var SoundItemDataStructrue = {
    soundId:0,
    soundPath:null,
    soundSort:0
}

//图片选项数据结构
var ImageItemDataStructrue = {
    imageId:0,
    imagePath:null,
    imageSort:0,
    imageDetail:null,
    imageBackgroundSound:null

}

//文字选项数据结构
var TextItemDataStructrue = {
    textId:0,                        //选项ID
    textContent:null,               //选项内容
    textSort:0,                  //选项排序
    textColor:null,             //选项颜色
    textBackgroundColor:null,  //选项背景色
    textHighlightColor:null,    //选项高亮颜色
    textFontSize:null,          //选项字体大小
    textBackgroundSound:null    //选项背景音乐
}



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
    setValue : function(value){
        //填充播放页面数据
    },
    setEditValue:function(value){
        //填充编辑页面数据
    },
    setEditEvent:function(){

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
    this.fontOptions = [
        {fontName:'超大字号',fontSize:60},
        {fontName:'大字号',fontSize:48},
        {fontName:'中字号',fontSize:24},
        {fontName:'小字号',fontSize:18},
        {fontName:'微小字号',fontSize:12}
    ];
    this.getColorPickerHTML = function(sender){
        ///试色器
        var _config = $.extend({
            IsNeetPrickOption:true,
            IsNeetPrickSlider:true,
            IsNeetPrickRecommendColor:true,
            IsNeedHighLight:false
        },sender||{});

        var STR_HTML ="";



        STR_HTML += '<div class="color_picker_rect">';
            if(_config.IsNeetPrickOption){
            STR_HTML += '<div class="color_picker_option"> ' +
                '<span><a href="javascript:void(0)" data-type="button" data-theme="green">背景色</a><i></i></span> ' +
                '<span><a href="javascript:void(0)" data-type="button" data-theme="gray">文字色</a><i></i></span>';
                    if(_config.IsNeedHighLight){
                        STR_HTML +='<span><a href="javascript:void(0)" data-type="button" data-theme="gray">高显色</a><i></i></span>'
                    }
            STR_HTML +='</div>';
            }
            if(_config.IsNeetPrickSlider){
            STR_HTML += '<div class="color_picker_slider">' +
                '<label><strong>透明度</strong><input type="range" min="0" max="100" name="color_alpha"/> <i>0%</i></label>' +
                '<label><strong>红</strong><input type="range" min="0" max="255" name="color_r"/> </label>' +
                '<label><strong>绿</strong><input type="range" min="0" max="255" name="color_g"/> </label>' +
                '<label><strong>蓝</strong><input type="range" min="0" max="255" name="color_b"/> </label>' +
                '</div>';
            }
            if(_config.IsNeetPrickRecommendColor){
            STR_HTML += '<div class="color_picker_list">';
            var _colorCode;
            for(var i=0; i< this.colors.length; i++){
                _colorCode = "";
                _colorCode += this.colors[i]["r"]+",";
                _colorCode += this.colors[i]["g"]+",";
                _colorCode += this.colors[i]["b"]+",";
                _colorCode += this.colors[i]["alpha"];

                STR_HTML +='<span data-code="'+_colorCode+
                    '" style="background-color:rgba('+_colorCode+')"> </span>';
            }
            STR_HTML +='</div>';
            }

        STR_HTML += '</div>';
        return STR_HTML;
    };
    this.setColorPickerValue = function(selector,value){
        //默认背景色
        if(value.textBackgroundColor instanceof Array){
            var _selectedInList = false;
            var _colorCode = "";
            for(var i=0; i< value.textBackgroundColor.length;i++){
                _colorCode += value.textBackgroundColor[i]+",";
            }_colorCode = _colorCode.slice(0,-1);


            selector.find(".color_picker_list span").each(function(index,element){
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

            selector.find(".color_picker_option i").eq(0).css("background-color","rgba(" +_colorCode+")").attr("data-code",_colorCode);
        }

        //字体颜色
        if(value.textColor instanceof Array){
            var _textColorCode = "";
            for(var i=0; i< textColor.length;i++){
                _textColorCode += value.textColor[i]+",";
            }_textColorCode = _textColorCode.slice(0,-1);
            selector.find(".color_picker_option i").eq(1).css("background-color","rgba(" +_textColorCode+")").attr("data-code",_textColorCode);
        }

        //高亮颜色
        if(value.textHighlightColor instanceof Array){
            var _HightLightColorCode = "";
            for(var i=0; i< value.textHighlightColor.length;i++){
                _HightLightColorCode += value.textHighlightColor[i]+",";
            }_HightLightColorCode = _HightLightColorCode.slice(0,-1);
            selector.find(".color_picker_option i").eq(2).css("background-color","rgba(" +_HightLightColorCode+")").attr("data-code",_HightLightColorCode);
        }

    };
    this.didColorPickerChanged = function(color){
        console.log("New color : " + color);
    };
    this.eventColorPicker = function(selector){
        //更新颜色滑竿
        var _updateSliderColor = function(_colors){
            selector.find("input").each(function(index,element){
                if(index == 0){
                    element.val(parseFloat(_colors[3])*100);
                }else{
                    element.val(_colors[index-1]);
                }
            });
        };

        //选中颜色块
        var _selectedColorBlock = function(_colorCode){
            var _selectedColorInList = false;
            selector.find(".color_picker_list span").each(function(index,element){
                if(_colorCode == element.attr("data-code")){
                    _selectedColorInList = true;
                    element.trigger("click");
                    return false;
                }
            });

            //在推荐颜色列表中没有匹配到当前选中的颜色
            if(_selectedColorInList == false){
                selector.find(".color_picker_list span[data-state=selected]").removeAttr("data-state");
                _updateSliderColor(_colorCode.split(","));
            }
        }

        //颜色项 切换事件处理
        selector.find(".color_picker_option").on('click','a',function(e){
            $(this).attr("data-state","selected").siblings("a").removeAttr("data-state");
            var _colorCode = $(this).next('i').attr("data-code");
            var _colors = _colorCode.split(",");
            //更新色块
            _selectedColorBlock(_colorCode);

        });

        //滑竿颜色变化
        var pickerTimer = null;
        var _super = this;
        selector.find("input").on("change",function(e){
            var _colors;
            var _inputs = selector.find("input");
            _colors = _inputs.eq(1).val() +","+_inputs.eq(2).val() +","+_inputs.eq(3).val() +","+ (parseInt(_inputs.eq(0).val())/100).toFixed(1);
            selector.find(".color_picker_option a[data-selected] i").css("background-color","rgba("+_colors+")").attr("data-code",_colors);

            if(pickerTimer){
                clearTimeout(pickerTimer);
            }

            pickerTimer = setTimeout(function(){
                _super.didColorPickerChanged(_colors);
            },1000);

        });

        //推荐色列表 选中事件处理
        selector.find(".color_picker_list").on("click","span",function(e){
            var _colorCode = $(this).attr("data-code");
            var _colors = _colorCode.split(",");
            $(this).attr("data-state","selected").siblings("span").removeAttr("data-state");
            _updateSliderColor(_colors);
        });
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
    this.get_HTML_SoundItem = function(item){
        if(typeof item =="string"){

        }else if(typeof item == "object"){

        }

        var str_item = '<a class="soundItem" href="javascript:void(0)" data-type="button"  data-theme="gray">' +
            '<span class="ui-icon ui-icon-soundWave "></span> <label>&nbsp;</label> </a> ';

        return str_item;
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
        //STR_HTML += '<li> <a class="soundItem" href="javascript:void(0)" data-type="button"  data-theme="green"><span class="ui-icon ui-icon-soundWave "></span>58s</a> </li>';
        //STR_HTML += '<li> <a class="soundItem" href="javascript:void(0)" data-type="button"  data-theme="gray"><span class="ui-icon ui-icon-soundWave "></span> 1m30s</a> </li>';
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
        if(this.setEditEvent && typeof this.setEditEvent == "function"){
            this.setEditEvent();
        }

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
        var _super = this;
        var _edit_Panel_HTML = function(Index){
            var strHtml = "";
            switch(Index){
                case 0:{
                    strHtml += '<div class="tab_content_inner"><div class = "dashedRect"></div> <a href="javascript:void(0)" data-type="button"  data-theme="gray">上传图片</a></div>';
                }break;
                case 1:{
                    strHtml += '<div class="tab_content_inner">';
                    strHtml += '<ul class="sectionOptions">';
                    strHtml += '<li data-state="selected">';
                    strHtml += '<a class="imageOptionsItem" href="javascript:void(0)">';
                    strHtml += '</a>';
                    strHtml += '</li>';
                    strHtml += '<li>';
                    strHtml += '<a class="imageOptionsItem" href="javascript:void(0)">';
                    strHtml += '</a>';
                    strHtml += '</li>';
                    strHtml += '</ul></div>';
                }break;
                case 2:{
                    strHtml += '<div class="tab_content_inner"><div class="editorBoxToolbar">'
                    for(var i=0; i< _super.fontOptions.length; i++){
                        strHtml += '<a href="javascript:void(0)" data-size="'+_super.fontOptions[i].fontSize+'"> '+_super.fontOptions[i].fontName+' </a>';
                    }
                    strHtml +='</div>';
                    strHtml += "<textarea placeholder='请输入文本内容' ></textarea>";
                    strHtml += _super.getColorPickerHTML({IsNeedHighLight:false});
                    strHtml += '</div>';
                }break;
                case 3:{
                    strHtml += '<div class="tab_content_inner">';
                    strHtml += '<div class="tab_content_title">背景图片</div><div class = "dashedRect"></div> <a href="javascript:void(0)" data-type="button"  data-theme="gray">上传图片</a>';
                    strHtml += '</div><div class="tab_content_inner"><div class="tab_content_title">纯色背景</div>';
                    strHtml += _super.getColorPickerHTML({IsNeetPrickOption:false});
                    strHtml += '</div>';
                }break;
                case 4:{
                    strHtml += '<div class="tab_content_inner"><a href="javascript:void(0)" data-type="button"  data-theme="gray">上传配音</a></div>';
                }break;
                case 5:{
                    strHtml += '<div class="tab_content_inner"><div class="editorBoxToolbar">'
                    for(var i=0; i< _super.fontOptions.length; i++){
                        strHtml += '<a href="javascript:void(0)" data-size="'+_super.fontOptions[i].fontSize+'"> '+_super.fontOptions[i].fontName+' </a>';
                    }
                    strHtml +='</div>';
                    strHtml += "<textarea placeholder='请输入文本内容' ></textarea>"
                    strHtml += '</div>';
                }break;
            }
            return strHtml;
        }

        var STR_HTML = "";
        STR_HTML += '<div class="editorBox" data-theme="allBoder">';
        STR_HTML += '<!-- 画布工作区-->';
        STR_HTML += '<div class="editorBoxInner"><canvas id="canvas_workspace" width="720" height="405"> </canvas></div>';
        STR_HTML += '<!-- 自定义操作区-->';
        STR_HTML += '<div class="editorBoxInner">';
        STR_HTML += '<div class="tab_bar"><ul class="tab_bar_main"> '
        STR_HTML += '<li><i class="ui-icon ui-icon-photo"></i><span>贴图</span></li> '
        STR_HTML += '<li><i class="ui-icon ui-icon-photo2"></i><span>贴纸</span> </li>'
        STR_HTML += '<li><i class="ui-icon ui-icon-text2"></i><span>文字</span></li> '
        STR_HTML += '<li><i class="ui-icon ui-icon-background"></i><span>背景</span></li> '
        STR_HTML += '<li><i class="ui-icon ui-icon-sound2"></i><span>配音</span></li> '
        STR_HTML += '<li><i class="ui-icon ui-icon-text3"></i><span>文本页</span></li>'
        STR_HTML += '</ul>'

        STR_HTML += '<ul class="tab_bar_subItem" data-index="1"><li>推荐2</li><li>人物2</li><li>动物2</li></ul>'
        STR_HTML += '<ul class="tab_bar_subItem" data-index="5"><li> 文本配音：<a href="javascript:void(0)" data-type="button"  data-theme="gray">上传配音</a> </li></ul>'
        STR_HTML += '</div>'

        STR_HTML += '<div class="tab_content"><ul> '
        for(var i=0; i<6; i++){
            STR_HTML += '<li>'+_edit_Panel_HTML(i)+'</li> ';
        }
        STR_HTML +='</ul>';

        STR_HTML += '</div>';
        STR_HTML += '</div>';
        return STR_HTML;
    };
    _SlidePage.setEditEvent = function(){
        //工具条
        $(".tab_bar_main").on("click","li",function(e){
            if($(this).attr("data-state") == undefined){
                var _selectedIndex = $(this).index();
                $(this).attr("data-state","selected").siblings('li').removeAttr("data-state");
                $(".tab_bar_subItem").each(function(index,element){
                    if(parseInt($(element).attr("data-index")) == _selectedIndex){
                        $(element).slideDown();
                    }else{
                        $(element).slideUp();
                    }
                });

                var _scrollTo =  -$(".tab_content").width() * _selectedIndex;

                $(".tab_content ul:first").animate({ textIndent: 0 }, {
                    step: function(now,fx) {
                        $(this).css('-webkit-transform','translateX('+_scrollTo+'px)');
                    },
                    duration:'fast'
                },'linear');
            }

        });

        $(".tab_bar_main li:first").trigger('click');


    };
    _SlidePage.thumbnail.draw = function(pageData,canvasId){

    };
    return _SlidePage;
}