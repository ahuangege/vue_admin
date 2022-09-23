"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    constructor(app) {
        this.app = app;
    }
    ping(msg, session, next) {
        next({ "msg": "pong" });
        this.app.rpc("*").connector.main.test(msg.msg);
    }
}
exports.default = Handler;
