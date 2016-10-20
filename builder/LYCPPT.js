/**
 * Created by BOT01 on 16/10/18.
 */

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

(function(){
    function load_files(isEdit){
        for(var i=0; i< PPT.config.basic.length;i++){
            $("#builder_0").before('<script type="text/javascript" src="'+PPT.config.basic[i]+'" id="builder_'+(i+1)+'"></script>');
        }
        if(isEdit){
            for(var i=0; i< PPT.config.templetes.length;i++){
                $("#builder_0").before('<script type="text/javascript" src="'+PPT.config.templetes[i].path+'" id="builder_'+(i+PPT.config.basic.length+1)+'"></script>');
                $(".sectionToolbar").prepend('<a class="sectionToolbarItem" href="javascript:void(0)">'+PPT.config.templetes[i].name+'</a>');
            }
        }else{
            for(var i=0; i< PPT.config.templetes.length;i++){
                $("#builder_0").before('<script type="text/javascript" src="'+PPT.config.templetes[i].path+'" id="builder_'+(i+PPT.config.basic.length+1)+'"></script>');
            }
        }
    };

    window["PPT"] = Window["PPT"] || {
         config:{
             path:"",
             basic:[
                 "builder/fabric.min.js",//canvas 库
                 "builder/IndexedDB/jquery.indexedDB.js",
                 "builder/IndexedDB/Zngoo.IndexedDB.js",
                 "builder/JCorp/jquery.Jcrop.js",//图片裁剪
                 "builder/JCorp/jquery.color.js",
                 "builder/Upload/jquery.form.js",//文件上传
                 "builder/Upload/jquery.form.upload.js",
                 "builder/jquery.ui.js",//拖拽元素排序
                 "builder/jQuery.Hz2Py-min.js",//汉字拼音
                 "builder/Class_lib.js"
             ],
             templetes:[
                 {name:"语音+图片", path:"builder/Templete/NSPage+SoundAndImage.js"},
                 {name:"语音+文字", path:"builder/Templete/NSPage+SoundAndText.js"},
                 {name:"时间点文字",path:"builder/Templete/"},
                 {name:"视频",      path:"builder/Templete/NSPage+Video.js"},
                 {name:"填空题",    path:"builder/Templete/NSPage+TextRadio+FillBlank.js"},
                 {name:"图片选择题",path:"builder/Templete/NSPage+ImageRadio.js"},
                 {name:"词句选择题",path:"builder/Templete/NSPage+TextRadio.js"},
                 {name:"图文选择题",path:"builder/Templete/NSPage+TextRadio+Image.js"},
                 {name:"注音选择题",path:"builder/Templete/NSPage+TextRadio+PinYin.js"},
                 {name:"文字选择题",path:"builder/Templete/NSPage+WordRadio.js"}
             ]
         },
         id:0,
         title : null,       //主题
         cover : null,       //封面
         detail : null,      //详情
         author : null,      //作者
         dateTime : null,    //发布时间
         collection : 0,     //收藏次数
         tread : 0,          //阅读次数
         currtPage:null,   //当前页对象
         pages:[],         //页面集合

        /*创建模板*/
        addPageWith:function(TemplatePage,AtPageIndex){
            //添加模板页
            this.currtPageIndex = AtPageIndex;
            this.pages.insert(AtPageIndex,TemplatePage);

            //添加轨道预览图 并 选中


            //this.turnToPage(AtPageIndex,true);
        },

            /* 跳转到指定页
             * */
        turnToPage:function(index,isEdit){
            this.currtPage = this.pages[index];
            if(isEdit){
                //展示编辑界面 + 轨道预览界面
                this.currtPage.editor();

            }else{
                this.currtPage.show();
            }
        },

            /* 提交
             * 1 获取当前 PPT 全部页面数据
             * 2 合并基本信息,提交
             * */
        submit:function(){

        },

            /*
             排序
             * */
        sort:function(){


        },
            /*编辑初始化*/
        editInit:function(){
            /*
            初始化
            1: 加载模板列表
            * */
            load_files(true);



        },

            /*播放初始化*/
        playInit:function(){
            load_files();



        },

            /*收藏*/
        collection:function(pptId,userId){

        },

            /*下一个课程*/
        next:function(){

        }
     }
})();

$(function(){
    PPT.editInit();
});