import { Login } from "./Login";
import { Register } from "./Register";
import { BaseView, Picture } from "@Views/Shared";
import { GetPositionFromCenter } from "@Functions/.";
import splashLeftSource from "@Assets/Images/splashLeft.png";
import splashRightSource from "@Assets/Images/splashRight.png";


export class LoginContainer extends BaseView{
    Login?:Login;
    Register?:Register;
    

    constructor(){
        super();
        this.Login = new Login(() => this.OnRegister());

        const splashLeft = new Picture(splashLeftSource, {x: 392 , y:650}, GetPositionFromCenter({x:200, y:350}, {x: 392 , y:650}));
        const splashRight = new Picture(splashRightSource, {x: 376, y:700}, GetPositionFromCenter({x:1100, y:300}, {x: 376, y:700}));

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