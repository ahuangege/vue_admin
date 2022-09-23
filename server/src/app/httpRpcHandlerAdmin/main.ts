import { app } from "mydog";
import { I_user, UserMgr } from "../admin/userMgr";
import { httpRpc_admin } from "../httpRpc/httpRpc_admin";
import { httpRpc_master } from "../httpRpc/httpRpc_master";

export interface I_res<T = any> {
    code: number,
    errMsg?: string,
    data: T,
}

export function resError(code: number, errMsg = ""): I_res {
    return { "code": code, "errMsg": errMsg, "data": null };
}
export function resData<T = any>(data: T): I_res<T> {
    return { "code": 0, "data": data };
}


export default class implements httpRpc_admin.files.mainFile {
    private userMgr: UserMgr;
    private httpRpcClient: { rpc(): httpRpc_master };
    constructor() {
        this.userMgr = app.get<UserMgr>("userMgr");
        this.httpRpcClient = app.get("httpRpcClient");
    }

    async login(session: I_user, username: string): Promise<I_res<{ name: string, token: string }>> {
        let info = this.userMgr.login(username);
        if (!info) {
            return resError(1, "账号不存在");
        }
        return resData({ "name": info.name, "token": info.token });
    }

    async loginByToken(session: I_user, token: string): Promise<I_res<{ name: string }>> {
        let info = this.userMgr.loginByToken(token);
        if (!info) {
            return resError(1, "token 已过期");
        }
        return resData({ "name": info.name });
    }

    async getServerList(session: any): Promise<I_res<{ list: { i: number, id: string; startTime: string; }[] }>> {
        let list: { i: number, id: string; startTime: string; }[] = [];
        let index = 0;
        let masterInfo = await this.httpRpcClient.rpc().main.getServerInfo();
        if (!(masterInfo instanceof Error)) {
            index++;
            masterInfo.i = index;
            list.push(masterInfo);
        }
        for (let one of app.getServersByType("connector")) {
            let res = await app.rpcAwait(one.id).connector.main.getServerInfo();
            if (res) {
                index++;
                res.i = index;
                list.push(res);
            }
        }
        return resData({ "list": list });
    }
}