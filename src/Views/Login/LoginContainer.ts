import { Login } from "./Login";
import { Register } from "./Register";
import { BaseView, Picture } from "@Views/Shared";
import splashLeftSource from "@Assets/Images/splashLeft.png";
import splashRightSource from "@Assets/Images/splashRight.png";


export class LoginContainer extends BaseView{
    Login?:Login;
    Register?:Register;
    

    constructor(){
        super();
        this.Login = new Login(() => this.OnRegister());

        const splashLeft = new Picture(splashLeftSource,   {x:1344, y:2226}, .6, {x:.16, y:.55});
        const splashRight = new Picture(splashRightSource, {x:1394, y:2595}, .6, {x:.85, y:.5});

        this.Children.push(splashLeft, splashRight, this.Login);
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