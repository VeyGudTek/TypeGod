import { ParseInt } from "@Functions/Parser";
import type { BasicCallback, StageIndexCallback, StageIndex } from "@Models/.";
import { progressService } from "@Services/ProgressService";
import { stageDictionary } from "@Static/GamePlay";
import { stageButtonPositionDictionary } from "@Static/PositionDictionaries";
import { BaseView, Button, PopUpBox } from "@Views/Shared";

export class MapView extends BaseView{
    constructor(onBack:BasicCallback, loadCutscene:StageIndexCallback, loadLevel:StageIndexCallback){
        super();

        const backButton = new Button({x:.1, y:.05}, {x:.1, y:.09}, "Back", () => onBack());
        this.Children.push(backButton);

        this.CreateLevelButtons(loadCutscene, loadLevel);
    }

    private CreateLevelButtons(loadCutscene:StageIndexCallback, loadLevel:StageIndexCallback){
        const completedLevels = progressService.GetCompletedLevels();

        Object.keys(stageDictionary).forEach((stageIndex) => {
            const index = stageIndex as StageIndex;
            const intIndex = ParseInt(index);

            const stageButton = new Button(
                {x:.05, y:.05}, 
                stageButtonPositionDictionary[index], 
                index, 
                () => this.WrapperOnLevelSelect(() => loadCutscene(index), () => loadLevel(index), completedLevels.includes(intIndex))
            );

            this.Children.push(stageButton);
        })
    }

    private WrapperOnLevelSelect(loadCutscene:BasicCallback, loadLevel:BasicCallback, completedLevel:boolean){
        if (!completedLevel){
            loadCutscene();
            return;
        }

        this.Children.push(new PopUpBox("View Cutscene?",
            {text: "View", callBack:loadCutscene},
            {text: "Skip", callBack:loadLevel},
        ));
    }
}