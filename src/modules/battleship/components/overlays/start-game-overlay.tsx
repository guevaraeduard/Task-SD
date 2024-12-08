import { LoaderCircleIcon } from "lucide-react";
import { useGame } from "../../hooks/use-game";
import { cn } from "~/modules/core/utils";

export function StartGameOverlay() {
    const { status, onStartGame, onLeaveGame } = useGame();

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
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
    );
}
