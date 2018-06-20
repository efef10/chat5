"use strict";
exports.__esModule = true;
var fs = require("fs");
var DB = /** @class */ (function () {
    function DB(fileName) {
        this.fileName = fileName;
        this.readFromJson();
    }
    DB.prototype.readFromJson = function () {
        var data = fs.readFileSync(__dirname + "/db/" + this.fileName + ".json");
        this.myData = JSON.parse(data.toString());
    };
    DB.prototype.writeToJson = function () {
        fs.writeFileSync(__dirname + "/db/" + this.fileName + ".json", JSON.stringify(this.myData));
    };
    DB.prototype.getUsers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.myData[_this.fileName]);
        });
    };
    DB.prototype.addUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.myData[_this.fileName].push(user);
            _this.writeToJson();
            resolve(user);
        });
    };
    DB.prototype.editUser = function (username, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var myUser;
            for (var _i = 0, _a = _this.myData[_this.fileName]; _i < _a.length; _i++) {
                var user = _a[_i];
                if (user.name === username) {
                    myUser = user;
                }
            }
            var index = _this.myData[_this.fileName].indexOf(myUser);
            _this.myData[_this.fileName][index].password = data.password;
            _this.myData[_this.fileName][index].age = data.age;
            _this.writeToJson();
            resolve(myUser);
        });
    };
    return DB;
}());
exports.DB = DB;
