import type { CharacterData, NumberInputCallback, CharacterIndex } from "@Models/.";
import { characterGameplayPositionDictionary } from "@Static/.";
import { BaseView } from "@Views/Shared";
import { CharacterVisual } from "./CharacterVisual";

export class Character extends BaseView{
    private Level:number;
    private MaxHealth:number;
    private CurrentHealth:number;
    private Damage:number;
    private MaxMana:number;
    private CurrentMana:number;

    private Texture:string = "";
    Dead:boolean = false;

    DamageEnemies:NumberInputCallback;

    Visual:CharacterVisual;

    constructor(characterIndex: CharacterIndex, characterData:CharacterData, damageEnemies:NumberInputCallback){
        super();

        this.Level = characterData.level;
        this.MaxHealth = characterData.health;
        this.CurrentHealth = characterData.health;
        this.Damage = characterData.damage;
        this.MaxMana = characterData.mana;
        this.CurrentMana = 0;

        this.DamageEnemies = damageEnemies;

        this.Visual = new CharacterVisual({x:.1, y:.1}, characterGameplayPositionDictionary[characterIndex], characterData);
        this.Children.push(this.Visual);
    }

    AddMana(mana:number){
        if (!this.Dead){
            this.CurrentMana += mana;
        }

        if (this.CurrentMana >= this.MaxMana){
            this.CurrentMana = 0;
            this.DamageEnemies(this.Damage);
        }

        this.Visual.UpdateMana(this.CurrentMana);
    }

    TakeDamage(damage:number){
        this.CurrentHealth -= damage;
        if (this.CurrentHealth < 0){
            this.CurrentHealth = 0;
            this.Dead = true;
        }

        this.Visual.UpdateHealth(this.CurrentHealth);
    }
}