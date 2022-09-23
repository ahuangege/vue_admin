import { app } from "mydog";
import { formatTime } from "../../servers/connector/remote/main";
import { httpRpc_master } from "../httpRpc/httpRpc_master";


export default class implements httpRpc_master.files.mainFile {

    async getServerInfo(): Promise<{ i: number; id: string; startTime: string; }> {
        return { "i": 0, "id": app.serverId, "startTime": formatTime(app.startTime) };
    }
}