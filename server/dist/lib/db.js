"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// import {User} from '../models/User';
// import {Group} from '../models/Group';
var DB = /** @class */ (function () {
    function DB(fileName) {
        this.fileName = fileName;
        this.readFromJson();
    }
    DB.prototype.readFromJson = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.readFileSync(__dirname + "/db/" + this.fileName + ".json")];
                    case 1:
                        data = _a.sent();
                        this.myData = JSON.parse(data.toString() || "{\"" + this.fileName + "\":[]}");
                        return [2 /*return*/, this.myData];
                }
            });
        });
    };
    DB.prototype.writeToJson = function () {
        fs.writeFileSync(__dirname + "/db/" + this.fileName + ".json", JSON.stringify(this.myData));
    };
    DB.prototype.setMyData = function (data) {
        this.myData[this.fileName] = data;
        this.writeToJson();
    };
    DB.prototype.initiate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.myData = JSON.parse("{\"" + _this.fileName + "\":[]}");
            // this.myData = JSON.parse('');
            _this.writeToJson();
            resolve(_this.myData[_this.fileName]);
        });
    };
    DB.prototype.getData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.readFromJson().then(function (myData) {
                resolve(myData[_this.fileName].slice());
            });
        });
    };
    DB.prototype.addData = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.readFromJson().then(function () {
                _this.myData[_this.fileName].push(data);
                _this.writeToJson();
                resolve(data);
            });
        });
    };
    DB.prototype.deleteFileContent = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.myData = JSON.parse("{\"" + _this.fileName + "\":[]}");
            _this.writeToJson();
            resolve(true);
        });
    };
    DB.prototype.editData = function (conditions, updates) {
        var _this = this;
        this.readFromJson();
        return new Promise(function (resolve, reject) {
            var myObjects = [];
            for (var _i = 0, _a = _this.myData[_this.fileName]; _i < _a.length; _i++) {
                var obj = _a[_i];
                var objInConditions = true;
                for (var _b = 0, conditions_1 = conditions; _b < conditions_1.length; _b++) {
                    var condition = conditions_1[_b];
                    if (obj[condition["field"]] !== condition["value"]) {
                        objInConditions = false;
                        break;
                    }
                }
                if (objInConditions) {
                    myObjects.push(obj);
                }
            }
            for (var _c = 0, myObjects_1 = myObjects; _c < myObjects_1.length; _c++) {
                var obj = myObjects_1[_c];
                var index = _this.myData[_this.fileName].indexOf(obj);
                for (var _d = 0, updates_1 = updates; _d < updates_1.length; _d++) {
                    var update = updates_1[_d];
                    _this.myData[_this.fileName][index][update["field"]] = update["value"];
                    _this.writeToJson();
                    _this.readFromJson();
                }
            }
            resolve(myObjects);
        });
    };
    DB.prototype.deleteData = function (conditions) {
        var _this = this;
        this.readFromJson();
        return new Promise(function (resolve, reject) {
            var myObjects = [];
            for (var _i = 0, _a = _this.myData[_this.fileName]; _i < _a.length; _i++) {
                var obj = _a[_i];
                var objInConditions = true;
                for (var _b = 0, conditions_2 = conditions; _b < conditions_2.length; _b++) {
                    var condition = conditions_2[_b];
                    if (obj[condition["field"]] !== condition["value"]) {
                        objInConditions = false;
                        break;
                    }
                }
                if (objInConditions) {
                    myObjects.push(obj);
                }
            }
            for (var _c = 0, myObjects_2 = myObjects; _c < myObjects_2.length; _c++) {
                var obj = myObjects_2[_c];
                var index = _this.myData[_this.fileName].indexOf(obj);
                _this.myData[_this.fileName].splice(index, 1);
                _this.writeToJson();
                _this.readFromJson();
            }
            _this.writeToJson();
            resolve(myObjects);
        });
    };
    return DB;
}());
exports.DB = DB;
//# sourceMappingURL=db.js.map