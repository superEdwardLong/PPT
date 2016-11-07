/**
 * Created by BOT01 on 16/10/18.
 */

var PPTTypeEnum = {
    slide:0,
    phantom:1
}
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

(function(){
    function load_files(isEdit,model){
        for(var i=0; i< PPT.config.basic.length;i++){
            $("#builder_0").before('<script type="text/javascript" src="'+PPT.config.basic[i]+'" id="builder_'+(i+1)+'"></script>');
        }
        //如果是幻灯片,加载模版类
        if(model == PPTTypeEnum.phantom){
            //如果是编辑模式,添加模版选择菜单项
            if(isEdit){
                for(var i=0; i< PPT.config.templetes.length;i++){
                    $("#builder_0").before('<script type="text/javascript" src="'+PPT.config.templetes[i].path+'" id="builder_'+(i+PPT.config.basic.length+1)+'"></script>');
                    $(".sectionToolbar").prepend('<li><a class="sectionToolbarItem" href="javascript:void(0)" onclick="AddPage(&quot;'+PPT.config.templetes[i].fn+'&quot;)">'+PPT.config.templetes[i].name+'</a></li>');
                }
            }else{
                for(var i=0; i< PPT.config.templetes.length;i++){
                    $("#builder_0").before('<script type="text/javascript" src="'+PPT.config.templetes[i].path+'" id="builder_'+(i+PPT.config.basic.length+1)+'"></script>');
                }
            }
        }
    };

    window["PPT"] = Window["PPT"] || {
         config:{
             path:"",
             basic:[
                 "builder/fabric.min.js",//canvas 库
                 "builder/JCorp/jquery.Jcrop.js",//图片裁剪
                 "builder/JCorp/jquery.color.js",
                 "builder/Upload/jquery.form.js",//文件上传
                 "builder/Upload/jquery.form.upload.js",
                 "builder/jquery.ui.js",//拖拽元素排序
                 "builder/jQuery.Hz2Py-min.js",//汉字拼音
                 "builder/iscroll.js",//模拟滚动条
                 "builder/Templete/NSPage.js"
             ],
             templetes:[
                 {name:"语音+图片", path:"builder/Templete/NSPage-SoundAndImage.js",fn:"PageSoundAndImage"},
                 {name:"语音+文字", path:"builder/Templete/NSPage-SoundAndText.js",fn:"PageSoundAndText"},
                 {name:"时间点文字",path:"builder/Templete/NSPage-TimeText.js",fn:"PageTimeText"},
                 {name:"视频",      path:"builder/Templete/NSPage-Video.js",fn:"PageVideo"},
                 {name:"填空题",    path:"builder/Templete/NSPage-TextRadio-FillBlank.js",fn:"PageFillBlank"},
                 {name:"图片选择题",path:"builder/Templete/NSPage-ImageRadio.js",fn:"PageImageRadio"},
                 {name:"词句选择题",path:"builder/Templete/NSPage-TextRadio.js",fn:"PageTextRadio"},
                 {name:"图文选择题",path:"builder/Templete/NSPage-TextRadio-Image.js",fn:"PageTextRadioImage"},
                 {name:"注音选择题",path:"builder/Templete/NSPage-TextRadio-PinYin.js",fn:"PagePinYin"},
                 {name:"文字选择题",path:"builder/Templete/NSPage-WordRadio.js",fn:"PageWordRadio"}
             ]
         },
         pptid:0,
         type:null,           //类型@:幻灯片 ,@:幻影片
         title : null,       //主题
         cover : null,       //封面
         detail : null,      //详情
         author : null,      //作者
         dateTime : null,    //发布时间
         collection : 0,     //收藏次数
         tread : 0,          //阅读次数
         currtPage:null,   //当前页对象
         pages:[],         //页面集合

        /*使用模板创建页面*/
        addPageWith:function(TemplatePage,AtPageIndex){
            //添加模板页
            this.pages.insert(AtPageIndex,TemplatePage);

            //创建预览图
            var _superView = $(".pageControllerInner ol");
            var _pageData = TemplatePage.dataSource;
            TemplatePage.thumbnail.addAtPageIndex(AtPageIndex,_pageData,_superView);

            //跳转到指定页面
            this.turnToPage(AtPageIndex,true);

        },

            /* 跳转到指定页
             * */
        turnToPage:function(index,isEdit){
            this.currtPage = this.pages[index];
            if(isEdit){
                $(".pageControllerInner ol li").eq(index).attr("data-state","selected").siblings().removeAttr("data-state");
                this.currtPage.editor($("#EditRect"));
            }else{
                //播放
                this.currtPage.show();
            }
        },

            /* 提交
             * 1 获取当前 PPT 全部页面数据
             * 2 合并基本信息,提交
             * */
        submit:function(){
            //逆向适配,再提交给服务器
            this.reverseAdapter();

        },

            /*
             排序
             * */
        sort:function(){


        },
        thumbnailList:function(){
            var _pageData;
            var _superView = $(".pageControllerInner ol");
            for(var i = 0; i<this.pages.length;i++){
                _pageData = this.pages[i].dataSource;
                this.pages[i].thumbnail.addAtPageIndex(i,_pageData,_superView);
            }
        },

            /*编辑初始化*/
        init:function(isEdit){
            /*
            初始化
            1: 加载模板列表
            * */
            load_files(isEdit,this.type);

            if(isEdit){
                /*如果是编辑模式*/
                if(this.pages.length > 0){
                    /*页面数目大于 0  ==> 载入缩略图列表 */
                    this.thumbnailList();
                }else{
                    var _NewPage;
                    if(this.type == PPTTypeEnum.slide){
                        _NewPage = SlidePage();
                    }else if(this.type == PPTTypeEnum.phantom){
                        _NewPage = eval(PPT.config.templetes[0].fn+"()");
                    }
                    PPT.addPageWith(_NewPage,0);
                }

                $(".pageControllerInner ol").on("click","li",function(e){
                    if($(this).attr("data-state") == undefined){
                        var _selectedIndex = $(this).index();
                        PPT.turnToPage(_selectedIndex,true);
                    }
                });

            }else{
                /*如果是播放模式*/
                if(this.pages.length == 0){
                    /*页面数目等于 0*/
                    layer.confirm(
                        "您的屁屁体页面为空，要进入编辑模式吗？[确定]进入，[取消]关闭",
                        {btn:['确定','取消']},
                        function(){
                            window.location.href = "PPTEditor.html?Action=edit&Model="+PPT.type+"&PPTId="+PPT.PPTId;
                        },
                        function(){
                            window.close();
                        });
                    return;
                }
            }

            /*跳转到第一页*/
            this.turnToPage(0,isEdit);
        },


            /*收藏*/
        collection:function(pptId,userId){

        },

            /*下一个课程*/
        next:function(){

        },
        save:function(){
            console.log("auto save ppt");
        },
        adapter:function(dataSource){
            if(dataSource){

            }
        },
        reverseAdapter:function(){

        }

     }
})();

/*=====================
* 添加一个页面
* ====================*/
function AddPage(PageObject){
    var _NewPage,_NewPageIndex;

    if(PageObject){
        //通过对象创建新页面
        if(typeof PageObject == "string"){
            /*全新模式*/
            _NewPage = eval(PageObject+"()");
            $(".sectionToolbar").parent('section').slideUp('fast');
        }else if(typeof PageObject == "object"){
            /*复制模式*/
            _NewPage = PageObject;
        }
    }else{
        //幻灯片:自定义创建
        if(PPT.type != PPTTypeEnum.slide) {
            $(".sectionToolbar").siblings().hide().parent('section').slideDown('fast');
            return;
        }
        _NewPage = SlidePage();
    }

    var _CurrentPage = $(".pageControllerInner ol").find("li[data-state=selected]");
    if(_CurrentPage.size() == 0){
        _NewPageIndex = 0;
    }else{
        _NewPageIndex = _CurrentPage.index();
    }
    PPT.addPageWith(_NewPage,_NewPageIndex);
}

/*=====================
 * 复制添加一个页面
 * ====================*/
function CopyPage(){
    var _pageObject = $.extend(true,{},PPT.currtPage);
    AddPage(_pageObject);
}

/*=====================
 * 展示背景音乐选项
 * ====================*/
function ShowBackgroundMusicOption(){

}

/*=====================
 * PPT 预览
 * ====================*/
function PreView(){

}

/*=====================
 * PPT 提交
 * ====================*/
function SubmitPPT(){

}



/*=====================
 * 文档初始化准备
 * ====================*/
$(function(){
    //初始化
    function init_block(isEdit){
        PPT.init(isEdit);
        if(isEdit){
            /*每2分钟 自动保存一次;*/
            var times = 1000 * 60 * 2;
            setInterval(PPT.save,times);
        }
    }



    PPTDatabase.init(
        [
            {tableName:"t_PPT",orderBy:"CreateTime"},
            {tableName:"t_Page",orderBy:"PageIndex"}
        ],function(){

            var _PPTType = C_lib.getUrlParam("Model") || PPTTypeEnum.phantom;
            var _PPTId = C_lib.getUrlParam("PPTId") || 0;
            var _PPTAction = C_lib.getUrlParam("Action") || "edit";
            var _isEdit = _PPTAction.toLocaleLowerCase() == "play" ? false : true;

            if(_PPTType) _PPTType = parseInt(_PPTType);
            if(_PPTId) _PPTId = parseInt(_PPTId);

            PPT.type = _PPTType;
            PPT.id = _PPTId;

            if(_PPTId > 0){
                //清空缓存
                PPTDatabase.clear(['t_PPT','t_Page']);

                /*读取网络数据*/
                var request = C_lib.request();
                request.InterFace = "PCCourseware/GetPCCourseware";
                request.ExtendParam = { coursewareID: _PPTId }
                request.willBegin = function(conn){
                    layer.load(1, {
                        shade: [0.1,'#000000']
                    });
                };
                request.didSucc = function(conn,result){
                    layer.closeAll();
                    /*=================
                     * 读取完成后
                     * 1:数据适配,并填充
                     * 2:初始化
                     * ===============*/
                    PPT.adapter(result);
                    init_block(_isEdit);
                };
                request.didFailed = function(conn,errString){
                    layer.closeAll();
                    layer.msg(errString);
                };
                request.get();

            }else{
                /*检查本地数据库,如果有没提交的数据,提示是否继续
                 * 1:继续 ==> 调出本地数据;
                 * 2:全新 ==> 清理本地数据
                 * */
                PPTDatabase.getAllItem('t_PPT',{PPTId:_PPTId},'CreateTime',function(arr){
                    if(arr.length > 0 && _isEdit){
                        layer.confirm("草稿中有尚未完成的屁屁体,要继续吗?",{
                            btn:['继续','全新']
                        },function(){
                            var _PPTCache = arr[0];
                            PPTDatabase.getAllItem('t_Page',{ParentId:_PPTCache.uid},'PageIndex',function(pageDbArr){
                                var _PageArr = [];
                                for(var i=0; i<pageDbArr.length; i++){
                                   var _page =  eval(pageDbArr[i].name+"()");
                                    _page.adapter(pageDbArr[i]);
                                    _PageArr.push(_page);
                                }
                                console.log("=== 缓存创建 ===");
                                init_block(_isEdit);
                            });

                        },function(){
                            //清空缓存
                           PPTDatabase.clear(['t_PPT','t_Page']);
                            console.log("=== 全新创建 ===");
                            init_block(_isEdit);
                        });
                    }else{
                        console.log("=== 全新创建 ===");
                        init_block(_isEdit);
                    }
                });
           }
        }
    );
});