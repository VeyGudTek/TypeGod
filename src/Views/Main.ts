import { DrawRect, HomePicker, StartPicker } from "@Functions/.";
import { windowProvider } from "@Services/.";
import { BaseTransformView, Fade, CutScene, GameManager, Start, HomeContainer, Results } from "@Views/.";
import { Colors, Sizes, scriptDictionary, scriptCutsceneDictionary } from "@Static/.";
import type { ScriptIndex, StageIndex } from "@Models/.";

export class Main extends BaseTransformView{
    private Fade?:Fade;
    private Start?: Start;
    private HomeContainer?: HomeContainer;
    private CutScene?: CutScene
    private GameManager?: GameManager
    private Results?: Results;

    constructor(){
        super(windowProvider.WindowSize, {x:0, y:0});

        // this.Start = new Start((newGame) => StartPicker(newGame, () => this.LoadCutscene(), () => this.LoadHome()));
        // this.Children.push(this.Start);

        this.HomeContainer = new HomeContainer((stageIndex) => HomePicker(stageIndex, () => this.LoadCutscene(scriptCutsceneDictionary[stageIndex]), () => this.LoadLevel(stageIndex)));
        this.Children.push(this.HomeContainer);

        // this.CutScene = new CutScene(testScript);
        // this.Children.push(this.CutScene);

        // this.GameManager = new GameManager("0", (exp, char, time) => this.LoadResults(exp, char, time));
        // this.Children.push(this.GameManager);

        // this.Results = new Results(574, 43, 22, () => this.LoadHome());
        // this.Children.push(this.Results);
    }

    private LoadCutscene(index:ScriptIndex){
        const onFadeMidpoint = () => {
            this.Children = this.Children.filter(v => v === this.Fade);
            this.CutScene = new CutScene(scriptDictionary[index]);
            this.Children.splice(0, 0, this.CutScene);
        }

        this.Fade = new Fade(() => onFadeMidpoint(), () => this.RemoveChild(this.Fade));
        this.Children.push(this.Fade);
    }

    private LoadHome(){
        const onFadeMidpoint = () => {
            this.Children = this.Children.filter(v => v === this.Fade);
            this.HomeContainer = new HomeContainer((stageIndex) => HomePicker(
                stageIndex, 
                () => this.LoadCutscene(scriptCutsceneDictionary[stageIndex]), 
                () => this.LoadLevel(stageIndex)
            ));
            this.Children.splice(0, 0, this.HomeContainer);
        }

        this.Fade = new Fade(() => onFadeMidpoint(), () => this.RemoveChild(this.Fade));
        this.Children.push(this.Fade);
    }

    private LoadLevel(stageIndex:StageIndex){
        const onFadeMidpoint = () => {
            this.Children = this.Children.filter(v => v === this.Fade);
            this.GameManager = new GameManager(stageIndex, (exp, char, time) => this.LoadResults(exp, char, time));
            this.Children.splice(0, 0, this.GameManager);
        }

        this.Fade = new Fade(() => onFadeMidpoint(), () => this.RemoveChild(this.Fade));
        this.Children.push(this.Fade);
    }

    private LoadResults(exp:number, char:number, time:number){
        const onFadeMidpoint = () => {
            this.Children = this.Children.filter(v => v === this.Fade);
            this.Results = new Results(exp, char, time, () => this.LoadHome());
            this.Children.splice(0, 0, this.Results);
        }

        this.Fade = new Fade(() => onFadeMidpoint(), () => this.RemoveChild(this.Fade));
        this.Children.push(this.Fade);
    }

    Render(){
        DrawRect(this.Position, this.Size, Colors.background, Colors.border.base, Sizes.border.base);
    }
}
