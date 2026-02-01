import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import { BaseTransformView } from "@Views/Shared";
import { LoginContainer } from "@Views/Login";
import { Colors, Sizes, testScript } from "@Static/.";
import { CutScene } from "@Views/CutScene";

export class Main extends BaseTransformView{
    LoginContainer?: LoginContainer;
    CutScene?: CutScene

    constructor(){
        super(windowProvider.WindowSize, {x:0, y:0});

        // this.LoginContainer = new LoginContainer();
        // this.Children.push(this.LoginContainer);

        this.CutScene = new CutScene(testScript);
        this.Children.push(this.CutScene);
    }

    Render(){
        DrawRect(this.Position, this.Size, Colors.background, Colors.border.base, Sizes.border.base);
    }
}
