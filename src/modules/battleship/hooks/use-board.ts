import { useState } from "react";
import { Point, type Board, type Cell } from "../models/board";
import { placeShipsRandomly } from "../utils";

/** The size of the board. */
export const BOARD_SIZE = 10;

/** The ships lenghts. */
const SHIPS = [5, 4, 4, 3, 2, 2, 1];

export function useBoard(
    { placeShips }: { placeShips: boolean } = { placeShips: false },
) {
    const [ships, setShips] = useState<Point[]>([]);

    const [board, setBoard] = useState<Board>(() => {
        const empty = Array(BOARD_SIZE)
            .fill(null)
            .map(() => Array(BOARD_SIZE).fill("empty"));

        if (placeShips) {
            const result = placeShipsRandomly(empty, SHIPS);
            setShips(result.ships);
            return result.board;
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

    return { board, ships, onReceiveAttack };
}
