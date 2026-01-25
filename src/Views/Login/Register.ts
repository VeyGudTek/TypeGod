import { GetPositionFromCenter } from "@Functions/.";
import type { BasicCallback } from "@Models/.";
import { Sizes } from "@Static/.";
import { BaseView, Button, Label, Panel, PopUpBox, TextBox } from "@Views/Shared";

export class Register extends BaseView{
    RegisterWarning?:PopUpBox;

    constructor(onBack:BasicCallback){
        super();
        const prompt = new Label(          {x:0, y: Sizes.text.title}, {x:640, y: 125}, "Register");
        const backPanel = new Panel(       {x: 640, y:500}, GetPositionFromCenter({x:640, y:320}, {x: 640, y:500}));
        const usernameLabel = new Label(  {x:0, y: Sizes.text.base}, {x:500, y: 200}, "Username");
        const username = new TextBox(      {x:400, y:40},   GetPositionFromCenter({x:640, y:235}, {x:400, y:40}));
        const passwordLabel = new Label(  {x:0, y: Sizes.text.base}, {x:500, y: 290}, "Password");
        const password = new TextBox(      {x:400, y:40},   GetPositionFromCenter({x:640, y:325}, {x:400, y:40}));
        const passwordRepeatLabel = new Label(  {x:0, y: Sizes.text.base}, {x:537, y: 380}, "Repeat Password");
        const passwordRepeat = new TextBox({x:400, y:40},   GetPositionFromCenter({x:640, y:415}, {x:400, y:40}));
        const backButton = new Button(     {x:175, y:40},  GetPositionFromCenter({x:540, y:525}, {x:175, y:60}), "Back", () => onBack());
        const registerButton = new Button( {x:175, y:40},  GetPositionFromCenter({x:740, y:525}, {x:175, y:60}), "Register", () => this.OnRegister());

        this.Children.push(backPanel, prompt, usernameLabel, username, passwordLabel, password, passwordRepeatLabel, passwordRepeat, backButton, registerButton);
    }

    private OnRegister(){
        this.RegisterWarning = new PopUpBox("User Authenticate has\nnot been implemented yet.",
            {callBack: () => this.OnRegisterOk(), text: "Ok"}
        );

        this.Children.push(this.RegisterWarning);
    }

    private OnRegisterOk(){
        this.RemoveChild(this.RegisterWarning);
    }
}