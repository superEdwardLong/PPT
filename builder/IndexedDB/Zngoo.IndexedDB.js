(function(){
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || null;
    var _dbName = "PPT_IndexedDB";

    /*创建数据库表*/
    function CreateTables(tableArr,callback){
        if(indexedDB == null){
            alert("不支持IndexedDB");
            return;
        }

        $.indexedDB(_dbName, {
            "schema": {
                1: function(versionTransaction){
                    if(tableArr instanceof Array){
                        for(var i=0; i< tableArr.length;i++){
                            var item = versionTransaction.createObjectStore(tableArr[i].tableName, {
                                "autoIncrement": true,
                                "keyPath":"uid"
                            });
                            item.createIndex(tableArr[i].orderBy);
                            console.log("Created new object store ["+tableArr[i].tableName+"]");
                        }
                    }
                }
            }
        }).then(callback,console.error);
    };

    /*表:添加一条记录*/
    function InsertInto(table,itemStore,callback){
        $.indexedDB(_dbName).objectStore(table, true).add(itemStore).then(function (val) {
            console.log("add item success")
            if(callback){
                callback.call(this,val);
            }
        }, console.error);
    }

    /*表:移除条件相符的记录*/
    function Delete(table,removeItem,callback){
        var promise  = $.indexedDB(_dbName).objectStore(table).count();
        promise.done = function(count,event){
            var _do;
            var _rowNumber = count;
            $.indexedDB(_dbName).objectStore(table).each(function (elem) {
                _rowNumber--;

                if(elem.value && removeItem){
                    _do = true;
                    for(var item in removeItem){
                        if(removeItem[item] != elem.value[item]){
                            _do = false;
                        }
                    }
                    if(_do){
                        elem["delete"]();
                    }

                    if(typeof callback == "function" && _rowNumber == 0){
                        callback.call(this);
                    }
                    return true;
                }
            });
        }
    }



    /*表: 更新一条记录
    * @put: 会自动替换主键相同的objectStore 没有则添加
    * */
    function Update(table,updateItem,callback){
        $.indexedDB(_dbName).objectStore(table).put(updateItem).then(function () {
            if(callback){
                callback.call(this);
            }
        }, console.error);
    }

    /*表: 精确查找一条记录
     * */
    function Find(table,itemId,callback){
        $.indexedDB(_dbName).objectStore(table).get(itemId).then(function(elem){
            if(callback){
                callback(elem.value);
            }
        }, console.error);
    }

    /*表: 查找N条记录
     * */
    function FindAll(table,findItem,itemSort,callback){
        var _promise  = $.indexedDB(_dbName).objectStore(table).count();
        _promise.done(function(count, event){
            var _items = [];
            var _rowNumber = count;
            var _do;
            if(_rowNumber == 0 && typeof callback == "function"){
                callback(_items);
            }else if(_rowNumber > 0 && typeof callback == "function"){
                $.indexedDB(_dbName).objectStore(table).index(itemSort).each(function (elem) {
                    _rowNumber--;
                    if(elem.value && findItem){
                        _do = true;
                        for(var attr in findItem){
                            if(findItem[attr] != elem.value[attr]){
                                _do = false;
                            }
                        }
                        if(_do){
                            _items.push(elem);
                        }
                    }
                    //循环完成
                    if(_rowNumber == 0){
                        callback(_items);
                    }

                });
            }
        });
    }


    function ClearTabel(tables){
        if(tables instanceof Array){
            for(var i = 0; i< tables.length;i++){
                $.indexedDB(_dbName).objectStore(tables[i]).clear();
            }
        }else if(typeof(tables) == "string"){
            $.indexedDB(_dbName).objectStore(tables).clear();
        }

    }

   window["PPTDatabase"] = {
       name: _dbName,
       clear:ClearTabel,
       init: CreateTables,
       addItem:InsertInto,
       removeItem:Delete,
       updateItem:Update,
       getItem:Find,
       getAllItem:FindAll
   };
})();