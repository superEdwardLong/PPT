var myPPT = null;
var NilSoudList;
var myScroll = null;
var mySelf = null;
mySelf = new UserClass();

var myDataBasicTables = [
        { TableName: "t_PPT", KeyPaht: "id", SortKey: "CreateTime" },
        { TableName: "t_Page", KeyPaht: "id", SortKey: "PageIndex" },
        { TableName: "t_TextSubject", KeyPaht: "id", SortKey: "SubjectId" },
        { TableName: "t_ImageSubject", KeyPaht: "id", SortKey: "SubjectId" },
        { TableName: "t_SoundSubject", KeyPaht: "id", SortKey: "SubjectId" },
        { TableName: "t_VideoSubject", KeyPaht: "id", SortKey: "SubjectId" }

];

var UpdateScroller = function (scrollId) {
    var elementId = scrollId == undefined ? "#wrapper" : scrollId;
    if (myScroll) {
        myScroll.refresh();
    } else {
        myScroll = new IScroll(elementId, { mouseWheel: true, scrollbars: true });
        if (scrollId == undefined) {            
            myScroll.on('beforeScrollStart', beforeScrollStart);
        }
    }
}

/*
iscroll event 
beforeScrollStart 
开始滚动前查探当前元素是否为canvas
*/
function beforeScrollStart() {
    if (myScroll.pointX > 428 && myScroll.pointX < 680) {
        myScroll.destroy();
        myScroll = null;
    } 
}

var dateTimeFormat = function (dateTime, CreateTime) {
    if (isNaN(dateTime)) {
        return;
    }

    var minute = parseInt(dateTime / 60);  //分钟
    var hours = parseInt(dateTime / 3600); //小时
    var days = parseInt(dateTime / (24 * 3600));//天
    var str_time;

    if (days > 0) {
        //超出一天
        if (days > 3) {
            str_time = days + "天前";
        } else {
            //显示日期
            str_time = CreateTime.split("T")[0];
        }
        return str_time;
    }

    if (hours > 0) {
        //超出一小时
        str_time = hours + "小时前";
        return str_time;

    }

    if (minute > 0) {
        //超出一分钟
        str_time = minute + "分钟前";
        return str_time;

    }

    str_time = dateTime + "秒前";
    return str_time;
}





