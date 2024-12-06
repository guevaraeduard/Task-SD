import { useState } from "react";
import type { Board, Cell } from "../models/board";
import { placeRandomShips } from "../utils";

/** The size of the board. */
export const BOARD_SIZE = 10;

export function useBoard(
    { placeShips }: { placeShips: boolean } = { placeShips: true },
) {
    const [board, setBoard] = useState<Board>(() => {
        const empty = Array(BOARD_SIZE)
            .fill(null)
            .map(() => Array(BOARD_SIZE).fill("empty"));

        if (placeShips) {
            return placeRandomShips(empty, [4, 3, 2, 2, 2, 1, 1, 1, 1]).board;
        }

        return empty;
    });

    /**  Handles the on receive attack. */
    const onReceiveAttack = (x: number, y: number, state?: Cell) => {
        const update = [...board];
        if (!update[x]) return;

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
