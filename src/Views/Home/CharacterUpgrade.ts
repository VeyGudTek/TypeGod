import type { CharacterIndex, BasicCallback } from "@Models/.";
import { userService } from "@Services/UserService";
import { BaseView, Button, Label } from "@Views/.";
import { CharacterUpgradeStats } from "./CharacterUpgradeStats";
import { Sizes } from "@Static/Styles";

export class CharacterUpgrade extends BaseView{
    constructor(characterIndex:CharacterIndex, onBack:BasicCallback){
        super();

        const backButton = new Button({x:.1, y:.05}, {x:.1, y:.09}, "Back", () => onBack());
        const name = new Label({x:.1, y: Sizes.text.title}, {x:.5, y:.1}, characterIndex);
        const characterStats = new CharacterUpgradeStats(userService.GetUserData()[characterIndex]);

        this.Children.push(backButton, name, characterStats);
    }
}