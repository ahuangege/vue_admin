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
exports.AdminHttpRpcServer = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const http = __importStar(require("http"));
const https = __importStar(require("https"));
let errList = {
    noHandler: JSON.stringify({ "code": 80001, "errMsg": "no msg handler" }),
    needPost: JSON.stringify({ "code": 80001, "errMsg": "need Post" }),
    needJson: JSON.stringify({ "code": 80001, "errMsg": "need Json" }),
};
class AdminHttpRpcServer {
    constructor(initOptions) {
        this.handlers = {};
        this.start(initOptions);
    }
    start(initOptions) {
        this.loadMsgHandler(initOptions.msgPath);
        let isHttps = !!initOptions.ssl;
        let httpCon = isHttps ? https : http;
        let server = httpCon.createServer({}, (request, response) => {
            console.log("---request", request.url);
            console.log(request.headers["x-token"]);
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
            request.on("end", () => __awaiter(this, void 0, void 0, function* () {
                console.log("---msg", msg);
                let msgObj;
                try {
                    msgObj = JSON.parse(msg);
                }
                catch (e) {
                    return response.end(errList.needJson);
                }
                let file = this.handlers[msgObj.file];
                if (!file || !file[msgObj.method]) {
                    return response.end(errList.noHandler);
                }
                let data = yield file[msgObj.method](...msgObj.args);
                if (data === undefined) {
                    data = null;
                }
                response.end(JSON.stringify({ "code": 0, "data": data }));
            }));
        });
        server.listen(initOptions.port, () => {
            if (isHttps) {
                console.log("https listening at", initOptions.port);
            }
            else {
                console.log("http listening at", initOptions.port);
            }
        });
        server.on("error", (err) => {
            console.log(err);
        });
    }
    loadMsgHandler(msgPath) {
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
exports.AdminHttpRpcServer = AdminHttpRpcServer;
