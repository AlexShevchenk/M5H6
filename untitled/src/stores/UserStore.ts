import { makeAutoObservable} from "mobx";
import * as userApi from "../api/modules/users";

class UserStore {
    name = "";
    job = "";
    updatedAt = "";
    error ="";

    constructor() {
        makeAutoObservable(this);
    }

    async updateUser(name: string, job: string, id: number) {
        const result = await userApi.updateUser({name, job, id});
        this.name = await result.name;
        this.job = await result.job;
        this.updatedAt = await result.updatedAt;
        this.error = result.error;

    }

}

export default UserStore;