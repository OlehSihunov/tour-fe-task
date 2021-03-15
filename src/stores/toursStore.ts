import {action,makeObservable,observable} from 'mobx';
import ITour from '../interfaces/itour';



export default class ToursStore {
    constructor(){
        makeObservable(this);
    }

    @observable tours : ITour[] = []; //how to make observed variables

    @action getTours = async() => {
        try{
            this.tours = await new Promise<ITour[]>((resolve, reject) => {
              setTimeout(() => {
                  resolve(
                      fetch('./data.json').then(data => data.json())
                  );
              }, 100);
            });
        }
        catch(e){
            console.error(e.message)
        }
    }
}