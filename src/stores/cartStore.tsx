import {action, makeObservable, observable} from 'mobx';
import ITour from '../interfaces/ITour';
import ITourStore from '../interfaces/ITourstore';


export default class CartStore {
  constructor(){
    makeObservable(this)
  }
  @observable selectedTours: ITourStore[] = JSON.parse(localStorage.getItem('selectedTours') || '[]');
  @action checkoutTours = () => {
    this.selectedTours= [];
    alert('Congratulations! Your order is accepted, please wait for our call.');
    this.saveTours();
    window.location.reload();
  }
  @action addPerson = (id: number) => {
    this.selectedTours.map(el => {
      if (el.id === id) el.personCount++;
        return el;
      });
    this.saveTours();
  }
  @action removePerson = (id: number) => {
    this.selectedTours.map(el => {
      if (el.id === id) el.personCount--;
        return el;
      });
    this.saveTours();
  }
  @action addNewTour = (newTour:ITour|undefined) => {
    if(newTour)this.selectedTours = [...this.selectedTours,{...newTour,personCount:1}];
    this.saveTours();
  }
  @action removeTour = (id: number) => {
    this.selectedTours = this.selectedTours.filter(el => el.id !== id);
    this.saveTours();
  }
  saveTours() {
    localStorage.setItem('selectedTours', JSON.stringify(this.selectedTours));
  }
}
