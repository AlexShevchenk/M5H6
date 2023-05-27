import AuthStore from "../stores/AuthStore";
import RegistrationStore from "../stores/RegistrerStore";
import UserStore from "../stores/UserStore";
export interface IAppStore {
    'authStore': AuthStore,
    'registerStore': RegistrationStore,
    'userStore': UserStore
}
