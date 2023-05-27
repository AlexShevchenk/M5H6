import {
    makeAutoObservable,
} from "mobx";
import UserStore from "../../stores/UserStore";


class UsrStore {

    private usrStore: UserStore;

    name = '';
    job = '';
    id = 0;
    error = '';
    isLoading = false;

    constructor(usrStore: UserStore) {
        this.usrStore = usrStore;
        makeAutoObservable(this);
    }

    changeName(name: string) {
        this.name = name;

    }

    changeJob(job: string) {
        this.job = job;

    }

    async updating() {
        try {
            this.isLoading = true;
            await this.usrStore.updateUser(this.name, this.job, this.id);
        }
        catch (e) {
            this.isLoading = false;
        }
        this.isLoading = false;
    }
}

export default UsrStore;