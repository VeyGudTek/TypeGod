import type { CharacterIndex, EnemyType, Script, ScriptIndex } from "@Models/.";
import { miscImageDictionary, type MiscSceneNames } from "@Static/MiscImageDictionary";
import { scriptDictionary } from "@Static/Scripts";
import { spriteDictionary } from "@Static/SpriteDictionaries";

export interface LoadingProgress{
    total:number
    current:number
}

class ImageLoader{
    private LoadingImages:HTMLImageElement[] = [];

    GetLoadingProgress():LoadingProgress{
        return{
            total: this.LoadingImages.length,
            current: this.LoadingImages.filter(i => i.complete).length
        }
    }

    LoadPage(sceneName: MiscSceneNames){
        this.LoadingImages = [];

        const sceneDictionary = miscImageDictionary[sceneName];

        Object.keys(sceneDictionary).forEach(k => {
            const imageData = sceneDictionary[k];
            this.SetImageObject(imageData.image, imageData.src);
        });
    }

    LoadSprites(){
        this.LoadingImages = [];

        Object.keys(spriteDictionary).forEach(spriteKey => {
            const index = spriteKey as CharacterIndex | EnemyType

            const spriteData = spriteDictionary[index];

            spriteData.attack.forEach(s => {
                this.SetImageObject(s.image, s.src);
            })
            spriteData.run?.forEach(s => {
                this.SetImageObject(s.image, s.src);
            })
            this.SetImageObject(spriteData.idle.image, spriteData.idle.src);
        });
    }

    LoadCutsceneScript(index:ScriptIndex){
        this.LoadingImages = [];
        const script:Script = scriptDictionary[index];

        script.forEach(page => {
            this.SetImageObject(page.image, page.src);
        });
    }

    private SetImageObject(image:HTMLImageElement, src:string){
        this.LoadingImages.push(image);

        if (image.src === ""){
            image.src = src;
        }
    }
}

export const imageLoader = new ImageLoader();