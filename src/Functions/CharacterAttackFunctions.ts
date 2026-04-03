import type { AttackType, CharacterIndex } from "@Models/Enums";

export function BasicAttack(characterIndex:CharacterIndex, characterDamage:number){
    let damage = 0;
    let heal = 0;
    let attackType:AttackType = "single";

    if (characterIndex === "main"){
        damage = characterDamage;
        attackType = "single";
    }
    else{
        heal = characterDamage;
        attackType = "multi";
    }

    return { damage, heal, attackType };
}

export function SpecialAttack(characterIndex:CharacterIndex, characterDamage:number){
    let damage = 0;
    let heal = 0;
    let attackType:AttackType = "self";

    if (characterIndex === "main"){
        heal = characterDamage;
    }
    else{
        heal = characterDamage;
    }

    return { damage, heal, attackType };
}