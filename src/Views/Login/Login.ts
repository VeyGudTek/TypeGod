import { CheckLoginInput } from "@Functions/.";
import type { BasicCallback } from "@Models/.";
import { Sizes } from "@Static/.";
import { Panel, Button, TextBox, Label, PopUpBox, BaseView } from "@Views/Shared";

export class Login extends BaseView{
    GuestWarning?: PopUpBox;
    LoginWarning?: PopUpBox;
    InputWarning?: PopUpBox;

    UsernameInput:TextBox;
    PasswordInput:TextBox;

    constructor(onRegister:BasicCallback){
        super();
        const prompt = new Label(         {x:0, y: Sizes.text.title}, {x:.5, y: .25}, "Login");
        const backPanel = new Panel(      {x:.45, y:.75},             {x:.5, y: .5});
        const usernameLabel = new Label(  {x:0, y: Sizes.text.base},  {x:.35, y: .35}, "Username");
        const username = new TextBox(     {x:.4, y:.05},              {x:.5, y: .4});
        const passwordLabel = new Label(  {x:0, y: Sizes.text.base},  {x:.35, y: .5},  "Password");
        const password = new TextBox(     {x:.4, y:.05},              {x:.5, y:.55});
        const loginButton = new Button(   {x:.15, y:.05},             {x:.4, y:.7},   "Login", () => this.OnLogin());
        const guestButton = new Button(   {x:.15, y:.05},             {x:.6, y:.7},   "Guest", () => this.OnGuest());
        const registerButton = new Button({x:.25, y:.05},             {x:.5, y:.8},   "Register", () => onRegister());

        this.Children.push(backPanel, prompt, usernameLabel, username, passwordLabel, password, loginButton, guestButton, registerButton);

        this.UsernameInput = username;
        this.PasswordInput = password;
    }

    private OnGuest(){
        this.GuestWarning = new PopUpBox(
            "Are you sure you want\nto play as a guest?\nYour data will only\nbe saved locally.",
            {callBack: () => {this.OnGuestCancel()}, text: "Cancel"},
            {callBack: () => {this.OnGuestConfirm()}, text: "Confirm"}
        );
        this.Children.push(this.GuestWarning);
    }

    private OnGuestCancel(){
        this.RemoveChild(this.GuestWarning);
    }

    private OnGuestConfirm(){
        console.log("Start Game");
    }

    private OnLogin(){
        let inputResult = CheckLoginInput(this.UsernameInput.Text, this.PasswordInput.Text);

        if (inputResult){
            this.InputWarning = new PopUpBox(inputResult,
                {callBack: () => this.OnInputWarningOk(), text: "Ok"}
            );
            this.Children.push(this.InputWarning);
        }
        else{
            this.LoginWarning = new PopUpBox(
                "User Authenticate has\nnot been implemented yet.",
                {callBack: () => this.OnLoginOk(), text: "Ok"}
            );
            this.Children.push(this.LoginWarning);
        }
    }

    private OnLoginOk(){
        this.RemoveChild(this.LoginWarning);
    }

    private OnInputWarningOk(){
        this.RemoveChild(this.InputWarning);
    }
}