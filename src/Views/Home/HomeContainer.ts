import { BaseView } from "@Views/Shared";
import { Home } from "./Home";
import type { CharacterIndex, StageIndexCallback } from "@Models/.";
import { CharacterUpgrade } from "./CharacterUpgrade";
import { MapView } from "./MapView";

export class HomeContainer extends BaseView{
    Home:Home;
    CharacterUpgrade?:CharacterUpgrade;
    Map:MapView;

    constructor(onLevelSelect:StageIndexCallback){
        super();

        this.Home = new Home((index:CharacterIndex) => this.OnCharacterButton(index), () => this.OnMap());
        this.Map = new MapView(() => this.ToHome(), (index) => onLevelSelect(index));
        this.Children.push(this.Home);
    }

    private OnMap(){
        this.RemoveChild(this.Home);
        this.Children.push(this.Map);
    }

    private OnCharacterButton(index:CharacterIndex){
        this.RemoveChild(this.Home);
        this.CharacterUpgrade = new CharacterUpgrade(index, () => this.ToHome());
        this.Children.push(this.CharacterUpgrade);
    }

    private ToHome(){
        this.RemoveChild(this.CharacterUpgrade);
        this.RemoveChild(this.Map);
        this.Children.push(this.Home);
    }
}