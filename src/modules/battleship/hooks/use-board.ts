import { useState } from "react";
import type { Board, Cell } from "../models/board";
import { generateEmptyBoard, placeShipsRandomly } from "../utils";

/** The size of the board. */
export const BOARD_SIZE = 10;

/** The ships lenghts. */
const SHIPS = [5, 4, 4, 3, 2, 2, 1];

export function useBoard(
    { placeShips }: { placeShips: boolean } = { placeShips: false },
) {
    const [board, setBoard] = useState<Board>(() => {
        if (placeShips) {
            const result = placeShipsRandomly(SHIPS);

            return result.board;
        }

        return generateEmptyBoard();
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

    /** Clears the current board */
    const clear = () => {
        setBoard(generateEmptyBoard());
    };

    /** Clears the attacks received. */
    const clearAttacksReceived = () => {
        setBoard((board) => {
            return board.map((row) => {
                return row.map((column) => {
                    if (column === "hit" || column === "ship") return "ship";

                    return "empty";
                });
            });
        });
    };

    return { board, onReceiveAttack, clear, clearAttacksReceived };
}
