/**
 * version: 1.0.0
 * 这是测试项目的声明文件
 */

/** 项目名 */
export interface httpRpc_master {
    /** 测试文件名 */
    main: httpRpc_master.files.mainFile

}

/** 项目名 */
export namespace httpRpc_master {
    /** 文件列表 */
    export namespace files {
        export interface mainFile {
            /** 获取服务器信息 */
            getServerInfo: () => Promise<{ "i": number, "id": string, "startTime": string }>;
        }
    }


}

