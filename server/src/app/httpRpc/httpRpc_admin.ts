/**
 * version: 1.0.0
 * 这是测试项目的声明文件
 */

/** 项目名 */
export interface httpRpc_admin {
    /** 测试文件名 */
    main: httpRpc_admin.files.mainFile

}

/** 项目名 */
export namespace httpRpc_admin {
    /** 文件列表 */
    export namespace files {
        export interface mainFile {
            /**
             * 登录
             */
            login: (session: any, username: string) => Promise<I_res<{ "name": string, "token": string }>>;
            /**
             * 通过 token 登录
             */
            loginByToken: (session: any, token: string) => Promise<I_res<{ "name": string }>>;
            /**
             * 获取服务器列表
             */
            getServerList: (session: any) => Promise<I_res<{ "list": { "i": number, "id": string, "startTime": string }[] }>>;
        }
    }


}


interface I_res<T> {
    code: number,
    errMsg?: string,
    data: T,
}