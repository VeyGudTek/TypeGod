import { DrawText } from "@Functions/DrawFunctions";
import type { CharacterData } from "@Models/.";
import { windowProvider } from "@Services/WindowProvider";
import { BaseView } from "@Views/.";

export class CharacterUpgradeStats extends BaseView{
    CharacterData:CharacterData;

    constructor(characterData:CharacterData){
        super()

        this.CharacterData = characterData;
    }

    Render(){
        const xPixels = windowProvider.WindowSize.x;
        const yPixels = windowProvider.WindowSize.y;

        DrawText("Health ", "black", {x: .1 * xPixels, y: .2 * yPixels}, "start", .05 * yPixels);
        DrawText("Damage ", "black", {x: .1 * xPixels, y: .3 * yPixels}, "start", .05 * yPixels);
        DrawText("Mana   ", "black", {x: .1 * xPixels, y: .4 * yPixels}, "start", .05 * yPixels);

        DrawText(this.CharacterData.health.toString(), "black", {x: .3 * xPixels, y: .2 * yPixels}, "start", .05 * yPixels);
        DrawText(this.CharacterData.damage.toString(), "black", {x: .3 * xPixels, y: .3 * yPixels}, "start", .05 * yPixels);
        DrawText(this.CharacterData.mana.toString(),   "black", {x: .3 * xPixels, y: .4 * yPixels}, "start", .05 * yPixels);
    }
}