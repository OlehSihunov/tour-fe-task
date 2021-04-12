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
            fetch('http://localhost:8765/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({
                    id: `${newUser.id}`,
                    login: `${newUser.login}`,
                    password: `${newUser.password}`,
                    balance: 2000
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) => console.log(json));
            // this.users.push(newUser)
            this.user = newUser
            //this.updateUsers()
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
            fetch('http://localhost:8765/api/users/signin', {
                method: 'POST',
                body: JSON.stringify({
                    login: `${user.login}`,
                    password: `${user.password}`
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) => console.log(json));
            // this.user = checkUser;
            // this.updateUsers();
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