import { GetPositionFromCenter } from "@Functions/.";
import type { View } from "@Models/.";
import { Sizes } from "@Static/.";
import { Panel, Button, TextBox, Label, PopUpBox } from "@Views/Shared";

export class Login implements View{
    Children: View[] = [];
    Priority: number = 0;
    GuestWarning?: PopUpBox;
    LoginWarning?: PopUpBox;

    constructor(){
        const prompt = new Label(      {x:0, y: Sizes.text.title}, {x:640, y: 200}, "Login");
        const backPanel = new Panel(   {x: 640, y:400}, GetPositionFromCenter({x:640, y:320}, {x: 640, y:400}));
        const username = new TextBox(  {x:400, y:40},   GetPositionFromCenter({x:640, y:300}, {x:400, y:40}));
        const password = new TextBox(  {x:400, y:40},   GetPositionFromCenter({x:640, y:360}, {x:400, y:40}));
        const loginButton = new Button({x:150, y:60},  GetPositionFromCenter({x:540, y:450}, {x:150, y:60}), "Login", () => this.OnLogin());
        const guestButton = new Button({x:150, y:60},  GetPositionFromCenter({x:740, y:450}, {x:150, y:60}), "Guest", () => this.OnGuest());

        this.Children.push(backPanel, prompt, username, password, loginButton, guestButton);
    }

    private OnGuest(){
        this.GuestWarning = new PopUpBox(
            "Are you sure you want to play as a guest? \n Your data will only be saved locally.",
            {callBack: () => {this.OnGuestCancel()}, text: "Cancel"},
            {callBack: () => {this.OnGuestConfirm()}, text: "Confirm"}
        );
        this.Children.push(this.GuestWarning);
    }

    private OnGuestCancel(){
        if (this.GuestWarning){
            const indexToRemove = this.Children.indexOf(this.GuestWarning);
            this.Children.splice(indexToRemove, 1);
        }
    }

    private OnGuestConfirm(){
        console.log("Start Game");
    }

    private OnLogin(){
        this.LoginWarning = new PopUpBox(
            "User Authenticate has\nnot been implemented yet.",
            {callBack: () => this.OnLoginOk(), text: "Ok"}
        );
        this.Children.push(this.LoginWarning);
    }

    private OnLoginOk(){
        if (this.LoginWarning){
            const indexToRemove = this.Children.indexOf(this.LoginWarning);
            this.Children.splice(indexToRemove, 1);
        }
    }
}