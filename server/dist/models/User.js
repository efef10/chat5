"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(id, userName, age, password, profileImg) {
        this.type = "user";
        this.id = id;
        this.name = userName;
        this.age = age;
        this.password = password;
        this.profileImg = profileImg ? profileImg : 'blank.png';
        this.messages = [];
    }
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.getProfileImg = function () {
        return this.profileImg;
    };
    User.prototype.getType = function () {
        return this.type;
    };
    User.prototype.getUserName = function () {
        return this.name;
    };
    User.prototype.getAge = function () {
        return this.age;
    };
    User.prototype.setAge = function (age) {
        this.age = age;
        return true;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.setPassword = function (password) {
        this.password = password;
    };
    User.prototype.getUserMessages = function (chattingWith) {
        return this.messages.filter(function (message) {
            return message.chattingWithUser === chattingWith;
        });
    };
    User.prototype.addMessage = function (message) {
        // let messagesOfChatted = this.messages.filter((myMessage)=> {
        //     return myMessage.chattingWithUser === message.chattingWithUser
        // })
        // if(messagesOfChatted.length === 0) {
        //     this.messages.push(message);
        //     return;
        // }
        //
        // let lastMessage = this.messages[this.messages.length-1];
        // if(lastMessage.chattingWithUser===message.chattingWithUser){
        //     lastMessage.content += ('\n'+  message.content);//lastMessage.content.concat('\n' + '\n' + message.content)
        //     lastMessage.date = message.date;
        // }
        // else{
        this.messages.push(message);
        // }
    };
    return User;
}());
exports.User = User;
// module.exports.User = User;
//# sourceMappingURL=User.js.map