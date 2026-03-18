import type { BasicCallback } from "@Models/Callbacks.type";
import { BaseView, Button } from "@Views/Shared";

export class MapView extends BaseView{
    constructor(onBack:BasicCallback){
        super();

        const backButton = new Button({x:.1, y:.05}, {x:.1, y:.09}, "Back", () => onBack());
        this.Children.push(backButton);
    }
}