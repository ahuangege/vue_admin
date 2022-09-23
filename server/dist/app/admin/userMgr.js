"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMgr = void 0;
class UserMgr {
    constructor() {
        this.users = {
            "1": { "uid": 1, "name": "admin" },
        };
        this.token_uid = {};
        this.uid_token = {};
    }
    /** 根据token获取账号信息 */
    getUserByToken(token) {
        let uid = this.token_uid[token];
        if (!uid) {
            return null;
        }
        let user = this.users[uid];
        return user;
    }
    /** 登录 */
    login(name) {
        let user = null;
        for (let x in this.users) {
            if (this.users[x].name == name) {
                user = this.users[x];
                break;
            }
        }
        if (!user) {
            return null;
        }
        let token = this.uid_token[user.uid];
        if (token) {
            return { "name": user.name, "token": token };
        }
        token = this.randToken();
        this.uid_token[user.uid] = token;
        this.token_uid[token] = user.uid;
        return { "name": user.name, "token": token };
    }
    /** 通过token登录 */
    loginByToken(token) {
        let uid = this.token_uid[token];
        let user = this.users[uid];
        if (!user) {
            return null;
        }
        return { "name": user.name };
    }
    randToken() {
        let token = Math.floor(Math.random() * 100000 + 1).toString();
        if (this.token_uid[token]) {
            return this.randToken();
        }
        return token;
    }
}
exports.UserMgr = UserMgr;
