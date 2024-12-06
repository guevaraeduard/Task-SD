export type Cell = "empty" | "ship" | "hit" | "miss";

export type Board = Cell[][];

export interface Point {
    x: number;
    y: number;
}
