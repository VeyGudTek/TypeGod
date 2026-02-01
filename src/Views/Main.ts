import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import { BaseTransformView } from "@Views/Shared";
import { LoginContainer } from "@Views/Login";
import { Colors, Sizes } from "@Static/.";
import { CutSceneContainer } from "@Views/CutScene";

export class Main extends BaseTransformView{
    LoginContainer?: LoginContainer;
    CutSceneContainer?: CutSceneContainer

    constructor(){
        super(windowProvider.WindowSize, {x:0, y:0});

        // this.LoginContainer = new LoginContainer();
        // this.Children.push(this.LoginContainer);

        this.CutSceneContainer = new CutSceneContainer();
        this.Children.push(this.CutSceneContainer);
    }

    Render(){
        DrawRect(this.Position, this.Size, Colors.background, Colors.border.base, Sizes.border.base);
    }
}
