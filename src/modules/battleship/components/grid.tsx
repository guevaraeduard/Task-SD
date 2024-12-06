import { cn } from "~/modules/core/utils";
import { type Board } from "../models/board";
import { BOARD_SIZE } from "../hooks/use-board";

export function Grid({
    type,
    board,
    onHit,
}: {
    type: "player" | "opp";
    board: Board;
    onHit?: (x: number, y: number) => void;
}) {
    return (
        <div
            className="grid aspect-square w-full max-w-sm border-l border-t"
            style={{
                gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
            }}
        >
            {board.map((cells, row) => {
                return cells.map((cell, column) => {
                    return (
                        <button
                            key={`${type}-${row}-${column}`}
                            className={cn(
                                "border-b border-r",
                                cell === "hit" && "bg-red-100",
                                cell === "miss" && "bg-blue-200",
                            )}
                            data-x={row}
                            data-y={column}
                            onClick={() => {
                                // Ignore existent shot.
                                if (!onHit || cell === "hit" || cell === "miss")
                                    return;

                                onHit(row, column);
                            }}
                        ></button>
                    );
                });
            })}
        </div>
    );
}
