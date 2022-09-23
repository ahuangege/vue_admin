"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mydog_1 = require("mydog");
const cpuUsage_1 = require("./cpuUsage");
const path = __importStar(require("path"));
const i_http_rpc_1 = require("i-http-rpc");
const adminHttpRpcServer_1 = require("./app/admin/adminHttpRpcServer");
const userMgr_1 = require("./app/admin/userMgr");
let app = (0, mydog_1.createApp)();
app.setConfig("connector", { "connector": mydog_1.connector.Ws, "clientOnCb": clientOnCb, "heartbeat": 60, "clientOffCb": clientOffCb, "interval": 50 });
app.setConfig("encodeDecode", { "msgDecode": msgDecode, "msgEncode": msgEncode });
app.setConfig("logger", (level, msg) => {
    if (level == "info" || level == "error") {
        console.log(msg);
    }
});
app.setConfig("rpc", { "interval": 33 });
app.setConfig("mydogList", () => {
    return [{ "title": "cpu", "value": (0, cpuUsage_1.getCpuUsage)() }];
});
if (app.serverId === "connector-server-1") {
    // 账户管理，实际开发要用数据库
    app.set("userMgr", new userMgr_1.UserMgr());
    // 因为master服不参与mydog的rpc，所以新建一个请求master的 http 实例。
    app.set("httpRpcClient", (0, i_http_rpc_1.createHttpRpcClient)({ "url": "http://127.0.0.1:4003" }));
    // admin服务器，web管理后台
    (0, i_http_rpc_1.createHttpRpcServer)({ "port": 4002, "msgPath": path.join(__dirname, "./app/httpRpcHandlerAdmin"), "server": adminHttpRpcServer_1.AdminHttpRpcServer });
}
if (app.serverType === "master") {
    // 启动http监听
    (0, i_http_rpc_1.createHttpRpcServer)({ "port": 4003, "msgPath": path.join(__dirname, "./app/httpRpcHandlerMaster") });
}
app.start();
process.on("uncaughtException", function (err) {
    console.log(err);
});
function msgDecode(cmd, msg) {
    let msgStr = msg.toString();
    console.log("↑ ", app.routeConfig[cmd], msgStr);
    return JSON.parse(msgStr);
}
function msgEncode(cmd, msg) {
    let msgStr = JSON.stringify(msg);
    console.log(" ↓", app.routeConfig[cmd], msgStr);
    return Buffer.from(msgStr);
}
function clientOnCb(session) {
    console.log("one client on");
}
function clientOffCb(session) {
    console.log("one client off");
}
