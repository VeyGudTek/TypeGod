import { GetPositionFromCenter } from "@Functions/.";
import type { BasicCallback } from "@Models/.";
import { Sizes } from "@Static/.";
import { BaseView, Button, Label, Panel, PopUpBox, TextBox } from "@Views/Shared";

export class Register extends BaseView{
    RegisterWarning?:PopUpBox;

    constructor(onBack:BasicCallback){
        super();
        const prompt = new Label(          {x:0, y: Sizes.text.title}, {x:640, y: 180}, "Register");
        const backPanel = new Panel(       {x: 640, y:400}, GetPositionFromCenter({x:640, y:320}, {x: 640, y:400}));
        const username = new TextBox(      {x:400, y:40},   GetPositionFromCenter({x:640, y:250}, {x:400, y:40}));
        const password = new TextBox(      {x:400, y:40},   GetPositionFromCenter({x:640, y:320}, {x:400, y:40}));
        const passwordRepeat = new TextBox({x:400, y:40},   GetPositionFromCenter({x:640, y:390}, {x:400, y:40}));
        const backButton = new Button(     {x:175, y:40},  GetPositionFromCenter({x:540, y:475}, {x:175, y:60}), "Back", () => onBack());
        const registerButton = new Button( {x:175, y:40},  GetPositionFromCenter({x:740, y:475}, {x:175, y:60}), "Register", () => this.OnRegister());

        this.Children.push(backPanel, prompt, username, password, passwordRepeat, backButton, registerButton);
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