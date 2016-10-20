/*课件列表Request更新定时器*/
var RowMax = 20;
var CurrentUserID = null;
var TurnPageTimer = null;


var PPT_CategoryListItem_Adapter = function (data) {
    var itemdb = {
        CoursewareID: data.UniqueID,
        PreviewImage: data.PreviewImage,
        Title: data.Title,
        Description: data.Description,
        Author: {
            UniqueID: data.AuthorId,
            HeadPhoto: data.AuthorHeadPhoto,
            Nickname: data.Nickname
        },
        DiffTime: data.DiffTime,
        CreatedTime: data.CreatedTime,
        CategoryID: data.CategoryID,
        CategoryName: data.CategoryName,
        SourceType: data.SourceType
    }
    return itemdb;
}

/*课件列表Request对象*/
var TurnPageRequest = new RequestClass();
TurnPageRequest.InterFace = 'GetCourseware/GetCoursewareByUserID';
TurnPageRequest.ContentView = "#MainRect";
TurnPageRequest.willBegin = function (conn) {
    //ActionType:翻页方向{0：下一页，1：上一页}
    if (conn.ActionType == 0) {
        UIView.Loading(conn.ContentView, 1);
    } else {
        UIView.Loading(conn.ContentView, 2);
    }

}
TurnPageRequest.didSucc = function (conn, data) {
    //数据规范适配
    var dataSource;
    switch (conn.InterFace) {
        case"GetWarTeamDynamic/Post":
        case "MyCollect/GetCollect": 
        case "GetDirectory/GetCoursewareOfDirectory": {        
            dataSource = data.Data;
        } break;
        case "Discover/GetDiscoverKind": {
            dataSource = data.DiscoverCategoryLst;
        } break;
        default: {
            dataSource = data.CoursewareLst;
        } break;
    }

    if (data.Status == 1) {
        if (conn.InterFace == "Discover/GetDiscoverKind") {
            $(TurnPageRequest.ContentView).html(UIView.CollectionView(9, 3));

            return;
        }
        //如果数据集为空
        if (conn.TotalPage == 0) {
            list = "<div class='ItemRow' data-type='placeholder'>" + GetResult_Nil_Msg(conn.InterFace) + "</div>";
            $(conn.ContentView).html(list);
            return;
        }
        
        var list = "";
        var itemdb;
        for (var i = 0; i < dataSource.length; i++) {
           
            if (conn.InterFace == "GetDirectory/GetCoursewareOfDirectory") {
                itemdb = PPT_CategoryListItem_Adapter(dataSource[i]);
            } else {
                itemdb = dataSource[i];
            }
            list += UIView.PPTListItem(itemdb, mySelf.id, conn.PageIndex);
        }
        if (conn.ActionType == 0) {
            //下一页
            PageRowController('top');
           $(conn.ContentView).append(list);            
        } else {
            //上一页
            PageRowController('bottom');          
            $(conn.ContentView).prepend(list);
        }

    }

    UIView.LoadingRemove(conn.ContentView);

}

TurnPageRequest.didFailed = function (conn, err) {
    UIView.LoadingRemove(conn.ContentView);
    if (conn.InterFace == "Discover/GetDiscoverKind") {
        $(TurnPageRequest.ContentView).html(UIView.CollectionView(9, 3));

        return;
    }

    var list = "<div class='ItemRow' data-type='placeholder'> "+GetResult_Nil_Msg(conn.InterFace)+"</div>";
    $(conn.ContentView).html(list);

}

var GetResult_Nil_Msg = function (Interface) {
    var text;
    switch (Interface) {
        case 'GetCourseware/GetCoursewareByUserID': {
            text = "这家伙很懒，什么都没有创建！"
        } break;
        case 'MyCollect/GetCollect': {
            text = "你还没有收藏作品！"
        } break;
        default: {
            text = "这里什么都没有！"
        } break;
    }
    return text;
}

var PageRowController = function (direction) {
    if ($(".ItemRow").size() >= RowMax) {
        var dataPage;
        if (direction == 'top') {
            dataPage = $(".ItemRow:first").attr('data-page');
        } else if (direction == 'bottom') {
            dataPage = $(".ItemRow:last").attr('data-page');
        }
        $(".ItemRow[data-page=" + dataPage + "]").remove();
    }
}

/*更新控制面板*/
var UpdateTurnPageRequest = function (User) {
    CurrentUserID = User.id;
    //如果是白名单用户载入创建面板
    if (User.isWhiteListUser) {
        $(".cell_1").fadeIn('fast');
    }
    //更新用户区域面板信息
    $("#MasterRect [data-type=section]").replaceWith(UIView.MasterPanel({ face: _FilePath + User.face, name: User.name }));

    //登录成功后，读取广场目录
    Category.get();
    UpdateScroller("#MenuWallpaper");

    //绑定单击事件
    $(".MenuTree").on('click', 'li', function (e) {
        LoadList($(this));
        e.stopPropagation();
    });

    $(".MenuTree li[data-role = home]").trigger('click');
}


/*
加载列表
@type   team ，home ，collect ，find ，piazza
*/

function LoadList(element) {
    if (element.attr('data-state')) {
        if (element.attr('data-role') == 'piazza' && element.closest('.MenuTree').length > 0) {
            element.removeAttr('data-state').find('li').removeAttr('data-state');
            UpdateScroller("#MenuWallpaper");
        }
        return;
    }
   
    element.attr('data-state', 'selected').siblings("li").each(function () {
        $(this).find('li').removeAttr('data-state');//同辈元素的所有后代元素清除 data-state
        $(this).removeAttr('data-state'); //其他同辈元素清除 data-state     
    });
   

    UpdateScroller("#MenuWallpaper");

    switch (element.attr('data-role')) {
        case 'team': {      
            $(TurnPageRequest.ContentView).empty();            
            TurnPageRequest.InterFace = "GetWarTeamDynamic/Post"
            TurnPageRequest.IsPost = true;
            TurnPageRequest.ExtendParam = { UserID: CurrentUserID };
            TurnPageRequest.TotalPage = 0;
            TurnPageRequest.PageIndex = 0;
            TurnPageRequest.get();



        } break;
        case 'home': {

            $(TurnPageRequest.ContentView).empty();
            TurnPageRequest.InterFace = "GetCourseware/GetCoursewareByUserID";
            TurnPageRequest.IsPost = true;
            TurnPageRequest.ExtendParam = { UserID: CurrentUserID };
            TurnPageRequest.TotalPage = 0;
            TurnPageRequest.PageIndex = 0;
            TurnPageRequest.get();

        } break;
        case 'collect': {
            //MyCollect/GetCollect?UserID
            $(TurnPageRequest.ContentView).empty();
            TurnPageRequest.InterFace = "MyCollect/GetCollect";
            TurnPageRequest.IsPost = false;
            TurnPageRequest.ExtendParam = { UserID: CurrentUserID};
            TurnPageRequest.TotalPage = 0;
            TurnPageRequest.PageIndex = 0;
            TurnPageRequest.get();
        } break;
        case 'find': {
            //Discover/GetDiscoverKind          
                     
            TurnPageRequest.InterFace = "Discover/GetDiscoverKind";
            TurnPageRequest.IsPost = true;
            TurnPageRequest.ExtendParam = null;
            TurnPageRequest.TotalPage = 0;
            TurnPageRequest.PageIndex = 0;
            TurnPageRequest.get();
            
        } break;
        case "piazza": {
            var itemIndex = element.index()+1;
            var _ItemSelector = '.MenuTree li:nth-child(' + itemIndex + ')';
            myScroll.scrollToElement(document.querySelector(_ItemSelector));
            UpdateScroller("#MenuWallpaper");
        } break;
        case "category": {
            $(TurnPageRequest.ContentView).empty();
            TurnPageRequest.InterFace = "GetDirectory/GetCoursewareOfDirectory";
            TurnPageRequest.IsPost = false;
            TurnPageRequest.ExtendParam = { directoryId: parseInt(element.attr("data-id")) };
            TurnPageRequest.TotalPage = 0;
            TurnPageRequest.PageIndex = 0;
            TurnPageRequest.get();
        } break;
    }
}

var Category = new RequestClass();
Category.InterFace = "GetDirectory/GetFirstDirectory";
Category.IsPost = false;
Category.willBegin = function (conn) {
}
Category.didSucc = function (conn, result) {
    var item = "";
    if (result.Data && conn.InterFace == 'GetDirectory/GetFirstDirectory') {             
        for (var i = 0; i < result.Data.length; i++) {
            item += "<li data-id=" + result.Data[i].UniqueID + " data-role='category'><span> " + result.Data[i].CategoryName + "</span></li> "
        }
        $(".MenuTree li[data-role=piazza]").attr('data-child', 'yes').append('<ul>' + item + '</ul>');

        //查询二级目录  
        setTimeout(" GetSubCategory(" + result.Data[0].UniqueID + ")", 400);

    } else if (conn.InterFace == 'GetDirectory/GetSubCategory') {
        if (result.Data && result.Data.length > 0) {
            for (var i = 0; i < result.Data.length; i++) {
                item += "<li data-id=" + result.Data[i].UniqueID + "  data-role=\"category\"><span> " + result.Data[i].CategoryName + "</span></li> </li> "
            }
            $(".MenuTree  li[data-id=" + conn.ExtendParam.id + "]").attr('data-child', 'yes').removeAttr('data-role').append('<ul>' + item + '</ul>');

        }
       

        var next = $("li[data-id=" + conn.ExtendParam.id + "]").next('li');
        if (next.size() > 0) {
            GetSubCategory(parseInt(next.attr("data-id")));
        }
        
        
    }

}
Category.didFailed = function (conn, msg) {
    console.log(msg);
}

var GetSubCategory = function (ParentId) {
    Category.InterFace = "GetDirectory/GetSubCategory";
    Category.ExtendParam = { id: ParentId };
    Category.get();
}



function LoginPanelConfig(callback) {
    $("#login-btn").bind("click", function (e) {
        var id = $("#PPTIDTextField input").val();
        var ps = $("#PPTPSTextField input").val();
        if (id.length > 0 && ps.length > 0) {
            mySelf.login(id, ps, callback);
        } else {
            $("#LoginPanel .ui-err").text("PP号与密码不能为空!").attr("data-type", "normal");
        }
    });
}
$(function () {


    if (mySelf.check()) {
        UpdateTurnPageRequest(mySelf);
    } else {
        //加载游客课件列表
        TurnPageRequest.ExtendParam = null;
        TurnPageRequest.PageIndex = 0;
        TurnPageRequest.get();

        //尚未登录
        LoginPanelConfig(UpdateTurnPageRequest);
    }

    $("#MainRect").on("click",'li', function (e) {
        var act = $(e.target).attr("data-action");
        var id = $(e.target).attr("data-id");
        switch (act) {
            case "edit": {
                var model = parseInt($(e.target).attr("data-type"));
                model = model == 2 ? 1 : 0;
                self.location = ' /PPTEditor.html?model=' + model + '&id=' + id;
            } break;
            case "remove": {
                layer.confirm('确认删除吗？', {
                    btn: ['确定', '取消'] //按钮
                }, function () {
                    RemoveCoursewareWithId(id)
                }, function () {
                    layer.closeAll();
                });
            } break;
        }
    });
});


function RemoveCoursewareWithId(ID) {
    var removeRequest = new RequestClass();
    removeRequest.InterFace = "EditPCCourseware/DelCourseware?coursewareID=" + ID;
    removeRequest.ExtendParam = null;
    removeRequest.IsPost = true;
    removeRequest.willBegin = function (conn) {
        layer.load(1, {shade: [0.25, '#000']});
    }
    removeRequest.didFailed = function (conn, result) {
        layer.msg('删除失败', { time: 2000 }, function () {
            layer.closeAll();
        });
    }
    removeRequest.didSucc = function (conn, result) {
        layer.closeAll();
        $(".ItemRow[data-id=" + ID + "]").remove();
    }
    removeRequest.get();
}


/*滚动条事件监控  到底部获取下一页，到顶部提取上一页*/
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    var turnPage = function (page) {
        if (TurnPageTimer) clearTimeout(TurnPageTimer);
        TurnPageTimer = setTimeout(function () {
            TurnPageRequest.PageIndex = page;
            if ($(".ItemRow[data-page=" + page + "]").size() == 0) {
                TurnPageRequest.get();
            }
            
        }, 1000);
    };

    if (scrollTop + windowHeight == scrollHeight ) {
        //下一页
        var currt ;
        if (TurnPageRequest.PageIndex == TurnPageRequest.TotalPage-1) return false;
        currt = parseInt($(".ItemRow:last").attr('data-page')) +1;
        TurnPageRequest.PageIndex = currt;
        TurnPageRequest.ActionType = 0;
        turnPage(TurnPageRequest.PageIndex);
        return;
    } else if (scrollTop == 0) {
        //上一页
        if (TurnPageRequest.PageIndex == 0) return false;
        currt = parseInt($(".ItemRow:first").attr('data-page')) -1;
        TurnPageRequest.PageIndex = currt;
        TurnPageRequest.ActionType = 1;
        turnPage(TurnPageRequest.PageIndex);
    }
});
