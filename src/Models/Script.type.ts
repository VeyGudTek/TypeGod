export type Script = DialoguePage[];

export interface DialoguePage{
    text: string,
    speaker?: string,
    speakerSide?: "left" | "right"
    characterLeft?: string,
    characterRight?: string,
    background?: string
}
