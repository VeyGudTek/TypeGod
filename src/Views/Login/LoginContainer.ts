import type { View } from "@Models/.";
import { Login } from "./Login";
import { Register } from "./Register";

export class LoginContainer implements View{
    Children: View[] = [];
    Priority: number = 0;

    Login?:Login;
    Register?:Register;
    

    constructor(){
        this.Login = new Login(() => this.OnRegister());
        this.Children.push(this.Login);
    }

    private OnRegister(){
        if (this.Login){
            const indexToRemove = this.Children.indexOf(this.Login);
            this.Children.splice(indexToRemove, 1);
        }

        this.Register = new Register(() => this.OnBack());
        this.Children.push(this.Register);
    }

    private OnBack(){
        if (this.Register){
            const indexToRemove = this.Children.indexOf(this.Register);
            this.Children.splice(indexToRemove, 1);
        }

        this.Login = new Login(() => this.OnRegister());
        this.Children.push(this.Login);
    }
}