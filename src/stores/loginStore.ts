import { action, makeObservable, observable } from 'mobx';
import IUser from '../interfaces/IUser';

export default class LoginState {
    constructor() {
        makeObservable(this);
    }

    @observable user :IUser = JSON.parse(localStorage.getItem('user') || '{}')
    @observable isLogged :boolean  = !!JSON.parse(localStorage.getItem('user')||'{}').login

    @action addNewUser = (newUser: IUser) => {
            fetch('http://localhost:8765/api/users/signUp', {
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
            .then((response) => response.json()).then(response=>{
            if(response.status ===400){
                alert(response.message)
            }else{
                this.user = newUser
                this.updateUsers()
                this.isLogged=true
            }}).then((json) => console.log(json));
           
        
    }
    @action signOut = () => {
        this.user = JSON.parse('{}')
        this.isLogged = false
        this.updateUsers()
    }
    @action signIn = (user: IUser) => {
            fetch('http://localhost:8765/api/users/signIn', {
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
            .then(response =>{
                if(response.status ===400){
                    alert(response.message)
                }else{
                    this.user = user
                    this.updateUsers()
                    this.isLogged=true
                }})
    }
    @action getCurrentUserLogin = () => this.user.login
    

    updateUsers() {
        localStorage.setItem('user', JSON.stringify(this.user))
    }

}