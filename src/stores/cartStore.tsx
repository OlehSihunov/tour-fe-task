import {action, makeObservable, observable} from 'mobx';
import ITour from '../interfaces/ITour';
import IUser from '../interfaces/IUser';
import ITourStore from '../interfaces/ITourstore';
import rootStore from './rootStore';
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
  @action removeTour = (id: number) => {
    this.selectedTours = this.selectedTours.filter(el => el.id !== id);
    this.saveTours();
  }
  saveTours() {
    localStorage.setItem('selectedTours', JSON.stringify(this.selectedTours));
  }
}
