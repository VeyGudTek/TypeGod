import type { StageIndex, CharacterIndex } from "./Enums.type";

export type BasicCallback = () => void;
export type NumberInputCallback = (points:number) => void;
export type CharacterIndexCallback = (index:CharacterIndex) => void;
export type StageIndexCallback = (index:StageIndex) => void;