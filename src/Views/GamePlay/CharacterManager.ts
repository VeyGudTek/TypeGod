import { userService } from "@Services/UserService";
import { BaseView } from "@Views/Shared";
import { Character } from "./Character";
import type { CharacterIndex, DamageEnemyCallback } from "@Models/index";
import { GetCharacterUIPosition } from "@Functions/StaticDataFunctions";

export class CharacterManager extends BaseView{
    private Characters:Character[] = [];

    constructor(damageEnemy:DamageEnemyCallback){
        super();

        this.CreateCharacters(damageEnemy);
    }

    private CreateCharacters(damageEnemy:DamageEnemyCallback){
        const userData = userService.GetUserData();
        const charactersToCreate = Object.keys(userData).filter(cIndex => userData[cIndex as CharacterIndex].level > 0);

        charactersToCreate.forEach((characterIndex) => {
            const index = characterIndex as CharacterIndex;

            const character = new Character(index, userData[index], GetCharacterUIPosition(charactersToCreate.length, index), damageEnemy)
            this.Characters.push(character);
        });

        this.Children = this.Characters.sort((a, b) => a.Visual.Position.x - b.Visual.Position.x);
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

    TriggerWordComplete(points:number){
        this.Characters.forEach(character => {
            character.OnWordComplete(points);
        })
    }

    CheckGameOver(){
        return this.Characters.every(c => c.Dead);
    }
}