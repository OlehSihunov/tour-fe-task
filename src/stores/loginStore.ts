import { action, makeObservable, observable } from 'mobx';
import IUser from '../interfaces/IUser';

export default class LoginState {
    constructor() {
        makeObservable(this);
    }

    @observable user :IUser = JSON.parse(localStorage.getItem('user') || '{}')
    @observable users :IUser[] = JSON.parse(localStorage.getItem('users') || '[]')
    @observable isLogged :boolean  = !!JSON.parse(localStorage.getItem('user')||'{}').login

    @action addNewUser = (newUser: IUser) => {
        const l = this.users.find(l => l.login === newUser.login)
        if (l) {
            alert("This Login cannot be created")
        } else {
            this.users.push(newUser)
            this.user = newUser
            this.updateUsers()
            this.isLogged = true;
        }
    }
    @action signOut = () => {
        this.user = JSON.parse('{}')
        localStorage.setItem('selectedTours', '[]');
        this.isLogged = false
        this.updateUsers()
    }
    @action signIn = (user: IUser) => {
        const checkUser = this.users.find(u => u.login === user.login && u.password === user.password)
        if (checkUser) {
            this.user = checkUser;
            this.updateUsers();
            this.isLogged = true
            return this.isLogged
        } else {
            alert("Wrong Login or Password")
            return this.isLogged
        }
    }
    @action getCurrentUserLogin = () => this.user.login
    
    @action isUserLogged = (newUser: IUser) => {
        this.users.find(l => l.login === newUser.login) ? this.isLogged = true : this.isLogged = false
    }

    updateUsers() {
        localStorage.setItem('users', JSON.stringify(this.users))
        localStorage.setItem('user', JSON.stringify(this.user))
    }

}