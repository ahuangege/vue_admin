import { eventEmit, e_eventT } from "@/utils/eventUtil";
import cookies from 'js-cookie';

export interface I_user {
    name: string,
}

const TokenKey = 'ahuang_admin_token'

class Store {
    private user: I_user = null as any;

    getUser(): I_user {
        return this.user;
    }

    setUser(user: I_user) {
        this.user = user;
        eventEmit(e_eventT.userInfo, user);
    }

    getToken(): string {
        return cookies.get(TokenKey) as any;
    }

    setToken(token: string) {
        if (!token) {
            cookies.remove(TokenKey);
        } else {
            cookies.set(TokenKey, token);
        }
    }
}


export default new Store();