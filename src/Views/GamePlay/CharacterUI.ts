import type { Vector2, CharacterData } from "@Models/.";
import { BaseTransformView, Panel } from "@Views/.";
import { ResourceBar } from "./ResourceBar";

export class CharacterUI extends BaseTransformView{
    Health:ResourceBar;
    Mana:ResourceBar;

    constructor(size:Vector2, position:Vector2, characterData:CharacterData){
        super(size, position);

        const icon = new Panel(size, position);
        
        this.Health = new ResourceBar({x: size.x, y: size.y / 5}, {x:position.x, y: position.y - .11}, characterData.health, "#eab823");
        this.Mana = new ResourceBar({x: size.x, y: size.y / 5}, {x:position.x, y: position.y - .09}, characterData.mana, "#23a8ea");

        this.Children.push(icon, this.Mana, this.Health);

        this.Health.SetCurrentResource(characterData.health);
    }

    UpdateHealth(health:number){
        this.Health.SetCurrentResource(health);
    }

    UpdateMana(mana:number){
        this.Mana.SetCurrentResource(mana);
    }
}