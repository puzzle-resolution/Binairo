

export type InitBlock = -1 | 0 | 1;
export const enum BlockTypeEnum {
    Black = "Black",
    White = "White",
    Space = "Space",
}



export interface Position {
    x: number,
    y: number,
}