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
exports.formatTime = void 0;
const mydog_1 = require("mydog");
class Remote {
    constructor(app) {
    }
    test(msg) {
        console.log("rpcMsg", msg);
    }
    getServerInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return { "i": 0, "id": mydog_1.app.serverId, "startTime": formatTime(mydog_1.app.startTime) };
        });
    }
}
exports.default = Remote;
function formatTime(time) {
    time = Math.floor((Date.now() - time) / 1000);
    var days = Math.floor(time / (24 * 3600));
    time = time % (24 * 3600);
    var hours = Math.floor(time / 3600);
    time = time % 3600;
    var minutes = Math.ceil(time / 60);
    return days + "-" + hours + "-" + minutes;
}
exports.formatTime = formatTime;
