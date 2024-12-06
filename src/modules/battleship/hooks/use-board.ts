import { useState } from "react";
import type { Board, Cell } from "../models/board";

/** The size of the board. */
export const BOARD_SIZE = 10;

export function useBoard() {
    const [board, setBoard] = useState<Board>(
        Array(BOARD_SIZE)
            .fill(null)
            .map(() => Array(BOARD_SIZE).fill("empty")),
    );

    /**  Handles the on receive attack. */
    const onReceiveAttack = (x: number, y: number, state?: Cell) => {
        const update = [...board];

        if (state) {
            update[x][y] = state;
        } else {
            if (update[x][y] === "empty") {
                update[x][y] = "miss";
            }

            if (update[x][y] === "ship") {
                update[x][y] = "hit";
            }
        }

        setBoard(update);
    };

    return { board, onReceiveAttack };
}
