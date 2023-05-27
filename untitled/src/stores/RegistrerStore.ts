import { makeAutoObservable} from "mobx";
import * as registerApi from "../api/modules/registration";

class RegisterStore {
    token = "";
    id = 0;
    error = "";

    constructor() {
        makeAutoObservable(this);
    }

    async registration(email: string, password: string) {
        const result = await registerApi.registration({email, password});
        this.token = result.token;
        this.id = result.id;
        this.error =  result.error;

    }
    async logout() {

        this.token = "";
        this.id = 0;
        this.error = "";
    }
}

export default RegisterStore;