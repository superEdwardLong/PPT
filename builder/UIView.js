/*
* UIView
* */
(function(){
    function UIView(){};
    UIView.prototype = {
        elementId:"UIView_" + new Date().getTime(),
        init:null,
        didInit:null
    };

    function UITabelView(){
        this.dataSource = [];
        this.CellView = null;
        this.sectionHeader = null;
        this.sectionFooter = null;
        this.setSectionHeader = null;
        this.setSectionFooter = null;
        this.drawHtml = function(){
            var _table = "<div class='ui-tableView' id='"+this.elementId+"'>";
            if(this.sectionHeader){
                _table += "<div class='ui-sectionHeader'>"
                _table += this.sectionHeader;
                _table += "</div>"
            }

            _table += "<div class='ui-tableViewInner'><ul class='ui-InnerContent'>";
            if(this.CellView && typeof (this.CellView) == "function"){
                for(var i=0; i< this.dataSource.length; i++){
                    _table += this.CellView(this.dataSource[i],i);
                }
            }
            _table += "</ul></div>";

            if(this.sectionFooter){
                _table += "<div class='ui-sectionFooter'>"
                _table += this.sectionFooter;
                _table += "</div>"
            }
            _table += "</div>";
            return _table;
        };

        this.init = function(superView){
            if(this.setSectionHeader && typeof (this.setSectionHeader) == "function"){
                this.sectionHeader = this.setSectionHeader();
            }
            if(this.setSectionFooter && typeof (this.setSectionFooter) == "function"){
                this.sectionFooter = this.setSectionFooter();
            }

            superView.append(this.drawHtml());


            if(this.didInit && typeof (this.didInit)=="function"){
                this.didInit.call(this);
            }
        };

    };
    UITabelView.prototype = new UIView();


    function UICollectionView(){
        this.scrollDirection = 0;
        this.itemSize = {
            width:3.125,
            height:3.125
        };
        this.drawHtml = function(){
            var _directionClass;
            switch (this.scrollDirection){
                case scrollDirectionEnum.horizontally:{
                    _directionClass = "horizontally";
                }break;
                case scrollDirectionEnum.vertically:{
                    _directionClass = "vertically";

                }break;
            }

            var _table = "<div id='"+this.elementId+"' class='ui-collectionView "+_directionClass+"'>";
            if(this.sectionHeader){
                _table += "<div class='ui-sectionHeader'>"
                _table += this.sectionHeader;
                _table += "</div>"
            }
            _table += "<div class='ui-collectionViewInner'><ul class='ui-InnerContent'>";
            if(this.CellView && typeof (this.CellView) == "function"){
                if(this.itemSize){
                    for(var i=0; i< this.dataSource.length; i++){
                        _table += "<li style='width: "+this.itemSize.width +"rem;height: " + this.itemSize.height+"rem;'>"+this.CellView(this.dataSource[i],i)+"</li>";
                    }
                }else{
                    for(var i=0; i< this.dataSource.length; i++){
                        _table += "<li>"+this.CellView(this.dataSource[i],i)+"</li>";
                    }
                }
            }
            _table += "</ul></div>";
            if(this.sectionFooter){
                _table += "<div class='ui-sectionFooter'>"
                _table += this.sectionFooter;
                _table += "</div>"
            }
            _table += "</div>";
            return _table;
        }
    }
    UICollectionView.prototype = new UITabelView();

    /*
    * 注册命名空间
    * */
    window.scrollDirectionEnum = { horizontally:0,vertically:1};
    window["UIView"] = window["UIView"]|| UIView;
    window["UITableView"] = window["UITableView"]|| UITabelView;
    window["UICollectionView"] = window["UICollectionView"]|| UICollectionView;
})();