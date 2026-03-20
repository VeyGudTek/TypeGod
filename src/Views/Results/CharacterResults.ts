import { GetMaxExperience } from "@Functions/index";
import type { CharacterIndex } from "@Models/index";
import { userService } from "@Services/index";
import { Sizes } from "@Static/Styles";
import { BaseView, Label } from "@Views/Shared";

export class CharacterResults extends BaseView{
    LevelUps:Map<CharacterIndex, number> = new Map();
    LeftOverExperience:Map<CharacterIndex, number> = new Map();

    constructor(experience:number){
        super();

        this.PopulateMapsAndSave(experience);
        this.CreateLabels();
    }

    private PopulateMapsAndSave(experience:number){
        const userData = userService.GetUserData();

        Object.keys(userData).forEach((characterIndex) => {
            const index = characterIndex as CharacterIndex;
            const characterData = userData[index];

            if (characterData.level === 0){
                return;
            }

            let leftOverExperience = experience;
            let levelUps = 0;

            while (leftOverExperience > GetMaxExperience(characterData.level)){
                leftOverExperience -= GetMaxExperience(characterData.level);
                levelUps += 1;
            }

            this.LevelUps.set(index, levelUps);
            this.LeftOverExperience.set(index, leftOverExperience);

            characterData.level += levelUps;
            characterData.levelUps += levelUps;
            characterData.experience = leftOverExperience;

            userService.SaveUserData(index, characterData);
        });
    }

    private CreateLabels(){
        const userData = userService.GetUserData();

        let yPosition = .5
        this.LeftOverExperience.forEach((leftOver, index) => {
            const leftOverText = `${leftOver}/${GetMaxExperience(userData[index].level)}`;
            const levelUpsText = `+${this.LevelUps.get(index)} levels`;

            const indexLabel = new Label({x:.1, y:Sizes.text.base}, {x:.1, y:yPosition}, index, "start");
            const expLabel = new Label({x:.1, y:Sizes.text.base}, {x:.2, y:yPosition}, leftOverText, "start");
            const levelLabel = new Label({x:.1, y:Sizes.text.base}, {x:.3, y:yPosition}, levelUpsText, "start");

            this.Children.push(indexLabel, expLabel, levelLabel);
            yPosition += .1;
        });
    }
}