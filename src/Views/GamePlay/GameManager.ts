import type { StageIndex } from "@Models/.";
import { BaseView, Fade } from "@Views/Shared";
import { EnemyManager } from "./EnemyManager";
import { Typer } from "./Typer";
import { CharacterManager } from "./CharacterManager";
import { Timer } from "@Services/TimeService";

export class GameManager extends BaseView{
    private Fade:Fade;
    private GameEnded:boolean = false;
    private Timer:Timer;

    private CharacterManager:CharacterManager;
    private EnemyManager:EnemyManager;
    private Typer:Typer;


    
    constructor(stageIndex:StageIndex, onGameEnd:(exp:number, char:number, time:number) => void){
        super();
        
        this.CharacterManager = new CharacterManager((damage, type) => this.EnemyManager.DamageEnemies(damage, type));
        this.EnemyManager = new EnemyManager(stageIndex, () => this.CharacterManager.GetFirstCharacter());
        this.Typer = new Typer((points) => this.CharacterManager.TriggerWordComplete(points));

        this.Children.push(this.CharacterManager, this.EnemyManager, this.Typer);

        this.Timer = new Timer();
        this.Fade = new Fade(() => onGameEnd(
            this.EnemyManager.GetExperienceEarned(), 
            this.Typer.TotalCorrectCharacters,
            this.Timer.GetElapsedTime()));

        this.Children.push(this.Fade);
    }

    OnUpdate(){
        if (!this.GameEnded && this.EnemyManager.CheckGameEnded()){
            this.GameEnded = true;
            this.Fade.StartFade();
        }
        else if (!this.GameEnded && this.CharacterManager.CheckGameOver()){
            this.GameEnded = true;
            this.Fade.StartFade();
        }
    }
}