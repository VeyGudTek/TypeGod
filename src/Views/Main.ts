import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import { BaseTransformView, Fade } from "@Views/Shared";
import { LoginContainer } from "@Views/Login";
import { Colors, Sizes, testScript } from "@Static/.";
import { CutScene } from "@Views/CutScene";

export class Main extends BaseTransformView{
    Fade?:Fade;
    LoginContainer?: LoginContainer;
    CutScene?: CutScene

    constructor(){
        super(windowProvider.WindowSize, {x:0, y:0});

        this.LoginContainer = new LoginContainer(() => this.LoadCutscene());
        this.Children.push(this.LoginContainer);
    }

    private RemoveFade(){
        this.RemoveChild(this.Fade);
    }

    private LoadCutscene(){
        const onFadeMidpoint = () => {
            this.Children = this.Children.filter(v => v === this.Fade);
            this.CutScene = new CutScene(testScript);
            this.Children.splice(0, 0, this.CutScene);
        }

        this.Fade = new Fade(() => onFadeMidpoint(), () => this.RemoveFade());
        this.Children.push(this.Fade);
    }

    Render(){
        DrawRect(this.Position, this.Size, Colors.background, Colors.border.base, Sizes.border.base);
    }
}
