import { Gamepad2Icon } from "lucide-react";

export function WaitingGameStartOverlay() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-blue-400">
            <Gamepad2Icon />

            <p>El juego está a punto de comenzar</p>
        </div>
    );
}
