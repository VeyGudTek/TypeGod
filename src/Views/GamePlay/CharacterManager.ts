import { userService } from "@Services/UserService";
import { BaseView } from "@Views/Shared";
import { Character } from "./Character";
import type { CharacterIndex, NumberInputCallback } from "@Models/index";
import { characterPositionDictionary } from "@Static/GamePlay/CharacterPosition";

export class CharacterManager extends BaseView{
    Characters:Character[] = [];

    constructor(onDamageEnemies:NumberInputCallback){
        super();

        this.CreateCharacters(onDamageEnemies);
    }

    private CreateCharacters(onDamageEnemies:NumberInputCallback){
        const userData = userService.GetUserData();

        Object.keys(userData).forEach((characterIndex) => {
            const index = characterIndex as CharacterIndex;

            const character = new Character({x: .1, y: .1}, characterPositionDictionary[index], userData[index], onDamageEnemies)
            this.Characters.push(character);
        });

        this.Children = this.Characters.sort((a, b) => a.Position.x - b.Position.x);
    }

    GetFirstCharacter(){
        const aliveCharacters = this.Characters.filter(c => !c.Dead);

        if (aliveCharacters.length === 0){
            return;
        }
        else{
            return aliveCharacters[aliveCharacters.length - 1];
        }
    }

    AddMana(mana:number){
        this.Characters.forEach((character) => {
            character.AddMana(mana);
        })
    }
}