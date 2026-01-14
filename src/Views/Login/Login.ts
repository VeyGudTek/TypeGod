import { GetPositionFromCenter } from "@Functions/.";
import type { View } from "@Models/.";
import { Sizes } from "@Static/.";
import { Panel, Button, TextBox, Label } from "@Views/Shared";

export class Login implements View{
    Children: View[] = [];

    constructor(){
        const prompt = new Label(      {x:0, y: Sizes.text.title}, {x:640, y: 200}, "Login");
        const backPanel = new Panel(   {x: 640, y:400}, GetPositionFromCenter({x:640, y:320}, {x: 640, y:400}));
        const username = new TextBox(  {x:400, y:40},   GetPositionFromCenter({x:640, y:300}, {x:400, y:40}));
        const password = new TextBox(  {x:400, y:40},   GetPositionFromCenter({x:640, y:360}, {x:400, y:40}));
        const loginButton = new Button({x:150, y:60},  GetPositionFromCenter({x:540, y:450}, {x:150, y:60}), "Login", () => {console.log("Login")});
        const guestButton = new Button({x:150, y:60},  GetPositionFromCenter({x:740, y:450}, {x:150, y:60}), "Guest", () => {console.log("Guest")});

        this.Children.push(backPanel, prompt, username, password, loginButton, guestButton);
    }
}