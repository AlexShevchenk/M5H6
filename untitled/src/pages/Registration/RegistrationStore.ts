import {
    makeAutoObservable,
} from "mobx";
import RegisterStore from "../../stores/RegistrerStore";


class RegistrationStore {

    private registerStore: RegisterStore;

    email = '';
    password = '';
    error = '';
    isLoading = false;

    constructor(registerStore: RegisterStore) {
        this.registerStore = registerStore;
        makeAutoObservable(this);
    }

    changeEmail(email: string) {
        this.email = email;
        if (!this.email) {
            this.error = "Missing email";
        }
    }

    changePassword(password: string) {
        this.password = password;
        if (!this.password) {
            this.error = 'Missing Pass';
        }
    }

    async registration() {
        try {
            this.isLoading = true;
            await this.registerStore.registration(this.email, this.password);
        }
        catch (e) {
            this.isLoading = false;

        }

    }
    async logout(){
        try {
            await this.registerStore.logout();
        }
        catch (e) {

        }
        this.isLoading = false;
    }
}

export default RegistrationStore;