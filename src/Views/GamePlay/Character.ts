import type { AttackType, CharacterData, CharacterIndex, DamageEnemyCallback, Vector2 } from "@Models/.";
import { characterGameplayPositionDictionary } from "@Static/.";
import { BaseView } from "@Views/Shared";
import { CharacterVisual } from "./CharacterVisual";
import { CharacterUI } from "./CharacterUI";
import { BasicAttack, SpecialAttack } from "@Functions/CharacterAttackFunctions";

export class Character extends BaseView{
    private index:CharacterIndex;

    //private Level:number;
    private MaxHealth:number;
    private CurrentHealth:number;
    private Damage:number;
    private MaxMana:number;
    private CurrentMana:number;

    //private Texture:string = "";
    Dead:boolean = false;

    DamageEnemy:DamageEnemyCallback;

    Visual:CharacterVisual;
    UI:CharacterUI;

    constructor(characterIndex: CharacterIndex, characterData:CharacterData, uiPosition:Vector2, damageEnemy:DamageEnemyCallback){
        super();
        this.index = characterIndex;

        //this.Level = characterData.level;
        this.MaxHealth = characterData.health;
        this.CurrentHealth = characterData.health;
        this.Damage = characterData.damage;
        this.MaxMana = characterData.mana;
        this.CurrentMana = 0;

        this.DamageEnemy = damageEnemy;

        this.Visual = new CharacterVisual({x:.1, y:.15}, characterGameplayPositionDictionary[characterIndex]);
        this.UI = new CharacterUI({x:.1, y:.15}, uiPosition, characterData);
        this.Children.push(this.Visual, this.UI);
    }
    
    OnWordComplete(points:number){
        if (this.Dead){
            return;
        }

        const {damage, heal, attackType} = BasicAttack(this.index, points * this.Damage);
        this.ProcessAttack(damage, heal, attackType);

        this.AddMana(points * 10);
    }

    private AddMana(mana:number){
        this.CurrentMana += mana;

        if (this.CurrentMana >= this.MaxMana){
            this.CurrentMana = 0;
            const {damage, heal, attackType} = SpecialAttack(this.index, 100);

            this.ProcessAttack(damage, heal, attackType);
        }

        this.UI.UpdateMana(this.CurrentMana);
    }

    private ProcessAttack(damage:number, heal:number, attackType:AttackType){
        this.DamageEnemy(damage, attackType);

        this.CurrentHealth = Math.min(this.MaxHealth, this.CurrentHealth + heal);

        this.UI.UpdateHealth(this.CurrentHealth);
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