import { DrawRect } from "@Functions/.";
import { windowProvider } from "@Services/.";
import { BaseTransformView, Fade, CutScene, GameManager, Start, HomeContainer, Results } from "@Views/.";
import { Colors, Sizes, testScript } from "@Static/.";
import type { StageIndex } from "@Models/.";

export class Main extends BaseTransformView{
    private Fade?:Fade;
    private Start?: Start;
    private HomeContainer?: HomeContainer;
    private CutScene?: CutScene
    private GameManager?: GameManager
    private Results?: Results;

    constructor(){
        super(windowProvider.WindowSize, {x:0, y:0});

        // this.Start = new Start(() => this.LoadCutscene());
        // this.Children.push(this.Start);

        // this.HomeContainer = new HomeContainer((index) => this.LoadLevel(index));
        // this.Children.push(this.HomeContainer);

        // this.CutScene = new CutScene(testScript);
        // this.Children.push(this.CutScene);

        this.GameManager = new GameManager("0", () => console.log("Game Ended"));
        this.Children.push(this.GameManager);

        // this.Results = new Results(574, 43, 22);
        // this.Children.push(this.Results);
    }

    private LoadLevel(stageIndex:StageIndex){
        const onFadeMidpoint = () => {
            this.Children = this.Children.filter(v => v === this.Fade);
            this.GameManager = new GameManager(stageIndex, () => this.LoadCutscene());
            this.Children.splice(0, 0, this.GameManager);
        }

        this.Fade = new Fade(() => onFadeMidpoint(), () => this.RemoveChild(this.Fade));
        this.Children.push(this.Fade);
    }

    private LoadCutscene(){
        const onFadeMidpoint = () => {
            this.Children = this.Children.filter(v => v === this.Fade);
            this.CutScene = new CutScene(testScript);
            this.Children.splice(0, 0, this.CutScene);
        }

        this.Fade = new Fade(() => onFadeMidpoint(), () => this.RemoveChild(this.Fade));
        this.Children.push(this.Fade);
    }

    Render(){
        DrawRect(this.Position, this.Size, Colors.background, Colors.border.base, Sizes.border.base);
    }
}
