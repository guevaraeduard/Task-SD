import { createContext } from "react";
import type { Board } from "../models/board";

export type GameStatus =
    | "none"
    | "searching-game"
    | "waiting-enemy-attack"
    | "waiting-my-attack"
    | "waiting-response"
    | "win"
    | "lose";

interface GameProviderState {
    myBoard: Board;
    enemyBoard: Board;
    status: GameStatus;
    onStartGame: () => void;
    onSendAttack: (x: number, y: number) => void;
    onLeaveGame: () => void;
}

export const GameProviderContext = createContext<GameProviderState>(null!);
