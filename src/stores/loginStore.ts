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
                this.user = response
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
                    this.user = response
                    this.updateUsers()
                    this.isLogged=true
                }})
    }
    @action getCurrentUserLogin = () => this.user.login
    
    @action updateUserBalance = (newBalance :number) => {
        console.log(newBalance)
        console.log(this.user)
        fetch('http://localhost:8765/api/users/changeBalance', {
                method: 'POST',
                body: JSON.stringify({
                    id:`${this.user.id}`,
                    login: `${this.user.login}`,
                    password: `${this.user.password}`,
                    balance: newBalance
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
                    this.user = response
                    this.updateUsers()
                    this.isLogged=true
                    
                    window.location.reload();
                }})
            
    }

    updateUsers() {
        localStorage.setItem('user', JSON.stringify(this.user))
    }

}