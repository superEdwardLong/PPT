// JavaScript Document
var _FilePath = ""; /*http://120.24.156.142:9690*/
var _ApiPath = "/PPTWebApi/Api/";
var _sectionKey = "PPTUserData";





/*收藏*/
function PPTCollection(UserId,Id) {
    alert('收藏课件');
   // MyCollect/SubmintCollect?userID={userID}&coursewareID={coursewareID}
}

/*招募*/
function RecruitTeammate() {
    alert('招募队友');
}

/*申请VIP*/
function VipApply() {
    alert('VIP申请');
}

/*读取下一个课程*/
function PPTNext(currtId) {
    //根据当前ID ，查找下一个课程ID
   // var newId = 0;
   // location.href = "PlayView.html?Act=1&PPTId=" + newId;
    alert('读取下一个课程');
}

/* 用户类 */
var UserClass = function () {
    this.id = 0;
    this.name = null;
    this.face = '/Images/DefaultUserFace.png';
    this.isWhiteListUser = false;
    this.token = null;
    this.gender = null;
}
UserClass.prototype.check = function () {
    //检查登录
    var that = this;
    var _session = sessionStorage.getItem(_sectionKey);
    if (this.token == null) {
        if (_session == null) {
            return false;
        } else {
            _session = JSON.parse(_session);
            that.id = _session.UniqueID;
            that.name = _session.Nickname;
            that.token = _session.Token;
            that.isWhiteListUser = _session.UserKind == 2 ? true : false;
            that.gender = _session.Gender
            if (_session.HeadPhoto) { that.face = _session.HeadPhoto; }

            return true;
        }
    } else {
        return true;
    }
}



UserClass.prototype.login = function (id, password, callback) {
    var that = this;
    $("#LogoPanel .err").text("用户检验中...").attr("data-type", "loader");
    var _request = new RequestClass();
    _request.InterFace = "FrontUser/PCLogin";
    _request.ExtendParam = { ppCode: id, passWord: password };
    _request.didSucc = function (conn, result) {

        if (result.Status == 1) {
            sessionStorage.setItem(_sectionKey, JSON.stringify(result.User));
            that.id = result.User.UniqueID;
            that.name = result.User.Nickname;
            that.token = result.User.Token;
            that.isWhiteListUser = result.User.UserKind == 2 ? true : false;
            that.gender = result.User.Gender
            if (result.User.HeadPhoto) { that.face = result.User.HeadPhoto; }

            if (callback) {
                callback(that);
            }

        } else {
            $("#LogoPanel .ui-err").text("PP号或密码错误!").attr("data-type", "normal");
        }
    }
    _request.didFailed = function (conn, data) {
        $("#LogoPanel .ui-err").text("请求异常!").attr("data-type", "normal");
    }
    _request.get();
}


function RequestClass() {
    this.InterFace = "";/*接口*/
    this.PageSize = 10;/*获取条数*/
    this.PageIndex = 0;/*页码*/
    this.TotalPage = 0;/*总页数*/
    this.ExtendParam = null/*扩展参数*/
    this.IsPost = true;/*传输模式*/
    this.ContentView = null;
    this.Token = null;//如果传入了，则使用它，不传入自动读取
    this.State = 0;//请求状态 { 0：准备OK，1：请求中}
    this.ActionType = 0;//翻页方向{ 0：下一页，1：上一页}
}
RequestClass.prototype.willBegin = function (conn) {
    if (conn.ContentView) {
        UIView.Loading(conn.ContentView);
    }
};/*请求前回调*/
RequestClass.prototype.didSuccBefore = null;/*请求成功且在执行成功回调之前*/
RequestClass.prototype.didSucc = null;/*请求成功回调*/
RequestClass.prototype.didFailed = null;/*请求失败回调*/
RequestClass.prototype.didSuccAfter = null;
RequestClass.prototype.get = function () {
    var that = this;
    if (that.State == 1) return;

    var mode = that.IsPost ? "POST" : "GET";
    var Param = $.extend(true, { PageSize: that.PageSize, PageIndex: that.PageIndex }, that.ExtendParam || {});
    var RequestData;
    if (that.IsPost) {
        RequestData = JSON.stringify(Param);
    } else {
        RequestData = "";
        for (var i in Param) {
            RequestData += i + "=" + Param[i] + "&";
        }
        RequestData = RequestData.slice(0, -1);
    }

    if (that.willBegin !== null) {
        that.willBegin(that);
    }

    /*读取令牌*/
    if (that.Token == null || that.Token.length == 0) {
        var _session = sessionStorage.getItem(_sectionKey);
        if (_session) {
            that.Token = (JSON.parse(_session)).Token;
        }
    }


    var _requestPath = _ApiPath + that.InterFace;

    /*执行请求*/
    $.ajax({
        type: mode,
        dataType: "json",
        contentType: "application/json",
        data: RequestData,
        url: _requestPath,
        headers: { "Token": that.Token },
        success: function (data) {
            /*请求完成,开放请求*/
            that.State = 0;
            var result = eval(data);

            if (result.TotalPage) {
                that.TotalPage = result.TotalPage;
            }
            /*执行成功回调之前*/
            if (result.Status == 1 && that.didSuccBefore) {
                that.didSuccAfter(that, result);
            }
            /*执行成功回调*/
            if (result.Status == 1 && that.didSucc) {
                that.didSucc(that, result);//回调    
            }
            /*执行成功回调之后*/
            if (result.Status == 1 && that.didSuccAfter) {
                that.didSuccAfter(that, result);
            }

            /*执行失败回调*/
            if (result.Status != 1 && that.didFailed) {
                that.didFailed(that, result.Msg);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            /*请求完成,开放请求*/
            that.State = 0;
            if (that.didFailed) {
                that.didFailed(that, '请求异常');
            }
        }
    });
}


function CookieClass() { }
CookieClass.cookieKey = _sectionKey;
CookieClass.set = function (name, value, Days) {
    var str = name + "=" + escape(value);
    if (Days > 0) {
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        str += ";expires=" + exp.toGMTString();
    }
    document.cookie = str;
}
CookieClass.get = function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};
CookieClass.remove = function (name) {
    var cval = this.get(name);

    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

var getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); /*构造一个含有目标参数的正则表达式对象*/
    var r = window.location.search.substr(1).match(reg);  /*匹配目标参数*/
    if (r != null) return unescape(r[2]); return null; /*返回参数值*/
}









//枚举对象
var NSEnum = {
    PageType: {
        UserDefined: 0,//幻灯片
        SoundAndImage: 1,//声音+图像
        SoundAndText: 2,//声音+文字
        VideoOnly: 3,//只有视屏
        RadioWithImage: 4,//图像4选1
        RadioWithText: 5,//文字4选1
        RadioWithTextAndImage: 6,//图文选择题
        RadioWithFill: 7//填空4选择1		    
    },
    //元素类型
    ElementType: {
        Image: 0,
        Text: 1,
        Video: 2,
        Sound: 3
    },
    //文本主题类型
    SubjectType: {
        FillSubject: 0,//填空
        TextSubject: 1,//题目
        ArticleSubject: 2,//文章,带调色板
        OtherSubject: 3 //其他
    },
    //结构类型
    StructureType: {
        PPT: 0,
        Page: 1,
        Text: 2,
        Image: 3,
        Sound: 4,
        Video: 5
    }

}

var PPTStructure = {
    UserId: 0,
    Author: null,
	ViewCount:0,
    Title: null,
    Detail: null,
    FromType: 2,
    CreateTime: null,
    Cover: null,
    CoverId: null,
    BackgroundSoundId: null,
    BackgroundSoundUrl: null,
    PPTId: null
}

var PageStructure = {
    ParentId: 0,//课件ID
    PageId: null,//问题（内页）ID
    PageType: 0,//类型
    PageIndex: 0,//排序
    PageCover: null,//封面背景
    //以下是针对填空题和选择题的
    PageTitle: null,//题目
    PageAnswer: 0,//答案值
    PageAnswerSoundId: 0,//答案配音ID
    PageAnswerSoundUrl: null//答案配音路径

}

var TextSubjectStructure = {
    ParentId: 0,//内页（父节点）ID
    Text: '',//文本内容
    BackgroundColor: null,//文本背景色
    Color: null,//文本颜色
    SoundId: null,//配音ID
    SoundUrl: null,//配音路径
    SubjectId: null,//文本问题ID
    SortIndex: 0,//排序
}

var ImageSubjectStructure = {
    ParentId: 0,//内页（父节点）ID
    ImageId: null,//图片ID
    ImageUrl: null,//图片路径
    SoundId: null,//配音ID
    SoundUrl: null,//配音路径
    Text: '',//描述文本
    SortIndex: 0,//排序
    SubjectId: null//图片问题ID
}

var SoundSubjectStructure = {
    ParentId: 0,//内页（父节点）ID
    SoundId: null,//配音ID
    SoundUrl: null,//配音路径
    SortIndex: 0,//排序
    SubjectId: null//声音问题ID
}

var VideoSubjectStructure = {
    ParentId: 0,//内页（父节点）ID
    VideoId: null,//视频ID
    VideoUrl: 0,//视频路径
    ImageId: null,//预览图ID
    ImageUrl: null,//预览图路径
    SortIndex: 0,//排序
    SubjectId: null//视频问题ID
}

var PPTDataAdapter = function (Data) {
    console.info(Data);


    //单页对象
    var _PPTPageDb = function () {
        this.page = $.extend(true, {}, PageStructure),
        this.images = [],
        this.sounds = [],
        this.videos = [],
        this.texts = []
    }
    //课件对象
    var _PPTDb = {
        basic: $.extend(true, {}, PPTStructure),
        pages: []
    };

    if (Data.CoursewareShort) {
        _PPTDb.basic.BackgroundSoundUrl = Data.CoursewareShort.SoundUrl;
        _PPTDb.basic.Cover = Data.CoursewareShort.PreviewImage;
        _PPTDb.basic.Title = Data.CoursewareShort.Title;
        _PPTDb.basic.Detail = Data.CoursewareShort.Description;
       // _PPTDb.basic.Author = Data.CoursewareShort.Author;
       _PPTDb.basic.PPTId = parseInt(Data.CoursewareShort.UniqueID);

        var _PageItem, _ImageItem, _SoundItem, _VideoItem, _TextItem;
        for (var i = 0; i < Data.CoursewareSubject.length; i++) {
             _PageItem = new _PPTPageDb();
            //页面概况摘要
                _PageItem.page.ParentId = parseInt(Data.CoursewareSubject[i].CoursewareID),                              //缓存数据表，课件主题父ID
                _PageItem.page.PageId = parseInt(Data.CoursewareSubject[i].UniqueID),                            //真实数据库ID（更新操作用到，增加操作不需要）
                _PageItem.page.PageType = Data.CoursewareSubject[i].SubjectType,                            //主题类型：0=>幻灯片  ，     1=>声音+图像   ，    2=>声音+文字     ，   3=>只有视屏   ，     4=>图像4选1     ，   5=>文字4选1    ，    6=>图文2选1  ，      7=>填空4选择1
                _PageItem.page.PageIndex = Data.CoursewareSubject[i].Rank,                          //排序              
                _PageItem.page.PageTitle = Data.CoursewareSubject[i].Subject,                     //问题
                _PageItem.page.PageAnswer = Data.CoursewareSubject[i].Answer,                      //问题答案 
                //_PageItem.page.PageAnswerSoundId = Data.CoursewareSubject[i].AnswerSoundID,           //问题答案配音文件ID
                _PageItem.page.PageAnswerSoundUrl = _FilePath+Data.CoursewareSubject[i].AnswerSoundUrl;       // 问题答案配音文件路径
                _PageItem.page.PageCover = Data.CoursewareSubject[i].PreviewImgUrl;


            //配图信息
            for (var j = 0; j < Data.SubjectImages.length; j++) {
                if (Data.SubjectImages[j].SubjectID == _PageItem.page.PageId) {                   
                    _ImageItem = $.extend(true, {}, ImageSubjectStructure);
                    _ImageItem.ParentId = Data.SubjectImages[j].SubjectID,
                    _ImageItem.ImageId = Data.SubjectImages[j].ImageID,
                    _ImageItem.ImageUrl = _FilePath + Data.SubjectImages[j].Image,
                   // _ImageItem.SoundId= Data.SubjectImages[j].,
                    _ImageItem.SoundUrl = _FilePath + Data.SubjectImages[j].Sound,
                    _ImageItem.Text= Data.SubjectImages[j].Words,
                    _ImageItem.SortIndex= Data.SubjectImages[j].Rank,
                    _ImageItem.SubjectId = Data.SubjectImages[j].UniqueID;
                    _PageItem.images.push(_ImageItem);
                }
            }

            //配音信息
            for (var k = 0; k < Data.SubjectSounds.length; k++) {
                if (Data.SubjectSounds[k].SubjectID == _PageItem.page.PageId) {
                    _SoundItem = $.extend(true, {}, SoundSubjectStructure);                   
                    _SoundItem.ParentId = Data.SubjectSounds[k].SubjectID,
                     _SoundItem.SoundId= Data.SubjectSounds[k].SoundID,
                     _SoundItem.SoundUrl = _FilePath + Data.SubjectSounds[k].SoundPath,
                     _SoundItem.SortIndex = Data.SubjectSounds[k].Rank,
                      _SoundItem.SubjectId= Data.SubjectSounds[k].UniqueID
                    _PageItem.sounds.push(_SoundItem);
                }
            }

            //视频信息
            for (var m = 0; m < Data.SubjectVideo.length; m++) {
                if (Data.SubjectVideo[m].SubjectID == _PageItem.page.PageId) {
                    _VideoItem = $.extend(true, {}, VideoSubjectStructure);
                    _VideoItem.ParentId = Data.SubjectVideo[m].SubjectID,
                    _VideoItem.VideoId = Data.SubjectVideo[m].VideoID,
                    _VideoItem.VideoUrl = _FilePath + Data.SubjectVideo[m].VideoPath,
                   _VideoItem.ImageId = Data.SubjectVideo[m].PreviewImgID,
                   _VideoItem.ImageUrl = Data.SubjectVideo[m].PreviewImgUrl,
                   _VideoItem.SortIndex = 0,
                   _VideoItem.SubjectId = Data.SubjectVideo[m].UniqueID

                    _PageItem.videos.push(_VideoItem);
                }
            }

            //文本信息
            for (var n = 0; n < Data.SubjectWords.length; n++) {
                if (Data.SubjectWords[n].SubjectID == _PageItem.page.PageId) {
                    _TextItem = $.extend(true, {}, TextSubjectStructure);
                    _TextItem.ParentId = Data.SubjectWords[n].SubjectID,
                     _TextItem.SubjectId = Data.SubjectWords[n].UniqueID,
                     _TextItem.Text = Data.SubjectWords[n].Words,
                    _TextItem.BackgroundColor = Data.SubjectWords[n].BGColor,
                     _TextItem.Color = Data.SubjectWords[n].WordsColor,
                    // _TextItem.SoundId = Data.SubjectWords[n].SubjectID,
                     _TextItem.SoundUrl = _FilePath + Data.SubjectWords[n].SoundPath,
                     _TextItem.SortIndex = Data.SubjectWords[n].Rank,

                    _PageItem.texts.push(_TextItem);
                }
            }

            //单页适配完成
            _PPTDb.pages.push(_PageItem);
        }

    } 
    return _PPTDb;
}

//基类对象
var NSObject = function () {
    this.id = 1;
    this.selector = null;
    this.backgroundImage = null;
    this.backgroundColor = null;
    this.backgroundSound = null;
    this.foregroundColor = null;
    this.font = { size: 28 }
    return this;
}

NSObject.prototype.SetBackgroundImage = function (src) {
    var _obj = this.GetSelectorObj();
    if (_obj == null) return;
    _obj.css("background-image", "url(" + src + ")");
}

NSObject.prototype.SetBackgroundSound = function (src, fn) {
    var _obj = this.GetSelectorObj();
    if (_obj == null) return;
    _obj.attr("data-Sound", src);
    if (fn) {
        fn(this);
    }
}
NSObject.prototype.SetBackgroundColor = function (r, g, b, a) {
    var _obj = this.GetSelectorObj();
    if (_obj == null) return;
    var _color = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    _obj.css("background-color", _color);
}
NSObject.prototype.SetForegroundColor = function (r, g, b, a) {
    var _obj = this.GetSelectorObj();
    if (_obj == null) return;
    var _color = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    _obj.css("color", _color);
}
NSObject.prototype.GetSelectorObj = function () {
    var _obj = this.selector;
    if (typeof this.selector == "string") {
        _obj = $(_obj);
    }
    return _obj;
}
NSObject.prototype.Add = function () {
}
NSObject.prototype.Remove = function (fn) {
    var _obj = this.GetSelectorObj();
    if (_obj == null) return;
    _obj.remove();
    if (fn) {
        fn(this);
    }
}
NSObject.prototype.Copy = function (fn) {
    var _obj = this.GetSelectorObj();
    if (_obj == null) return;
    _obj.clone();
    if (fn) {
        fn(this);
    }
}
NSObject.prototype.Mirror = function () {
    var _obj = this.GetSelectorObj();
    if (_obj == null) return;
    _obj.toggleClass("filpX");
}
NSObject.prototype.Init = function () {
    alert("NSObject Init");
}


var SubjectClass = function () {
}

SubjectClass.prototype = new NSObject();
SubjectClass.prototype.dataFormat = function (StructureType) {
    var options, table;
    switch (StructureType) {
        case NSEnum.StructureType.Text: {
            options = $.extend({},TextSubjectStructure);
            table = "t_TextSubject";

        } break;
        case NSEnum.StructureType.Image: {
            options = $.extend({},ImageSubjectStructure);
            table = "t_ImageSubject";

        } break;
        case NSEnum.StructureType.Sound: {
            options = $.extend({},SoundSubjectStructure);
            table = "t_SoundSubject";

        } break;
        case NSEnum.StructureType.Video: {
            options = $.extend({},VideoSubjectStructure);
            table = "t_VideoSubject";
        } break;
    }
    return { TableName: table, Structure: options };
}
/*
        Add(StructureType, DataSource, Fn)
        @StructureType          类型,  
        @DataSource             值, 
        @Fn                             回调
*/
SubjectClass.prototype.Add = function (StructureType, DataSource, Fn) {
    if (DataSource == undefined || DataSource == null) {
        return;
    }
    var that = this;
    var option = that.dataFormat(StructureType);
    var _dataSource = $.extend({},option.Structure, DataSource);

   // console.info(_dataSource);

    window.ZngooDB.insert({
        table: option.TableName,
        dataSource: _dataSource,
        callback: Fn
    });
};

/*
        Update(StructureType, Id, DataSource, Fn)
        @StructureType        类型, 
        @Id                             ID, 
        @DataSource           值, 
        @Fn                           回调
*/
SubjectClass.prototype.Update = function (StructureType, Id, DataSource, Fn) {
    if (DataSource == undefined || DataSource == null || Id == undefined || isNaN(Id) || Id == 0) {
        return;
    }
    var that = this;
    var option = that.dataFormat(StructureType);
    window.ZngooDB.find({
        table: option.TableName, filter: parseInt(Id), callback: function (item) {
            //找到对应项目，更新相应的属性
            for (var i in DataSource) {
                if (DataSource[i]) item[i] = DataSource[i];
            }
            //保存{ table: null, dataSource:null, callback: null }
            window.ZngooDB.update({ table: option.TableName, dataSource: item, callback: Fn });
        }
    });
};

SubjectClass.prototype.Remove = function (StructureType, Id, Fn) {
    var that = this;
    var option = that.dataFormat(StructureType);
    window.ZngooDB.delete({ table: option.TableName, filter: { key: "id", value: Id }, callback: Fn });
};



var PageClass = function () {

}
PageClass.prototype = new NSObject();
PageClass.prototype.Add = function (PageType, ParentId, PageIndex, Fn) {
    var that = this;
    var _dataSource = $.extend({},PageStructure, { ParentId: ParentId, PageType: PageType, PageIndex: PageIndex });

    window.ZngooDB.insert({
        table: 't_Page',
        dataSource: _dataSource,
        callback: Fn
    });
};
PageClass.prototype.AddWithData = function (Data, Fn) {
    var that = this;
    window.ZngooDB.insert({
        table: 't_Page',
        dataSource: Data,
        callback: Fn
    });
}


PageClass.prototype.Remove = function (Id, Fn) {
    /*  删除 
        t_Page ： Id, 
        t_TextSubject ：ParentId , 
        t_VideoSubject ： , 
        t_SoundSubject ：, 
        t_ImageSubject：

        { table: null, filter: null, callback: null }
    */
    window.ZngooDB.delete({ table: 't_TextSubject', filter: { key: "ParentId", value: Id } });
    window.ZngooDB.delete({ table: 't_VideoSubject', filter: { key: "ParentId", value: Id } });
    window.ZngooDB.delete({ table: 't_SoundSubject', filter: { key: "ParentId", value: Id } });
    window.ZngooDB.delete({ table: 't_ImageSubject', filter: { key: "ParentId", value: Id } });
    window.ZngooDB.delete({ table: 't_Page', filter: { key: "id", value: Id }, callback: Fn });
}
PageClass.prototype.Update = function (Id, DataSource, Fn) {
    window.ZngooDB.find({
        table: 't_Page', filter: parseInt(Id), callback: function (item) {
            /*
            for (var i in DataSource) {
                if (DataSource[i]) item[i] = DataSource[i];
            }*/
			var _newItem = $.extend({},item,DataSource);
			
            //保存
            window.ZngooDB.update({ table: 't_Page', dataSource: _newItem, callback: Fn });
        }
    });
}
PageClass.prototype.GetData = function (sender) {
    /*
        @1:request page data
        @2:request subject data of page
    */

    var resultArr = {
        page: null,
        images: [],
        sounds: [],
        videos: [],
        texts: []
    };

    var _Progress = 0;
    var CheckProgress = function () {
        _Progress += 1;
        if (_Progress == 5 && sender.callback) {
            sender.callback(resultArr);
        }
    }

    var _PageOption = $.extend({ table: "t_Page", filter: null, callback: null }, sender);
    _PageOption.callback = function (data) {
        resultArr.page = data;
        //检查进度
        CheckProgress();

        //@2
        var _SubjectOption_1 = {
            table: "t_TextSubject",
            filter: { key: "ParentId", value: data.id },
            callback: function (subjectData) {
                resultArr.texts = subjectData;
                CheckProgress();
            }
        };

        var _SubjectOption_2 = {
            table: "t_ImageSubject",
            filter: { key: "ParentId", value: data.id },
            callback: function (subjectData) {
                resultArr.images = subjectData;
                CheckProgress();
            }
        }

        var _SubjectOption_3 = {
            table: "t_SoundSubject",
            filter: { key: "ParentId", value: data.id },
            callback: function (subjectData) {
                resultArr.sounds = subjectData;
                CheckProgress();
            }
        }

        var _SubjectOption_4 = {
            table: "t_VideoSubject",
            filter: { key: "ParentId", value: data.id },
            callback: function (subjectData) {
                resultArr.videos = subjectData;
                CheckProgress();
            }
        }

        window.ZngooDB.findAll(_SubjectOption_1);
        window.ZngooDB.findAll(_SubjectOption_2);
        window.ZngooDB.findAll(_SubjectOption_3);
        window.ZngooDB.findAll(_SubjectOption_4);
    }
    //@1
    window.ZngooDB.find(_PageOption);
}
PageClass.prototype.Copy = function (Id, PageIndex, Fn) {
    var that = this;

    var option = {
        filter: Id,
        callback: function (PageItemDb) {
            delete PageItemDb.page.id;
            PageItemDb.page.PageIndex = PageIndex;

            window.ZngooDB.insert({
                table: 't_Page',
                dataSource: PageItemDb.page,
                callback: function (NewId) {
                    //事务处理
                    function Transactions(ParentId, Items,Type) {
                        var itemUpdate = function (i) {
                            if (i >= Items.length) {return;}
                            delete Items[i].id;
                            Items[i].ParentId = ParentId;
                            that.Subject.Add(Type,Items[i], function (elemId) {
                                Current++;
                                Items[i].id = elemId;
                                if (Current == RunTime && Fn) {
                                    //最终回调方法
                                    Fn(PageItemDb);
                                } else {
                                    i++;
                                    itemUpdate(i);
                                }
                            });
                        }

                        itemUpdate(0);
                    }

                    //各项数据整理
                    var RunTime, Current;
                    RunTime = Current = 0;
                    PageItemDb.page.id = NewId;
                    RunTime = PageItemDb.images.length +
                                        PageItemDb.sounds.length +
                                        PageItemDb.videos.length +
                                        PageItemDb.texts.length;

                    if (PageItemDb.images.length > 0) {
                        Transactions( NewId, PageItemDb.images,NSEnum.StructureType.Image);
                    }
                    if (PageItemDb.sounds.length > 0) {
                        Transactions( NewId, PageItemDb.sounds,NSEnum.StructureType.Sound);
                    }
                    if (PageItemDb.videos.length > 0) {
                        Transactions(NewId, PageItemDb.videos,NSEnum.StructureType.Video);
                    }
                    if (PageItemDb.texts.length > 0) {
                        Transactions( NewId, PageItemDb.texts,NSEnum.StructureType.Text);
                    }

                }
            });
        }
    }

    this.GetData(option);
}

PageClass.prototype.Subject = new SubjectClass();


var PPTClass = function () {
    this.PageCount = 0;
    this.UIPlayButton = null;
}

PPTClass.prototype = new NSObject();

PPTClass.prototype.Add = function (UserId,DataSource,CallbackFn) {
    var that = this;
    var today = new Date();
    var time = today.getFullYear() + "-"
        + (today.getMonth() + 1) + "-"
        + today.getDate() + " "
        + today.getHours() + ":"
        + today.getMinutes() + ":"
        + today.getSeconds();
  
    if (DataSource == undefined) {
        DataSource = $.extend({},PPTStructure, { UserId: UserId, CreateTime: time });
    }
    
    if (CallbackFn == undefined) {
        CallbackFn = function (id) {
            that.id = id;
            if (that.DidInit) {
                that.DidInit();
            }
        }
    }

    window.ZngooDB.insert({
        table: 't_PPT',
        dataSource: DataSource,
        callback: CallbackFn
    });
}


/*
DrawViewWithImage(@CanvasId, @ImgSrc, @Index,@type);
@CanvasId : string       画布ID
@ImgSrc ：string         图片路径
@Index： int            选项索引
@sender：object    其他配置信息
*/
PPTClass.prototype.DrawImage = function (CanvasId, ImgSrc, Index, sender) {
    var _w, _h, _x, _y;
    var _option = { size: { width: null, height: null }, position: { x: null, y: null }, transform: null, callback: null };
    var _canvas = document.getElementById(CanvasId);
    var _cw = _canvas.width;
    var _ch = _canvas.height;
    var _space = 8; //间隔
    _x = _y = 0;

    if (typeof (Index) == "number") {
        _w = _cw / 2;
        _h = _ch / 2;
        switch (Index) {
            case 0: {
                _x = _y = 0;
            } break;
            case 1: {
                _x = _w;
                _y = 0;
            } break;
            case 2: {
                _x = 0;
                _y = _h;
            } break;
            case 3: {
                _x = _w;
                _y = _h;
            } break;
        }
    }

    if (sender) {
        _option = $.extend(true, _option, sender);

        if (typeof _option.size.width == "string") {
            if (_option.size.width.indexOf("%") > 0) {
                _w = _cw * parseInt(_option.size.width.slice(0, -1)) / 100;
            } else {
                _w = parseInt(_option.size.width);
            }
        } else if (isNaN(_option.size.width) == false) {
            _w = _option.size.width;
        }

        if (typeof _option.size.height == "string") {
            if (_option.size.height.indexOf("%") > 0) {
                _h = _ch * parseInt(_option.size.height.slice(0, -1)) / 100;
            } else {
                _h = parseInt(_option.size.height);
            }
        } else if (isNaN(_option.size.height) == false) {
            _h = _option.size.height;
        }

        if (isNaN(_option.position.x) && typeof _option.position.x == "string") {
            if (_option.position.x == "right") {
                _x = _cw - _w - _space;
            } else if (_option.position.x == "left") {
                _x = _space;
            }
        } else {
            _x = parseInt(_option.position.x);
        }

        if (isNaN(_option.position.y) && typeof _option.position.y == "string") {
            if (_option.position.y == "bottom") {
                _y = _ch - _h - _space;
            } else if (_option.position.y == "top") {
                _y = _space;
            }
        } else {
            _y = parseInt(_option.position.y);
        }
    }

    if (_w == undefined) _w = _cw;
    if (_h == undefined) _h = _ch;

    var ctx = _canvas.getContext('2d');
    var image = new Image();
    image.src = ImgSrc;
    image.onload = function () {
        ctx.drawImage(image, _x, _y, _w, _h);
        if (_option.callback) {
            _option.callback(ctx);
        }
    }
}


PPTClass.prototype.DrawText = function (CanvasId, sender) {
    //获取字符串的真实长度（字节长度）
    function getTrueLength(str) {
        var len = str.length, truelen = 0;
        for (var x = 0; x < len; x++) {
            if (str.charCodeAt(x) > 128) {
                truelen += 2;//中文字符
            } else {
                truelen += 1;//英文字符
            }
        }
        return truelen;
    }
    //按字节长度截取字符串，返回substr截取位置
    function cutString(str, leng) {
        var len = str.length, tlen = len, nlen = 0;
        for (var x = 0; x < len; x++) {
            if (str.charCodeAt(x) > 128) {
                if (nlen + 2 < leng) {
                    nlen += 2;
                } else {
                    tlen = x;
                    break;
                }
            } else {
                if (nlen + 1 < leng) {
                    nlen += 1;
                } else {
                    tlen = x;
                    break;
                }
            }
        }
        return tlen;
    }

    function getColor(color, defaultColor) {
        var _color = defaultColor;
        if (color && (color.indexOf("#") != -1 || color.indexOf("rgba") != -1)) {
            _color = color;
        } else if (color && color.indexOf(",") != -1) {
            _color = "rgba(" + color + ")"
        }
        return _color;
    }

    var _defaultOption = $.extend(true, {
        IsBlockText: false,
        Text: '',
        Color: null,
        BackgroundColor: null,
        BackgroundImage: null,
        Position: { x: 0, y: 0 },
        Size: { width: 0, height: 0 },
        roate: null,
        Bar: {
            Color: "#FFFFFF",
            Position: { x: 0, y: "bottom" },
            BackgroundColor: "rgba(0,0,0,0.7)",
            Text: '',
            Font: null
        }
    }, sender);

    var _TextMaxWidth, _TextOffsetX, _TextOffsetY, _FontSize;
    var _MaxFontSize = 60;
    var _MinFontSize = 20;

    var _canvas = document.getElementById(CanvasId);
    var _Color = getColor(_defaultOption.Color, "#FFFFFF");
    var _BackgroundColor = getColor(_defaultOption.BackgroundColor, "#99cc66");


    var cxt = _canvas.getContext("2d");
    var _words = getTrueLength(_defaultOption.Text) / 2;
    var _row = Math.ceil(_words / 14);
    var _strLocation;
    if (_row > 1) {
        _FontSize = _MinFontSize;
        _strLocation = 28;
    } else {
        if (_words <= 4) {
            _FontSize = _MaxFontSize;
            _strLocation = 10;
        } else {
            _FontSize = Math.min(parseInt((_canvas.clientWidth - 16) / _words), _MaxFontSize);
            _strLocation = _words * 2 + 2;
        }
    }


    function darw() {
        cxt.textBaseline = 'top';

        if (_defaultOption.Text.length > 0) {
            cxt.fillStyle = _Color;
            cxt.font = "bold " + _FontSize + "px  Arial";
            for (var i = 1; getTrueLength(_defaultOption.Text) > 0; i++) {
                var tl = cutString(_defaultOption.Text, _strLocation);//行末字符定位
                cxt.fillText(_defaultOption.Text.substr(0, tl).replace(/^\s+|\s+$/, ""), _TextOffsetX, (i - 1) * _FontSize * 1.3 + _TextOffsetY);
                _defaultOption.Text = _defaultOption.Text.substr(tl);//更新源字符串
            }
        }

        if (_defaultOption.Bar && _defaultOption.Bar.Text.length > 0) {
            var _barHeight = _canvas.clientHeight * 0.25;
            var _barY = _canvas.height - _barHeight;
            cxt.fillStyle = _defaultOption.Bar.BackgroundColor;
            cxt.fillRect(0, _barY, _canvas.width, _barHeight);

            cxt.font = _defaultOption.Bar.Font;
            cxt.fillStyle = _defaultOption.Bar.Color;

            var _barTextOffsetX = (_canvas.width - cxt.measureText(_defaultOption.Bar.Text).width) / 2;
            cxt.fillText(_defaultOption.Bar.Text, _barTextOffsetX, _barY + 3);
        }
    }



    //不是块级元素,背景色作为整个画布背景色
    if (!_defaultOption.IsBlockText) {
        _TextOffsetX = _defaultOption.Position.x;
        _TextOffsetY = (_canvas.clientHeight - _FontSize * _row * 1.3) / 2;

        if (_defaultOption.BackgroundImage) {
            var image = new Image();
            image.src = _defaultOption.BackgroundImage;
            image.onload = function () {
                cxt.drawImage(image, 0, 0, _canvas.width, _canvas.height);
                darw();
            }

        } else {
            cxt.fillStyle = _BackgroundColor;
            cxt.fillRect(0, 0, _canvas.width, _canvas.height);
            darw();
        }

    } else {

        _TextOffsetX = _defaultOption.Position.x + 8;
        _TextOffsetY = _defaultOption.Position.y + 8;
        cxt.beginPath();
        cxt.moveTo(_defaultOption.Position.x, _defaultOption.Position.y);
        cxt.lineTo(_defaultOption.Position.x + _defaultOption.Size.width, _defaultOption.Position.y);
        cxt.lineWidth = _defaultOption.Size.height;
        cxt.strokeStyle = _BackgroundColor;
        cxt.lineCap = 'round';
        cxt.stroke();
        darw();
    }

}


//圆角矩形
//x坐标，y坐标，宽度，高度，圆角半径
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    // this.arcTo(x+r, y);
    this.closePath();
    return this;
}

PPTClass.prototype.DrawOption = function (Options, CanvasId) {
    var that = this;
    var _defaultOption = $.extend(true, {
        title: null,
        color: "rgba(255,255,255,1)",
        backgroundColor: "rgba(154,205,50,1)",
        backgroundImage: null,
        font: "normal  20px  微软雅黑",
        options: {
            direction: "v",
            space: 3,
            color: "rgba(30,30,30,1)",
            backgroundColor: "rgba(255,255,255,1)",
            font: "normal 14px Arial",
            data: null
        }
    }, Options);


    if (_defaultOption.options.data instanceof Array) {
        var _canvas = document.getElementById(CanvasId);
        var _ctx = _canvas.getContext("2d");
        var _beginPosition = { x: 0, y: 0 };
        var _size = { w: 0, h: 40 }
        var _space = _defaultOption.options.space;
        var _componetHeight;


        if (_defaultOption.backgroundImage && _defaultOption.backgroundImage.length > 0) {
            var backgroundImage = new Image();
            backgroundImage.src = _defaultOption.backgroundImage;
            backgroundImage.onload = function () {
                _ctx.drawImage(backgroundImage, 0, 0, _canvas.width, _canvas.height);
                draw();
            }

        } else if (_defaultOption.backgroundColor && _defaultOption.backgroundColor.length > 0) {
            _ctx.fillStyle = _defaultOption.backgroundColor;
            _ctx.fillRect(0, 0, _canvas.width, _canvas.height);
            draw();
        }

        function draw() {
            _ctx.textBaseline = 'top';
            _ctx.font = _defaultOption.options.font;
            if (typeof _defaultOption.options.direction == "string" && _defaultOption.options.direction.toLowerCase() == "v") {
                _componetHeight = _canvas.clientHeight * 0.7;
                _size.w = _canvas.width - _space * 2;
                _size.h = (_componetHeight - (_defaultOption.options.data.length - 1) * _space) / _defaultOption.options.data.length;

                _beginPosition.y = _canvas.height - _componetHeight - _space;
                var _itemY, _itemX, _itemPadding;
                for (var i = 0; i < _defaultOption.options.data.length; i++) {
                    //绘制圆角哦
                    _ctx.fillStyle = _defaultOption.options.backgroundColor;
                    _itemY = _beginPosition.y + parseInt(_defaultOption.options.data[i].SortIndex) * _space + parseInt(_defaultOption.options.data[i].SortIndex) * _size.h;
                    _itemX = _beginPosition.x + _space;

                    _ctx.roundRect(_itemX, _itemY, _size.w, _size.h, 4).fill();

                    //配置声音按钮
                    if (_defaultOption.options.data[i].SoundUrl && _defaultOption.options.data[i].SoundUrl.length > 0) {
                        _ctx.drawImage(that.UIPlayButton, _itemX + _size.w - _size.h, _itemY + _size.h * 0.1, _size.h * 0.8, _size.h * 0.8);
                    }


                    //绘制文本 
                    _itemPadding = (_size.w - _ctx.measureText(_defaultOption.options.data[i].Text).width) / 2;
                    _ctx.fillStyle = _defaultOption.options.color;
                    _ctx.measureText(_defaultOption.options.data[i].Text);
                    _ctx.fillText(_defaultOption.options.data[i].Text, _beginPosition.x + _space + _itemPadding, _itemY + 2);
                }


            } else if (typeof _defaultOption.options.direction == "string" && _defaultOption.options.direction.toLowerCase() == "h") {
                _componetHeight = _canvas.clientHeight * 0.2;
                _beginPosition.y = _canvas.height - _componetHeight - _space;

                _size.w = (_canvas.width - (_defaultOption.options.data.length + 1) * _space) / _defaultOption.options.data.length;
                _size.h = _componetHeight;

                for (var i = 0; i < _defaultOption.options.data.length; i++) {
                    //绘制圆角
                    _ctx.fillStyle = _defaultOption.options.backgroundColor;
                    _itemX = _beginPosition.x + parseInt(_defaultOption.options.data[i].SortIndex) * _space + parseInt(_defaultOption.options.data[i].SortIndex) * _size.w + _space;
                    _ctx.roundRect(_itemX, _beginPosition.y, _size.w, _size.h, 4).fill();

                    //绘制文本 
                    _itemPadding = (_size.w - _ctx.measureText(_defaultOption.options.data[i].Text).width) / 2;
                    _ctx.fillStyle = _defaultOption.options.color;
                    _ctx.fillText(_defaultOption.options.data[i].Text, _itemX + _itemPadding, _beginPosition.y + 6);
                }

            }
        }
        //绘制题目
        if (_defaultOption.title && _defaultOption.title.length > 0) {

            var _TitleOffsetX = (_canvas.clientWidth - _ctx.measureText(_defaultOption.title).width) / 2;
            var _TitleOffsetY = (_beginPosition.y - 24) / 2;
            _ctx.fillStyle = _defaultOption.color;
            _ctx.font = _defaultOption.font;
            _ctx.fillText(_defaultOption.title, _TitleOffsetX, _TitleOffsetY);

        }
    }



}

PPTClass.prototype.LoadPrevView = function (PageId) {
    var that = this;
    that.Page.GetData({
        filter: PageId,
        callback: function (db) {
            //清除画布
            var _CanvasId = "canvas_" + PageId;
            var c = document.getElementById(_CanvasId);
            var ctx = c.getContext("2d");           
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.fillStyle = "#7fcd21";
            ctx.fillRect(0, 0, c.width, c.height);

            switch (db.page.PageType) {
                //填空
                case NSEnum.PageType.RadioWithFill: {
                    that.DrawOption({
                        title: db.page.PageTitle.replace("_", "____"),
                        color: "rgba(255,255,255,1)",
                        backgroundColor: "rgba(154,205,50,1)",
                        font: "normal  20px  微软雅黑",
                        options: {
                            direction: "h",
                            space: 3,
                            color: "rgba(111,36,189,1)",
                            backgroundColor: "rgba(255,246,1,1)",
                            font: "normal 14px Arial",
                            data: db.texts
                        }
                    }, _CanvasId);
                } break;

                    //图片选择题
                case NSEnum.PageType.RadioWithImage: {
                    if (db.images.length > 0) {
                        for (var i = 0; i < Math.min(4, db.images.length) ; i++) {
                            that.DrawImage(_CanvasId, db.images[i].ImageUrl, parseInt(db.images[i].SortIndex));
                        }
                    }

                } break;

                    //文本单选
                case NSEnum.PageType.RadioWithText: {

                    that.DrawOption({
                        title: db.page.PageTitle,
                        color: "rgba(255,255,255,1)",
                        backgroundColor: "rgba(154,205,50,1)",
                        font: "normal  20px  微软雅黑",
                        options: {
                            direction: "v",
                            space: 3,
                            color: "rgba(30,30,30,1)",
                            backgroundColor: "rgba(255,255,255,1)",
                            font: "normal 14px Arial",
                            data: db.texts
                        }
                    }, _CanvasId);

                } break;

                    //图文单选（图片为背景）
                case NSEnum.PageType.RadioWithTextAndImage: {
                    var _backgroundImage = null;
                    if (db.images.length > 0) {
                        _backgroundImage = db.images[0].ImageUrl;
                    }

                    that.DrawOption({
                        backgroundImage: _backgroundImage,
                        options: {
                            direction: "h",
                            space: 3,
                            color: "rgba(30,30,30,1)",
                            backgroundColor: "rgba(255,255,255,1)",
                            font: "normal 14px Arial",
                            data: db.texts
                        }
                    }, _CanvasId);

                } break;

                    //声音+图片（图片为背景）
                case NSEnum.PageType.SoundAndImage: {
                    var _background = null, _text = '';
                    if (db.images.length > 0) {
                        _background = db.images[0].ImageUrl;
                    }
                    if (db.texts.length > 0) {
                        _text = db.texts[0].Text;
                    }

                    that.DrawText(_CanvasId, {
                        IsBlockText: false,
                        Color: "#FFFFFF",
                        BackgroundColor: "#99cc00",
                        BackgroundImage: _background,
                        Position: { x: 20, y: 20 },
                        Bar: {
                            Color: "#FFFFFF",
                            Position: { x: 0, y: "bottom" },
                            BackgroundColor: "rgba(0,0,0,0.7)",
                            Text: _text,
                            Font: "normal  20px  微软雅黑",
                        }
                    })


                } break;

                    //声音+文字
                case NSEnum.PageType.SoundAndText: {
                    
                    //文本
                    if (db.texts.length > 0) {
                        that.DrawText(_CanvasId, {
                            IsBlockText: false,
                            Text: db.texts[0].Text,
                            Color: db.texts[0].Color,
                            BackgroundColor: db.texts[0].BackgroundColor,
                            Position: { x: 20, y: 20 }
                        });
                    } else {

                    }

                    //图标
                    if (db.images.length > 0) {
                        that.DrawImage(_CanvasId, db.images[0].ImageUrl, null, { size: { width: 42, height: 42 }, position: { x: "left", y: "bottom" } });
                    }

                } break;

                    //视频
                case NSEnum.PageType.VideoOnly: {
                    if (db.videos.length > 0 && db.videos[0].ImageUrl) {
                        that.DrawImage(_CanvasId, db.videos[0].ImageUrl);
                    }

                } break;

                    //自定义
                case NSEnum.PageType.UserDefined: {
					
                } break;
            }
        }
    });
}
PPTClass.prototype.Load = function () {
    var that = this;
    window.ZngooDB.findAll({
        table: 't_Page', filter: { key: "ParentId", value: that.id },sort:'PageIndex', callback: function (pages) {
            that.PageCount = pages.length;

            var item;
            for (var i = 0; i < pages.length; i++) {
                item = "";
                item = UIView.PrevViewItem({
                    type: pages[i].PageType,
                    id: pages[i].id                   
                });
                $("#sortable").append(item);
                that.LoadPrevView(pages[i].id);
            }

            $("#sortable .preview-item:first").trigger("click");

            if (that.DidInit) {
                that.DidInit();
            }
        }
    });
}

PPTClass.prototype.Init = function (UserId) {
    var that = this;
    var UIPlayImage = new Image();
    UIPlayImage.src = "/Images/ui-button-play.png";   
    that.UIPlayButton = UIPlayImage;

    window.ZngooDB.find({
        table: 't_PPT', filter: that.id, callback: function (item) {
            if (item == undefined || item == null) {                               
                that.Add(UserId);
            } else {                
                that.id = item.id;
                that.Load();
            }
        }
    });
}


PPTClass.prototype.InitWithData = function (data) {
    var that = this;
    that.Add(data.basic.UserId, data.basic, function (id) {
        that.id = id;        
        var _PageCount = data.pages.length;
        var _RunTime = 0;
        var _SumRunTime = 0;
        for (var k= 0;k < _PageCount; k++) {
            _SumRunTime += data.pages[k].images.length;
            _SumRunTime += data.pages[k].sounds.length;
            _SumRunTime += data.pages[k].texts.length;
            _SumRunTime += data.pages[k].videos.length;
        }


        var MakeElement = function (type, elems,parentId) {
            var _elemItem;
            for (var j = 0; j < elems.length; j++) {
                _elemItem = elems[j];
                _elemItem.ParentId = parentId;
                that.Page.Subject.Add(type, _elemItem, function (itemId) {
                    _RunTime++;
                    if (_RunTime == _SumRunTime) {                       
                        that.Load();
                    }
                });
            }
        }

        var MakePage = function (i) {
            var _PageItem = data.pages[i].page;
            _PageItem.ParentId = id;
            that.Page.AddWithData(_PageItem, function (PageId) {
                
                if (data.pages[i].images.length > 0) {
                    MakeElement(NSEnum.StructureType.Image, data.pages[i].images, PageId);
                }
                //声音
                if (data.pages[i].sounds.length > 0) {
                    MakeElement(NSEnum.StructureType.Sound, data.pages[i].sounds, PageId);
                }
                //文本
                if (data.pages[i].texts.length > 0) {
                    MakeElement(NSEnum.StructureType.Text, data.pages[i].texts, PageId);
                }
                //视频
                if (data.pages[i].videos.length > 0) {
                    MakeElement(NSEnum.StructureType.Video, data.pages[i].videos, PageId);
                }

                if (i < _PageCount-1) {
                    i++
                    MakePage(i);
                }
            });
        }

        MakePage(0);
    });
}

PPTClass.prototype.GetInfo = function (Id, Fn) {
    window.ZngooDB.find({
        table: 't_PPT',
        filter: Id,
        callback: function (item) {
            if (Fn) { Fn(item); }
        }
    });
}

PPTClass.prototype.GetData = function (Fn) {
    var _Pages = [];
    var that = this;
    var GetPageData = function (Arr, Ind) {
        //循环完毕，执行回调
        if (Ind == Arr.length && Fn) {
            Fn(_Pages);
            return;
        }

        //读取每一页的数据
        that.Page.GetData({
            filter: Arr[Ind].id,
            callback: function (data) {
                _Pages.push(data);
                Ind++;
                GetPageData(Arr, Ind);
            }
        });
    }

   
    //读取所有页面的数据
    window.ZngooDB.findAll({
        table: 't_Page', filter: { key: "ParentId", value: that.id }, sort: 'PageIndex', callback: function (pages) {
            if (pages) {
                GetPageData(pages, 0);
            }
        }
    });
}

PPTClass.prototype.Update = function (Id, DataSource, Fn) {
    window.ZngooDB.find({
        table: 't_PPT', filter: parseInt(Id), callback: function (item) {
            //找到对应项目，更新相应的属性
            for (var i in DataSource) {
                if (DataSource[i]) item[i] = DataSource[i];
            }
            //保存
            window.ZngooDB.update({ table: 't_PPT', dataSource: item, callback: Fn });
        }
    });
}
PPTClass.prototype.Clear = function (Tables, Fn) {
    //清理IndexDB
    var _ClearCount = 0;
    var _Tab;
    for (var i = 0; i < Tables.length; i++) {
        _Tab = $.extend({ TableName: null }, Tables[i]);
        window.ZngooDB.clear({
            table: _Tab.TableName,
            callback: function () {
                _ClearCount++;
                if (_ClearCount == Tables.length && Fn) {
                    //清理完成
                    Fn();
                }
            }
        });
    }
}
PPTClass.prototype.DidInit = function () { };
PPTClass.prototype.AddHistoryColor = function (color) {
    var colors = localStorage.getItem("History_Color");
    if (colors) {
        localStorage.setItem("History_Color",color+"|"+colors);
    } else {
        localStorage.setItem("History_Color", color);
    }
}


PPTClass.prototype.Page = new PageClass();
