import type { CharacterIndex, EnemyType } from "@Models/Enums"
import type { Vector2, ImageDataPair } from "@Models/.";

import mainAttack from "@Assets/Images/Sprites/MainAttack.jpg";
import mainIdle from "@Assets/Images/Sprites/MainIdle.jpg";
import goblinIdle from "@Assets/Images/Sprites/GoblinIdle.jpg";
import goblinRun1 from "@Assets/Images/Sprites/GoblinRun1.jpg";
import goblinRun2 from "@Assets/Images/Sprites/GoblinRun2.jpg";
import goblinRun3 from "@Assets/Images/Sprites/GoblinRun3.jpg";
import goblinAttack1 from "@Assets/Images/Sprites/GoblinAttack1.jpg";
import goblinAttack2 from "@Assets/Images/Sprites/GoblinAttack2.jpg";

interface Sprite extends ImageDataPair{
    size:Vector2,
}

export interface SpriteData{
    run?:Sprite[],
    attack:Sprite[],
    idle:Sprite
}

export const spriteDictionary:Record<CharacterIndex | EnemyType, SpriteData> = {
    "main":{
        attack: [
            {src:mainAttack, size:{x:477, y:316}, image: new Image()}
        ],
        idle: {src:mainIdle, size:{x:328, y:371}, image: new Image()}
    },
    "goblin":{
        run: [
            {src:goblinRun1, size:{x:275, y:275}, image: new Image()}, 
            {src:goblinRun2, size:{x:275, y:275}, image: new Image()}, 
            {src:goblinRun3, size:{x:275, y:275}, image: new Image()}, 
            {src:goblinRun2, size:{x:275, y:275}, image: new Image()}
        ],
        attack: [
            {src:goblinAttack1, size:{x:275, y:275}, image: new Image()}, 
            {src:goblinAttack2, size:{x:275, y:275}, image: new Image()}
        ],
        idle: {src:goblinIdle, size:{x:275, y:275}, image: new Image()}
    }
}
