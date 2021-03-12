import {action,makeObservable,observable} from 'mobx';
import ILogin from '../interfaces/ILogin';

export default class LoginState {
    constructor(){
        makeObservable(this);
    }

    @observable isLogged: boolean = false;
    @observable userLogin: string = "";
    @observable userPassword: string = "";
    @observable userLoginAndPasState: {login: string, password: string}[] = [
        {login: "admin", password: "admin"}
    ]

    @action setUserLoginValue = (e:any) => {
        this.userLogin = e.target.value
    }
    @action setUserPasswordValue = (e:any) => {
        this.userPassword = e.target.value
    }
    @action logouting = () => {
        this.isLogged = false;
        this.userLogin = "";
        this.userPassword = "";
    }  
    @action loginSubmit = (e:any) => {
        e.preventDefault();
        if (
            this.userLoginAndPasState.some(element => element.login === this.userLogin)
            && this.userLoginAndPasState.some(element => element.password === this.userPassword))
            {        
                this.isLogged = true;
            } else alert("Wrong Login or Password")
    }
    @action signInSubmit = (e:any) => {
        e.preventDefault();
        if (this.userLoginAndPasState.some(element => element.login === this.userLogin)){
            alert("This Login cannot be created")               
            } else {
                this.userLoginAndPasState.push({login: this.userLogin, password: this.userPassword})
                this.isLogged = true;
            }
        this.userLoginAndPasState.forEach(element => console.log(`Login: ${element.login} Password: ${element.password}`))
    }
}
