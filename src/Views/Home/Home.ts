import { BaseView } from "@Views/Shared";
import { CharacterButton } from "./CharacterButton";
import { userService } from "@Services/UserService";
import { characterButtonPositionDictionary } from "@Static/CharacterPosition";
import type { CharacterIndex } from "@Models/User.type";
import type { CharacterIndexCallback } from "@Models/Callbacks.type";

export class Home extends BaseView{
    constructor(onCharacterButton:CharacterIndexCallback){
        super();

        this.CreateCharacterButtons(onCharacterButton);
    }

    private CreateCharacterButtons(onCharacterButton:CharacterIndexCallback){
        const userData = userService.GetUserData();

        Object.keys(userData).forEach((characterIndex) => {
            const index  = characterIndex as CharacterIndex;
            
            if (userData[index].level === 0){
                return;
            }

            const characterButton = new CharacterButton(
                {x:.1, y:.1}, 
                characterButtonPositionDictionary[index], 
                () => onCharacterButton(index),
                userData[index]
            );

            this.Children.push(characterButton);
        });
    }
}