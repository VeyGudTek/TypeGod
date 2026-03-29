import type { CharacterData, NumberInputCallback, CharacterIndex, Vector2 } from "@Models/.";
import { characterGameplayPositionDictionary } from "@Static/.";
import { BaseView } from "@Views/Shared";
import { CharacterVisual } from "./CharacterVisual";
import { CharacterUI } from "./CharacterUI";

export class Character extends BaseView{
    //private Level:number;
    //private MaxHealth:number;
    private CurrentHealth:number;
    private Damage:number;
    private MaxMana:number;
    private CurrentMana:number;

    //private Texture:string = "";
    Dead:boolean = false;

    DamageEnemies:NumberInputCallback;

    Visual:CharacterVisual;
    UI:CharacterUI;

    constructor(characterIndex: CharacterIndex, characterData:CharacterData, uiPosition:Vector2, damageEnemies:NumberInputCallback){
        super();

        //this.Level = characterData.level;
        //this.MaxHealth = characterData.health;
        this.CurrentHealth = characterData.health;
        this.Damage = characterData.damage;
        this.MaxMana = characterData.mana;
        this.CurrentMana = 0;

        this.DamageEnemies = damageEnemies;

        this.Visual = new CharacterVisual({x:.1, y:.15}, characterGameplayPositionDictionary[characterIndex]);
        this.UI = new CharacterUI({x:.1, y:.15}, uiPosition, characterData);
        this.Children.push(this.Visual, this.UI);
    }
    
    OnWordComplete(points:number){
        this.DamageEnemies(this.Damage);

        this.AddMana(points);
    }

    private AddMana(mana:number){
        if (!this.Dead){
            this.CurrentMana += mana;
        }

        if (this.CurrentMana >= this.MaxMana){
            this.CurrentMana = 0;
            //do special thing here
        }

        this.UI.UpdateMana(this.CurrentMana);
    }

    TakeDamage(damage:number){
        this.CurrentHealth -= damage;
        if (this.CurrentHealth < 0){
            this.CurrentHealth = 0;
            this.Dead = true;
        }

        this.UI.UpdateHealth(this.CurrentHealth);
    }
}