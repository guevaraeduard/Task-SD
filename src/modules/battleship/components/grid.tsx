import { cn } from "~/modules/core/utils";
import { type Board } from "../models/board";
import { BOARD_SIZE } from "../hooks/use-board";
import { BombIcon, CrosshairIcon, DotIcon } from "lucide-react";
import { type ClassValue } from "clsx";

export function Grid({
    className,
    type,
    board,
    onHit,
}: {
    className?: ClassValue;
    type: "player" | "enemy";
    board: Board;
    onHit?: (x: number, y: number) => void;
}) {
    return (
        <article
            className={cn("flex w-full max-w-sm flex-col gap-4", className)}
        >
            <div
                className="grid aspect-square w-full border-l border-t"
                style={{
                    gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
                }}
            >
                {board.map((cells, row) => {
                    return cells.map((cell, column) => {
                        const canHit = cell === "empty" && type === "enemy";

                        return (
                            <button
                                key={`${type}-${row}-${column}`}
                                className={cn(
                                    "group flex aspect-square items-center justify-center border-b border-r",
                                    cell === "hit" && "bg-red-100 text-red-400",
                                    cell === "miss" &&
                                        "bg-blue-100 text-blue-400",
                                    cell === "ship" && "bg-slate-400",
                                    canHit && "hover:bg-red-200",
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
                                        size={18}
                                        aria-label="Tiro acertado"
                                    />
                                ) : cell === "miss" ? (
                                    <DotIcon
                                        size={18}
                                        aria-label="Tiro fallido"
                                    />
                                ) : (
                                    ""
                                )}

                                {canHit ? (
                                    <CrosshairIcon
                                        size={18}
                                        className="text-red-400 opacity-0 group-hover:opacity-100"
                                        aria-label="Objetivo"
                                    />
                                ) : null}
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
