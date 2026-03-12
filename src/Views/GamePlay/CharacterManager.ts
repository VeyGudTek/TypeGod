import { userService } from "@Services/UserService";
import { BaseView } from "@Views/Shared";
import { Character } from "./Character";

export class CharacterManager extends BaseView{
    constructor(){
        super();

        this.CreateCharacters();
    }

    private CreateCharacters(){
        const userData = userService.GetUserData();

        Object.values(userData).forEach((characterData) => {
            const character = new Character({x: .1, y: .1}, {x:.1, y: Math.random()}, characterData)
            this.Children.push(character);
        });
    }
}