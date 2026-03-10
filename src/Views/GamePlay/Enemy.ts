import type { EnemyData } from "@Models/GamePlay.type";
import type { Vector2 } from "@Models/Vector2.type";
import { timeService } from "@Services/TimeService";
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

    DealDamage(damage:number){
        this.CurrentHealth -= damage;
        if (this.CurrentHealth < 0){
            this.Dead = true;
        }
    }

    MoveForward(){
        this.Position = {
            x: this.Position.x - (this.Speed * timeService.DeltaTime),
            y: this.Position.y
        }
    }
}