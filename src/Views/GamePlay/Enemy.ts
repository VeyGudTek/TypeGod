import type { EnemyData, Vector2 } from "@Models/.";
import { timeService, windowProvider } from "@Services/.";
import { yIncrement } from "@Static/.";
import { BaseTransformView, Panel } from "@Views/Shared";
import type { Character } from "./Character";
import { ResourceBar } from "./ResourceBar";

export class Enemy extends BaseTransformView{
    private MaxHealth:number;
    private CurrentHealth:number;

    private BaseCooldown:number;
    private CurrentCooldown:number = 0;
    private Damage:number;

    private Speed:number;
    private Texture:string;

    private tempPanel:Panel;
    private healthBar:ResourceBar;

    Dead:boolean = false;

    GetFirstCharacter:() => Character | undefined;

    constructor(size:Vector2, position:Vector2, enemyData:EnemyData, getFirstCharacter:() => Character | undefined){
        super(size, position);

        this.MaxHealth = enemyData.health;
        this.CurrentHealth = enemyData.health;
        this.BaseCooldown = enemyData.cooldown;
        this.Damage = enemyData.damage;
        this.Speed = enemyData.speed;
        this.Texture = enemyData.texture;

        this.GetFirstCharacter = getFirstCharacter;

        this.tempPanel = new Panel(size, position);
        this.healthBar = new ResourceBar({x: size.x, y: size.y / 5}, {x:position.x, y: position.y - .09}, this.MaxHealth, "#cbb749");
        this.healthBar.SetCurrentResource(this.MaxHealth);
        this.Children.push(this.tempPanel, this.healthBar);
    }

    TakeDamage(damage:number){
        this.CurrentHealth -= damage;
        if (this.CurrentHealth <= 0){
            this.CurrentHealth = 0;
            this.Dead = true;
        }

        this.healthBar.SetCurrentResource(this.CurrentHealth);
    }

    OnUpdate(){
        const target = this.GetFirstCharacter();
        if (target === undefined || this.Dead){
            return;
        }

        const inRange = (this.Position.x - target.Visual.Position.x) < ((this.Size.x / 2) + (target.Visual.Size.x / 2) + yIncrement);
        if (!inRange){
            this.MoveForward();
        }
        else{
            this.AttackCharacter(target);
        }
    }

    private MoveForward(){
        this.Position = {
            x: this.Position.x - (this.Speed * timeService.DeltaTime * (windowProvider.WindowSize.x / 100)),
            y: this.Position.y
        }
        this.tempPanel.Position = this.Position;
        this.healthBar.Position = {
            x: this.Position.x,
            y: this.healthBar.Position.y
        }

        if (this.CurrentCooldown > 0){
            this.CurrentCooldown -= timeService.DeltaTime;
        }
    }

    private AttackCharacter(target:Character){
        if (this.CurrentCooldown <= 0){
            target.TakeDamage(this.Damage);
            this.CurrentCooldown = this.BaseCooldown;
        } else{
            this.CurrentCooldown -= timeService.DeltaTime;
        }
    }
}