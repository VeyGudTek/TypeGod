import type { StageIndex, CharacterIndex, AttackType } from "./Enums";

export type BasicCallback = () => void;
export type NumberInputCallback = (points:number) => void;
export type DamageEnemyCallback = (damage:number, type:AttackType) => void;
export type CharacterIndexCallback = (index:CharacterIndex) => void;
export type StageIndexCallback = (index:StageIndex) => void;