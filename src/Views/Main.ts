import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import { BaseTransformView, Fade, CutScene, LoginContainer, GameManager } from "@Views/.";
import { Colors, Sizes, testScript } from "@Static/.";

export class Main extends BaseTransformView{
    Fade?:Fade;
    LoginContainer?: LoginContainer;
    CutScene?: CutScene
    GameManager?: GameManager

    constructor(){
        super(windowProvider.WindowSize, {x:0, y:0});

        // this.LoginContainer = new LoginContainer(() => this.LoadCutscene());
        // this.Children.push(this.LoginContainer);

        this.CutScene = new CutScene(testScript);
        this.Children.push(this.CutScene);

        // this.GameManager = new GameManager("0", () => console.log("Game Ended"));
        // this.Children.push(this.GameManager);
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
