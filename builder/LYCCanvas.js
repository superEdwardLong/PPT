/**
 * Created by BOT01 on 16/10/9.
 * //cdn.bootcss.com/fabric.js/1.6.5/fabric.min.js
 * 依赖 fabric.js库
 * LYCCanvas.DrawList.canvasId = "PPTCanvas";
 * LYCCanvas.DrawList.dataSource = ['a','b','c','d','e','f','g'];
 * LYCCanvas.DrawList.itemSpace = 5;
 * LYCCanvas.DrawList.rowSpace = 5;
 * LYCCanvas.DrawList.direction = directionEnum.vertical;
 * LYCCanvas.DrawList.numberOfItemsInRow = 2;
 * LYCCanvas.DrawList.textColor = "#FFFFFF";
 * LYCCanvas.DrawList.draw();
 */
//方向枚举
var directionEnum = {
    horizontal:0,
    vertical:1
};

(function(){
    //绘制文字
    function  draw_Text(){

            this.left = 0,
            this.top = 0,
            this.fill = '#000',
            this.opacity = 1,
            this.fontFamily = '' ,
            this.fontSize = 14,
            this.fontWeight = 300,
            this.textShadow = '',
            this.fontStyle = '',
            this.strokeStyle = '',
            this.strokeWidth  = '',
            this.textBackgroundColor  = '',
            this.lineHeight  = '',
            this.textAlign = '',

            this.draw = function(text){

            }
    };

    //画列表(横向||纵向)
    function draw_List(){
        this.canvasId = null;
        this.direction = directionEnum.vertical;
        this.numberOfItemsInRow = 1;
        this.itemSpace = 0;
        this.rowSpace = 0;
        this.dataSource = [];
        this.textColor = '#000';
        this.draw = function(){
            var canvas = new fabric.Canvas(this.canvasId);
            var itemHeight = canvas.height *  0.2;
            var itemWidth,itemTop,itemLeft,rows;

            switch (this.direction){
                case directionEnum.horizontal :{
                     rows = Math.floor(this.dataSource.length/this.numberOfItemsInRow);
                     itemWidth = (canvas.width -   (this.numberOfItemsInRow +1) *this.itemSpace) / this.numberOfItemsInRow;
                     itemTop =  canvas.height - rows*(itemHeight + this.rowSpace) ;
                     itemLeft = this.itemSpace;
                    if(itemTop < 0){
                        itemHeight =  parseInt((canvas.height - rows*this.rowSpace)/rows);
                        itemTop = 0;
                    }


                    for(var i=0; i< this.dataSource.length;i++){


                        var rect = new fabric.Rect({
                            originX: 'center',
                            originY: 'center',
                            fill:'red',
                            width:itemWidth,
                            height:itemHeight
                        });

                        var text = new fabric.Text(this.dataSource[i], {
                            fontSize: 60,
                            originX: 'center',
                            originY: 'center',
                            fill:this.textColor,
                            fontFamily:"Microsoft YaHei"

                        });

                        var group = new fabric.Group([rect,text], {
                            left:itemLeft,
                            top:itemTop,
                            width:itemWidth,
                            height:itemHeight
                        });

                        canvas.add(group);


                        if( (i+1) % this.numberOfItemsInRow == 0){
                            //另起一行
                            itemTop += itemHeight+this.rowSpace;
                            itemLeft = this.itemSpace;

                        }else{
                            itemLeft += itemWidth+this.itemSpace;

                        }


                    }
                }break;
                default:{
                    rows = this.dataSource.length;
                    itemWidth = canvas.width - this.itemSpace*2;
                    itemTop = canvas.height - (this.rowSpace + itemHeight) * rows;
                    itemLeft = this.itemSpace;
                    if(itemTop < 0){
                        itemHeight =  parseInt((canvas.height - rows*this.rowSpace)/rows);
                        itemTop = 0;
                    }

                    for(var i=0; i< this.dataSource.length;i++){
                        var rect = new fabric.Rect({
                            originX: 'center',
                            originY: 'center',
                            fill:'red',
                            width:itemWidth,
                            height:itemHeight
                        });

                        var text = new fabric.Text(this.dataSource[i], {
                            fontSize: 60,
                            originX: 'center',
                            originY: 'center',
                            fill:this.textColor,
                            fontFamily:"Microsoft YaHei"

                        });

                        var group = new fabric.Group([rect,text], {
                            left:itemLeft,
                            top:itemTop,
                            width:itemWidth,
                            height:itemHeight
                        });

                        canvas.add(group);

                        itemTop += itemHeight+this.rowSpace;
                    }
                }break;
            }
        }
    }


    window['LYCCanvas'] =  {
            DrawList : new draw_List(),
            DrawText : new draw_Text(),
            DrawImage:null,
    }


})();