/**
 * Created by BOT01 on 16/10/19.
 */
(function(){
    /*数据适配*/
    function PPT_CategoryListItem_Adapter (data) {
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
    var PPTListItem = function (itemdb, UserID, PageIndex) {
        console.info(itemdb);

        var str = "";
        str += '<div class="ItemRow" data-id="' + itemdb.CoursewareID + '" data-page=' + PageIndex + '>';
        str += '<div class="ItemRowHeader">';
        str += '<div class="ItemIcon" style="background-image:url(' + itemdb.Author.HeadPhoto + ')"> </div>';
        str += '<div class="ItemDesc">';
        str += '<span> ' + itemdb.Title + '</span>';
        str += '<label>作者：<a href="UserIndex.html?Id=' + itemdb.Author.UniqueID + '">' + itemdb.Author.Nickname + ' </a></label>';
        str += '</div>';
        str += '</div>';
        str += '<div class="ItemRowInner">';
        str += '<p class="ItemText"><a href="PlayView.html?Act=1&PPTId=' + itemdb.CoursewareID + '" target="_blank"> ' + itemdb.Description + '</a></p>';
        str += '<a href="PlayView.html?Act=1&PPTId=' + itemdb.CoursewareID + '" target="_blank"><div class="ItemPoster" style="background-image:url(' + itemdb.PreviewImage + ')" > <link href="'+ itemdb.PreviewImage +'" rel="prefetch" /></div></a>';

        str += '<div class="ItemRowInnerFooter"><div class="ItemShareInfo">';
        str += '<span>' + C_lib.countTime(itemdb.DiffTime, itemdb.CreatedTime) + '  </span>';
        if(itemdb.CategoryID > 0){
        str += '<span><a href="category.html?Id=' + itemdb.CategoryID + '" title="  ' + itemdb.CategoryName + '"> ' + itemdb.CategoryName + '</a></span>';
        }
        str += '</div>';

        if (UserID == itemdb.Author.UniqueID) {
            str += '<div class="ItemEditorBar">';
            str += '<ul><li data-icon="edit" data-id=' + itemdb.CoursewareID + ' data-action="edit"  data-type="' + itemdb.SourceType + '">编辑</li><li data-icon="delete" data-id=' + itemdb.CoursewareID + ' data-action="remove">删除</li></ul>';
            str += '</div>';
        }

        str += '</div></div>';
        str += '</div>';
        return str;

    }


    /*课件列表Request对象*/
    function pullUpAction(){

        setTimeout(function (){
			var maxPageIndex = TurnPageRequest.TotalPage-1;
            if (TurnPageRequest.PageIndex == maxPageIndex) return false;
            var  currt = parseInt($(".ItemRow:last").attr('data-page')) +1;
            TurnPageRequest.PageIndex = Math.min(currt,maxPageIndex);
            TurnPageRequest.ActionType = 0;
            if ($(".ItemRow[data-page=" + currt + "]").size() == 0) {
                TurnPageRequest.get();
            }
        },1000);
    }
    function pullDownAction (){

        setTimeout(function (){
            if (TurnPageRequest.PageIndex == 0) return false;
            currt = parseInt($(".ItemRow:first").attr('data-page')) -1;
            TurnPageRequest.PageIndex = Math.max(0,currt);
            TurnPageRequest.ActionType = 1;
            if ($(".ItemRow[data-page=" + currt + "]").size() == 0) {
                TurnPageRequest.get();
            }
        },1000);
    }
    function onScrollFn(){
        
        if (this.y > 5 && !pullDownEl.className.match('flip')) {
            pullDownEl.className = 'flip';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
            this.minScrollY = 0;
        } else if (this.y < 5 && pullDownEl.className.match('flip')) {
            pullDownEl.className = '';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            this.minScrollY = -pullDownOffset;
        } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
            pullUpEl.className = 'flip';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
            this.maxScrollY = this.maxScrollY;
        } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
            pullUpEl.className = '';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            this.maxScrollY = pullUpOffset;
        }
    }
    function onScrollEnd(){
        
        if (pullDownEl.className.match('flip')) {
            pullDownEl.className = 'loading';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
            pullDownAction();
        } else if (pullUpEl.className.match('flip')) {
            pullUpEl.className = 'loading';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
            pullUpAction();
        }
    }
/*
    function onRefresh(){
        if (pullDownEl.className.match('loading')) {
            pullDownEl.className = '';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
        } else if (pullUpEl.className.match('loading')) {
            pullUpEl.className = '';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
        }
    }
*/
    var pullDownEl,pullDownOffset,pullUpEl,pullUpOffset;
    function initListScroller(){
        pullDownEl = document.getElementById('pullDown');
        pullDownOffset = pullDownEl.offsetHeight;
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;

        indexViewController.contentScroller = new IScroll('#list-inner', {
            probeType:2,
            topOffset: pullDownOffset,
            mouseWheel:true,
			scrollbars: true,//滚动条可见
            fadeScrollbars: true,//滚动条渐隐
            interactiveScrollbars: true,//滚动条可拖动
            shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
            useTransform: true,//CSS转化
            useTransition: true,//CSS过渡
            bounce: true//反弹
        });

        indexViewController.contentScroller.on("scrollEnd",onScrollEnd);
        indexViewController.contentScroller.on("scroll",onScrollFn);
    }

    var TurnPageRequest = new C_lib.request();
    TurnPageRequest.InterFace = 'GetCourseware/GetCoursewareByUserID';
    TurnPageRequest.ContentView = ".scroller";
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
                //9宫格子
                var _UICollectionView = new UICollectionView();
                _UICollectionView.dataSource = ["A","B","C","D","E","F","G","H","I"];
                _UICollectionView.CellView = function(itemdb,index){
                    var strItem = "<div>"+itemdb+"</div>";
                }
                _UICollectionView.init($(TurnPageRequest.ContentView));
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
                list += PPTListItem(itemdb, indexViewController.user.id, conn.PageIndex);
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
            if(indexViewController.contentScroller == null){
                initListScroller();
            }else{
                indexViewController.contentScroller.refresh();
            }
        }
    }

    TurnPageRequest.didFailed = function (conn, err) {
		console.log("===加载失败===");	
		console.info(conn);

        if (conn.InterFace == "Discover/GetDiscoverKind") {
            ////9宫格子
            var _UICollectionView = new UICollectionView();
            _UICollectionView.dataSource = ["nil","nil","nil","nil","nil","nil","nil","nil","nil"];
            _UICollectionView.CellView = function(itemdb,index){
                var strItem = "<div>"+itemdb+"</div>";
            }
            _UICollectionView.init($(TurnPageRequest.ContentView));
            return;
        }

        var list = "<div class='ItemRow' data-type='placeholder'> "+GetResult_Nil_Msg(conn.InterFace)+"</div>";
        $(conn.ContentView).html(list);
        if(indexViewController.contentScroller == null){
            initListScroller();
        }else{
            indexViewController.contentScroller.refresh();
        }
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
        if ($(".ItemRow").size() >= indexViewController.pageSize) {
            var dataPage;
            if (direction == 'top') {
                dataPage = $(".ItemRow:first").attr('data-page');
            } else if (direction == 'bottom') {
                dataPage = $(".ItemRow:last").attr('data-page');
            }
            $(".ItemRow[data-page=" + dataPage + "]").remove();
        }
    }


    var Category = new C_lib.request();
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
            //setTimeout("GetSubCategory(" + result.Data[0].UniqueID + ")", 400);
            GetSubCategory(result.Data[0].UniqueID);

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



    /*更新滚动条*/
    var UpdateScroller = function(scrollId){
        if(indexViewController.masterScroller){
            indexViewController.masterScroller.refresh();
        }else{
            myScroll = new IScroll(scrollId, { mouseWheel: true, scrollbars: true });
        }
    }

    /*更新控制面板*/
    var UpdateTurnPageRequest = function (User) {
        indexViewController.currentUserId = User.id;
        //如果是白名单用户载入创建面板
        if (User.isWhiteListUser) {
            $(".cell_1").fadeIn('fast');
        }
        //更新用户区域面板信息
        $("#MasterRect [data-type=section]").replaceWith(MasterPanel({ face: C_lib.getFilePath + User.face, name: User.name }));

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

    var MasterPanel = function (sender) {
        var _option = $.extend({face:null,name:null}, sender);
        var str = "";
        str += '<div data-type="section">';
        str += '<div id="UserInfoRect">';
        str += '<div class="UserFace" style="background-image:url('+_option.face+')"></div>';
        str += '<label>' + _option.name + '</label>';
        str += '</div>';
        str += '<div id="MenuWallpaper">';
        str += '<div id="MenuScroll">'
        str += '<ul class="MenuTree">';
        str += '<li  data-role="team"> <span>战 队</span></li>';
        str += '<li   data-role="home"> <span>主 页</span></li>';
        str += '<li   data-role="collect"> <span>收 藏</span></li>';
        str += '<li    data-role="find"> <span>发 现</span></li>';
        str += '<li    data-role="piazza"><span>广 场</span></li>';
        /*
         str += '<li data-child="yes" data-state="selected">';
         str += '<span>广场</span>';
         str += '<ul>';
         str += '<li data-child="yes">';
         str += '<span>主题</span>';
         str += '<ul>';
         str += '<li><span>环创</span></li>';
         str += '<li data-child="yes">';
         str += '<span>节日</span>';
         str += '<ul>';
         str += '<li><span>儿童节</span></li>';
         str += '<li><span>植树节</span></li>';
         str += '<li><span>教师节</span></li>';
         str += '</ul>';
         str += '</li>';
         str += '</ul>';
         str += '</li>';
         str += '</ul>';
         str += '</li>';
         */
        str += '</ul>';
        str += '</div>';
        str += '</div>';
        str += '</div>';
        return str;
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
                TurnPageRequest.ExtendParam = { UserID: indexViewController.currentUserId };
                TurnPageRequest.TotalPage = 0;
                TurnPageRequest.PageIndex = 0;
                TurnPageRequest.get();



            } break;
            case 'home': {

                $(TurnPageRequest.ContentView).empty();
                TurnPageRequest.InterFace = "GetCourseware/GetCoursewareByUserID";
                TurnPageRequest.IsPost = true;
                TurnPageRequest.ExtendParam = { UserID: indexViewController.currentUserId };
                TurnPageRequest.TotalPage = 0;
                TurnPageRequest.PageIndex = 0;
                TurnPageRequest.get();

            } break;
            case 'collect': {
                //MyCollect/GetCollect?UserID
                $(TurnPageRequest.ContentView).empty();
                TurnPageRequest.InterFace = "MyCollect/GetCollect";
                TurnPageRequest.IsPost = false;
                TurnPageRequest.ExtendParam = { UserID: indexViewController.currentUserId};
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



    function LoginPanelConfig(sender){
        $("#login-btn").bind("click", function (e) {
            var id = $("#PPTIDTextField input").val();
            var ps = $("#PPTPSTextField input").val();
            if (id.length > 0 && ps.length > 0) {
                indexViewController.user.login(id, ps, sender);
            } else {
                $("#LoginPanel .ui-err").text("PP号与密码不能为空!").attr("data-type", "normal");
            }
        });
    }

    function RemoveCoursewareWithId(ID) {
        var removeRequest = new C_lib.request();
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



    window["indexViewController"] = window["indexViewController"] || {
        pageSize:100,
        currentUserId:null,
        turnPageTimer:null,
        masterScroller:null,
        contentScroller:null,
        user:new C_lib.user(),
        init:function(){
            //1:检查用户登录状况

            if (this.user.check()){
                UpdateTurnPageRequest(this.user);
            }else{
                //加载游客课件列表
                TurnPageRequest.ExtendParam = null;
                TurnPageRequest.PageIndex = 0;
                TurnPageRequest.get();

                //尚未登录//配置登录按钮事件
                LoginPanelConfig(UpdateTurnPageRequest);
            }
            //2:加载 游客或当前用户课件
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



            //4.不监听 touchmove 事件
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        }
    }

})();

/////////////////// 文档准备完毕
$(function(){
    indexViewController.init();
});