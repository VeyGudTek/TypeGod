import { Login } from "./Login";
import { Register } from "./Register";
import { BaseView } from "@Views/Shared";

export class LoginContainer extends BaseView{
    Login?:Login;
    Register?:Register;
    

    constructor(){
        super();
        this.Login = new Login(() => this.OnRegister());
        this.Children.push(this.Login);
    }

    private OnRegister(){
        this.RemoveChild(this.Login);

        this.Register = new Register(() => this.OnBack());
        this.Children.push(this.Register);
    }

    private OnBack(){
        this.RemoveChild(this.Register);

        this.Login = new Login(() => this.OnRegister());
        this.Children.push(this.Login);
    }
}