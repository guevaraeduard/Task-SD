import { Grid } from "./grid";
import { useGame } from "../hooks/use-game";

export function Game() {
    const { myBoard, enemyBoard, onStartGame, onSendAttack } = useGame();

    return (
        <>
            <Grid
                className="w-full max-w-sm"
                type="player"
                board={myBoard.board}
            />

            <div className="relative w-full max-w-sm">
                <Grid
                    className="w-full opacity-50"
                    type="enemy"
                    board={enemyBoard.board}
                    onHit={onSendAttack}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        className="rounded-full bg-blue-400 px-8 py-2 font-medium text-white"
                        onClick={() => onStartGame()}
                    >
                        Jugar
                    </button>
                </div>
            </div>
        </>
    );
}
