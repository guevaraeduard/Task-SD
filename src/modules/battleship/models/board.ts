export type Cell = "empty" | "ship" | "hit" | "miss";

export type Board = Cell[][];

export interface Point {
    x: number;
    y: number;
}

export interface RemoteCell {
    x: number;
    y: number;
    hit: boolean;
    miss: boolean;
    ships: boolean;
}

export type RemoteBoard = RemoteCell[];
