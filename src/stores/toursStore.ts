import {action,makeObservable,observable} from 'mobx';
import ITour from '../interfaces/ITour';



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

    getPage = (page :number,size :number,sort: string, minPrice :number, maxPrice :number) => {
      const pageTours = this.tours.slice();
      if(sort === 'ASC')
        pageTours.sort((a:ITour,b:ITour) => parseInt(a.price)-parseInt(b.price) )
      else 
        pageTours.sort((a:ITour,b:ITour) => parseInt(b.price)-parseInt(a.price) )
      console.log(sort)
      pageTours.filter((tour:ITour) => parseInt(tour.price)>minPrice&&parseInt(tour.price)<maxPrice)
      return pageTours.filter((el :ITour,index: number) =>index>=(page-1)*size && index<page*size)
    }

    getTourById = (id:number) => this.tours.find(el => el.id === id)
}