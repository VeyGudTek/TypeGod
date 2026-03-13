import type { StageIndex } from "@Models/GamePlay.type";
import { BaseView } from "@Views/Shared";
import { EnemyManager } from "./EnemyManager";
import { Typer } from "./Typer";
import { CharacterManager } from "./CharacterManager";

export class GameManager extends BaseView{
    CharacterManager:CharacterManager;
    EnemyManager:EnemyManager;
    Typer:Typer;
    
    constructor(stageIndex:StageIndex){
        super();
        
        this.CharacterManager = new CharacterManager((damage) => this.EnemyManager.DamageEnemies(damage));
        this.EnemyManager = new EnemyManager(stageIndex, () => this.CharacterManager.GetFirstCharacter());
        this.Typer = new Typer((points) => this.CharacterManager.AddMana(points));

        this.Children.push(this.CharacterManager, this.EnemyManager, this.Typer);
    }
}