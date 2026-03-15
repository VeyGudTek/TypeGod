import type { CharacterIndex, BasicCallback } from "@Models/.";
import { userService } from "@Services/UserService";
import { BaseView, Button } from "@Views/.";
import { CharacterUpgradeStats } from "./CharacterUpgradeStats";

export class CharacterUpgrade extends BaseView{
    constructor(characterIndex:CharacterIndex, onBack:BasicCallback){
        super();

        const backButton = new Button({x:.1, y:.05}, {x:.1, y:.09}, "Back", () => onBack());
        const characterStats = new CharacterUpgradeStats(userService.GetUserData()[characterIndex]);

        this.Children.push(backButton, characterStats);
    }
}