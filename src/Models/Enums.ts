export type AlignType = "start" | "center";

export type CharacterIndex = "main";

export type StageIndex = "0"

export type ScriptIndex = "0"

export const scriptWithCutSceneIndex = ["0"] as const;
export type ScriptWithCutSceneIndex = (typeof scriptWithCutSceneIndex)[number];

export type AttackType = "single" | "multi" | "self"
