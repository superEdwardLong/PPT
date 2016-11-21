/**
 * Created by BOT01 on 16/10/19.
 */
(function(){
    var _FilePath = ""; /*http://120.24.156.142:9690*/
    var _ApiPath = "PPTWebApi/Api/";
    var _sectionKey = "PPTUserData";

    /* 用户类
    * {"UniqueID":11,"PPCode":"123456","WechatNickname":null,"Nickname":"尹玉东,,,","HeadPhoto":"/ResourceDirectory/HeadPhoto//131129552783304615.png","Password":7317,"Birthdate":"2009-05-05T00:00:00","IsSystemManager":true,"UserKind":2,"HomePageImage":null,"WarTeamName":null,"OpenID":null,"IsDeleted":null,"CreateDate":"2016-05-13T11:22:17.63","PasswordCreateDate":"2016-11-04T14:56:02.487","IsEnable":null,"Province":null,"City":null,"TerminalKind":null,"Gender":null,"ReadLevel":1,"Age":null,"BabyNickName":"","BabyPhoto":"/ResourceDirectory/HeadPhoto//temp_headimg.jpg","Phone":null,"BabyAge":null,"Token":"Liz2igUTuVKZyzaMVFQVJ8LRpRa9tTX96vJ63xiEPfgv/GzYf5dwjfUlQryuvqc+EucxSwDd3g+aytbulpAGf98X2Dxc/OUF"}
    * */
    var UserClass = function () {
        this.id = 0;
        this.name = null;
        this.face = '/Images/DefaultUserFace.png';
        this.isWhiteListUser = false;
        this.token = null;
        this.gender = null;
    }
    UserClass.prototype.check = function () {
        /*------------ 免登录数据 beging ------------------*/
        var mySelf = {
            "UniqueID":11,
            "PPCode":"123456",
            "WechatNickname":null,
            "Nickname":"尹玉东,,,",
            "HeadPhoto":"/ResourceDirectory/HeadPhoto//131129552783304615.png",
            "Password":7317,
            "Birthdate":"2009-05-05T00:00:00",
            "IsSystemManager":true,
            "UserKind":2,
            "HomePageImage":null,
            "WarTeamName":null,
            "OpenID":null,
            "IsDeleted":null,
            "CreateDate":"2016-05-13T11:22:17.63",
            "PasswordCreateDate":"2016-11-04T14:56:02.487",
            "IsEnable":null,
            "Province":null,
            "City":null,
            "TerminalKind":null,
            "Gender":null,
            "ReadLevel":1,
            "Age":null,
            "BabyNickName":"",
            "BabyPhoto":"/ResourceDirectory/HeadPhoto//temp_headimg.jpg",
            "Phone":null,
            "BabyAge":null,
            "Token":"Liz2igUTuVKZyzaMVFQVJ8LRpRa9tTX96vJ63xiEPfgv/GzYf5dwjfUlQryuvqc+EucxSwDd3g+aytbulpAGf98X2Dxc/OUF"
        };
        sessionStorage.setItem(_sectionKey, JSON.stringify(mySelf));
        /*------------ 免登录数据 end ------------------*/



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
        $("#LoginPanel .err").text("用户检验中...").attr("data-type", "loader");
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
                $("#LoginPanel .ui-err").text("PP号或密码错误!").attr("data-type", "normal");
            }
        }
        _request.didFailed = function (conn, data) {
            $("#LoginPanel .ui-err").text("请求异常!").attr("data-type", "normal");
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
    RequestClass.prototype.willBegin = null ;/*请求前回调*/
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


    var CountTime = function (dateTime, CreateTime) {
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

    window["C_lib"]=window["C_lib"]||{
            countTime:CountTime,
            setFilePath:function(path){
                _FilePath = path;
            },
            getFilePath:_FilePath,
            setApiPath:function(path){
                _ApiPath = path;
            },
            getApiPath : _ApiPath,
            setSessionKey:function(key){
                _sectionKey = key;
            },
            getSessionKey : _sectionKey,
            getUrlParam:function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); /*构造一个含有目标参数的正则表达式对象*/
                var r = window.location.search.substr(1).match(reg);  /*匹配目标参数*/
                if (r != null) return unescape(r[2]); return null; /*返回参数值*/
            },
            user:UserClass,
            request:RequestClass,
            cookie:CookieClass,
            recruitTeammate:function(){
                //招募
            },
            vipApply:function(UserId){
                //申请VIP
            }
        }
})();