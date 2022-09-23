
/** 项目名 */
export interface httpRpc_admin {
    /** 测试文件名 */
    testFile: httpRpc_admin.files.testFile

}

/** 项目名 */
export namespace httpRpc_admin {
    /** 文件列表 */
    export namespace files {
        export interface testFile {
            /** 加法 */
            add: (num1: number, num2: number) => Promise<number>;
        }
    }

    // 以下是部分接口定义
    interface mail {
        id: number,
        uid: number
    }

}