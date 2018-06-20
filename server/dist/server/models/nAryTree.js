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
var Group_1 = require("./Group");
var User_1 = require("./User");
var db_1 = require("../lib/db");
var uniqid = require("uniqid");
var groupsDB = new db_1.DB("groups");
var groupsToUsersDB = new db_1.DB("userToGroups");
var nAryTree = /** @class */ (function () {
    // private treeName:string;
    function nAryTree(groupName) {
        var _this = this;
        groupsDB.getData().then(function (root) {
            !!root ? _this.root = root[0] : _this.root = null;
        });
        // this.treeName = groupName || "nAryTreeGroup";
    }
    nAryTree.prototype.getRoot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var root;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, groupsDB.getData()];
                    case 1:
                        root = _a.sent();
                        if (!!root) {
                            return [2 /*return*/, root[0]];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    nAryTree.prototype._rootIsNull = function () {
        return !this.root;
        // return this.root === null;
    };
    nAryTree.prototype.allGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var groups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, groupsDB.getData()];
                    case 1:
                        groups = _a.sent();
                        return [2 /*return*/, groups];
                }
            });
        });
    };
    nAryTree.prototype.addInitialGroup = function (groupName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._rootIsNull()) return [3 /*break*/, 4];
                        return [4 /*yield*/, groupsDB.initiate()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, groupsDB.addData({ id: uniqid(), type: "group", name: groupName, messages: [], parent: null, children: [] })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, groupsDB.getData().then(function (data) {
                                _this.root = data[0];
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    nAryTree.prototype.addGroup = function (newGroupName, toGroupID) {
        return __awaiter(this, void 0, void 0, function () {
            var newGroup, connectors, myConnectors, connector, _i, myConnectors_1, connector_1, newGroupOthers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._rootIsNull()) return [3 /*break*/, 2];
                        return [4 /*yield*/, groupsDB.initiate()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        newGroup = { type: "group", name: newGroupName, id: uniqid() };
                        return [4 /*yield*/, groupsToUsersDB.getData()];
                    case 3:
                        connectors = _a.sent();
                        myConnectors = connectors.filter(function (connector) {
                            return connector.parentId === toGroupID;
                        });
                        groupsDB.addData(newGroup);
                        connector = { type: "group", parentId: toGroupID, childId: newGroup.id };
                        groupsToUsersDB.addData(connector);
                        if (!(myConnectors.length > 0 && myConnectors[0].type === "user")) return [3 /*break*/, 5];
                        for (_i = 0, myConnectors_1 = myConnectors; _i < myConnectors_1.length; _i++) {
                            connector_1 = myConnectors_1[_i];
                        }
                        newGroupOthers = { type: "group", name: "others", id: uniqid() };
                        return [4 /*yield*/, groupsDB.addData(newGroupOthers)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, newGroup];
                }
            });
        });
    };
    nAryTree.prototype.addConnector = function (groupId, connectorId, type) {
        return __awaiter(this, void 0, void 0, function () {
            var newConnector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newConnector = { type: type, parentId: groupId, childId: connectorId };
                        return [4 /*yield*/, groupsToUsersDB.addData(newConnector)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    nAryTree.prototype.getGroupById = function (groupId, currentGroup) {
        var group = currentGroup;
        if (group === undefined) {
            group = this.root;
        }
        if (!!group && group.id === groupId) {
            return group;
        }
        if (group === null || !Group_1.Group.hasChildren(group)) {
            return null;
        }
        var children = Group_1.Group.getChildren(group);
        if (children[0].type === "group") {
            for (var i = 0; i < children.length; i++) {
                var result = this.getGroupById(groupId, children[i]);
                if (!!result) {
                    return result;
                }
            }
        }
        return null;
    };
    nAryTree.prototype.deleteGroup = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, groupsDB.deleteData([{ "field": "id", "value": groupId }])];
                    case 1:
                        deletedGroup = _a.sent();
                        return [4 /*yield*/, this.deleteConnectors(groupId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, deletedGroup];
                }
            });
        });
    };
    nAryTree.prototype.getConnectors = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var connectors, mapped;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, groupsToUsersDB.getData()];
                    case 1:
                        connectors = _a.sent();
                        mapped = connectors.filter(function (connector) {
                            return connector.parentId === groupId;
                        });
                        return [2 /*return*/, mapped];
                }
            });
        });
    };
    nAryTree.prototype.deleteConnectors = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var connectors, _i, connectors_1, connector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, groupsToUsersDB.getData()];
                    case 1:
                        connectors = _a.sent();
                        _i = 0, connectors_1 = connectors;
                        _a.label = 2;
                    case 2:
                        if (!(_i < connectors_1.length)) return [3 /*break*/, 8];
                        connector = connectors_1[_i];
                        if (!(connector.childId === groupId)) return [3 /*break*/, 4];
                        return [4 /*yield*/, groupsToUsersDB.deleteData([{ "field": "childId", "value": connector.childId }])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(connector.parentId === groupId)) return [3 /*break*/, 7];
                        return [4 /*yield*/, groupsToUsersDB.deleteData([{ "field": "parentId", "value": connector.parentId }])];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.deleteGroup(connector.childId)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    nAryTree.prototype.deleteConnector = function (groupId, childId, type) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedConnector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, groupsToUsersDB.deleteData([{ "field": "childId", "value": childId }, { "field": "parentId", "value": groupId }])];
                    case 1:
                        deletedConnector = _a.sent();
                        if (!(type === "group")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.deleteGroup(childId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, deletedConnector];
                }
            });
        });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////
    nAryTree.prototype.allGroupsOfUser = function (userName, arr, currentGroup) {
        var foundGroups = arr || [];
        var group = currentGroup;
        if (group === undefined) {
            group = this.root;
        }
        if (group === null || !Group_1.Group.hasChildren(group)) {
            return foundGroups;
        }
        var children = Group_1.Group.getChildren(group);
        if (children[0] instanceof User_1.User) {
            for (var i = 0; i < children.length; i++) {
                var user = children[i];
                if (user.getUserName() === userName) {
                    foundGroups.push(group);
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < children.length; i++) {
                this.allGroupsOfUser(userName, foundGroups, children[i]);
            }
        }
        return foundGroups;
    };
    nAryTree.prototype.allGroupsNames = function (currentGroup, currentAllGroups) {
        var allGroups = currentAllGroups || [];
        var group = currentGroup;
        if (group === undefined) {
            group = this.root;
        }
        if (!group) {
            return allGroups;
        }
        allGroups.push(group.getGroupName());
        var children = Group_1.Group.getChildren(group);
        if (!Group_1.Group.hasChildren(group) || children[0] instanceof User_1.User) {
            return allGroups;
        }
        for (var i = 0; i < children.length; i++) {
            this.allGroupsNames(children[i], allGroups);
        }
        return allGroups;
    };
    // public showGroupPath(group:Group){
    //     var path = group.getGroupName();
    //     // while(group.getParent()){
    //     //     path = group.getParent().getGroupName() + ">" + path;
    //     //     group = group.getParent();
    //     // }
    //     let parent = group.getParent();
    //     while(parent){
    //         path = parent.getGroupName() + ">" + path;
    //         parent = parent.getParent();
    //     }
    //     return path;
    // }
    nAryTree.prototype.returnGroupsAndUsers = function () {
        var myGroup = this.root;
        var myLevel = 0;
        var arr;
        arr = [];
        if (!!myGroup) {
            this._returnGroupsAndUsers(myGroup, arr, myLevel);
        }
        return arr;
    };
    nAryTree.prototype._returnGroupsAndUsers = function (group, arr, level) {
        var myGroup = group;
        var myLevel = level;
        var arr = arr || [];
        if (myGroup === null) {
            return 0;
        }
        if (!Group_1.Group.hasChildren(myGroup)) {
            arr.push({ level: myLevel,
                name: myGroup.getGroupName(),
                type: "Group",
                count: 0 });
            return 0;
        }
        var children = Group_1.Group.getChildren(myGroup);
        if (children[0] instanceof User_1.User) {
            for (var i = children.length - 1; i >= 0; i--) {
                arr.push({ level: myLevel + 1,
                    name: children[i].getUserName(),
                    type: "User",
                    count: 0 });
            }
            arr.push({ level: myLevel,
                name: myGroup.getGroupName(),
                type: "Group",
                count: children.length });
            return children.length;
        }
        var sum = 0;
        for (var i = children.length - 1; i >= 0; i--) {
            sum += this._returnGroupsAndUsers(children[i], arr, myLevel + 1);
        }
        arr.push({ level: myLevel,
            name: myGroup.getGroupName(),
            type: "Group",
            count: sum });
        return sum;
    };
    nAryTree.prototype.getGroupByPath = function (path) {
        var arr = path.split(">");
        var group = this.root;
        if (group === null) {
            return null;
        }
        if (!(group.getGroupName() === arr[0])) {
            return null;
        }
        for (var i = 1; i < arr.length; i++) {
            var children = Group_1.Group.getChildren(group);
            if (children.length === 0 || children[0] instanceof User_1.User) {
                return null;
            }
            for (var j = 0; j < children.length; j++) {
                if (children[j].getGroupName() === arr[i]) {
                    group = children[j];
                    break;
                }
            }
            // return false;
        }
        if (!!group) {
            return group;
        }
        return null;
    };
    nAryTree.prototype.deleteTree = function () {
        groupsDB.deleteFileContent();
        groupsToUsersDB.deleteFileContent();
        this.root = null;
    };
    return nAryTree;
}());
exports.nAryTree = nAryTree;
// module.exports.nAryTree = nAryTree;
//# sourceMappingURL=nAryTree.js.map