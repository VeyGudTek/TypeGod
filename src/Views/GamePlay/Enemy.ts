import { DrawRect } from "@Functions/DrawRect";
import type { EnemyData, Vector2 } from "@Models/.";
import { timeService, windowProvider } from "@Services/.";
import { yIncrement } from "@Static/.";
import { BaseTransformView } from "@Views/Shared";

export class Enemy extends BaseTransformView{
    MaxHealth:number;
    CurrentHealth:number;

    BaseCooldown:number;
    CurrentCooldown:number = 0;
    Damage:number;

    Speed:number;
    Texture:string;

    Dead:boolean = false;

    constructor(size:Vector2, position:Vector2, enemyData:EnemyData){
        super(size, position);

        this.MaxHealth = enemyData.health;
        this.CurrentHealth = enemyData.health;
        this.BaseCooldown = enemyData.cooldown;
        this.Damage = enemyData.damage;
        this.Speed = enemyData.speed;
        this.Texture = enemyData.texture;
    }

    TakeDamage(damage:number){
        this.CurrentHealth -= damage;
        if (this.CurrentHealth <= 0){
            this.CurrentHealth = 0;
            this.Dead = true;
        }
    }

    OnUpdate(){
        if (!this.Dead){
            this.MoveForward();
        }
    }

    private MoveForward(){
        this.Position = {
            x: this.Position.x - (this.Speed * timeService.DeltaTime * (windowProvider.WindowSize.x / 100)),
            y: this.Position.y
        }
    }

    Render(){
        DrawRect(this.Position, this.Size, "grey", "grey", 1);

        this.DrawStats();
    }

    private DrawStats(){
        const baseWidth = this.Size.x;
        const percentHealth = this.CurrentHealth / this.MaxHealth;

        DrawRect({x: this.Position.x, y: this.Position.y - yIncrement}, {x: baseWidth, y: this.Size.y / 5}, "#6d6d6d", "#6d6d6d", 1);
        DrawRect({x: this.Position.x, y: this.Position.y - yIncrement}, {x: baseWidth * percentHealth, y: this.Size.y / 5}, "#cbb749", "#cbb749", 1);
    }
}