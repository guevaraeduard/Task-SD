import { BOARD_SIZE } from "./hooks/use-board";
import type { Board, Point } from "./models/board";

type Direction = "horizontal" | "vertical";

/**
 * Wether is a valid placement for a ship.
 */
function isValidPlacement({
    board,
    x,
    y,
    length,
    direction,
}: {
    board: Board;
    x: number;
    y: number;
    length: number;
    direction: Direction;
}) {
    for (let i = 0; i < length; i++) {
        const currentX = direction === "vertical" ? x + i : x;
        const currentY = direction === "horizontal" ? y + i : y;

        if (
            !board[currentX] ||
            !board[currentX][currentY] ||
            board[currentX][currentX] === "ship"
        ) {
            return false;
        }
    }

    return true;
}

/**
 * Returns a random integer between a range.
 */
function getRandomInt(min: number, max: number) {
    // Use Math.floor to round down to the nearest whole number
    // Use Math.random() to generate a random decimal between 0 (inclusive) and 1 (exclusive)
    // Multiply by the range (max - min + 1) to cover the entire range
    // Add the minimum value to shift the range to [min, max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Places a ship in the board.
 */
function placeShip(board: Board, length: number) {
    const x = getRandomInt(0, BOARD_SIZE);
    const y = getRandomInt(0, BOARD_SIZE);
    const direction: Direction = getRandomInt(0, 1) ? "horizontal" : "vertical";
    const ships: Point[] = [];

    if (isValidPlacement({ board, x, y, length, direction })) {
        // Place the ship on the board.
        for (let i = 0; i < length; i++) {
            const currentX = direction === "vertical" ? x + i : x;
            const currentY = direction === "horizontal" ? y + i : y;

            ships.push({
                x: currentX,
                y: currentY,
            });

            if (board[currentX]) board[currentX][currentY] = "ship";
        }

        return ships;
    }

    return ships;
}

/**
 * Place the ships randomly.
 */
export function placeRandomShips(board: Board, shipsLength: number[]) {
    if (!shipsLength.every((length) => length > 0)) {
        throw Error("Ships length must be bigger than zero");
    }

    const ships: Point[][] = [];

    shipsLength.forEach((ship) => {
        let placed = false;

        do {
            const result = placeShip(board, ship);

            if (result.length > 0) {
                ships.push(result);
                placed = true;
            }
        } while (!placed);
    });

    return {
        board,
        ships,
    };
}
