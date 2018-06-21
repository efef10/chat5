"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.getUsers = function () {
        return this.get('/users');
    };
    Api.addUser = function (user) {
        return this.post('/users/', user);
    };
    Api.deleteUser = function (userId) {
        return this.delete("/users/" + userId, { type: "user" });
    };
    Api.editUser = function (userId, updates) {
        return this.put('/users/' + userId, { updates: updates });
    };
    /////////////////////////////////////////////
    Api.getGroups = function () {
        return this.get('/groups');
    };
    Api.addGroup = function (groupName, toGroupID) {
        return this.post('/groups/' + toGroupID, { name: groupName, type: "group" });
    };
    Api.deleteGroup = function (groupId) {
        return this.delete("/groups/" + groupId, { type: "group" });
    };
    Api.getConnectors = function (groupId) {
        return this.get("/groups/" + groupId + "/connectors");
    };
    Api.deleteConnector = function (groupId, childToDelete) {
        return this.delete("/groups/" + groupId + "/connectors/" + childToDelete.childId, { type: childToDelete.type });
    };
    Api.addConnector = function (connectorId, toGroupID, type) {
        return this.post("/groups/" + toGroupID + "/connectors", { connectorId: connectorId, type: type });
    };
    Api.get = function (url) {
        return fetch(Api.baseURL + url, {
            method: "GET"
        })
            .then(function (res) { return res.json(); });
    };
    Api.post = function (url, body) {
        return fetch(Api.baseURL + url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) { return res.json(); });
    };
    Api.put = function (url, body) {
        debugger;
        return fetch(Api.baseURL + url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) { return res.json(); });
    };
    Api.delete = function (url, body) {
        return fetch(Api.baseURL + url, {
            method: "DELETE",
            // body:JSON.stringify(body||""),
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) { return res.json(); });
    };
    Api.baseURL = "http://localhost:4000";
    return Api;
}());
exports.Api = Api;
//# sourceMappingURL=api.js.map