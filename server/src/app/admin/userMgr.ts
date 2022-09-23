
export interface I_user {
    "uid": number,
    "name": string,
}

export class UserMgr {
    private users: { [uid: number]: I_user } = {
        "1": { "uid": 1, "name": "admin" },
    };
    private token_uid: { [token: string]: number } = {};
    private uid_token: { [uid: number]: string } = {};

    /** 根据token获取账号信息 */
    getUserByToken(token: string) {
        let uid = this.token_uid[token];
        if (!uid) {
            return null;
        }
        let user = this.users[uid];
        return user;
    }

    /** 登录 */
    login(name: string) {
        let user: I_user = null as any;
        for (let x in this.users) {
            if (this.users[x].name == name) {
                user = this.users[x];
                break;
            }
        }
        if (!user) {
            return null;
        }
        let token = this.uid_token[user.uid];
        if (token) {
            return { "name": user.name, "token": token };
        }
        token = this.randToken();
        this.uid_token[user.uid] = token;
        this.token_uid[token] = user.uid;
        return { "name": user.name, "token": token };
    }

    /** 通过token登录 */
    loginByToken(token: string) {
        let uid = this.token_uid[token];
        let user = this.users[uid];
        if (!user) {
            return null;
        }
        return { "name": user.name }
    }

    private randToken(): string {
        let token = Math.floor(Math.random() * 100000 + 1).toString();
        if (this.token_uid[token]) {
            return this.randToken();
        }
        return token;
    }
}