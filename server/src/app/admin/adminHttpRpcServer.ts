import * as path from "path";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import { app } from "mydog";
import { UserMgr } from "./userMgr";

let errList = {
    noHandler: JSON.stringify({ "code": 80001, "errMsg": "no msg handler" }),
    needPost: JSON.stringify({ "code": 80002, "errMsg": "need Post" }),
    needJson: JSON.stringify({ "code": 80003, "errMsg": "need Json" }),
    needLogin: JSON.stringify({ "code": 80004, "errMsg": "need login" }),
}



export class AdminHttpRpcServer {
    private handlers: { [file: string]: { [method: string]: Function } } = {};

    constructor(initOptions: I_initOptionsServer) {
        this.start(initOptions);
    }

    private start(initOptions: I_initOptionsServer) {

        this.loadMsgHandler(initOptions.msgPath);

        let isHttps = !!initOptions.ssl;
        let httpCon = isHttps ? https : http;
        let server = (httpCon as typeof http).createServer({}, (request: http.IncomingMessage, response: http.ServerResponse) => {

            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            response.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Token');
            if (initOptions.headers) {
                for (let x in initOptions.headers) {
                    response.setHeader(x, initOptions.headers[x]);
                }
            }

            if (request.url === "/favicon.ico") {
                return response.end();
            }
            if (request.method !== "POST") {
                return response.end(errList.needPost);
            }

            let msg = "";
            request.on("data", (chuck) => {
                msg += chuck;
            });
            request.on("end", async () => {

                let msgObj: { "file": string, "method": string, "args": any[] };
                try {
                    msgObj = JSON.parse(msg);
                } catch (e) {
                    return response.end(errList.needJson);
                }
                let file = this.handlers[msgObj.file];
                if (!file || !file[msgObj.method]) {
                    return response.end(errList.noHandler);
                }

                let user: any = null;
                if (msgObj.method !== "login" && msgObj.method !== "loginByToken") {
                    let token = request.headers["x-token"] as string;
                    if (!token) {
                        return response.end(errList.needLogin);
                    }
                    let user = app.get<UserMgr>("userMgr").getUserByToken(token);
                    if (!user) {
                        return response.end(errList.needLogin);
                    }
                }

                msgObj.args[0] = user;
                let data = await file[msgObj.method](...msgObj.args);
                if (data === undefined) {
                    data = null;
                }
                response.end(JSON.stringify({ "code": 0, "data": data }));
            });

        });

        server.listen(initOptions.port, () => {
            if (isHttps) {
                console.log("https listening at", initOptions.port);
            } else {
                console.log("http listening at", initOptions.port);
            }
        });
        server.on("error", (err: Error) => {
            console.log(err);
        });
    }

    private loadMsgHandler(msgPath: string) {
        let exists = fs.existsSync(msgPath);
        if (exists) {
            fs.readdirSync(msgPath).forEach((filename) => {
                if (!filename.endsWith(".js")) {
                    return;
                }
                let name = path.basename(filename, '.js');
                let handler = require(path.join(msgPath, filename));
                if (handler.default && typeof handler.default === "function") {
                    this.handlers[name] = new handler.default();
                }
            });
        }
    }

}


interface I_initOptionsServer {
    port: number,
    msgPath: string,
    ssl?: { "key": any, "cert": any },
    headers?: { [key: string]: any },
    server?: any,   // 自定义 rpc server
    [key: string]: any,
}
