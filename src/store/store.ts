interface I_user {
    name: string,
    userType: e_userType,
}

enum e_userType {
    superAdmin,
    admin,
    user,
}

class Store {
    private user: I_user = { "name": "ahuang" } as any;

    getUser(): I_user {
        return this.user;
    }

    setUser(user: I_user) {
        this.user = user;
    }
}


export default new Store();