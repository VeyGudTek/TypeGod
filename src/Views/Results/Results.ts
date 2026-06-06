import { Sizes } from "@Static/Styles";
import { BaseView, Button, Fade, Label, Panel, PopUpBox } from "@Views/Shared";
import { CharacterResults } from "./CharacterResults";
import type { BasicCallback, StageIndex } from "@Models/.";
import { progressService } from "@Services/ProgressService";
import { ParseInt } from "@Functions/Parser";

export class Results extends BaseView{
    private Fade:Fade;
    private PlayCutscene:boolean;
    private LevelSucceed:boolean;
    private StageIndex:StageIndex;

    constructor(experience:number, characters:number, time:number, levelSucceed:boolean, loadHome:BasicCallback, loadCutscene:BasicCallback, level:StageIndex){
        super();
        this.SaveProgress(level);
        this.LevelSucceed = levelSucceed;
        this.PlayCutscene = false;
        this.StageIndex = level;

        const backPanel = new Panel({x: .4, y: .8}, {x:.25, y:.5});
        const title = new Label({x: .4, y: Sizes.text.title}, {x:.25, y:.2}, "Results", "center");

        const charactersText = `Characters: ${characters}`;
        const timeText = `Time: ${time}`;
        const charactersLabel = new Label({x: .4, y: Sizes.text.base}, {x:.1, y:.3}, charactersText, "start");
        const timeLabel =       new Label({x: .4, y: Sizes.text.base}, {x:.1, y:.4}, timeText, "start");

        const characterResults = new CharacterResults(experience);
        const continueButton = new Button({x:.15, y: .05}, {x:.25, y:.8}, "Continue", () => this.OnContinueWrapper());

        this.Children.push(backPanel, title, charactersLabel, timeLabel, characterResults, continueButton);

        this.Fade = new Fade(() => this.PlayCutscene ? loadCutscene() : loadHome() );
        this.Children.push(this.Fade);
    }

    OnContinueWrapper(){
        const completedLevels = progressService.GetCompletedLevels();
        if (this.LevelSucceed){
            progressService.SaveCompletedLevel(ParseInt(this.StageIndex));
        }

        if (!this.LevelSucceed){
            this.PlayCutscene = false;
            this.Fade.StartFade();
            return;
        }

        if (!completedLevels.includes(ParseInt(this.StageIndex))){
            this.PlayCutscene = true;
            this.Fade.StartFade();
            return;
        }

        const skipPopUp = new PopUpBox("View Cutscene?",
            {text: "View", callBack:() => {this.PlayCutscene = true;  this.Fade.StartFade();}},
            {text: "Skip", callBack:() => {this.PlayCutscene = false; this.Fade.StartFade();}}
        )
        this.Children.splice(-1, 0, skipPopUp);
    }

    private SaveProgress(level:StageIndex){
        progressService.SaveAttemptedLevel(ParseInt(level));
    }
}