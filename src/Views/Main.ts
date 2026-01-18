import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import type { View } from "@Models/.";
import { BaseView } from "@Views/Shared";
import { Login } from "@Views/Login";
import { Colors, Sizes } from "@Static/.";

export class Main extends BaseView{
    Children:View[] = [];
    LoginPage: Login;

    constructor(){
        super(windowProvider.WindowSize, {x:0, y:0});

        this.LoginPage = new Login();
        this.Children.push(this.LoginPage);
    }

    OnUpdate(){
        this.ClearScreen();
    }

    ClearScreen(){
        DrawRect(this.Position, this.Size, Colors.background, Colors.border.base, Sizes.border.base);
    }
}
