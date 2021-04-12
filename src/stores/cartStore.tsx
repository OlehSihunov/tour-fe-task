import {action, makeObservable, observable} from 'mobx';
import ITour from '../interfaces/ITour';
import ITourStore from '../interfaces/ITourstore';
export default class CartStore {
  constructor(){
    makeObservable(this)
  }
  @observable selectedTours: ITourStore[] = JSON.parse(localStorage.getItem('selectedTours') || '[]');

  @action balanceLimit = (s: number) => {
    return 2000 - s
  }
  
  @action checkoutTours = (userId: string) => {
    this.selectedTours= this.selectedTours.filter(el => el.userId !== userId);
    alert('Congratulations! Your order is accepted, please wait for our call.');
    this.saveTours();
    window.location.reload();
  }
  @action addPerson = (id: number, userId: string) => {
    this.selectedTours.map(el => {
      if (el.id === id && el.userId === userId) el.personCount++;
        return el;
      });
    this.saveTours();
  }
  @action removePerson = (id: number, userId: string) => {
    this.selectedTours.map(el => {
      if (el.id === id && el.userId === userId) el.personCount--;
        return el;
      });
    this.saveTours();
  }
  @action addNewTour = (newTour: ITour|undefined, userId: string) => {
    if(newTour) this.selectedTours = [...this.selectedTours,{...newTour,personCount:1, userId}];
    this.saveTours();
  }
  @action removeTour = (id: number, userId: string) => {
    this.selectedTours = [...this.selectedTours.filter(el =>el.userId !== userId),...this.selectedTours.filter(el => el.userId === userId && el.id !== id )];
    this.saveTours();
  }
  saveTours() {
    localStorage.setItem('selectedTours', JSON.stringify(this.selectedTours));
  }
}
