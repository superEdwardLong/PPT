(function(){
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || null;
    var _dbName = "PPT_IndexDB";

    /*创建数据库表*/
    function CreateTables(tableNameArr,sortKeyArr,callback){
        if(indexedDB == null){
            alert("不支持IndexedDB");
            return;
        }

        $.indexedDB(_dbName, {
            "schema": {
                1: function(versionTransaction){
                    if(tableNameArr instanceof Array){
                        for(var i=0; i< tableNameArr.length;i++){
                            var item = versionTransaction.createObjectStore(tableNameArr[i], {
                                "autoIncrement": true,
                                "keyPath":"uid"
                            });
                            item.createIndex(sortKeyArr[i]);
                            //console.log("Created new object store ["+tableNameArr[i]+"]");
                        }
                    }
                    if(callback){
                        callback.call(this);
                    }
                }
            }
        });
    }

    /*表:添加一条记录*/
    function InsertInto(table,itemStore,callback){
        $.indexedDB(_dbName).objectStore(table, true).add(itemStore).then(function (val) {
            if(callback){
                callback.call(this,val);
            }
        }, console.error);
    }

    /*表:移除条件相符的记录*/
    function Delete(table,removeItem,callback){
        var _do;
        $.indexedDB(_dbName).objectStore(table).each(function (elem) {
            if(elem.value && removeItem){
                _do = true;
                for(var item in removeItem){
                    if(removeItem[item] != elem.value[item]){
                        _do = false;
                    }
                }
                if(_do){
                    elem["delete"]();
                    if(callback){
                        callback.call(this);
                    }
                    return true;
                }
            }
        });
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
        var items = [];
        var count = $.indexedDB(_dbName).objectStore(table).count();
        var rowNumber = 0;
        var _do;
        $.indexedDB(_dbName).objectStore(table).index(itemSort).each(function (elem) {
            rowNumber++;
            if(elem.value && findItem){
                _do = true;
                for(var attr in findItem){
                    if(findItem[attr] != elem.value[attr]){
                        _do = false;
                    }
                }
                if(_do){
                    items.push(elem);
                }
            }
            if(rowNumber == count){
                callback(items);
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

   window["PPTDb"] = {
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