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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var Chat_1 = require("../models/Chat");
// import {Group} from '../models/Group'
// const chat = new Chat()
// import {nAryTree} from '../models/nAryTree';
// const groups = new nAryTree();
var GroupsService = /** @class */ (function () {
    function GroupsService() {
        var _this = this;
        this.getGroups = function () { return __awaiter(_this, void 0, void 0, function () {
            var myGroups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chat[0].getGroups().allGroups()]; /////fixme
                    case 1:
                        myGroups = _a.sent() /////fixme
                        ;
                        return [2 /*return*/, myGroups];
                }
            });
        }); };
        this.addGroup = function (groupId, body) { return __awaiter(_this, void 0, void 0, function () {
            var myGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chat[0].getGroups().addGroup(body.name, groupId)]; /////fixme
                    case 1:
                        myGroup = _a.sent() /////fixme
                        ;
                        return [2 /*return*/, myGroup];
                }
            });
        }); };
        this.editGroup = function (groupId, body) { return __awaiter(_this, void 0, void 0, function () {
            var myGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chat[0].getGroups().addGroup(body.name, groupId)];
                    case 1:
                        myGroup = _a.sent();
                        return [2 /*return*/, myGroup];
                }
            });
        }); };
        this.deleteGroup = function (groupId) { return __awaiter(_this, void 0, void 0, function () {
            var myGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chat[0].getGroups().deleteGroup(groupId)];
                    case 1:
                        myGroup = _a.sent();
                        return [2 /*return*/, myGroup];
                }
            });
        }); };
        this.getConnectors = function (groupId) { return __awaiter(_this, void 0, void 0, function () {
            var myConnectors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chat[0].getGroups().getConnectors(groupId)];
                    case 1:
                        myConnectors = _a.sent();
                        return [2 /*return*/, myConnectors];
                }
            });
        }); };
        this.deleteConnector = function (groupId, childId, type) { return __awaiter(_this, void 0, void 0, function () {
            var myConnector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chat[0].getGroups().deleteConnector(groupId, childId, type)];
                    case 1:
                        myConnector = _a.sent();
                        return [2 /*return*/, myConnector];
                }
            });
        }); };
        this.addConnector = function (groupId, connectorId, type) { return __awaiter(_this, void 0, void 0, function () {
            var myConnector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chat[0].getGroups().addConnector(groupId, connectorId, type)];
                    case 1:
                        myConnector = _a.sent();
                        return [2 /*return*/, myConnector];
                }
            });
        }); };
        this.getTree = function () { return __awaiter(_this, void 0, void 0, function () {
            var myTree;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chat[0].getGroups().getTree()];
                    case 1:
                        myTree = _a.sent();
                        return [2 /*return*/, myTree];
                }
            });
        }); };
        this.chat = [];
        this.chat.push(new Chat_1.Chat());
    }
    return GroupsService;
}());
exports.default = GroupsService;
//# sourceMappingURL=groupsService.js.map