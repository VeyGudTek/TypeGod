import { LoadLevelOrHome, DrawRect, LoadLevelOrCutscene, LoadCutsceneOrHome } from "@Functions/.";
import { windowProvider } from "@Services/.";
import { BaseTransformView, CutScene, GameManager, Start, HomeContainer, Results } from "@Views/.";
import { Colors, Sizes, scriptDictionary, stageStartToScriptDictionary, stageEndToScriptDictionary, testScript } from "@Static/.";
import type { ScriptIndex, StageIndex } from "@Models/.";

export class Main extends BaseTransformView{
    private Start?: Start;
    private HomeContainer?: HomeContainer;
    private CutScene?: CutScene
    private GameManager?: GameManager
    private Results?: Results;

    constructor(){
        super(windowProvider.WindowSize, {x:0, y:0});

        // this.Start = new Start((newGame) => LoadCutsceneOrHome(newGame, () => this.LoadCutscene("prologue"), () => this.LoadHome()));
        // this.Children.push(this.Start);

        // this.LoadHome();

        // this.LoadCutscene("prologue");

        this.LoadLevel("1");

        // this.Results = new Results(574, 43, 22, () => this.LoadHome());
        // this.Children.push(this.Results);
    }

    private LoadCutscene(index:ScriptIndex){
        this.Children = [];
        this.CutScene = new CutScene(
            scriptDictionary[index], 
            () => LoadLevelOrHome(
                index, 
                () => this.LoadHome(), 
                (stageIndex) => this.LoadLevel(stageIndex)
        ));
        this.Children.push(this.CutScene);
    }

    private LoadHome(){
        this.Children = [];
        this.HomeContainer = new HomeContainer((stageIndex) => 
            LoadLevelOrCutscene(
                stageIndex, 
                () => this.LoadCutscene(stageStartToScriptDictionary[stageIndex]), 
                () => this.LoadLevel(stageIndex)
        ));
        this.Children.push(this.HomeContainer);
    }

    private LoadLevel(stageIndex:StageIndex){
        this.Children = [];
        this.GameManager = new GameManager(stageIndex, (exp, char, time) => this.LoadResults(exp, char, time, stageIndex));
        this.Children.push(this.GameManager);
    }

    private LoadResults(exp:number, char:number, time:number, stageIndex:StageIndex){
        this.Children = [];
        this.Results = new Results(exp, char, time, () => this.LoadCutscene(stageEndToScriptDictionary[stageIndex]));
        this.Children.push(this.Results);
    }

    Render(){
        DrawRect(this.Position, this.Size, Colors.background, Colors.border.base, Sizes.border.base);
    }
}
