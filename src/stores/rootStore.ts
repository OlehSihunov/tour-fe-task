import {action,observable} from 'mobx';
import ToursStore from './toursStore';

class RootStore {

    toursStore:ToursStore;

    constructor(){
        this.toursStore =  new ToursStore();
    }
}

const rootStore = new RootStore();
export default rootStore;