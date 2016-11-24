/**
 * Created by BOT01 on 16/10/20.
 */
//页面数据结构
var PageDataStructure = {
    pageFnName:null,             //模版方法名称
    pageId:0,               //页面ID
    pageBackgroundColor:null,  //页面背景色 string
    pageBackgroundImage:null,  //页面背景图，权重大于背景色 string || object
    pageBackgroundSound:null,  //页面背景音乐 string || object
    pageIcon:null,             //页面图标
    pageText:null,           //页面题目,string || object
    pageVideo:null,          //视频地址,string || object
    pageOptions:{
        sounds:[],    //配音选项 => [ SoundItemDataStructrue, ... ... ]
        images:[],   //图片选项 => [ ImageItemDataStructrue, ... ... ]
        texts:[]    //文本选项 => [ TextItemDataStructrue, ... ... ]
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
    imageId:0,                //在提交后，用来判断是 新增还是修改
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

var UploadMediaTypeEnum = {
       backgroundImage:0,
       optionImage:1,
       iconImage:2,
       elementImage:3,
       videoCaptureImage:4,


       backgroundSound:20,
       optionSound:21,
       answerSound:22,
       nilBackgroundSound:23,

       video:30
}



///// 课件页面
var NSPPTPage = function(){
    this.index =0;
    this.name = null;
    this.dataSource = $.extend(true,{},PageDataStructure); //数据源 => PageDataStructure

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
    this.get_HTML_SoundItem = function(soundPath){
        var str_item = '';
        str_item = '<a class="soundItem" onclick="playSound(this)" data-src="'+soundPath+'" data-type="button"  data-theme="green">' +
            '<span class="ui-icon ui-icon-soundWave "></span><label></label>' +
            '</a>';
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
        STR_HTML += '<a href="javascript:UploadFile('+UploadMediaTypeEnum.backgroundSound+')" data-type="button"  data-theme="green" >上传声音</a>';
        STR_HTML += '<span>添加<select><option value="3">3秒</option>';
        STR_HTML += '<option value="5">5秒</option>';
        STR_HTML += '<option value="7">7秒</option>';
        STR_HTML += '<option value="9">9秒</option>';
        STR_HTML += '</select>空声音</span><a href="javascript:UploadFile('+UploadMediaTypeEnum.nilBackgroundSound+')" data-type="button" >确认添加</a>';
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
        var STR_HTML = "<audio id='editor_audio' class='editor_audio'> </audio>";
        STR_HTML += "<form name='PageUploadForm' id='PageUploadForm' method='post' enctype='multipart/form-data'> " +
            "<input id='fileTextField' name ='FileSource' type='file' value='' onchange='UploadFileToService(this)'/> " +
            "</form>";
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

        //配置事件
        if(this.setEditEvent && typeof this.setEditEvent == "function"){
            this.setEditEvent();
        }

        //值填充
        if(this.setEditValue && typeof this.setEditValue == "function"){
            this.setEditValue(this.dataSource);
        }
    };

    this.setEditValue = function(){
        console.log('后台编辑区 元素赋值');
    };
    this.setEditEvent = function(){
        console.log("后台编辑区 事件");
    };


    //展示方法
    this.show = function(){

    };
    this.setShowValue = function(){
        console.log('前端展示区 元素赋值');
    };
    //展示事件
    this.setShowEvent = function(){

    };

    //数据适配
    this.adapter = function(dataSource){
    };

    //数据逆向适配
    this.reverseAdapter = function(){
    };

    this.setDataSource = function(data,isEdit){
        if(data){
            this.dataSource = data;
            if(isEdit){
                this.setEditValue();
            }else{
                this.setShowValue();
            }

        }
    };
}




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



/*==================================
 * 媒体文件上传
 *
 *
 *
 *================================== */
//调用文件选择
function UploadFile(mediaType){
    var _form = $("#PageUploadForm");
    var _fileInput = _form.find("input[type=file]");
    if(mediaType < UploadMediaTypeEnum.videoCaptureImage){
        //图片文件
        var str = '';
        str += '<input type="hidden"  name="img_x" value="0"/>';
        str += '<input type="hidden"  name="img_y" value="0"/>';
        str += '<input type="hidden"  name="img_x2" value="0"/>';
        str += '<input type="hidden"  name="img_y2" value="0"/>';
        str += '<input type="hidden"  name="img_w" value="0"/>';
        str += '<input type="hidden"  name="img_h" value="0"/>';
        str += '<input type="hidden"  name="CutType" value="1"/>';
        str += '<input type="hidden" name="imageKind" value="1" />';
        _form.append(str);
        _fileInput.attr({"accept":"image/*","ready":0});

    }else if(UploadMediaTypeEnum.videoCaptureImage < mediaType && mediaType < UploadMediaTypeEnum.video){
        _form.children("input[type=hidden]").remove();
        _fileInput.attr({"accept":".mp3,.wav,.ogg","ready":1});
        //音频文件

    }else if(mediaType == UploadMediaTypeEnum.video){
        //视频文件
        _form.children("input[type=hidden]").remove();
        _fileInput.attr({"accept":"video/*","ready":1});
    }else if(mediaType == UploadMediaTypeEnum.videoCaptureImage){
        //视频截图
        return;
    }
    if(arguments.length > 1){
        _fileInput.attr("data-Index",arguments[1]);
    }
    _fileInput.attr("mediaType",mediaType);
    _fileInput.trigger('click');
}

//图片编辑完成，确认上传
function ConfirmUploadImage(isClip){
    if(isClip == 0){
        //源图上传，不裁剪
        $("#PageUploadForm input[type=hidden][name ^= img_]").val(0);
    }
    var _imgField = document.getElementById("fileTextField");
    _imgField.setAttribute("ready","1");
    UploadFileToService(_imgField);
}

//上传文件到服务器
function UploadFileToService(element){
    var _mediaType = parseInt($(element).attr('mediaType'));
    var _ready = parseInt($(element).attr('ready'));
    var _index = $(element).attr('data-Index');

    if(_ready == 0 && _mediaType <= UploadMediaTypeEnum.elementImage){
        //图片文件裁剪
        if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE
            selectedClipImage = element.value;
        } else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox
            selectedClipImage = window.URL.createObjectURL(element.files.item(0));
        } else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome
            selectedClipImage = window.URL.createObjectURL(element.files.item(0));
        }
        var _ClipHTML = '<div class="clipRect"><img src="" id="JcropImages"/></div>' +
            '<div> ' +
            '<a href="javascript:ConfirmUploadImage(0);" data-type="button" data-theme="green">上传源图</a> ' +
            '<a href="javascript:ConfirmUploadImage(1);" data-type="button" data-theme="green" >确认上传</a>' +
            '</div>';
        if(_mediaType == UploadMediaTypeEnum.iconImage){
            scale = 1;
        };

        layer.open({
            title:"图片裁剪",
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['1170', '765px'], //宽高
            content: _ClipHTML
        });

        //初始化裁剪工具
        setTimeout("Jcrop_Init()",200);
        return;
    }

    var interFace;
    if(_mediaType < UploadMediaTypeEnum.videoCaptureImage){
        interFace = "UploadSubjectImage/AddImage";
        if(_mediaType == UploadMediaTypeEnum.optionImage){
            $("ol[name=group_opts] li").eq(_index).find(".editorImageRectInner").append("<div class='uploadLoading'><img src='dist/Images/ui-loading.gif' /> 文件上传中...</div>");
        }else{
            $(".clipRect").next('div').append("<div class='uploadLoading' style='display: inline-block'><img src='dist/Images/ui-loading.gif' /> 文件上传中...</div>");
        }

    }else if(UploadMediaTypeEnum.backgroundSound <= _mediaType && _mediaType <= UploadMediaTypeEnum.nilBackgroundSound){
        interFace = "UploadSubjectSound/AddSound";
        switch (_mediaType){
            case UploadMediaTypeEnum.answerSound:{
                $(".editorBoxFooter").append("<div class='uploadLoading' style='display: inline-block'><img src='dist/Images/ui-loading.gif' /> 文件上传中...</div>");
            }break;
            case UploadMediaTypeEnum.optionSound:{
                $("ol[name=group_opts] li").eq(_index).find(".soundPlaceholder").before("<div class='uploadLoading' style='display: inline-block'><img src='dist/Images/ui-loading.gif' /> 文件上传中...</div>");
            }break;
            default:{
                $(".editorSoundList").before("<div class='uploadLoading'><img src='dist/Images/ui-loading.gif' /> 文件上传中...</div>");
            }break;
        }


    }else if(mediaType == UploadMediaTypeEnum.video){
        interFace = "UploadSubjectVideo/AddSound";
        $(".blackRect").before("<div class='uploadLoading'><img src='dist/Images/ui-loading.gif' /> 文件上传中...</div>")
    }

    $("#PageUploadForm").ajaxSubmit({
        type: "post",
        url: "/PPTWebApi/Api/" + interFace,
        headers: { "Token": mySelf.token},
        success: function (result) {
            $(".uploadLoading").remove();
            if (result.Status == 1) {
                DidUploadCallback(result,_mediaType,_index);
            } else {
                alert(result.Msg);
            }
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            alert("文件上传失败");
            $(".uploadLoading").remove();
        }
    });
}

function DidUploadCallback(sender,mediaType,optionIndex){
    //统一适配多媒体数据对象
    var media = {
        UniqueID:0,
        Path:null
    };

    if(mediaType <= UploadMediaTypeEnum.videoCaptureImage){
        //关闭裁剪窗口
        layer.closeAll();
        media.UniqueID = sender.ImagePath.UniqueID;
        media.Path = sender.ImagePath.ImagePath;

    }else if(mediaType <= UploadMediaTypeEnum.nilBackgroundSound){
        media.UniqueID = sender.BASound.UniqueID;
        media.Path = sender.BASound.SoundPath;
    }else{
        media.UniqueID = sender.VedioPath.UniqueID;
        media.Path = sender.VedioPath.VedioPath;
    }
    /*=============================================
    * 根据类型 作相应的互动
    * 1:元素填充
    * 2:indexedDB数据更新
    * 3:实时绘制缩略图
    * ==========================================*/
    switch (mediaType){
        //图片
        case UploadMediaTypeEnum.backgroundImage:{
            $(".dashedRect").html("<div class='imgRect' data-id='"+media.UniqueID+"' style='background-image: url("+media.Path+")'></div>");
            //update indexeddb data
            PPT.currtPage.dataSource.pageBackgroundImage = media;
            //draw element to canvas

        }break;
        case UploadMediaTypeEnum.optionImage:{
            $("#imageOptionRect li").eq(i).find(".editorImageRectInner").css("background-image","url('"+media.Path+"')").attr("data-id",media.UniqueID);
            //update indexeddb data
            var _optionItemDb;
            var hasItem = false;
            for(var i=0; i< PPT.currtPage.dataSource.pageOptions.images.length; i++){
                if(PPT.currtPage.dataSource.pageOptions.images[i].imageSort == optionIndex){
                    hasItem = true;
                    PPT.currtPage.dataSource.pageOptions.images[i].imagePath = media.Path;
                    break;
                }
            }
            if(!hasItem){
                _optionItemDb = $.extend(true,ImageItemDataStructrue,{imageSort:optionIndex,imagePath:media.Path});
                PPT.currtPage.dataSource.pageOptions.images.push(_optionItemDb);
            }
            //draw element to canvas

        }break;
        case UploadMediaTypeEnum.iconImage:{
            $(".dashedRect").html("<div data-id='"+media.UniqueID+"' class='imgRect' style='background-image: url("+media.Path+")'></div>");
            //update indexeddb data
            PPT.currtPage.dataSource.pageIcon = media;

            //draw element to canvas

        }break;
        case UploadMediaTypeEnum.elementImage:{
            //update indexeddb data
            //draw element to canvas
        }break;
        case UploadMediaTypeEnum.videoCaptureImage:{
            //update indexeddb data
            //draw element to canvas
        }break;
        //音频
        case UploadMediaTypeEnum.backgroundSound:
        case UploadMediaTypeEnum.nilBackgroundSound:{
            var _strItem = '<li data-id="'+media.UniqueID+'"> ' + PPT.currtPage.get_HTML_SoundItem(media.Path)+'</li> ';
            //ADD DOM ELEMENT
            $(".editorSoundList").append(_strItem);
            //COUNT MIDIA FILE DURATION
            getAudioDuration(media,$(".editorSoundList li[data-id="+media.UniqueID+"] .ui-icon").next('label'));

            //update indexeddb data
            if(PPT.currtPage.dataSource.pageBackgroundSound instanceof Array){
                PPT.currtPage.dataSource.pageBackgroundSound.push(media);
            }else{
                PPT.currtPage.dataSource.pageBackgroundSound = [media];
            }

        }break;

        case UploadMediaTypeEnum.optionSound:{
            var _strItem = PPT.currtPage.get_HTML_SoundItem(media.Path);
            var _itemOption = $("ol[name=group_opts] li").eq(optionIndex).find(".soundPlaceholder");
            _itemOption.append(_strItem);
            getAudioDuration(media,_itemOption.find('.soundItem:last label'));

            //update indexeddb data
            var _optionItemDb;
            var hasItem = false;
            switch(PPT.currtPage.name){
                case "PageImageRadio":{
                        for(var i=0; i< PPT.currtPage.dataSource.pageOptions.images.length; i++){
                            if(PPT.currtPage.dataSource.pageOptions.images[i].imageSort == optionIndex){
                                hasItem = true;
                                PPT.currtPage.dataSource.pageOptions.images[i].imageBackgroundSound = media.Path;
                                break;
                            }
                        }
                        if(!hasItem){
                            _optionItemDb = $.extend(true,ImageItemDataStructrue,{imageSort:optionIndex,imageBackgroundSound:media.Path});
                            PPT.currtPage.dataSource.pageOptions.images.push(_optionItemDb);
                        }
                }break;
                default:{
                    for(var i=0; i< PPT.currtPage.dataSource.pageOptions.texts.length; i++){
                        if(PPT.currtPage.dataSource.pageOptions.texts[i].textSort == optionIndex){
                            hasItem = true;
                            PPT.currtPage.dataSource.pageOptions.texts[i].textBackgroundSound = media.Path;
                            break;
                        }
                    }
                    if(!hasItem){
                        _optionItemDb = $.extend(true,TextItemDataStructrue,{textSort:optionIndex,textBackgroundSound:media.Path,});
                        PPT.currtPage.dataSource.pageOptions.texts.push(_optionItemDb);
                    }
                }break;
            }

        }break;
        case UploadMediaTypeEnum.answerSound:{
            var _strItem = PPT.currtPage.get_HTML_SoundItem(media.Path);
            var _itemOption = $(".editorBoxFooter .soundPlaceholder");
            _itemOption.append(_strItem);
            getAudioDuration(media,_itemOption.find('.soundItem:last label'));

            //update indexeddb data
            PPT.currtPage.dataSource.pageAnswer.sounds.push(media);

        }break;

        //视频
        case UploadMediaTypeEnum.video:{
            $("#el_video").attr("src",media.Path);
            PPT.currtPage.dataSource.pageVideo = media;

        }break;
    }
};

/*==============================
* 图片裁剪
*
*
*
*=============================*/
//初始化裁剪插件
//图片裁剪对象
var jcrop_api = null;
var scale = 16/9;
var selectedClipImage = "";
function Jcrop_Init(){
    if(jcrop_api){
        jcrop_api.destroy();
        jcrop_api = null;
    };
    $("#JcropImages").Jcrop({
        cornerHandles:true,	//允许边角缩放
        sideHandles:true,	//允许四边缩放
        drawBorders:true,	//绘制边框
        dragEdges:true,	//允许拖动边框
        allowMove:true,
        boxWidth: 1170,
        trackDocument: true,
        aspectRatio: scale,
        minSize: [80, 45],
        bgOpacity: .2,
        bgFade: true,
        onChange: showCoords,
        onSelect: showCoords
    }, function () {
        jcrop_api = this;
        var image = new Image();
        image.src = selectedClipImage;
        image.onload = function () {
            var x = image.width * 0.25;
            var x2 = image.width - x;

            var y = image.height * 0.25;
            var y2 = image.height - y;

            jcrop_api.setImage(image.src);
            setTimeout(function(){
                jcrop_api.animateTo([x, y, x2, y2]);
            },200);
        }
    });
}
var showCoords = function (c) {
    var form = $("#PageUploadForm");
    form.find("input[name = img_x]").val(parseInt(c.x));
    form.find("input[name = img_y]").val(parseInt(c.y));
    form.find("input[name = img_x2]").val(parseInt(c.x2));
    form.find("input[name = img_y2]").val(parseInt(c.y2));
    form.find("input[name = img_w]").val(parseInt(c.w));
    form.find("input[name = img_h]").val(parseInt(c.h));
}

/*==============================
 * 声音播放
 *
 *
 *
 *=============================*/
//音频播放
function playSound(element){
    var _audio = document.getElementById('editor_audio');
    if($(element).children('.ui-icon-soundWave').attr("data-state") == undefined){
        $(element).children('.ui-icon-soundWave').attr("data-state","on");
        var _src = $(element).attr("data-src");
        _audio.setAttribute('src',_src);
        _audio.play();
    }else{
        $(element).children('.ui-icon-soundWave').removeAttr("data-state");
        _audio.pause();
    }
}

//读取文件时长
function getAudioDuration(sender,selector){
    var _audioEle = new Audio(sender.Path);
    _audioEle.addEventListener("canplaythrough",function(e){
        var mm,ss;
        var timeText = "";
        if(_audioEle.duration == Infinity){
            ss = "∞";
        }else{
            mm = parseInt(_audioEle.duration /60);
            ss = parseInt(_audioEle.duration - (mm*60));

            if(mm > 0){
                timeText += mm+"''";
            }
        }

        timeText += ss+"'";
        selector.text(timeText);
        _audioEle = null;
    },false);
};