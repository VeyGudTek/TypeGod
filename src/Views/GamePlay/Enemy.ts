import type { EnemyData, EntityState, Vector2 } from "@Models/.";
import { timeService, windowProvider } from "@Services/.";
import { yIncrement } from "@Static/.";
import { BaseTransformView, Picture } from "@Views/Shared";
import type { Character } from "./Character";
import { ResourceBar } from "./ResourceBar";
import { spriteDictionary } from "@Static/.";
import { SpriteState } from "./SpriteState";


export class Enemy extends BaseTransformView{
    private SpriteState:SpriteState;
    private MaxHealth:number;
    private CurrentHealth:number;
    private State:EntityState = "run";

    private BaseCooldown:number;
    private CurrentCooldown:number = 0;
    private Damage:number;

    private Speed:number;

    private Picture:Picture;
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
        this.SpriteState = new SpriteState(spriteDictionary[enemyData.type])

        this.GetFirstCharacter = getFirstCharacter;

        this.Picture = new Picture(new Image(), {x:275, y:275}, .25, this.Position);
        this.SpriteState.InitializePicture(this.Picture);

        this.healthBar = new ResourceBar({x: size.x, y: size.y / 5}, {x:position.x, y: position.y - .09}, this.MaxHealth, "#cbb749");
        this.healthBar.SetCurrentResource(this.MaxHealth);
        this.Children.push(this.Picture, this.healthBar);
    }

    TakeDamage(damage:number){
        this.CurrentHealth -= damage;
        if (this.CurrentHealth <= 0){
            this.CurrentHealth = 0;
            this.Dead = true;
            this.State = "dead";
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

        if (this.CurrentCooldown > 0){
            this.CurrentCooldown -= timeService.DeltaTime;
        }

        this.UpdatePicture();
    }

    private MoveForward(){
        this.Position = {
            x: this.Position.x - (this.Speed * timeService.DeltaTime * (windowProvider.WindowSize.x / 100)),
            y: this.Position.y
        }
        this.healthBar.Position = {
            x: this.Position.x,
            y: this.healthBar.Position.y
        }

        this.State = "run";
    }

    private AttackCharacter(target:Character){
        if (this.CurrentCooldown <= 0){
            this.State = "attack"
            target.TakeDamage(this.Damage);
            this.CurrentCooldown = this.BaseCooldown;
            return;
        }

        this.State = "idle";
    }

    private UpdatePicture(){
        this.Picture.Position = this.Position;
        this.SpriteState.Update(this.State, this.Picture);
    }
}