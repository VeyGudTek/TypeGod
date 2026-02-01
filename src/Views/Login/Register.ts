import { CheckRegisterInput } from "@Functions/.";
import type { BasicCallback } from "@Models/.";
import { Sizes } from "@Static/.";
import { BaseView, Button, Label, Panel, PopUpBox, TextBox } from "@Views/Shared";

export class Register extends BaseView{
    RegisterWarning?:PopUpBox;
    InputWarning?:PopUpBox;
    UsernameInput:TextBox;
    PasswordInput:TextBox;
    PasswordRepeatInput:TextBox;

    constructor(onBack:BasicCallback){
        super();
        const prompt = new Label(              {x:0, y: Sizes.text.title}, {x:.5, y: .23}, "Register");
        const usernameLabel = new Label(       {x:0, y: Sizes.text.base},  {x:.35, y: .35}, "Username");
        const passwordLabel = new Label(       {x:0, y: Sizes.text.base},  {x:.35, y: .47}, "Password");
        const passwordRepeatLabel = new Label( {x:0, y: Sizes.text.base},  {x:.39, y: .59}, "Repeat Password");

        const backPanel = new Panel(       {x:.45, y:.75}, {x:.5, y:.5});
        const username = new TextBox(      {x:.4, y:.05},  {x:.5, y:.4});
        const password = new TextBox(      {x:.4, y:.05},  {x:.5, y:.52});
        const passwordRepeat = new TextBox({x:.4, y:.05},  {x:.5, y:.64});
        const backButton = new Button(     {x:.15, y:.05}, {x:.4, y:.77}, "Back", () => onBack());
        const registerButton = new Button( {x:.15, y:.05}, {x:.6, y:.77}, "Register", () => this.OnRegister());

        this.Children.push(backPanel, prompt, usernameLabel, username, passwordLabel, password, passwordRepeatLabel, passwordRepeat, backButton, registerButton);
        this.UsernameInput = username;
        this.PasswordInput = password;
        this.PasswordRepeatInput = passwordRepeat;
    }

    private OnRegister(){
        let inputResult = CheckRegisterInput(this.UsernameInput.Text, this.PasswordInput.Text, this.PasswordRepeatInput.Text);

        if (inputResult){
            this.InputWarning = new PopUpBox(inputResult, 
                {callBack: () => this.OnInputWarningOk(), text:"Ok"}
            );

            this.Children.push(this.InputWarning);
        }
        else{
            this.RegisterWarning = new PopUpBox("User Authenticate has\nnot been implemented yet.",
                {callBack: () => this.OnRegisterOk(), text: "Ok"}
            );

            this.Children.push(this.RegisterWarning);
        }
    }

    private OnRegisterOk(){
        this.RemoveChild(this.RegisterWarning);
    }

    private OnInputWarningOk(){
        this.RemoveChild(this.InputWarning);
    }
}