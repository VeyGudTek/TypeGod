import { BaseView } from "@Views/Shared";
import { CharacterButton } from "./CharacterButton";
import { userService } from "@Services/UserService";
import { characterButtonPositionDictionary } from "@Static/CharacterPosition";
import type { CharacterIndex } from "@Models/User.type";

export class Home extends BaseView{
    constructor(){
        super();

        this.CreateCharacterButtons();
    }

    private CreateCharacterButtons(){
        const userData = userService.GetUserData();

        Object.keys(userData).forEach((characterIndex) => {
            const index  = characterIndex as CharacterIndex;
            if (userData[index].level === 0){
                return;
            }

            const characterButton = new CharacterButton(
                {x:.1, y:.1}, 
                characterButtonPositionDictionary[index], 
                () => {console.log("button pressed")},
                userData[index]
            );

            this.Children.push(characterButton);
        });
    }
}