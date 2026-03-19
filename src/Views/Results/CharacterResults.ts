import { DrawText } from "@Functions/DrawFunctions";
import { GetMaxExperience } from "@Functions/StaticDataFunctions";
import type { CharacterIndex } from "@Models/index";
import { userService, windowProvider } from "@Services/index";
import { Sizes } from "@Static/Styles";
import { BaseView } from "@Views/Shared";

export class CharacterResults extends BaseView{
    LevelUps:Map<CharacterIndex, number> = new Map();
    LeftOverExperience:Map<CharacterIndex, number> = new Map();

    constructor(experience:number){
        super();

        this.PopulateMaps(experience);
    }

    private PopulateMaps(experience:number){
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
        });
    }

    Render(){
        this.RenderCharacterData();
    }

    private RenderCharacterData(){
        const userData = userService.GetUserData();
        const xPixels = windowProvider.WindowSize.x;
        const yPixels = windowProvider.WindowSize.y;

        this.LeftOverExperience.forEach((leftOver, index) => {
            const leftOverText = `${leftOver}/${GetMaxExperience(userData[index].level)}`;

            DrawText(leftOverText, "Black", {x:xPixels * .5, y:yPixels * .5}, "start", Sizes.text.base * yPixels);
        });
    }
}