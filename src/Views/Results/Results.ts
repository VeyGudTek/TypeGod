import { Sizes } from "@Static/Styles";
import { BaseView, Button, Fade, Label, Panel } from "@Views/Shared";
import { CharacterResults } from "./CharacterResults";
import type { BasicCallback, StageIndex } from "@Models/.";
import { progressService } from "@Services/ProgressService";
import { ParseInt } from "@Functions/Parser";

export class Results extends BaseView{
    Fade:Fade;

    constructor(experience:number, characters:number, time:number, onContinue:BasicCallback, level:StageIndex){
        super();
        this.SaveProgress(level);

        const backPanel = new Panel({x: .4, y: .8}, {x:.25, y:.5});
        const title = new Label({x: .4, y: Sizes.text.title}, {x:.25, y:.2}, "Results", "center");

        const charactersText = `Characters: ${characters}`;
        const timeText = `Time: ${time}`;
        const charactersLabel = new Label({x: .4, y: Sizes.text.base}, {x:.1, y:.3}, charactersText, "start");
        const timeLabel =       new Label({x: .4, y: Sizes.text.base}, {x:.1, y:.4}, timeText, "start");

        const characterResults = new CharacterResults(experience);
        const continueButton = new Button({x:.15, y: .05}, {x:.25, y:.8}, "Continue", () => this.OnContinueWrapper());

        this.Children.push(backPanel, title, charactersLabel, timeLabel, characterResults, continueButton);

        this.Fade = new Fade(() => onContinue());
        this.Children.push(this.Fade);
    }

    OnContinueWrapper(){
        this.Fade.StartFade();
    }

    private SaveProgress(level:StageIndex){
        progressService.SaveCompletedLevel(ParseInt(level));
    }
}