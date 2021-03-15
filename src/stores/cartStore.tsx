import {action, makeObservable, observable} from 'mobx';
import ITourStore from '../interfaces/ITourstore';


export default class CartStore {
  constructor(){
    makeObservable(this)
  }
  @observable selectedTours: ITourStore[] = []; //JSON.parse(localStorage.getItem('selectedTours')||'[]');

  @action checkoutTours = () => {
    this.selectedTours= [];
    alert('Tours have been accepted');
    // this.saveTours();
  }
    
  @action addPerson = (id: number) => {
    this.selectedTours.map(el => {
      if (el.id === id) el.personCount++;
        return el;
      });
    // this.saveTours();
  }
  @action removePerson = (id: number) => {
    this.selectedTours.map(el => {
      if (el.id === id) el.personCount--;
        return el;
      })
  }
  @action addNewTour = (selectedTours: ITourStore[]) => {
    this.selectedTours = selectedTours;
    // this.saveTours()
  }
  @action removeTour = (id: number) => {
    this.selectedTours = this.selectedTours.filter(el => el.id !== id);
    // this.saveTours();
  }
  // saveTours() {
  //   localStorage.setItem('selectedTours', JSON.stringify(this.selectedTours));
  //}
}
