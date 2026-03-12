import { DrawRect } from "@Functions/.";
import type { Vector2, CharacterData } from "@Models/.";
import { BaseTransformView } from "@Views/Shared";

export class Character extends BaseTransformView{
    Level:number;
    MaxHealth:number;
    CurrentHealth:number;
    Damage:number;
    MaxMana:number;
    CurrentMana:number;

    Texture:string = "";
    Dead:boolean = false;

    constructor(size:Vector2, position:Vector2, characterData:CharacterData){
        super(size, position);

        this.Level = characterData.level;
        this.MaxHealth = characterData.health;
        this.CurrentHealth = characterData.health;
        this.Damage = characterData.damage;
        this.MaxMana = characterData.mana;
        this.CurrentMana = 0;
    }

    TakeDamage(damage:number){
        this.CurrentHealth -= damage;
        if (this.CurrentHealth < 0){
            this.Dead = true;
        }
    }

    Render(){
        DrawRect(this.Position, this.Size, "#7580b7", "#7580b7", 1);
    }
}