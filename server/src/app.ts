
import { connector, createApp, Session } from "mydog";
import { getCpuUsage } from "./cpuUsage";
import * as path from "path";
import { createHttpRpcClient, createHttpRpcServer } from "i-http-rpc";
import { AdminHttpRpcServer } from "./app/admin/adminHttpRpcServer";
import { UserMgr } from "./app/admin/userMgr";
import { httpRpc_master } from "./app/httpRpc/httpRpc_master";

let app = createApp();

app.setConfig("connector", { "connector": connector.Ws, "clientOnCb": clientOnCb, "heartbeat": 60, "clientOffCb": clientOffCb, "interval": 50 });
app.setConfig("encodeDecode", { "msgDecode": msgDecode, "msgEncode": msgEncode });
app.setConfig("logger", (level, msg) => {
    if (level == "info" || level == "error") {
        console.log(msg);
    }
});
app.setConfig("rpc", { "interval": 33 });
app.setConfig("mydogList", () => {
    return [{ "title": "cpu", "value": getCpuUsage() }]
})


if (app.serverId === "connector-server-1") {
    // 账户管理，实际开发要用数据库
    app.set("userMgr", new UserMgr());
    // 因为master服不参与mydog的rpc，所以新建一个请求master的 http 实例。
    app.set("httpRpcClient", createHttpRpcClient<httpRpc_master>({ "url": "http://127.0.0.1:4003" }));
    // admin服务器，web管理后台
    createHttpRpcServer({ "port": 4002, "msgPath": path.join(__dirname, "./app/httpRpcHandlerAdmin"), "server": AdminHttpRpcServer });
}

if (app.serverType === "master") {
     // 启动http监听
    createHttpRpcServer({ "port": 4003, "msgPath": path.join(__dirname, "./app/httpRpcHandlerMaster") });
}


app.start();

process.on("uncaughtException", function (err: any) {
    console.log(err)
});


function msgDecode(cmd: number, msg: Buffer): any {
    let msgStr = msg.toString();
    console.log("↑ ", app.routeConfig[cmd], msgStr);
    return JSON.parse(msgStr);
}

function msgEncode(cmd: number, msg: any): Buffer {
    let msgStr = JSON.stringify(msg);
    console.log(" ↓", app.routeConfig[cmd], msgStr);
    return Buffer.from(msgStr);
}


function clientOnCb(session: Session) {
    console.log("one client on");
}

function clientOffCb(session: Session) {
    console.log("one client off");
}


