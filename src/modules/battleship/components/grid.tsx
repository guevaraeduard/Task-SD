import { cn } from "~/modules/core/utils";
import { type Board } from "../models/board";
import { BOARD_SIZE } from "../hooks/use-board";
import { BombIcon, DotIcon } from "lucide-react";

export function Grid({
    type,
    board,
    onHit,
}: {
    type: "player" | "enemy";
    board: Board;
    onHit?: (x: number, y: number) => void;
}) {
    return (
        <article className="flex w-full max-w-sm flex-col gap-4">
            <div
                className="grid aspect-square w-full border-l border-t"
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
                                    "relative border-b border-r",
                                    cell === "hit" && "bg-red-100 text-red-400",
                                    cell === "miss" &&
                                        "bg-blue-100 text-blue-400",
                                    cell === "ship" && "bg-slate-400",
                                )}
                                data-x={row}
                                data-y={column}
                                onClick={() => {
                                    // Ignore existent shot.
                                    if (
                                        !onHit ||
                                        cell === "hit" ||
                                        cell === "miss"
                                    )
                                        return;

                                    onHit(row, column);
                                }}
                            >
                                {cell === "hit" ? (
                                    <BombIcon
                                        className="absolute bottom-[25%] left-[25%] right-[25%] top-[25%]"
                                        size={18}
                                        aria-label="Tiro acertado"
                                    />
                                ) : cell === "miss" ? (
                                    <DotIcon
                                        className="absolute bottom-[25%] left-[25%] right-[25%] top-[25%]"
                                        size={18}
                                        aria-label="Tiro fallido"
                                    />
                                ) : (
                                    ""
                                )}
                            </button>
                        );
                    });
                })}
            </div>

            <p className="text-center font-medium">
                {type === "player" ? "Tu campo" : "Campo de contrincante"}
            </p>
        </article>
    );
}
