"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resData = exports.resError = void 0;
const mydog_1 = require("mydog");
function resError(code, errMsg = "") {
    return { "code": code, "errMsg": errMsg, "data": null };
}
exports.resError = resError;
function resData(data) {
    return { "code": 0, "data": data };
}
exports.resData = resData;
class default_1 {
    constructor() {
        this.userMgr = mydog_1.app.get("userMgr");
        this.httpRpcClient = mydog_1.app.get("httpRpcClient");
    }
    login(session, username) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = this.userMgr.login(username);
            if (!info) {
                return resError(1, "账号不存在");
            }
            return resData({ "name": info.name, "token": info.token });
        });
    }
    loginByToken(session, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let info = this.userMgr.loginByToken(token);
            if (!info) {
                return resError(1, "token 已过期");
            }
            return resData({ "name": info.name });
        });
    }
    getServerList(session) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = [];
            let index = 0;
            let masterInfo = yield this.httpRpcClient.rpc().main.getServerInfo();
            if (!(masterInfo instanceof Error)) {
                index++;
                masterInfo.i = index;
                list.push(masterInfo);
            }
            for (let one of mydog_1.app.getServersByType("connector")) {
                let res = yield mydog_1.app.rpcAwait(one.id).connector.main.getServerInfo();
                if (res) {
                    index++;
                    res.i = index;
                    list.push(res);
                }
            }
            return resData({ "list": list });
        });
    }
}
exports.default = default_1;
