import CartStore from './cartStore';
import ToursStore from './toursStore';

class RootStore {

    toursStore: ToursStore;
    cartStore: CartStore;
    constructor(){
        this.toursStore =  new ToursStore();
        this.cartStore =  new CartStore();
    }
}

const rootStore = new RootStore();
export default rootStore;