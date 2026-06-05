import { BaseView } from "@Views/Shared";
import type { EnemyManager } from "./EnemyManager";

export class GamePlayRenderer extends BaseView{
    private EnemyManager:EnemyManager;

    constructor(enemyManager:EnemyManager){
        super();
        this.EnemyManager = enemyManager;
    }

    Render(){
        const enemies = this.EnemyManager.GetEnemies();

        enemies.forEach((e) => {
            e.Picture.ManualRender();
        })

        enemies.forEach((e) => {
            e.HealthBar.ManualRender();
        })
    }
}