import type { CharacterIndex, BasicCallback } from "@Models/.";
import { BaseView, Button } from "@Views/.";

export class CharacterUpgrade extends BaseView{
    constructor(charaterIndex:CharacterIndex, onBack:BasicCallback){
        super();

        const backButton = new Button({x:.1, y:.05}, {x:.1, y:.09}, "Back", () => onBack());

        this.Children.push(backButton);
    }
    
    private CreateStats(characterData:CharacterData){

    }
}