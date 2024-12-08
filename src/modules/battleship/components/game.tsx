import { Grid } from "./grid";
import { useGame } from "../hooks/use-game";
import { cn } from "~/modules/core/utils";
import { AttackEnemyOverlay } from "./overlays/attack-enemy-overlay";
import { StartGameOverlay } from "./overlays/start-game-overlay";
import { EnemyAttackOverlay } from "./overlays/enemy-attack-overlay";

export function Game() {
    const { myBoard, enemyBoard, onSendAttack, status } = useGame();

    return (
        <>
            <Grid
                type="player"
                board={myBoard}
                overlay={() => {
                    if (status === "waiting-my-attack") {
                        return <AttackEnemyOverlay />;
                    }

                    return null;
                }}
            />

            <Grid
                className={cn(
                    "w-full opacity-50",
                    status === "waiting-my-attack" && "opacity-100",
                )}
                type="enemy"
                board={enemyBoard}
                onHit={
                    status === "waiting-my-attack" ? onSendAttack : undefined
                }
                overlay={() => {
                    if (status === "none" || status === "searching-game") {
                        return <StartGameOverlay />;
                    }

                    if (status === "waiting-enemy-attack") {
                        return <EnemyAttackOverlay />;
                    }

                    return null;
                }}
            />
        </>
    );
}
