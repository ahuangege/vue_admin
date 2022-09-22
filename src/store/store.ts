import { eventEmit, e_eventT } from "@/utils/eventUtil";

export interface I_user {
    name: string,
}


class Store {
    private user: I_user = { "name": "ahuang" } as any;

    getUser(): I_user {
        return this.user;
    }

    setUser(user: I_user) {
        this.user = user;
        eventEmit(e_eventT.userInfo, user);
    }
}


export default new Store();