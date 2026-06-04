import { LoadLevelOrHome, DrawRect, LoadLevelOrCutscene, LoadPrologueOrHome } from "@Functions/.";
import { windowProvider } from "@Services/.";
import { BaseTransformView, CutScene, GameManager, HomeContainer, Results, LoaderWrapper, Start } from "@Views/.";
import { Colors, Sizes, scriptDictionary, stageStartToScriptDictionary, stageEndToScriptDictionary } from "@Static/.";
import type { ScriptIndex, StageIndex } from "@Models/.";

export class Main extends BaseTransformView{
    constructor(){
        super(windowProvider.WindowSize, {x:0, y:0});

        const start = new Start((newGame) => LoadPrologueOrHome(newGame, () => this.LoadCutscene("prologue"), () => this.LoadHome()));
        this.Children.push(new LoaderWrapper("start", start));

        // this.LoadHome();

        //this.LoadCutscene("prologue");

        //this.LoadLevel("1");

        // this.Results = new Results(574, 43, 22, () => this.LoadHome());
        // this.Children.push(this.Results);
    }

    private LoadCutscene(index:ScriptIndex){
        this.Children = [];
        const cutscene = new CutScene(
            scriptDictionary[index], 
            () => LoadLevelOrHome(
                index, 
                () => this.LoadHome(), 
                (stageIndex) => this.LoadLevel(stageIndex)
        ));
        
        this.Children.push(new LoaderWrapper("cutscene", cutscene, index));
    }

    private LoadHome(){
        this.Children = [];
        const home = new HomeContainer((stageIndex) => 
            LoadLevelOrCutscene(
                stageIndex, 
                () => this.LoadCutscene(stageStartToScriptDictionary[stageIndex]), 
                () => this.LoadLevel(stageIndex)
        ));

        this.Children.push(new LoaderWrapper("home", home));
    }

    private LoadLevel(stageIndex:StageIndex){
        this.Children = [];
        const level = new GameManager(stageIndex, (exp, char, time) => this.LoadResults(exp, char, time, stageIndex));

        this.Children.push(new LoaderWrapper("level", level));
    }

    private LoadResults(exp:number, char:number, time:number, stageIndex:StageIndex){
        this.Children = [];
        const results = new Results(exp, char, time, () => this.LoadCutscene(stageEndToScriptDictionary[stageIndex]));

        this.Children.push(new LoaderWrapper("results", results));
    }

    Render(){
        DrawRect(this.Position, this.Size, Colors.background, Colors.border.base, Sizes.border.base);
    }
}
