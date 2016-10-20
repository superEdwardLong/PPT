/**
 * Created by BOT01 on 16/10/8.
 * 图文二选一,有背景图,没有标题,选项排列为横向
 */
var TextRadioHPage = function(){
    var _TextRadioHPage = TextRadioPage();
    _TextRadioHPage.editor = function(superView){

        this.collectionView.numberOfItemInSection = 6;
        this.collectionView.numberOfItemsInRow = 3;
        var STR_HTML = this.collectionView.init();
        superView.html(STR_HTML);

        this.setValue({},true);
    }
    _TextRadioHPage.show = function(){
        alert("show text radio H page");
    }
    return _TextRadioHPage;
};
