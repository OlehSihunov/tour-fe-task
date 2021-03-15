import { action, makeObservable, observable } from 'mobx';
import { stringify } from 'node:querystring';
import IUser from '../interfaces/IUser';

export default class LoginState {
    constructor() {
        makeObservable(this);
    }

    @observable user: IUser = JSON.parse(localStorage.getItem('user') || '{}')
    @observable users: IUser[] = JSON.parse(localStorage.getItem('users') || '[]')

    @action addNewUser = (newUser: IUser) => {
            const l = this.users.find(l => l.login === newUser.login)
            if(l){
            alert("This Login cannot be created")
        } else {
            this.users.push(newUser)
            this.updateUsers()
            console.log(JSON.stringify(this.users))
        }
    }
    @action logouting = () => {
        this.user = JSON.parse('{}')
    }
    @action logining(user: IUser) {
        const u = this.users.find(u => u.login === user.login && u.password === user.password)
        if (u) {
            this.user = u;
            this.updateUsers()
        } else{
            alert("Wrong Login or Password")
        }
    }    
    @action getCurrentUserLogin = () => this.user.login
    updateUsers() {
        localStorage.setItem('users',JSON.stringify(this.users))
        localStorage.setItem('user',JSON.stringify(this.user))
    }    
}