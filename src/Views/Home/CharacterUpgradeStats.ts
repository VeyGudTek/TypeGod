import { GetMaxExperience } from "@Functions/.";
import type { CharacterData } from "@Models/.";
import { Sizes } from "@Static/Styles";
import { BaseView, Label } from "@Views/.";

export class CharacterUpgradeStats extends BaseView{
    constructor(characterData:CharacterData){
        super()

        this.CreateStats(characterData);
    }

    private CreateStats(characterData:CharacterData){
        const levelText = `Level ${characterData.level}`;
        const levelLabel  = new Label({x: .1, y: Sizes.text.base}, {x: .1, y: .2}, levelText,  "start");
        const healthLabel = new Label({x: .1, y: Sizes.text.base}, {x: .1, y: .3}, "Health ",  "start");
        const damageLabel = new Label({x: .1, y: Sizes.text.base}, {x: .1, y: .4}, "Damage ",  "start");
        const manaLabel   = new Label({x: .1, y: Sizes.text.base}, {x: .1, y: .5}, "Man    ",  "start");

        const expLabel = `${characterData.experience}/${GetMaxExperience(characterData.level)}xp`;
        const levelStat  = new Label({x: .1, y: Sizes.text.base}, {x: .3, y: .2}, expLabel,  "start");
        const healthStat = new Label({x: .1, y: Sizes.text.base}, {x: .3, y: .3}, characterData.health.toString(),  "start");
        const damageStat = new Label({x: .1, y: Sizes.text.base}, {x: .3, y: .4}, characterData.damage.toString(),  "start");
        const manaStat   = new Label({x: .1, y: Sizes.text.base}, {x: .3, y: .5}, characterData.mana.toString()  ,  "start");

        this.Children.push(levelLabel, healthLabel, damageLabel, manaLabel, levelStat, healthStat, damageStat, manaStat);

        if (characterData.levelUps > 0){
            const levelPromptText = `${characterData.levelUps} unused level ups.`
            const levelPrompt = new Label({x: .1, y: .2}, {x: .3, y: .6}, levelPromptText, "center");

            this.Children.push(levelPrompt);
        }
    }
}