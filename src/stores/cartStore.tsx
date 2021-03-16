import {action, makeObservable, observable} from 'mobx';
import ITour from '../interfaces/ITour';
import ITourStore from '../interfaces/ITourstore';


export default class CartStore {
  constructor(){
    makeObservable(this)
  }
  @observable selectedTours: ITourStore[] = [];

  @action checkoutTours = () => {
    this.selectedTours= [];
    alert('Congratulations! Your order is accepted, please wait for our call.');
  }
    
  @action addPerson = (id: number) => {
    this.selectedTours.map(el => {
      if (el.id === id) el.personCount++;
        return el;
      });
  }
  @action removePerson = (id: number) => {
    this.selectedTours.map(el => {
      if (el.id === id) el.personCount--;
        return el;
      })
  }
  @action addNewTour = (selectedTours: ITourStore[]) => {
    this.selectedTours = selectedTours;
  }
  @action addNewTour2 = (newTour:ITour|undefined) => {
    if(newTour)this.selectedTours = [...this.selectedTours,{...newTour,personCount:1}]
  }
  @action removeTour = (id: number) => {
    this.selectedTours = this.selectedTours.filter(el => el.id !== id);
  }
}
