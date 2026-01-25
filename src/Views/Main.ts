import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import type { View } from "@Models/.";
import { BaseTransformView } from "@Views/Shared";
import { LoginContainer } from "@Views/Login";
import { Colors, Sizes } from "@Static/.";

export class Main extends BaseTransformView{
    Children:View[] = [];
    LoginContainer: LoginContainer;

    constructor(){
        super(windowProvider.WindowSize, {x:0, y:0});

        this.LoginContainer = new LoginContainer();
        this.Children.push(this.LoginContainer);
    }

    OnUpdate(){
        this.ClearScreen();
    }

    ClearScreen(){
        DrawRect(this.Position, this.Size, Colors.background, Colors.border.base, Sizes.border.base);
    }
}
