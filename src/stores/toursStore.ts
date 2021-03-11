import {action,makeObservable,observable} from 'mobx';
import ITour from '../interfaces/ITour';

export default class ToursStore {
    constructor(){
        makeObservable(this);
    }

    @observable tours:ITour[] = []; //how to make observed variables

    @action getTours = () => {
        //just example how to do methods
    }
}