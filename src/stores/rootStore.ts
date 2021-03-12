import {action,observable} from 'mobx';
import ToursStore from './toursStore';
import LoginStore from './loginStore';

class RootStore {

    toursStore:ToursStore;
    loginStore:LoginStore;

    constructor(){
        this.toursStore = new ToursStore(); 
        this.loginStore = new LoginStore(); 
    }
}
const loginStore = new LoginStore();
const rootStore = new RootStore();
export default rootStore;