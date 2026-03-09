import { Login } from "./Login";
import { Register } from "./Register";
import { BaseView, Picture } from "@Views/Shared";
import splashLeftSource from "@Assets/Images/splashLeft.png";
import splashRightSource from "@Assets/Images/splashRight.png";
import type { BasicCallback } from "@Models/Callbacks.type";


export class LoginContainer extends BaseView{
    Login?:Login;
    Register?:Register;
    
    OnLoginFinish:BasicCallback;

    constructor(onLoginFinish:BasicCallback){
        super();
        this.OnLoginFinish = onLoginFinish;
        this.Login = new Login(() => onLoginFinish(), () => this.OnRegister());

        const splashLeft = new Picture(splashLeftSource,   {x:1344, y:2226}, .5, {x:.16, y:.6});
        const splashRight = new Picture(splashRightSource, {x:1394, y:2595}, .5, {x:.85, y:.55});

        this.Children.push(splashLeft, splashRight, this.Login);
    }

    private OnRegister(){
        this.RemoveChild(this.Login);

        this.Register = new Register(() => this.OnBack());
        this.Children.push(this.Register);
    }

    private OnBack(){
        this.RemoveChild(this.Register);

        this.Login = new Login(()=> this.OnLoginFinish(), () => this.OnRegister());
        this.Children.push(this.Login);
    }
}