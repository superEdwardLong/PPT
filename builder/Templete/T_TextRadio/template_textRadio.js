/**
 * Created by BOT01 on 16/10/8.
 * 文字四选一,有文字标题,没有背景图,选项排列为纵向
 */
var TextRadioPage = function(){
        var _TextRadioPage = new NSPPTPage();
        _TextRadioPage.collectionView = new UICollectionView();
        _TextRadioPage.collectionView.cellView = function(){
            var strCell = "<div>";
            strCell += "<span>icon</span> <span>text</span>"
            strCell += "</div>";
            return strCell;

        };

        _TextRadioPage.collectionView.setValue = function(dataSource,isEdit){

        };

        _TextRadioPage.show = function(){
            //页面基础布局架构
            alert("show text radio V page");
        },

        _TextRadioPage.setValue = function(value,isEdit){
            alert("Set value " + isEdit);

            this.collectionView.setValue({},isEdit);

            //填充页面数据
            if(isEdit){
                //如果是编辑

            }else{
                //如果是展示

            }
        },

        _TextRadioPage.getValue = function(){
            //提取页面数据
            alert("radio page get value");
        },

        _TextRadioPage.editor = function(superView){
            //编辑器
            this.collectionView.numberOfItemInSection = 4;
            this.collectionView.numberOfItemsInRow = 1;
            var STR_HTML = this.collectionView.init();
            superView.html(STR_HTML);

            this.setValue({},true);
        },

        _TextRadioPage.save = function(){
            //保存数据

        };
    return _TextRadioPage;
}