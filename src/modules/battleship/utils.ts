import { BOARD_SIZE } from "./hooks/use-board";
import type { Board, Point, RemoteBoard } from "./models/board";

type Direction = "horizontal" | "vertical";

/**
 * Wether the position has close ships.
 */
function hasCloseShips({
    board,
    row,
    column,
    length,
    direction,
}: {
    board: Board;
    row: number;
    column: number;
    length: number;
    direction: Direction;
}) {
    const columns = board[row] && board[row].length;

    // There's no columns in the selected row.
    if (!columns) return false;

    // Handle edge cases.
    const minRow = Math.max(0, row - 1);
    const minCol = Math.max(0, column - 1);

    const maxRow = Math.min(
        board.length - 1,
        row + (direction === "horizontal" ? 1 : length),
    );

    const maxCol = Math.min(
        columns - 1,
        column + (direction === "vertical" ? 1 : length),
    );

    // Verify ship cells and surrounding cells.
    for (let i = minRow; i <= maxRow; i++) {
        for (let j = minCol; j <= maxCol; j++) {
            if (board[i] && board[i]![j] === "ship") return true;
        }
    }

    return false;
}

/**
 * Wether is a valid placement for a ship.
 */
function isValidPlacement({
    board,
    row,
    column,
    length,
    direction,
}: {
    board: Board;
    row: number;
    column: number;
    length: number;
    direction: Direction;
}) {
    // Ignore when has close ships (there must be space between ships).
    if (hasCloseShips({ board, row, column, length, direction })) return false;

    for (let i = 0; i < length; i++) {
        const currentX = direction === "vertical" ? row + i : row;
        const currentY = direction === "horizontal" ? column + i : column;

        if (
            !board[currentX] ||
            !board[currentX][currentY] ||
            board[currentX][currentY] === "ship"
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
    const row = getRandomInt(0, BOARD_SIZE - 1);
    const column = getRandomInt(0, BOARD_SIZE - 1);
    const direction: Direction = getRandomInt(0, 1) ? "horizontal" : "vertical";
    const ships: Point[] = [];

    if (isValidPlacement({ board, row, column, length, direction })) {
        // Place the ship on the board.
        for (let i = 0; i < length; i++) {
            const currentX = direction === "vertical" ? row + i : row;
            const currentY = direction === "horizontal" ? column + i : column;

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
export function placeShipsRandomly(shipsLength: number[]) {
    if (!shipsLength.every((length) => length > 0)) {
        throw Error("Ships length must be bigger than zero");
    }

    const board = generateEmptyBoard();
    const ships: Point[] = [];

    for (const ship of shipsLength) {
        let placed = false;

        do {
            const result = placeShip(board, ship);

            if (result.length > 0) {
                ships.push(...result);
                placed = true;
            }
        } while (!placed);
    }

    return {
        board,
        ships,
    };
}

/** Generates an empty board. */
export function generateEmptyBoard(): Board {
    return Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill("empty"));
}

/**
 * Converts a local board to remote board.
 */
export function toRemoteBoard(board: Board): RemoteBoard {
    const remote: RemoteBoard = [];

    for (let x = 0; x < board.length; x++) {
        const columns = (board[x] && board[x]?.length) ?? 0;

        for (let y = 0; y < columns; y++) {
            const cell = board[x] && board[x]![y];

            if (cell) {
                remote.push({
                    x,
                    y,
                    hit: cell === "hit",
                    miss: cell === "miss",
                    ships: cell === "ship",
                });
            }
        }
    }

    return remote;
}
