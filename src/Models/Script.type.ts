import type { ImageDataPair } from "./Image.type";

export type Script = DialoguePage[];

export interface DialoguePage extends ImageDataPair{
    text?: string,
    speaker?: string,
}
