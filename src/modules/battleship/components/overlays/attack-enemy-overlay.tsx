import { BombIcon } from "lucide-react";

export function AttackEnemyOverlay() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-red-400">
            <BombIcon />

            <p>Es turno de atacar</p>
        </div>
    );
}
