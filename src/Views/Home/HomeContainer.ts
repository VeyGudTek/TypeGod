import { BaseView } from "@Views/Shared";
import { Home } from "./Home";
import type { CharacterIndex } from "@Models/User.type";
import { CharacterUpgrade } from "./CharacterUpgrade";

export class HomeContainer extends BaseView{
    Home:Home;
    CharacterUpgrade?:CharacterUpgrade;

    constructor(){
        super();

        this.Home = new Home((index:CharacterIndex) => this.OnCharacterButton(index));
        this.Children.push(this.Home);
    }

    private OnCharacterButton(index:CharacterIndex){
        this.RemoveChild(this.Home);
        this.CharacterUpgrade = new CharacterUpgrade(index, () => this.ToHome());
        this.Children.push(this.CharacterUpgrade);
    }

    private ToHome(){
        this.RemoveChild(this.CharacterUpgrade);
        this.Children.push(this.Home);
    }
}