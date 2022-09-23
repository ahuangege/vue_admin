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
const mydog_1 = require("mydog");
const main_1 = require("../../servers/connector/remote/main");
class default_1 {
    getServerInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return { "i": 0, "id": mydog_1.app.serverId, "startTime": (0, main_1.formatTime)(mydog_1.app.startTime) };
        });
    }
}
exports.default = default_1;
