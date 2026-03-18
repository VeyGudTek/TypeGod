import type { BasicCallback, StageIndexCallback } from "@Models/Callbacks.type";
import type { StageIndex } from "@Models/GamePlay.type";
import { stageDictionary } from "@Static/GamePlay";
import { stageButtonPositionDictionary } from "@Static/PositionDictionaries";
import { BaseView, Button } from "@Views/Shared";

export class MapView extends BaseView{
    constructor(onBack:BasicCallback, onLevelSelect:StageIndexCallback){
        super();

        const backButton = new Button({x:.1, y:.05}, {x:.1, y:.09}, "Back", () => onBack());
        this.Children.push(backButton);

        this.CreateLevelButtons(onLevelSelect);
    }

    private CreateLevelButtons(onLevelSelect:StageIndexCallback){
        //Have some logic here with UserService

        Object.keys(stageDictionary).forEach((stageIndex) => {
            const index = stageIndex as StageIndex;

            const stageButton = new Button(
                {x:.05, y:.05}, 
                stageButtonPositionDictionary[index], 
                index, 
                () => onLevelSelect(index)
            );

            this.Children.push(stageButton);
        })
    }
}