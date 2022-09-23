import { app, Application } from "mydog";

declare global {
    interface Rpc {
        connector: {
            main: Remote,
        }
    }
}

export default class Remote {

    constructor(app: Application) {
    }

    test(msg: string) {
        console.log("rpcMsg", msg)
    }

    async getServerInfo() {
        return { "i": 0, "id": app.serverId, "startTime": formatTime(app.startTime) }
    }
}

export function formatTime(time: number) {
    time = Math.floor((Date.now() - time) / 1000);
    var days = Math.floor(time / (24 * 3600));
    time = time % (24 * 3600);
    var hours = Math.floor(time / 3600);
    time = time % 3600;
    var minutes = Math.ceil(time / 60);
    return days + "-" + hours + "-" + minutes;
}

