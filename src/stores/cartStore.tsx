import {action, makeObservable, observable} from 'mobx';
import ITour from '../interfaces/ITour';
import ITourStore from '../interfaces/ITourstore';
export default class CartStore {
  constructor(){
    makeObservable(this)
  }
  @observable selectedTours: ITourStore[] = JSON.parse(localStorage.getItem('selectedTours') || '[]');

  
  @action checkoutTours = (userId: string) => {
    const order:ITourStore[] = this.selectedTours.filter(el=>el.userId===userId)
    order.forEach(element => {
      fetch('http://localhost:8765/api/tours/users/addNew', {
                method: 'POST',
                body: JSON.stringify({
                    userId: `${element.userId}`,
                    tourId: `${element.id}`,
                    amount: `${element.personCount}`
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json()).then(response=>{
            if(response.status ===400){
                alert(response.message)
            }})
    });
    this.selectedTours= this.selectedTours.filter(el => el.userId !== userId);
    alert('Congratulations! Your order is accepted, please wait for our call.');
    this.saveTours();
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
