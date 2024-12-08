import { ShieldAlertIcon } from "lucide-react";

export function EnemyAttackOverlay() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-red-400">
            <ShieldAlertIcon />

            <p>El enemigo está atacando</p>
        </div>
    );
}
