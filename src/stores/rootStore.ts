import CartStore from './cartStore';
import ToursStore from './toursStore';
import LoginStore from './loginStore';

class RootStore {

    toursStore:ToursStore;
    loginStore:LoginStore;
    cartStore:CartStore

    constructor(){
        this.toursStore = new ToursStore(); 
        this.loginStore = new LoginStore();    
        this.cartStore =  new CartStore();
    }
}
const rootStore = new RootStore();
export default rootStore;