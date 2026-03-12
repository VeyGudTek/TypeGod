import { DrawRect } from "@Functions/.";
import type { Vector2, CharacterData } from "@Models/.";
import { windowProvider } from "@Services/WindowProvider";
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

    AddMana(mana:number){
        if (!this.Dead){
            this.CurrentMana += mana;
        }
    }

    TakeDamage(damage:number){
        this.CurrentHealth -= damage;
        if (this.CurrentHealth < 0){
            this.Dead = true;
        }
    }

    Render(){
        this.DrawStats();

        DrawRect(this.Position, this.Size, "#7580b7", "#7580b7", 1);
    }

    private DrawStats(){
        const yIncrement = windowProvider.WindowSize.y * .05;
        const baseWidth = this.Size.x;
        const percentHealth = this.CurrentHealth / this.MaxHealth;
        const percentMana = this.CurrentMana / this.MaxMana;

        DrawRect({x: this.Position.x, y: this.Position.y - (yIncrement)    }, {x: baseWidth, y: this.Size.y / 5}, "#6d6d6d", "#6d6d6d", 1);
        DrawRect({x: this.Position.x, y: this.Position.y - (yIncrement * 2)}, {x: baseWidth, y: this.Size.y / 5}, "#6d6d6d", "#6d6d6d", 1);

        DrawRect({x: this.Position.x, y: this.Position.y - (yIncrement)    }, {x: baseWidth * percentMana, y: this.Size.y / 5}, "#47aac1", "#47aac1", 1);
        DrawRect({x: this.Position.x, y: this.Position.y - (yIncrement * 2)}, {x: baseWidth * percentHealth, y: this.Size.y / 5}, "#cbb749", "#cbb749", 1);
    }
}