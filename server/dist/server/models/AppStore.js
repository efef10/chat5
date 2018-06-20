"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Chat_1 = require("./Chat");
var api_1 = require("../../src/api");
var AppService = /** @class */ (function () {
    // selectedGroup:Group|null;
    // loggedUser:string;
    // chattingWithUser:string;
    // users: User[];
    function AppService() {
        this.listeners = [];
        this.users = [];
        exports.appStore.loggedUser = "";
        exports.appStore.chattingWithUser = "";
    }
    AppService.prototype.treeShouldUpdate = function () {
        return exports.appStore.componentTreeShouldUpdate;
    };
    AppService.prototype.treeUpdated = function () {
        exports.appStore.componentTreeShouldUpdate = false;
    };
    AppService.prototype.addMessage = function (content) {
        if (!content.replace(/^\s+|\s+$/g, "")) {
            return;
        }
        if (!!exports.appStore.selectedGroup) {
            exports.appStore.selectedGroup.addMessage({ content: content,
                date: new Date(),
                userName: exports.appStore.loggedUser });
            // auto reply:
            exports.appStore.selectedGroup.addMessage({ content: "what do you say???",
                date: new Date(),
                userName: "bambi" });
        }
        else if (exports.appStore.chattingWithUser !== "") {
            var user = exports.appStore.chat.returnUserByName(exports.appStore.loggedUser);
            var chattingWith = exports.appStore.chat.returnUserByName(exports.appStore.chattingWithUser);
            if (!!user && !!chattingWith) {
                user.addMessage({ content: content,
                    date: new Date(),
                    userName: exports.appStore.loggedUser,
                    chattingWithUser: exports.appStore.chattingWithUser });
                // auto reply:
                chattingWith.addMessage({ content: exports.appStore.loggedUser === exports.appStore.chattingWithUser ? "I'm your virtual Psychologist. \n can I help you?" : "hi " + exports.appStore.loggedUser + " !!! we haven't talk for a long time",
                    date: new Date(),
                    userName: exports.appStore.chattingWithUser,
                    chattingWithUser: exports.appStore.loggedUser });
            }
        }
        this.onStoreChanged();
    };
    AppService.prototype.getUsers = function () {
        var _this = this;
        return api_1.Api.getUsers()
            .then(function (users) {
            _this.users = users;
            _this.onStoreChanged();
        });
    };
    AppService.prototype.editUser = function (user) {
        return api_1.Api.editUser(user)
            .then(function (user) {
            return user;
        });
    };
    AppService.prototype.addUser = function (username, password, age, imageUrl) {
        return api_1.Api.addUser({ name: username, password: password, age: age, imageUrl: imageUrl || "" })
            .then(function (user) {
            return user;
        });
    };
    AppService.prototype.selectGroup = function (path) {
        exports.appStore.chattingWithUser = "";
        var group = exports.appStore.chat.getGroupByPath(path);
        if (exports.appStore.loggedUser !== "") { //&& !!group && group.userInGroup(appStore.loggedUser
            exports.appStore.selectedGroup = group;
        }
        else {
            exports.appStore.selectedGroup = null;
        }
        this.onStoreChanged();
    };
    AppService.prototype.userSelected = function (userName) {
        if (exports.appStore.loggedUser === "") {
            return;
        }
        exports.appStore.chattingWithUser = userName;
        exports.appStore.selectedGroup = null;
        this.onStoreChanged();
    };
    AppService.prototype.getMessages = function () {
        if (!!exports.appStore.selectedGroup) {
            return exports.appStore.selectedGroup.getMessages();
        }
        else if (exports.appStore.chattingWithUser !== "" && exports.appStore.loggedUser !== "") {
            var user = exports.appStore.chat.returnUserByName(exports.appStore.loggedUser);
            var chattingWith = exports.appStore.chat.returnUserByName(exports.appStore.chattingWithUser);
            if (!!user && !!chattingWith) {
                var allMessages = user.getUserMessages(exports.appStore.chattingWithUser).concat(exports.appStore.loggedUser !== exports.appStore.chattingWithUser ? chattingWith.getUserMessages(exports.appStore.loggedUser) : []);
                return allMessages.sort(function (message1, message2) {
                    return message1.date - message2.date;
                });
            }
            else {
                return [];
            }
        }
        else {
            return [];
        }
    };
    AppService.prototype.getLoggedUser = function () {
        return exports.appStore.loggedUser;
    };
    AppService.prototype.getChattedWithUser = function () {
        return exports.appStore.chattingWithUser;
    };
    AppService.prototype.getSelectedGroup = function () {
        return exports.appStore.selectedGroup;
    };
    AppService.prototype.groupsToDisplay = function () {
        var root = exports.appStore.chat.getGroups().getRoot();
        if (!!root) {
            return [root];
        }
        else
            return [];
    };
    AppService.prototype.logUser = function (userName) {
        exports.appStore.loggedUser = userName;
        this.onStoreChanged();
    };
    AppService.prototype.auth = function (userName, password) {
        var user = exports.appStore.chat.returnUserByName(userName);
        if (!!user) {
            return user.getPassword() === password;
        }
        return false;
    };
    AppService.prototype.logOut = function () {
        exports.appStore.loggedUser = "";
        exports.appStore.selectedGroup = null;
        exports.appStore.chattingWithUser = "";
        this.onStoreChanged();
    };
    AppService.prototype.subscribe = function (listener) {
        this.listeners.push(listener);
    };
    AppService.prototype.onStoreChanged = function () {
        debugger;
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener({
                usres: this.users
            });
        }
    };
    return AppService;
}());
exports.AppService = AppService;
exports.appStore = {
    chat: new Chat_1.Chat(),
    selectedGroup: null,
    loggedUser: "",
    chattingWithUser: "",
    componentTreeShouldUpdate: false,
};
exports.appService = new AppService();
//# sourceMappingURL=AppStore.js.map