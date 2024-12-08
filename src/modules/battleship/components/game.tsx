import { Grid } from "./grid";
import { useGame } from "../hooks/use-game";
import { cn } from "~/modules/core/utils";
import { LoaderCircleIcon } from "lucide-react";

export function Game() {
    const {
        myBoard,
        enemyBoard,
        onStartGame,
        onSendAttack,
        status,
        onLeaveGame,
    } = useGame();

    return (
        <>
            <Grid className="w-full max-w-sm" type="player" board={myBoard} />

            <div className="relative w-full max-w-sm">
                <Grid
                    className={cn(
                        "w-full opacity-50",
                        status === "waiting-my-attack" && "opacity-100",
                    )}
                    type="enemy"
                    board={enemyBoard}
                    onHit={
                        status === "waiting-my-attack"
                            ? onSendAttack
                            : undefined
                    }
                />

                <div
                    className={cn(
                        "absolute inset-0 hidden",
                        (status === "none" || status === "searching-game") &&
                            "flex flex-col items-center justify-center gap-2",
                    )}
                >
                    <button
                        className="rounded-full bg-blue-400 px-8 py-2 font-medium text-white"
                        onClick={() => {
                            if (status === "searching-game") return;

                            onStartGame();
                        }}
                    >
                        {status === "searching-game" ? (
                            <LoaderCircleIcon className="h-6 w-6 animate-spin" />
                        ) : (
                            "Jugar"
                        )}
                    </button>

                    <button
                        className={cn(
                            "hidden rounded-full px-8 py-2 font-medium text-gray-500 transition-colors hover:bg-gray-200",
                            status === "searching-game" && "block",
                        )}
                        onClick={() => {
                            if (status === "searching-game") onLeaveGame();
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    );
}
