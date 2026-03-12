import { userService } from "@Services/UserService";
import { BaseView } from "@Views/Shared";
import { Character } from "./Character";
import type { NumberInputCallback } from "@Models/index";

export class CharacterManager extends BaseView{
    Characters:Character[] = [];

    constructor(onDamageEnemies:NumberInputCallback){
        super();

        this.CreateCharacters(onDamageEnemies);
    }

    private CreateCharacters(onDamageEnemies:NumberInputCallback){
        const userData = userService.GetUserData();

        Object.values(userData).forEach((characterData) => {
            const character = new Character({x: .1, y: .1}, {x:.1, y: Math.random()}, characterData, onDamageEnemies)
            this.Characters.push(character);
        });

        this.Children = this.Characters.sort((a, b) => a.Position.x - b.Position.x);
    }

    GetFirstPlayerPosition(){
        if (this.Characters.length === 0){
            throw new Error("Characters Not Initialized");
        }

        return this.Characters[this.Characters.length - 1].Position.x;
    }

    AddMana(mana:number){
        this.Characters.forEach((character) => {
            character.AddMana(mana);
        })
    }
}